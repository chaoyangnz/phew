export type Config = RowConfig | ColumnConfig | SimpleConfig | CardConfig;

export type Color = string

export type RowConfig = {
  layout: 'row';
  variation: 'single' | 'double' | 'logo';
  height?: number;
  font?: {
    color?: string
  },
  background?: 'blur' | Color
};

export type ColumnConfig = {
  layout: 'column';
  variation: 'landscape' | 'left-margin' | 'right-margin' | 'portrait';
  blur?: boolean;
  font?: {
    color?: Color
  }
  background?: 'blur' | Color
};

export type SimpleConfig = {
  layout: 'simple';
  variation: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  offset?: number;
  font?: {
    color?: Color
  },
  background?: 'blur' | Color
};

export type CardConfig = {
  layout: 'card';
  variation: 'double' | 'logo' | 'single' | 'color';
  height?: number;
  border?: number;
  overlay?: boolean;
  font?: {
    color?: Color
  },
  background?: string
};
