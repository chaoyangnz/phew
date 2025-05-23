import { type OutputInfo, type Metadata, from } from './img';
import { template } from './templates';
import { extractPathVariables, normalisePath, parseExif } from './utils';
import type { Config, Context, DeepPartial, Spec } from './types';

export abstract class Renderer<T extends Config> {
  photo!: {
    metadata: Metadata;
    data: Buffer;
    info: OutputInfo;
  };
  config!: T;
  input: string;
  output: string;

  constructor(input: string, output: string | undefined, config: DeepPartial<T>) {
    this.config = this.defaultConfig(config);
    this.input = input;
    this.output = normalisePath(extractPathVariables(this.input, this.config), output);
    console.log(this.input, this.output, this.config);
  }

  async render(): Promise<string> {
    const image = from(this.input);
    const metadata = await image.metadata();
    const { data, info } = await image.toBuffer({ resolveWithObject: true });
    this.photo = {
      metadata,
      info,
      data
    };

    const exif = parseExif(this.photo.metadata.exif);

    const spec = this.spec();

    const context: Context<Config> = {
      canvas: {
        width: spec.canvas.width,
        height: spec.canvas.height
      },
      photo: {
        width: spec.photo.width,
        height: spec.photo.height
      },
      width: spec.watermark.width,
      height: spec.watermark.height,
      font: {
        color: {
          primary: this.config.font.color.primary,
          secondary: this.config.font.color.secondary
        },
        size: {
          primary: this.config.font.size.primary,
          secondary: this.config.font.size.secondary
        }
      },
      ...exif,
      config: this.config
    };
    const svg = await template(`${this.config.layout}-${this.config.variation}`, context);
    const watermark = Buffer.from(svg);
    // fs.writeFileSync('debug.svg', watermark)

    console.time('render canvas');
    const canvas =
      spec.canvas.background != 'blur'
        ? await from(this.photo.data)
            .resize(spec.canvas.width, spec.canvas.height)
            .composite([
              {
                input: {
                  create: {
                    width: spec.canvas.width,
                    height: spec.canvas.height,
                    background: spec.canvas.background,
                    channels: 4
                  }
                },
                left: 0,
                top: 0,
                blend: 'source'
              }
            ])
            .toBuffer()
        : await from(this.photo.data)
            .resize(spec.canvas.width, spec.canvas.height)
            // .extract({ width: originalSpec.width - 200, height: originalSpec.height - 200, left: 200, top: 200 })
            .blur(200)
            .toBuffer();

    console.timeEnd('render canvas');

    const shadow =
      this.config.shadow.margin !== 0
        ? await from(
            Buffer.from(`
      <svg
        width="${spec.photo.width + (this.config.shadow.spread + this.config.shadow.margin) * 2}"
        height="${spec.photo.height + (this.config.shadow.spread + this.config.shadow.margin) * 2}"
      >
        <rect
          width="${spec.photo.width + this.config.shadow.spread * 2}"
          height="${spec.photo.height + this.config.shadow.spread * 2}"
          x="${this.config.shadow.margin}"
          y="${this.config.shadow.margin}"
          fill="${this.config.shadow.color}"
        />
        <!--rect
          width="${spec.photo.width}" 
          height="${spec.photo.height}" 
          x="${this.config.shadow.margin}" 
          y="${this.config.shadow.margin}" 
          fill="green" 
          filter="drop-shadow(${this.config.shadow.color} 2px 4px 6px)"
        /-->
      </svg>
  `)
          )
            .blur(this.config.shadow.blur)
            .toBuffer()
        : undefined;

    console.time('render composition');
    const final = await from(canvas)
      .composite([
        ...(shadow
          ? [
              {
                input: shadow,
                left: spec.photo.left - this.config.shadow.margin,
                top: spec.photo.top - this.config.shadow.margin
                // blend: 'multiply'
              }
            ]
          : []),
        {
          input: this.photo.data,
          left: spec.photo.left,
          top: spec.photo.top,
          blend: 'over'
        },
        {
          input: watermark,
          left: spec.watermark.left,
          top: spec.watermark.top
        }
      ])
      .withExifMerge({
        IFD0: {
          Software: `${exif.software} + Phew`
        }
      })
      .toBuffer();
    console.timeEnd('render composition');

    console.time('write file');
    await from(final).jpeg({ quality: this.config.output.quality }).toFile(this.output);
    console.timeEnd('write file');

    return this.output;
  }

  abstract spec(): Spec;

  abstract defaultConfig(conf: DeepPartial<T>): T;
}
