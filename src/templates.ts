import type { ReactNode } from 'react';
import { type TemplateContext } from './types';
import satori from 'satori';
import { fonts } from './assets.ts';

type TemplateFn = (context: TemplateContext<any>) => ReactNode;
export const templates: { [index: string]: TemplateFn } = {};

export const register = (name: string, template: TemplateFn): void => {
  // @ts-ignore
  templates[name] = template;
};

/**
 * Asynchronously renders a template into an SVG buffer based on the provided template name and context.
 *
 * @param {string} name - The name of the template to render.
 * @param {TemplateContext<any>} context - The context data used for rendering the template, including dimensions and other dynamic properties.
 * @returns {Promise<Buffer>} A promise that resolves to a Buffer containing the rendered SVG content.
 */
export const render = async (name: string, context: TemplateContext<any>) => {
  const template = templates[name];
  console.time('render template');
  const svg = await satori(template(context), {
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

  return Buffer.from(svg);
};
