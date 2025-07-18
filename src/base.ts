import { type OutputInfo, type Metadata, from } from './img';
import { render } from './templates';
import { extractPathVariables, normalisePath, parseExif } from './utils';
import type { Config, TemplateContext, DeepPartial, Spec } from './types';

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

    const context: TemplateContext<Config> = {
      canvas: {
        width: spec.canvas.width,
        height: spec.canvas.height
      },
      photo: {
        width: spec.photo.width,
        height: spec.photo.height
      },
      width: spec.manifest.width,
      height: spec.manifest.height,
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
    const manifest = await render(`${this.config.layout}-${this.config.variation}`, context);
    // fs.writeFileSync('debug.svg', manifest)

    const watermarks = {
      generic: {
        path: '/Users/chao.yang/Pictures/watermark/watermark-generic-light.png',
        keywords: []
      },
      astro: {
        path: '/Users/chao.yang/Pictures/watermark/watermark-astro-light.png',
        keywords: ['star', 'moon', 'night', 'milky way', 'galaxy', 'constellation', 'constellations', 'constellation']
      },
      bird: {
        path: '/Users/chao.yang/Pictures/watermark/watermark-bird-light.png',
        keywords: ['bird']
      },
      floral: {
        path: '/Users/chao.yang/Pictures/watermark/watermark-floral-light.png',
        keywords: ['flower']
      },
      seascape: {
        path: '/Users/chao.yang/Pictures/watermark/watermark-seascape-light.png',
        keywords: ['beach', 'sea', 'ocean', 'bay', 'cove']
      },
      landscape: {
        path: '/Users/chao.yang/Pictures/watermark/watermark-summit-light.png',
        keywords: ['summit', 'mountain', 'peak', 'hill', 'peak', 'waterfall']
      },
      cityscape: {
        path: '/Users/chao.yang/Pictures/watermark/watermark-cityscape-light.png',
        keywords: ['city', 'building', 'skyscraper', 'tower', 'skyline', 'sky', 'tower', 'skyscraper', 'skyline']
      }
    }

    const f = from(watermarks['generic'].path)
    const { width, height } = await f.metadata()
    const h = Math.round(spec.photo.height * 0.04) // photo height 5%
    const w = Math.round(h * width! / height!) // keep aspect ratio
    const d = await f.resize(w, h).ensureAlpha(0.5).toBuffer()
    const watermark = {
      data: d,
      width: w,
      height: h
    }

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
          input: watermark.data,
          left: Math.round(spec.photo.left + spec.photo.width / 2 - watermark.width / 2),
          top: spec.photo.top + spec.photo.height - watermark.height - 25,
        },
        {
          input: manifest,
          left: spec.manifest.left,
          top: spec.manifest.top
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
