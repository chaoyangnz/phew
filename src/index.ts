import { type Config, type DeepPartial } from './types';
import { CardRenderer } from './card';
import { ExpoRenderer } from './expo';

export const render = async (config: DeepPartial<Config>, file: string, dest?: string): Promise<void> => {
  let output = '';
  switch (config.layout) {
    // case 'row': output = await new RowRenderer(file, config as never).render(dest); break
    case 'card':
      output = await new CardRenderer(file, dest, config).render();
      break;
    case 'expo':
      output = await new ExpoRenderer(file, dest, config).render();
      break;
    default:
      console.log('not implemented');
  }
  console.log(`Rendered ${config.layout}: ${output}\n\n`);
};
