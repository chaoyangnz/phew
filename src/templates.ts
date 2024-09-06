import { ReactNode } from 'react';
import { Context } from './types';
import rowDouble  from './templates/row-double';
import rowSingle from './templates/row-single'
import rowLogo from './templates/row-logo'
import cardDouble from './templates/card-double'
import cardLogo from './templates/card-logo'
import cardSingle from './templates/card-single'

export const templates = {}

export const register = (name: string, template: (context: Context) => ReactNode): void => {
  templates[name] = template
}

register('row-double', rowDouble)
register('row-logo', rowLogo)
register('row-single', rowSingle)
register('card-single', cardSingle)
register('card-double', cardDouble)
register('card-logo', cardLogo)



