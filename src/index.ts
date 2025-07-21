import { type Config, type DeepPartial } from './types';
import { CardRenderer } from './card';
import { ExpoRenderer } from './expo';
import { from } from './img.ts';
import { extractPathVariables, normalisePath, parseExif } from './utils.ts';
import { FrameRenderer } from './frame.ts';
import type { Sharp } from 'sharp';

export const render = async (config: DeepPartial<Config>, file: string, dest?: string): Promise<void> => {
  // let output = '';
  const image = from(file);
  const metadata = await image.metadata();
  const input = file;
  const photo = {
    path: input,
    data: await image.toBuffer(),
    width: metadata.width!,
    height: metadata.height!
  };
  const exif = parseExif(metadata.exif);
  if (!exif.camera.make) {
    config.layout = 'frame';
    config.variation = undefined;
  }
  let img: Sharp | undefined;
  switch (config.layout) {
    case 'card':
      img = await new CardRenderer(config, photo, exif).render();
      break;
    case 'expo':
      img = await new ExpoRenderer(config, photo, exif).render();
      break;
    case 'frame':
      img = await new FrameRenderer(config, photo, exif).render();
      break;
    default:
      console.log('not implemented');
  }
  // @ts-ignore
  const output = normalisePath(extractPathVariables(input, config), dest);
  await img?.toFile(output);
  console.log(`Rendered ${config.layout}: ${output}\n\n`);
};
