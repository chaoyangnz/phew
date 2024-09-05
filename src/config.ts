export type Config = RowConfig | ColumnConfig | SimpleConfig | CardConfig;

export type RowConfig = {
  layout: 'row';
  variation: 'single' | 'double' | 'logo';
  height?: number;
  font?: {
    color?: string
  },
  background?: string
};

export type ColumnConfig = {
  layout: 'column';
  variation: 'landscape' | 'left-margin' | 'right-margin' | 'portrait';
  blur?: boolean;
  font?: {
    color?: string
  }
  background?: string
};

export type SimpleConfig = {
  layout: 'simple';
  variation: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  offset?: number;
  font?: {
    color?: string
  },
  background?: string
};

export type CardConfig = {
  layout: 'card';
  variation: 'double' | 'logo' | 'single' | 'color';
  height?: number;
  border?: number;
  overlay?: boolean;
  blur?: boolean;
  font?: {
    color?: string
  },
  background?: string
};
