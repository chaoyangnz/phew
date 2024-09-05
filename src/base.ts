import sharp from 'sharp';
import exifRead from 'exif-reader';
import path from 'path';
import format from 'date-format';
import { Config } from './config';
import { logos, fonts } from './assets';
import satori from 'satori';
import { templates } from './templates';

export abstract class Renderer {
  metadata: sharp.Metadata;
  raw: Buffer;

  protected constructor(
    public file: string,
    public config: Config,
  ) {}

  async render(dest: string): Promise<string> {
    const image = sharp(this.file);
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

    const context = {
      size: {
        width: baseSpec.width,
        height: baseSpec.height,
      },
      width: watermarkSpec.width,
      height: watermarkSpec.height,
      font: {
        color: this.config.font.color
      },
      exposure: {
        focal,
        aperture,
        shutter,
        iso,
        formatted: `${focal}mm 𝓕${aperture} ${shutter}s ISO${iso}`
      },
      camera: {
        make: exif.Image.Make,
        model: exif.Image.Model,
        logo: logos[`${brand(exif.Image.Make)}.png`],
      },
      len: {
        make: exif.Photo.LensMake,
        model: exif.Photo.LensModel,
      },
      datetime: format('yyyy-MM-dd hh:mm', exif.Photo.DateTimeOriginal),
    }
    const template = await templates[`${this.config.layout}-${this.config.variation}`]
    const svg = await satori(template(context), {
      width: context.width,
      height: context.height,
      fonts: [
        {
          name: 'Roboto',
          data: fonts['Roboto-Regular.ttf'],
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Arial',
          data: fonts['Arial.ttf'],
          weight: 400,
          style: 'normal',
        },
      ],
      embedFont: false
    })
    // fs.writeFileSync('1.svg', s)
    const watermark = {
      input: Buffer.from(svg),
      left: watermarkSpec.left,
      top: watermarkSpec.top,
    };

    const base =
      baseSpec.background !== 'blur'
        ? sharp({
            create: {
              width: baseSpec.width,
              height: baseSpec.height,
              channels: 4,
              background: baseSpec.background,
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

    return dst
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

const brand = (make: string): string => {
  const brand = ['nikon', 'canon', 'sony', 'fujifilm', 'leica', 'panasonic', 'pentax', 'hasselblad', 'olympus', 'ricoh', 'apple', 'dji', 'xmage'].find((it) =>
    make.toLowerCase().includes(it),
  );

  return brand || 'empty';
};
