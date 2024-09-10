import { Renderer } from './base';
import { type ImpressionConfig, type Spec } from './types';

export class ImpressionRenderer extends Renderer<ImpressionConfig> {
  spec(): Spec {
    return {
      background: {
        width: this.info.width + this.config.size.start + this.config.size.end,
        height: this.info.height + this.config.border * 2,
        background: this.config.background
      },
      original: {
        width: this.info.width,
        height: this.info.height,
        left: this.config.size.start,
        top: this.config.border
      },
      watermark: {
        width: this.info.width + this.config.size.start + this.config.size.end,
        height: this.info.height + this.config.border * 2,
        left: 0,
        top: 0
      }
    };
  }
}
