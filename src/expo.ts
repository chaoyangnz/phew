import { Renderer } from './base';
import { type DeepPartial, type ExpoConfig, type Spec } from './types';
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
      canvas: {
        width: this.photo.info.width + this.config.size.start + this.config.size.end,
        height: this.photo.info.height + this.config.border * 2,
        background: this.config.background
      },
      photo: {
        width: this.photo.info.width,
        height: this.photo.info.height,
        left: this.config.size.start,
        top: this.config.border
      },
      manifest: {
        width: this.photo.info.width + this.config.size.start + this.config.size.end,
        height: this.photo.info.height + this.config.border * 2,
        left: 0,
        top: 0
      }
    };
  }
}
