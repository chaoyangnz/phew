import { Renderer } from './base';
import { CardConfig } from './config';
import { compact } from 'lodash'

export class CardRenderer extends Renderer {
  constructor(
    file: string,
    public config: CardConfig,
  ) {
    super(file, config);
  }

  base(): { width: number; height: number; background: string } {
    return {
      width: this.metadata.width + this.config.border * 2,
      height: this.config.overlay
        ? this.metadata.height + this.config.border * 2
        : this.metadata.height + + this.config.border + this.config.height,
      background: this.config.blur ? 'blur' : '#fff',
    };
  }

  watermark(): { width: number; height: number; left: number; top: number } {
    return {
      width: this.metadata.width + this.config.border * 2,
      height: this.config.height,
      left: 0,
      top: this.config.overlay
        ? this.metadata.height - this.config.height
        : this.metadata.height + this.config.border,
    };
  }

  original(): { width: number; height: number; left: number; top: number } {
    return {
      width: this.metadata.width,
      height: this.metadata.height,
      left: this.config.border,
      top: this.config.border,
    };
  }

  filename(name: string, extension: string): string {
    return `${compact([
      name,
      'phew',
      this.config.layout,
      this.config.variation,
      this.config.overlay ? 'overlay' : null,
      this.config.blur ? 'blur' : null]
    ).join('-')}${extension}`
  }
}
