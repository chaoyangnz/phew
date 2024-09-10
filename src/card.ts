import { Renderer } from './base';
import { type CardConfig, type Spec } from './types';

export class CardRenderer extends Renderer<CardConfig> {
  spec(): Spec {
    return {
      background: {
        width: this.info.width + this.config.border * 2,
        height: this.config.overlay
          ? this.info.height + this.config.border * 2
          : this.info.height + +this.config.border + this.config.size,
        background: this.config.background
      },
      original: {
        width: this.info.width,
        height: this.info.height,
        left: this.config.border,
        top: this.config.border
      },
      watermark: {
        width: this.info.width + this.config.border * 2,
        height: this.config.size,
        left: 0,
        top: this.config.overlay ? this.info.height - this.config.size : this.info.height + this.config.border
      }
    };
  }
}
