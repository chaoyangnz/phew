export type Config = RowConfig | ColumnConfig | SimpleConfig | CardConfig;

export type RowConfig = {
  layout: 'row';
  variation: 'single' | 'double' | 'logo';
  height: number;
  font?: {
    color?: string
  }
};

export type ColumnConfig = {
  layout: 'column';
  variation: 'landscape' | 'left-margin' | 'right-margin' | 'portrait';
  blur: boolean;
  font?: {
    color?: string
  }
};

export type SimpleConfig = {
  layout: 'simple';
  variation: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  offset: number;
  font?: {
    color?: string
  }
};

export type CardConfig = {
  layout: 'card';
  variation: 'double' | 'logo' | 'single' | 'color';
  border: number;
  height: number;
  overlay: boolean;
  blur: boolean;
  font?: {
    color?: string
  }
};
