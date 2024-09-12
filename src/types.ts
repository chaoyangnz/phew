export type Config = ColumnConfig | CardConfig | ExpoConfig;

export type Color = string;

type CommonConfig = {
  font: {
    color: {
      primary: string;
      secondary: string;
    };
    size: {
      primary: number;
      secondary: number;
    };
  };
  shadow: {
    color: string;
    margin: number;
    spread: number;
    blur: number;
  };
  output: {
    quality: number;
  };
  border: number;
  background: 'blur' | Color;
};

export type ColumnConfig = CommonConfig & {
  layout: 'column';
  variation: 'landscape' | 'left-margin' | 'right-margin' | 'portrait';
  blur?: boolean;
  background?: 'blur' | Color;
};

export type CardConfig = CommonConfig & {
  layout: 'card';
  variation: 'full' | 'classic' | 'clean' | 'param' | 'logo';
  size: number;
  overlay: boolean;
};

export type ExpoConfig = CommonConfig & {
  layout: 'expo';
  variation: 'around' | 'left' | 'right' | 'bottom';
  size: { start: number; end: number };
};

export type Spec = {
  background: { width: number; height: number; background: string };
  original: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  watermark: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};

export type Context<C extends Config> = {
  background: {
    width: number;
    height: number;
  };
  original: {
    width: number;
    height: number;
  };
  width: number;
  height: number;
  font: {
    color: {
      primary: string;
      secondary: string;
    };
    size: {
      primary: number;
      secondary: number;
    };
  };
  exposure: {
    focal: string;
    aperture: string;
    shutter: string;
    iso: string;
    formatted: string;
  };
  camera: {
    make: string;
    model: string;
    logo: string;
  };
  len: {
    make: string;
    model: string;
  };
  datetime: string;
  config: C;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
