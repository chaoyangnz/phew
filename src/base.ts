import { OutputInfo, Metadata } from 'sharp';
import exifRead from 'exif-reader';
import { logos, fonts } from './assets';
import satori from 'satori';
import { templates } from './templates';
import { dateFormat, extractPathVariables, from, parsePath } from './utils';
import { Config, Context, Spec } from './types';

export abstract class Renderer {
  metadata: Metadata;
  original: Buffer;
  info: OutputInfo;

  protected constructor(
    public file: string,
    public config: Config,
  ) {}

  async render(dest?: string): Promise<string> {
    const image = from(this.file);
    this.metadata = await image.metadata();
    const { data, info } = await image.toBuffer({ resolveWithObject: true });
    this.original = data;
    this.info = info;

    const exif = parseExif(this.metadata.exif)

    const spec = this.spec();

    const context: Context = {
      size: {
        width: spec.background.width,
        height: spec.background.height,
      },
      width: spec.watermark.width,
      height: spec.watermark.height,
      font: {
        color: {
          primary: this.config.font.color.primary,
          secondary: this.config.font.color.secondary,
        },
        size: {
          primary: this.config.font.size.primary,
          secondary: this.config.font.size.secondary,
        }
      },
      ...exif
    };
    const template =
      await templates[`${this.config.layout}-${this.config.variation}`];
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
      embedFont: false,
    });
    const watermark = Buffer.from(svg);
    // fs.writeFileSync('1.svg', s)



    const background =
      spec.background.background != 'blur'
        ? await from(this.original)
          .resize(spec.background.width, spec.background.height)
          .composite([
            {
              input: {
                create: {
                  width: spec.background.width,
                  height: spec.background.height,
                  background: spec.background.background,
                  channels: 4,
                },
              },
              left: 0,
              top: 0,
              blend: 'source',
            },
          ])
          .toBuffer()
        : await from(this.original)
            .resize(spec.background.width, spec.background.height)
            // .extract({ width: originalSpec.width - 200, height: originalSpec.height - 200, left: 200, top: 200 })
            .blur(200)
            .toBuffer();

    const dst = parsePath(extractPathVariables(this.file, this.config), dest)
    const final = from(background)
      .composite([
        {
          input: this.original,
          left: spec.original.left,
          top: spec.original.top,
        },
        {
          input: watermark,
          left: spec.watermark.left,
          top: spec.watermark.top,
        },
      ])
      .withExifMerge({
        IFD0: {
          Software: `${exif.software} + Phew`
        }
      })
    await final.toFile(dst);

    return dst;
  }

  abstract spec(): Spec;
}

const brand = (make: string): string => {
  const brand = [
    'nikon',
    'canon',
    'sony',
    'fujifilm',
    'leica',
    'panasonic',
    'pentax',
    'hasselblad',
    'olympus',
    'ricoh',
    'apple',
    'dji',
    'xmage',
  ].find((it) => make.toLowerCase().includes(it));

  return brand || 'empty';
};

const parseExif = (buffer: Buffer) => {
  const exif = exifRead(buffer);
  const focal = exif.Photo.FocalLength;
  const aperture = exif.Photo.FNumber;
  const shutter =
    exif.Photo.ExposureTime >= 1
      ? exif.Photo.ExposureTime.toString()
      : '1/' + Math.round(1 / exif.Photo.ExposureTime);
  const iso = exif.Photo.ISOSpeedRatings;

  return {
    exposure: {
      focal,
      aperture,
      shutter,
      iso,
      formatted: `${focal}mm 𝓕${aperture} ${shutter}s ISO${iso}`,
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
    datetime: dateFormat('yyyy-MM-dd hh:mm', exif.Photo.DateTimeOriginal),
    software: exif.Image.Software
  }
}
