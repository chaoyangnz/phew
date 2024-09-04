import sharp from 'sharp';
import exifRead from 'exif-reader';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path'
import format from 'date-format'

export abstract class Renderer {
  metadata: sharp.Metadata
  original: Buffer

  constructor(private file: string) {}

  async render() {
    const image = await sharp(this.file)
    this.metadata = await image.metadata()
    this.original = await image.toBuffer()

    const exif = exifRead(this.metadata.exif)
    const focal = exif.Photo.FocalLength
    const aperture = exif.Photo.FNumber
    const shutter = exif.Photo.ExposureTime >= 1 ? exif.Photo.ExposureTime : '1/' + Math.round(1 / exif.Photo.ExposureTime)
    const iso = exif.Photo.ISOSpeedRatings

    const {width, height} = this.base()

    const {svg, left, top, width: ww, height: wh} = this.watermark()
    Handlebars.registerHelper('add',  (num1: number, num2: number)  => num1 + num2)
    Handlebars.registerHelper('minus',  (num1: number, num2: number)  => num1 - num2)
    Handlebars.registerHelper('multiply',  (num1: number, num2: number)  => num1 * num2)
    Handlebars.registerHelper('divide',  (num1: number, num2: number)  => num1 / num2)
    const template = Handlebars.compile(fs.readFileSync(path.resolve(__dirname, svg), 'utf8'))
    const watermark = Buffer.from(template({
      width,
      height,
      watermark: {
        width: ww,
        height: wh,
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
        logo: dataUrl(cameraLogo(exif.Image.Make))
      },
      len: {
        make: exif.Photo.LensMake,
        model: exif.Photo.LensModel
      },
      datetime: format('yyyy-MM-dd hh:mm', exif.Photo.DateTimeOriginal)
    }))

    const base = sharp({
      create: {
        width,
        height,
        channels: 4,
        background: '#fff',
      }
    })

    const ext = path.extname(this.file)
    const dst = `output/${path.basename(this.file, ext)}_phew${ext}`

    await base.composite([{
      input: this.original,
      top: 0,
      left: 0
    }, {
      input: watermark,
      top,
      left
    }]).keepMetadata().toFile(dst)

  }

  // return width, height
  abstract base(): {width: number, height: number}

  // return svg name
  abstract watermark(): { svg: string, width: number, height: number, left: number, top: number }

}


const dataUrl = (file: string) => {
  const mime = 'image/png';
  const encoding = 'base64'
  const data = fs.readFileSync(path.resolve(__dirname, file)).toString(encoding);
  return `data:${mime};${encoding},${data}`;
}

const cameraLogo = (make: string) => {
  const brand = ['nikon', 'canon'].filter(it => make.toLowerCase().includes(it))

  return brand ? `assets/logo/${brand}.png` : 'assets/logo/empty.png'
}
