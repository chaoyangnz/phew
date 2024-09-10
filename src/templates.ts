import type { ReactNode } from 'react';
import type { Context } from './types';
import cardFull from './templates/card-full';
import cardClassic from './templates/card-classic';
import cardClean from './templates/card-clean';
import cardParam from './templates/card-param';
import cardLogo from './templates/card-logo';
import impressionAround from './templates/impression-around';
import impressionLeft from './templates/impression-left';
import impressionRight from './templates/impression-right';
import satori from 'satori';
import { fonts } from './assets.ts';

export const templates: { [index: string]: (context: Context<any>) => ReactNode } = {};

export const register = (name: string, template: (context: Context<any>) => ReactNode): void => {
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

register('card-full', cardFull);
register('card-classic', cardClassic);
register('card-clean', cardClean);
register('card-param', cardParam);
register('card-logo', cardLogo);
register('impression-around', impressionAround);
register('impression-left', impressionLeft);
register('impression-right', impressionRight);
