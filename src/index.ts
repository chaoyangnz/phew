import { Config } from './types';
import { CardRenderer } from './card';
import { ImpressionRenderer } from './impression';

export const render = async (config: Config, file: string, dest?: string): Promise<void> => {
  console.log(config, file, dest)
  let output = ''
  switch (config.layout) {
    // case 'row': output = await new RowRenderer(file, config as never).render(dest); break
    case 'card': output = await new CardRenderer(file, config as never).render(dest); break
    case 'impression': output = await new ImpressionRenderer(file, config as never).render(dest); break
    default: console.log('not implemented')
  }
  console.log(`Rendered ${config.layout}: ${output}`)
}
