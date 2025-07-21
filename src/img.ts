// require('@img/sharp-win32-x64/sharp.node')

import { last } from 'lodash';
import { v4 as uuid } from 'uuid';

export type { OutputInfo, Metadata, Sharp, Create } from 'sharp';
import exif from 'exif-reader';
import sharp, { type Sharp } from 'sharp';
import os from 'node:os';

export const from = (input: string | Buffer): sharp.Sharp => {
  return sharp(input).keepMetadata().keepExif().keepIccProfile();
};

export const create = (create: sharp.Create): sharp.Sharp => {
  return sharp({ create }).keepMetadata().keepExif().keepIccProfile();
};

export const exifRead = exif;

export const thumbnail = async (path: string, size = 200) => {
  const image = from(path);
  const { info } = await image.toBuffer({ resolveWithObject: true });
  const suffix = last(path.split('.'));
  const name = `${uuid()}.${suffix}`;
  const thumbnail = `${os.tmpdir()}/${name}`;
  await image.resize(size, Math.round(size * (info.height / info.width))).toFile(thumbnail);
  return thumbnail;
};

export const resize = async (path: string, resizeTo: number, heightFirst = true) => {
  const image = from(path);
  const { width, height } = await image.metadata();
  let w, h;
  if (heightFirst) {
    h = Math.round(resizeTo); // photo height 5%
    w = Math.round((h * width!) / height!); // keep aspect ratio
  } else {
    w = Math.round(resizeTo); // photo height 5%
    h = Math.round((w * height!) / width!); // keep aspect ratio
  }

  const img = image.resize(w, h).ensureAlpha(0.5);
  return {
    path,
    data: await img.toBuffer(),
    width: w,
    height: h
  };
};
