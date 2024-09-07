import sharp from '@img/sharp-win32-x64/sharp.node'
export type { OutputInfo, Metadata } from '@img/sharp-win32-x64/sharp.node'
import exif from 'exif-reader'

export const from = (input: string | Buffer): sharp.Sharp => {
    return sharp(input).keepMetadata().keepExif().keepIccProfile()
}

export const create = (create: sharp.Create): sharp.Sharp => {
    return sharp({create}).keepMetadata().keepExif().keepIccProfile()
}

export const exifRead = exif