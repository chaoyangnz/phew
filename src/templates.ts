import type { ReactNode } from 'react';
import { type ManifestTemplateContext } from './types';
import satori from 'satori';
import { fonts } from './assets.ts';
import { from } from './img.ts';

type TemplateFn = (context: ManifestTemplateContext<any>) => ReactNode;
export const templates: { [index: string]: TemplateFn } = {};

export const register = (name: string, template: TemplateFn): void => {
  // @ts-ignore
  templates[name] = template;
};

/**
 * Asynchronously renders a template into an SVG buffer based on the provided template name and context.
 *
 * @param {string} name - The name of the template to render.
 * @param {ManifestTemplateContext<any>} context - The context data used for rendering the template, including dimensions and other dynamic properties.
 * @returns {Promise<Buffer>} A promise that resolves to a Buffer containing the rendered SVG content.
 */
export const renderManifest = async (name: string, context: ManifestTemplateContext<any>) => {
  const template = templates[name];
  console.time('render template');
  const svg = await satori(template(context), {
    width: context.spec.manifest.width,
    height: context.spec.manifest.height,
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
