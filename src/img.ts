// require('@img/sharp-win32-x64/sharp.node')

export type { OutputInfo, Metadata, Sharp, Create } from 'sharp';
import exif from 'exif-reader';
import sharp from 'sharp';

export const from = (input: string | Buffer): sharp.Sharp => {
  return sharp(input).keepMetadata().keepExif().keepIccProfile();
};

export const create = (create: sharp.Create): sharp.Sharp => {
  return sharp({ create }).keepMetadata().keepExif().keepIccProfile();
};

export const exifRead = exif;
