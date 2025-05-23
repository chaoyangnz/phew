import type { ReactNode } from 'react';
import { type Context } from './types';
import satori from 'satori';
import { fonts } from './assets.ts';

type TemplateFn = (context: Context<any>) => ReactNode;
export const templates: { [index: string]: TemplateFn } = {};

export const register = (name: string, template: TemplateFn): void => {
  // @ts-ignore
  templates[name] = template;
};

export const template = async (name: string, context: Context<any>) => {
  const templateFn = templates[name];
  console.time('render template');
  return await satori(templateFn(context), {
    width: context.width,
    height: context.height,
    fonts: [
      {
        name: 'Roboto',
        data: fonts['Roboto-Regular.ttf'],
        weight: 400,
        style: 'normal'
      },
      {
        name: 'Arial',
        data: fonts['Arial.ttf'],
        weight: 400,
        style: 'normal'
      }
    ],
    embedFont: false
  }).finally(() => {
    console.timeEnd('render template');
  });
};
