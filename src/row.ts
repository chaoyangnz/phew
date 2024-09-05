import { Renderer } from './base';
import { RowConfig } from './config';
import { defaults } from 'lodash'

export class RowRenderer extends Renderer {
  constructor(
    file: string,
    public config: RowConfig,
  ) {
    super(file, defaults(config, {
      height: 400,
      font: {
        color: '#000000'
      },
      background: '#ffffff'
    }));
  }

  base(): { width: number; height: number; background: string } {
    return {
      width: this.metadata.width,
      height: this.metadata.height + this.config.height,
      background: this.config.background,
    };
  }

  watermark(): { width: number; height: number; left: number; top: number } {
    return {
      width: this.metadata.width,
      height: this.config.height,
      left: 0,
      top: this.metadata.height,
    };
  }

  original(): { width: number; height: number; left: number; top: number } {
    return {
      width: this.metadata.width,
      height: this.metadata.height,
      left: 0,
      top: 0,
    };
  }
}

