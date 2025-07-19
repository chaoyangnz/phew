export type Config = ColumnConfig | CardConfig | ExpoConfig;

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
  output: {
    quality: number;
  };
  border: number;
  background: 'blur' | Color;
} & GlobalConfig;

export const layouts = {
  column: ['landscape', 'left-margin', 'right-margin', 'portrait'] as const,
  card: ['full', 'classic', 'clean', 'param', 'logo', 'frame'] as const,
  expo: ['around', 'left', 'right', 'bottom'] as const
};

export const names = Object.entries(layouts)
  .map(([layout, variations]) => variations.map((variant) => `${layout}-${variant}`))
  .flat();

type Variations = {
  column: (typeof layouts)['column'][number];
  card: (typeof layouts)['card'][number];
  expo: (typeof layouts)['expo'][number];
};

export type ColumnConfig = CommonConfig & {
  layout: 'column';
  variation: Variations['column'];
  blur?: boolean;
  background?: 'blur' | Color;
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

export type Spec = {
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
  manifest: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};

export type TemplateContext<C extends Config> = {
  canvas: {
    width: number;
    height: number;
  };
  photo: {
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
