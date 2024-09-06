export type Config = ColumnConfig | CardConfig | ImpressionConfig;

export type Color = string

type CommonConfig = {
  font?: {
    color?: {
      primary?: string
      secondary?: string
    },
    size?: {
      primary?: number
      secondary?: number
    }
  },
}

// export type RowConfig = CommonConfig & {
//   layout: 'row';
//   variation: 'single' | 'double' | 'logo';
//   height?: number;
//   background?: 'blur' | Color
// };

export type ColumnConfig = CommonConfig & {
  layout: 'column';
  variation: 'landscape' | 'left-margin' | 'right-margin' | 'portrait';
  blur?: boolean;
  background?: 'blur' | Color
};

export type CardConfig = CommonConfig & {
  layout: 'card';
  variation: 'full' | 'classic' | 'clean' | 'param' | 'logo';
  size?: number;
  border?: number;
  overlay?: boolean;
  background?: string
};

export type ImpressionConfig = CommonConfig & {
  layout: 'impression';
  variation: 'around' | 'left' | 'right' | 'bottom';
  size?: { start?: number, end?: number };
  border?: number
  background?: 'blur' | Color
};

export type Spec = {
  background: { width: number; height: number; background: string }
  original: {
    width: number;
    height: number;
    left: number;
    top: number;
  },
  watermark: {
    width: number;
    height: number;
    left: number;
    top: number;
  }
}


export type Context = {
  background: {
    width: number,
    height: number,
  },
  original: {
    width: number,
    height: number,
  },
  width: number,
  height: number,
  font: {
    color: {
      primary: string
      secondary: string
    },
    size: {
      primary: number
      secondary: number
    },
  },
  exposure: {
    focal: number,
    aperture: number,
    shutter: string,
    iso: number,
    formatted: string
  },
  camera: {
    make: string,
    model: string,
    logo: string,
  },
  len: {
    make: string,
    model: string,
  },
  datetime: string,
  config: Config
}
