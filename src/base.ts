import { type OutputInfo, type Metadata, from, thumbnail, resize } from './img';
import { render } from './templates';
import { extractPathVariables, normalisePath, parseExif, resolveWatermark } from './utils';
import type { Config, TemplateContext, DeepPartial, Spec } from './types';
import * as fs from 'node:fs';
import os from 'node:os';

export abstract class Renderer<T extends Config> {
  photo!: {
    metadata: Metadata;
    data: Buffer;
    info: OutputInfo;
    thumbnail: string;
  };
  config!: T;
  input: string;
  output: string;

  mergeGlobalConfig() {
    const path = `${os.homedir()}/.phew.json`;
    if (fs.existsSync(path)) {
      const phewrc = fs.readFileSync(path, 'utf-8');
      this.config = {
        ...this.config,
        ...JSON.parse(phewrc)
      };
    }
  }

  constructor(input: string, output: string | undefined, config: DeepPartial<T>) {
    this.config = this.defaultConfig(config);
    this.mergeGlobalConfig();
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
      data,
      thumbnail: await thumbnail(this.input, image)
    };

    const exif = parseExif(this.photo.metadata.exif);

    const spec = this.spec();

    console.time('render manifest');
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

    console.timeEnd('render manifest');

    console.time('resolve watermark');
    // determine photo watermark layout
    const watermarkPath =
      this.config.watermarks && this.config.captionApi
        ? await resolveWatermark(this.config.watermarks, this.config.captionApi, this.photo.thumbnail)
        : this.config.watermarks?.generic?.path;
    const watermark = watermarkPath ? await resize(from(watermarkPath), spec.photo.height * 0.04) : undefined;
    console.timeEnd('resolve watermark');

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
        ...(watermark
          ? [
              {
                input: watermark.data,
                left: Math.round(spec.photo.left + spec.photo.width / 2 - watermark.width / 2),
                top: spec.photo.top + spec.photo.height - watermark.height - 25
              }
            ]
          : []),
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
