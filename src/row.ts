import { Renderer } from './base';
import { RowConfig } from './config';
import { merge } from 'lodash'

export class RowRenderer extends Renderer {
  constructor(
    file: string,
    public config: RowConfig,
  ) {
    super(file, merge(config, {
      height: 400,
      font: {
        color: '#000'
      },
      background: '#fff'
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
