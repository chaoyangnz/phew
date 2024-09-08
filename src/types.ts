export type Config = ColumnConfig | CardConfig | ImpressionConfig;

export type Color = string

type CommonConfig = {
  font: {
    color: {
      primary: string
      secondary: string
    },
    size: {
      primary: number
      secondary: number
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
  size: number;
  border: number;
  overlay: boolean;
  background: string
};

export const defaultCardConfig = {
  layout: 'card',
  variation: 'full',
  size: 400,
  border: 60,
  overlay: false,
  font: {
    color: {
      primary: '#000000ff',
      secondary: '#444444ff'
    },
    size: {
      primary: 50,
      secondary: 40
    }
  },
  background: '#fff',
}

export type ImpressionConfig = CommonConfig & {
  layout: 'impression';
  variation: 'around' | 'left' | 'right' | 'bottom';
  size: { start: number, end: number };
  border: number
  background: 'blur' | Color
};

export const defaultImpressionConfig = {
  layout: 'impression',
  variation: 'around',
  size: {start: 1200, end: 1200},
  border: 160,
  font: {
    color: {
      primary: '#000000ff',
      secondary: '#444444ff'
    },
    size: {
      primary: 80,
      secondary: 60
    }
  },
  background: '#fff',
}

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


export type Context<C extends Config> = {
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
    focal: string,
    aperture: string,
    shutter: string,
    iso: string,
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
  config: C
}
