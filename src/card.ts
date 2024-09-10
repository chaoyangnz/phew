import { Renderer } from './base';
import { type CardConfig, type DeepPartial, type Spec } from './types';
import { defaultsDeep } from 'lodash';

export class CardRenderer extends Renderer<CardConfig> {
  defaultConfig(config: DeepPartial<CardConfig>): CardConfig {
    return defaultsDeep(config, {
      layout: 'card',
      variation: 'full',
      size: 400,
      border: 60,
      overlay: false,
      font: {
        color: {
          primary: config.background === 'blur' ? '#ffffffff' : '#000000ff',
          secondary: config.background === 'blur' ? '#ccccccff' : '#444444ff'
        },
        size: {
          primary: 50,
          secondary: 40
        }
      },
      shadow: {
        color: config.background === 'blur' ? '#ffffffff' : '#000000ff',
        margin: config.background === 'blur' ? 40 : 0,
        spread: 6,
        blur: 15
      },
      background: '#fff'
    });
  }

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
