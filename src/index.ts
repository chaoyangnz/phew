import { type Config, defaultCardConfig, defaultImpressionConfig } from './types'
import { CardRenderer } from './card';
import { ImpressionRenderer } from './impression';
import { defaultsDeep } from 'lodash'

export const render = async (config: Config, file: string, dest?: string): Promise<void> => {
  console.log(file, dest, config)
  let output = ''
  switch (config.layout) {
    // case 'row': output = await new RowRenderer(file, config as never).render(dest); break
    case 'card': output = await new CardRenderer(file, defaultsDeep(config, defaultCardConfig) as never).render(dest); break
    case 'impression': output = await new ImpressionRenderer(file, defaultsDeep(config, defaultImpressionConfig) as never).render(dest); break
    default: console.log('not implemented')
  }
  console.log(`Rendered ${config.layout}: ${output}\n\n`)
}
