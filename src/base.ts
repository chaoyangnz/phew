import sharp from 'sharp';
import exifRead from 'exif-reader';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import format from 'date-format';
import { Config } from './config';
import { assign  } from 'lodash';

export abstract class Renderer {
  metadata: sharp.Metadata;
  raw: Buffer;

  constructor(
    public file: string,
    public config: Config,
  ) {}

  async render(dest: string) {
    const image = await sharp(this.file);
    this.metadata = await image.metadata();
    this.raw = await image.toBuffer();

    const exif = exifRead(this.metadata.exif);
    const focal = exif.Photo.FocalLength;
    const aperture = exif.Photo.FNumber;
    const shutter =
      exif.Photo.ExposureTime >= 1
        ? exif.Photo.ExposureTime
        : '1/' + Math.round(1 / exif.Photo.ExposureTime);
    const iso = exif.Photo.ISOSpeedRatings;

    const baseSpec = this.base();
    const originalSpec = this.original();
    const watermarkSpec = this.watermark();
    const extension = path.extname(this.file);
    const name = path.basename(this.file, extension)
    const dst = `${dest}/${this.filename(name, extension)}`;

    Handlebars.registerHelper(
      'add',
      (num1: number, num2: number) => num1 + num2,
    );
    Handlebars.registerHelper(
      'minus',
      (num1: number, num2: number) => num1 - num2,
    );
    Handlebars.registerHelper(
      'multiply',
      (num1: number, num2: number) => num1 * num2,
    );
    Handlebars.registerHelper(
      'divide',
      (num1: number, num2: number) => num1 / num2,
    );
    Handlebars.registerHelper(
      'divideAdd',
      (num1: number, num2: number, num3: number) => num1 / num2 + num3,
    );
    const template = Handlebars.compile(
      fs.readFileSync(
        path.resolve(
          __dirname,
          `${this.config.layout}-${this.config.variation}.svg`,
        ),
        'utf8',
      ),
    );
    const context = {
      size: {
        width: baseSpec.width,
        height: baseSpec.height,
      },
      width: watermarkSpec.width,
      height: watermarkSpec.height,
      font: {
        color: this.config.font?.color || '#000'
      },
      exposure: {
        focal,
        aperture,
        shutter,
        iso,
      },
      camera: {
        make: exif.Image.Make,
        model: exif.Image.Model,
        logo: dataUrl(cameraLogo(exif.Image.Make)),
      },
      len: {
        make: exif.Photo.LensMake,
        model: exif.Photo.LensModel,
      },
      datetime: format('yyyy-MM-dd hh:mm', exif.Photo.DateTimeOriginal),
    }
    const svg = template(context);
    console.log(dst, template(assign(context, {camera: {logo: ''}})));
    const watermark = {
      input: Buffer.from(svg),
      left: watermarkSpec.left,
      top: watermarkSpec.top,
    };

    const backgroundColor = baseSpec.background !== 'blur' ? baseSpec.background : '#fff';

    const base =
      baseSpec.background !== 'blur'
        ? sharp({
            create: {
              width: baseSpec.width,
              height: baseSpec.height,
              channels: 4,
              background: backgroundColor,
            },
          })
        : sharp(this.raw).extract({ width: originalSpec.width - 200, height: originalSpec.height - 200, left: 200, top: 200 })
          .blur(200)
          .resize(baseSpec.width, baseSpec.height);

    await base
      .composite([
        {
          input: this.raw,
          left: originalSpec.left,
          top: originalSpec.top,
        },
        watermark,
      ])
      .keepMetadata()
      .toFile(dst);
  }

  // return width, height
  abstract base(): { width: number; height: number; background: string };

  abstract original(): {
    width: number;
    height: number;
    left: number;
    top: number;
  };

  // return svg name
  abstract watermark(): {
    width: number;
    height: number;
    left: number;
    top: number;
  };

  filename(name: string, extension: string): string {
    return `${[name, 'phew', this.config.layout, this.config.variation].join('-')}${extension}`
  }
}

const dataUrl = (file: string) => {
  const mime = 'image/png';
  const encoding = 'base64';
  const data = fs
    .readFileSync(path.resolve(__dirname, file))
    .toString(encoding);
  return `data:${mime};${encoding},${data}`;
};

const cameraLogo = (make: string) => {
  const brand = ['nikon', 'canon'].filter((it) =>
    make.toLowerCase().includes(it),
  );

  return brand ? `assets/logo/${brand}.png` : 'assets/logo/empty.png';
};
