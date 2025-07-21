export type Config = FrameConfig | CardConfig | ExpoConfig;

export type Color = string;

export type GlobalConfig = {
  watermarks?: {
    generic: {
      path: string;
      keywords: [];
    };
  } & {
    [key: string]: {
      path: string;
      keywords: string[];
    };
  };
  watermark: {
    size: number;
  };
  captionApi?: string;
};

export type CommonConfig = {
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
  border: number;
  background: 'blur' | Color;
  output: {
    quality: number;
  };
} & GlobalConfig;

export const layouts = {
  frame: [] as const,
  card: ['full', 'classic', 'clean', 'param', 'logo'] as const,
  expo: ['around', 'left', 'right', 'bottom'] as const
};

export const names = Object.entries(layouts)
  .map(([layout, variations]) => variations.map((variant) => `${layout}-${variant}`))
  .flat();

type Variations = {
  frame: (typeof layouts)['frame'][number];
  card: (typeof layouts)['card'][number];
  expo: (typeof layouts)['expo'][number];
};

export type FrameConfig = CommonConfig & {
  layout: 'frame';
  variation: Variations['frame'];
};

export type CardConfig = CommonConfig & {
  layout: 'card';
  variation: Variations['card'];
  size: number;
  overlay: boolean;
};

export type ExpoConfig = CommonConfig & {
  layout: 'expo';
  variation: Variations['expo'];
  size: { start: number; end: number };
};

export type LayoutSpec = {
  canvas: {
    width: number;
    height: number;
    background: 'blur' | Color;
  };
  photo: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  manifest?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  watermark?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  shadow?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};

export type ManifestTemplateContext<C extends Config> = {
  spec: LayoutSpec;
  exif: ExifData;
  config: C;
};

export type ExifData = {
  exposure: {
    focal: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  camera: {
    make: string;
    model: string;
    // @ts-ignore
    logo: string;
  };
  len: {
    make: string;
    model: string;
  };
  datetime: string;
  software: string;
};

export type ImageHolder = {
  data: Buffer;
  width: number;
  height: number;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
