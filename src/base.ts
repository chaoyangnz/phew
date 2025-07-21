import { type OutputInfo, type Metadata, from, thumbnail, resize, create } from './img';
import { renderManifest } from './templates';
import { extractPathVariables, normalisePath, parseExif, resolveWatermark } from './utils';
import type { Config, ManifestTemplateContext, DeepPartial, LayoutSpec, ExifData, ImageHolder } from './types';
import * as fs from 'node:fs';
import os from 'node:os';
import type { OverlayOptions, Sharp } from 'sharp';
import { compact } from 'lodash';

export abstract class Renderer<T extends Config> {
  photo!: ImageHolder;
  exif!: ExifData;
  watermark?: ImageHolder;
  spec!: LayoutSpec;
  config!: T;

  constructor(config: DeepPartial<T>, photo: ImageHolder, exif: ExifData) {
    this.config = this.defaultConfig(config);
    const path = `${os.homedir()}/.phew.json`;
    if (fs.existsSync(path)) {
      const phewrc = fs.readFileSync(path, 'utf-8');
      this.config = {
        ...this.config,
        ...JSON.parse(phewrc)
      };
    }

    this.photo = photo;
    this.exif = exif;
    console.log(this.config);
  }

  async render(): Promise<Sharp> {
    let watermarkPath = this.config.watermarks?.generic?.path;
    if (this.config.watermarks && this.config.captionApi) {
      watermarkPath = await resolveWatermark(this.config.watermarks, this.config.captionApi, this.photo.path);
    }
    if (watermarkPath) {
      this.watermark = await resize(watermarkPath, this.photo.height * 0.04);
    }

    this.spec = this.layoutSpec();

    console.time('resolve watermark');

    // determine photo watermark layout
    if (this.watermark) {
      this.spec.watermark = {
        width: this.watermark?.width,
        height: this.watermark?.height,
        top: this.spec.photo.top + this.spec.photo.height - this.watermark.height - 25,
        left: Math.round(this.spec.photo.left + this.spec.photo.width / 2 - this.watermark.width / 2)
      };
    }

    console.timeEnd('resolve watermark');

    if (this.config.shadow.margin !== 0) {
      this.spec.shadow = {
        width: this.spec.photo.width + (this.config.shadow.spread + this.config.shadow.margin) * 2,
        height: this.spec.photo.height + (this.config.shadow.spread + this.config.shadow.margin) * 2,
        left: this.spec.photo.left - this.config.shadow.margin,
        top: this.spec.photo.top - this.config.shadow.margin
      };
    }

    console.time('render manifest');
    const context = {
      config: this.config,
      spec: this.spec,
      exif: this.exif
    };
    const manifest = this.spec.manifest
      ? await renderManifest(`${this.config.layout}-${this.config.variation}`, context)
      : undefined;
    // fs.writeFileSync('debug.svg', manifest)

    console.timeEnd('render manifest');

    console.time('render canvas');
    const canvas =
      this.spec.canvas.background != 'blur'
        ? await from(this.photo.data)
            .resize(this.spec.canvas.width, this.spec.canvas.height)
            .composite([
              {
                input: {
                  create: {
                    width: this.spec.canvas.width,
                    height: this.spec.canvas.height,
                    background: this.spec.canvas.background,
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
            .resize(this.spec.canvas.width, this.spec.canvas.height)
            // .extract({ width: originalSpec.width - 200, height: originalSpec.height - 200, left: 200, top: 200 })
            .blur(200)
            .toBuffer();

    console.timeEnd('render canvas');

    const shadow = this.spec.shadow
      ? await from(
          Buffer.from(`
      <svg
        width="${this.spec.shadow.width}"
        height="${this.spec.shadow.height}"
      >
        <rect
          width="${this.spec.photo.width + this.config.shadow.spread * 2}"
          height="${this.spec.photo.height + this.config.shadow.spread * 2}"
          x="${this.config.shadow.margin}"
          y="${this.config.shadow.margin}"
          fill="${this.config.shadow.color}"
        />
        <!--rect
          width="${this.spec.photo.width}" 
          height="${this.spec.photo.height}" 
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

    // from bottom to top
    const overlays: OverlayOptions[] = compact([
      shadow && this.spec.shadow
        ? {
            input: shadow,
            left: this.spec.shadow.left,
            top: this.spec.shadow.top
            // blend: 'multiply'
          }
        : undefined,
      {
        input: this.photo.data,
        left: this.spec.photo.left,
        top: this.spec.photo.top,
        blend: 'over'
      },
      this.watermark
        ? {
            input: this.watermark.data,
            left: Math.round(this.spec.photo.left + this.spec.photo.width / 2 - this.watermark.width / 2),
            top: this.spec.photo.top + this.spec.photo.height - this.watermark.height - 25
          }
        : undefined,
      manifest && this.spec.manifest
        ? {
            input: manifest,
            left: this.spec.manifest.left,
            top: this.spec.manifest.top
          }
        : undefined
    ]);

    const final = await from(canvas)
      .composite(overlays)
      .withExifMerge({
        IFD0: {
          Software: `${this.exif.software} + Phew`
        }
      })
      .toBuffer();
    console.timeEnd('render composition');

    console.time('write file');
    const output = await from(final).jpeg({ quality: this.config.output.quality });
    console.timeEnd('write file');

    return output;
  }

  abstract layoutSpec(): LayoutSpec;

  abstract defaultConfig(conf: DeepPartial<T>): T;
}
