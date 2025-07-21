import { Renderer } from './base';
import { type DeepPartial, type ExpoConfig, type LayoutSpec } from './types';
import { defaultsDeep } from 'lodash';
import { register } from './templates.ts';
import around from './templates/expo-around.tsx';
import left from './templates/expo-left.tsx';
import right from './templates/expo-right.tsx';

register('expo-around', around);
register('expo-left', left);
register('expo-right', right);

export class ExpoRenderer extends Renderer<ExpoConfig> {
  defaultConfig(config: DeepPartial<ExpoConfig>): ExpoConfig {
    return defaultsDeep(config, {
      layout: 'expo',
      variation: 'around',
      size: { start: 1050, end: 1050 },
      border: 150,
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

  layoutSpec(): LayoutSpec {
    return {
      canvas: {
        width: this.photo.width + +this.config.border * 2 + this.config.size.start + this.config.size.end,
        height: this.photo.height + this.config.border * 2,
        background: this.config.background
      },
      photo: {
        width: this.photo.width,
        height: this.photo.height,
        left: this.config.border + this.config.size.start,
        top: this.config.border
      },
      manifest: {
        width: this.photo.width + this.config.size.start + this.config.size.end,
        height: this.photo.height + this.config.border * 2,
        left: this.config.border,
        top: this.config.border
      }
    };
  }
}
