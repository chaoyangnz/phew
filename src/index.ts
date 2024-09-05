import { Config } from './config';
import { CardRenderer } from './card';
import { RowRenderer } from './row';

export const render = async (config: Config, file: string, dest: string): Promise<void> => {
  let output = ''
  switch (config.layout) {
    case 'row': output = await new RowRenderer(file, config as never).render(dest); break
    case 'card': output = await new CardRenderer(file, config as never).render(dest); break
    default: console.log('not implemented')
  }
  console.log(`Rendered ${config.layout}: ${output}`)
}
