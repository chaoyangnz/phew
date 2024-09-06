import { Renderer } from './base';
import { ImpressionConfig, Spec } from './types';
import { defaultsDeep } from 'lodash'

export class ImpressionRenderer extends Renderer {
  constructor(
    file: string,
    public config: ImpressionConfig,
  ) {
    super(file, defaultsDeep(config, {
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
    }));
  }

  spec(): Spec {
    return {
      background: {
        width: this.info.width + this.config.size.start + this.config.size.end,
        height: this.info.height + this.config.border * 2,
        background: this.config.background,
      },
      original: {
        width: this.info.width,
        height: this.info.height,
        left: this.config.size.start,
        top: this.config.border,
      },
      watermark: {
        width: this.info.width + this.config.size.start + this.config.size.end,
        height: this.info.height + this.config.border * 2,
        left: 0,
        top: 0,
      }
    }
  }
}
