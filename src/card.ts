import { Renderer } from './base';
import { CardConfig, Spec } from './types';
import { defaultsDeep } from 'lodash'

export class CardRenderer extends Renderer {
  constructor(
    file: string,
    public config: CardConfig,
  ) {
    super(file, defaultsDeep(config, {
      height: 400,
      border: 60,
      overlay: false,
      blur: false,
      font: {
        color: {
          primary: '#000000ff',
          secondary: '#444444ff'
        },
        size: {
          primary: '50',
          secondary: '40'
        }
      },
      background: '#fff',
    }));
  }

  spec(): Spec {
    return {
      background: {
        width: this.info.width + this.config.border * 2,
        height: this.config.overlay
          ? this.info.height + this.config.border * 2
          : this.info.height + + this.config.border + this.config.height,
        background: this.config.background,
      },
      original: {
        width: this.info.width,
        height: this.info.height,
        left: this.config.border,
        top: this.config.border,
      },
      watermark: {
        width: this.info.width + this.config.border * 2,
        height: this.config.height,
        left: 0,
        top: this.config.overlay
          ? this.info.height - this.config.height
          : this.info.height + this.config.border,
      }
    }
  }
}
