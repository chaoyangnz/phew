import { type OutputInfo, type Metadata, from, exifRead } from './img';
import { logos } from './assets';
import { template } from './templates'
import { dateFormat, extractPathVariables, parsePath } from './utils';
import type { Config, Context, Spec } from './types';

export abstract class Renderer {
  metadata!: Metadata;
  original!: Buffer;
  info!: OutputInfo;

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

    const context: Context<Config> = {
      background: {
        width: spec.background.width,
        height: spec.background.height,
      },
      original: {
        width: spec.original.width,
        height: spec.original.height,
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
      ...exif,
      config: this.config
    };
    const svg = await template(`${this.config.layout}-${this.config.variation}`, context);
    const watermark = Buffer.from(svg);
    // fs.writeFileSync('1.svg', s)

    console.time('render background')
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

    console.timeEnd('render background')

    const dst = parsePath(extractPathVariables(this.file, this.config), dest)

    console.time('render composition')
    const final = await from(background)
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
      }).toBuffer()
    console.timeEnd('render composition')

    console.time('write file')
    await from(final).toFile(dst);
    console.timeEnd('write file')

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

const parseExif = (buffer?: Buffer) => {
  if (!buffer) throw Error('No Exif data found')
  const exif = exifRead(buffer);
  if (!exif.Photo || !exif.Image) throw Error('No Exif data found')
  const focal = exif.Photo.FocalLength === undefined ? '' : exif.Photo.FocalLength.toString();
  const aperture = exif.Photo.FNumber === undefined ? '' : exif.Photo.FNumber.toString()
  const shutter =
      exif.Photo.ExposureTime === undefined
          ? ''
          : exif.Photo.ExposureTime >= 1
            ? exif.Photo.ExposureTime.toString()
            : '1/' + Math.round(1 / exif.Photo.ExposureTime);
  const iso = exif.Photo?.ISOSpeedRatings === undefined ? '' : exif.Photo?.ISOSpeedRatings.toString();

  return {
    exposure: {
      focal,
      aperture,
      shutter,
      iso,
      formatted: `${focal}mm 𝓕${aperture} ${shutter}s ISO${iso}`,
    },
    camera: {
      make: exif.Image.Make || '',
      model: exif.Image.Model || '',
      // @ts-ignore
      logo: logos[`${brand(exif.Image.Make)}.png`],
    },
    len: {
      make: exif.Photo.LensMake || '',
      model: exif.Photo.LensModel || '',
    },
    datetime: dateFormat('yyyy-MM-dd hh:mm', exif.Photo.DateTimeOriginal),
    software: exif.Image.Software || ''
  }
}
