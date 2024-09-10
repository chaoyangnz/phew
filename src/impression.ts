import { Renderer } from './base';
import { type DeepPartial, type ImpressionConfig, type Spec } from './types';
import { defaultsDeep } from 'lodash';

export class ImpressionRenderer extends Renderer<ImpressionConfig> {
  defaultConfig(config: DeepPartial<ImpressionConfig>): ImpressionConfig {
    return defaultsDeep(config, {
      layout: 'impression',
      variation: 'around',
      size: { start: 1200, end: 1200 },
      border: 160,
      font: {
        color: {
          primary: config.background === 'blur' ? '#ffffffff' : '#000000ff',
          secondary: config.background === 'blur' ? '#ccccccff' : '#444444ff'
        },
        size: {
          primary: 80,
          secondary: 60
        }
      },
      shadow: {
        color: config.background === 'blur' ? '#ffffffff' : '#000000ff',
        margin: config.background === 'blur' ? 40 : 0,
        spread: 6,
        blur: 15
      },
      output: {
        quality: 95
      },
      background: '#fff'
    });
  }

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
