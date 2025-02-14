import path from 'path';
import type { Config } from './types';
import { compact } from 'lodash';
// @ts-ignore
import format from 'date-format';
import * as fs from 'fs';
import { exifRead } from './img.ts';
import { logos } from './assets.ts';

export type PathVariables = {
  name: string;
  dir: string;
  ext: string;
  timestamp: string;
  date: string;
  time: string;
  phew: string;
};

export const extractPathVariables = (file: string, config: Config): PathVariables => {
  const p = path.resolve(file);
  const dir = path.dirname(p);
  const ext = path.extname(p);
  const name = path.basename(p, ext);

  const { layout, variation, background } = config;
  const blur = background === 'blur' ? background : null;
  const overlay = config.layout === 'card' && config.overlay ? 'overlay' : null;

  return {
    name,
    dir,
    ext,
    timestamp: Date.now().toString(),
    date: dateFormat('yyyy-MM-dd'),
    time: dateFormat('hh:mm:ss'),
    phew: compact(['phew', layout, variation, overlay, blur]).join('-')
  };
};

const resolvePath = (pattern: string, pathVariables: PathVariables, resolve = true) => {
  const { name, dir, ext, timestamp, date, time, phew } = pathVariables;

  const p = pattern
    .replaceAll('{name}', name)
    .replaceAll('{dir}', dir)
    .replaceAll('{ext}', ext)
    .replaceAll('{timestamp}', timestamp)
    .replaceAll('{date}', date)
    .replaceAll('{time}', time)
    .replaceAll('{phew}', phew);

  return resolve ? path.resolve(p) : p;
};

export const normalisePath = (pathVariables: PathVariables, dest?: string) => {
  if (dest) {
    const destPath = resolvePath(dest, pathVariables);

    if (!path.extname(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
      return path.join(destPath, resolvePath('{name}-{phew}{ext}', pathVariables, false));
    }
    return destPath;
  }
  return resolvePath('{dir}/{name}-{phew}{ext}', pathVariables);
};

export const dateFormat = (pattern: string, date = new Date()): string => {
  return format(pattern, date);
};

export const parseExif = (buffer?: Buffer) => {
  if (!buffer) throw Error('No Exif data found');
  const exif = exifRead(buffer);
  if (!exif.Photo || !exif.Image) throw Error('No Exif data found');
  const focal = exif.Photo.FocalLength === undefined ? '' : exif.Photo.FocalLength.toString();
  const aperture = exif.Photo.FNumber === undefined ? '' : exif.Photo.FNumber.toString();
  const shutter =
    exif.Photo.ExposureTime === undefined
      ? ''
      : exif.Photo.ExposureTime >= 1
        ? exif.Photo.ExposureTime.toString()
        : '1/' + Math.round(1 / exif.Photo.ExposureTime);
  const iso = exif.Photo?.ISOSpeedRatings === undefined ? '' : exif.Photo?.ISOSpeedRatings.toString();
  const timezoneOffset = parseTimezoneOffset(exif.Photo.OffsetTimeOriginal);
  const datetime = exif.Photo.DateTimeOriginal
    ? new Date(exif.Photo.DateTimeOriginal.getTime() - timezoneOffset * 60 * 1000)
    : new Date();

  return {
    exposure: {
      focal,
      aperture,
      shutter,
      iso,
      formatted: `${focal}mm 𝓕${aperture} ${shutter}s ISO${iso}`
    },
    camera: {
      make: exif.Image.Make || '',
      model: exif.Image.Model || '',
      // @ts-ignore
      logo: logos[`${brand(exif.Image.Make)}.png`]
    },
    len: {
      make: exif.Photo.LensMake || '',
      model: exif.Photo.LensModel || ''
    },
    datetime: dateFormat('yyyy-MM-dd hh:mm', datetime),
    software: exif.Image.Software || ''
  };
};

const parseTimezoneOffset = (offset?: string) => {
  if (!offset) return 0;
  let [h, m] = offset.split(':');

  let sign = Number.parseInt(h) < 0 ? -1 : 1;
  let hours = Math.abs(Number.parseInt(h));
  let minutes = Number.parseInt(m);

  return sign * (hours * 60 + minutes);
};
