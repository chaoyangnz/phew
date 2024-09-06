import { ReactNode } from 'react';
import { Context } from './types';
import cardFull  from './templates/card-full';
import cardClassic from './templates/card-classic'
import cardClean from './templates/card-clean'
import cardParam from './templates/card-param'
import cardLogo from './templates/card-logo'
import impressionAround from './templates/impression-around'
import impressionLeft from './templates/impression-left'
import impressionRight from './templates/impression-right'

export const templates = {}

export const register = (name: string, template: (context: Context) => ReactNode): void => {
  templates[name] = template
}

register('card-full', cardFull)
register('card-classic', cardClassic)
register('card-clean', cardClean)
register('card-param', cardParam)
register('card-logo', cardLogo)
register('impression-around', impressionAround)
register('impression-left', impressionLeft)
register('impression-right', impressionRight)


