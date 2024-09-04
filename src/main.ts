import { Config } from './config';
import { CardRenderer } from './card';
import { RowRenderer } from './row';

export const render = async (config: Config, file: string, dest: string) => {
  switch (config.layout) {
    case 'row': await new RowRenderer(file, config as never).render(dest); break;
    case 'card': await new CardRenderer(file, config as never).render(dest); break;
    default: console.log('not implemented')
  }
}
