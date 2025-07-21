import { Renderer } from './base';
import { type CardConfig, type DeepPartial, type LayoutSpec } from './types';
import { defaultsDeep } from 'lodash';
import { register } from './templates.ts';
import classic from './templates/card-classic';
import clean from './templates/card-clean';
import full from './templates/card-full';
import logo from './templates/card-logo';
import param from './templates/card-param';

register('card-classic', classic);
register('card-clean', clean);
register('card-full', full);
register('card-logo', logo);
register('card-param', param);

export class CardRenderer extends Renderer<CardConfig> {
  defaultConfig(config: DeepPartial<CardConfig>): CardConfig {
    const conf = defaultsDeep(config, {
      layout: 'card',
      variation: 'full',
      size: 350,
      border: 50,
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
        height: this.config.overlay
          ? this.photo.height + this.config.border * 2
          : this.photo.height + this.config.border * 2 + this.config.size,
        background: this.config.background
      },
      photo: {
        width: this.photo.width,
        height: this.photo.height,
        left: this.config.border,
        top: this.config.border
      },
      manifest: {
        width: this.photo.width + this.config.border * 2,
        height: this.config.size,
        left: 0,
        top: this.config.overlay
          ? this.photo.height + this.config.border - this.config.size - (this.watermark?.height || 0)
          : this.photo.height + this.config.border
      }
    };
  }
}
