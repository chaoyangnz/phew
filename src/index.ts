import { type CardConfig, type Config, type DeepPartial, type ImpressionConfig } from './types';
import { CardRenderer } from './card';
import { ImpressionRenderer } from './impression';
import { defaultsDeep } from 'lodash';

const defaultImpressionConfig = (config: DeepPartial<ImpressionConfig>): ImpressionConfig => {
  return defaultsDeep(config, {
    layout: 'impression',
    variation: 'around',
    size: { start: 1200, end: 1200 },
    border: 160,
    font: {
      color: {
        primary: config.background === 'blur' ? '#ffffffff' : '#000000ff',
        secondary: config.background === 'blur' ? '#ccccccff' : '#444444ff'
      },
      size: {
        primary: 80,
        secondary: 60
      }
    },
    shadow: {
      color: config.background === 'blur' ? '#ffffffff' : '#000000ff',
      margin: 40,
      spread: 6,
      blur: 15
    },
    background: '#fff'
  });
};

const defaultCardConfig = (config: DeepPartial<CardConfig>): CardConfig => {
  return defaultsDeep(config, {
    layout: 'card',
    variation: 'full',
    size: 400,
    border: 60,
    overlay: false,
    font: {
      color: {
        primary: config.background === 'blur' ? '#ffffffff' : '#000000ff',
        secondary: config.background === 'blur' ? '#ccccccff' : '#444444ff'
      },
      size: {
        primary: 50,
        secondary: 40
      }
    },
    shadow: {
      color: config.background === 'blur' ? '#ffffffff' : '#000000ff',
      margin: config.background === 'blur' ? 40 : 0,
      spread: 6,
      blur: 15
    },
    background: '#fff'
  });
};

export const render = async (config: DeepPartial<Config>, file: string, dest?: string): Promise<void> => {
  let output = '';
  switch (config.layout) {
    // case 'row': output = await new RowRenderer(file, config as never).render(dest); break
    case 'card':
      output = await new CardRenderer(file, dest, defaultCardConfig(config)).render();
      break;
    case 'impression':
      output = await new ImpressionRenderer(file, dest, defaultImpressionConfig(config)).render();
      break;
    default:
      console.log('not implemented');
  }
  console.log(`Rendered ${config.layout}: ${output}\n\n`);
};
