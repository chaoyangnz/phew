export  type Config = ClassicConfig | ColumnConfig | SimpleConfig | CardConfig

export type ClassicConfig = {
  layout: 'classic',
  variation: 'single-line' | 'double-lines' | 'logo'
  height: number
}

export type ColumnConfig = {
  layout: 'column',
  variation: 'landscape' | 'left-margin' | 'right-margin' | 'portrait'
  blur: boolean
}

export type SimpleConfig = {
  layout: 'simple',
  variation: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'
  offset: number
}

export type CardConfig = {
  layout: 'card',
  variation: 'logo-param' | 'logo' | 'param' | 'color'
  border: number,
  height: number
  overlay: boolean
}

