import { Renderer } from './base';
import { type DeepPartial, type FrameConfig, type LayoutSpec } from './types';
import { defaultsDeep } from 'lodash';

export class FrameRenderer extends Renderer<FrameConfig> {
  defaultConfig(config: DeepPartial<FrameConfig>): FrameConfig {
    const conf = defaultsDeep(config, {
      layout: 'frame',
      border: 50,
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
      output: {
        quality: 95
      },
      background: '#fff'
    });
    return conf;
  }

  layoutSpec(): LayoutSpec {
    return {
      canvas: {
        width: this.photo.width + this.config.border * 2,
        height: this.photo.height + this.config.border * 2,
        background: this.config.background
      },
      photo: {
        width: this.photo.width,
        height: this.photo.height,
        left: this.config.border,
        top: this.config.border
      }
    };
  }
}
