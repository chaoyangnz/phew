import { mapValues } from 'lodash'

export const templates = mapValues({
  'row-double': import('./templates/row-double'),
  'row-single': import('./templates/row-single'),
  'row-logo': import('./templates/row-logo'),
  'card-double': import('./templates/card-double'),
  'card-logo': import('./templates/card-logo'),
  'card-single': import('./templates/card-single'),
}, p => p.then(m => m.default))
