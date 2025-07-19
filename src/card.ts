import { Renderer } from './base';
import { type CardConfig, type DeepPartial, type Spec } from './types';
import { defaultsDeep } from 'lodash';
import { register } from './templates.ts';
import classic from './templates/card-classic';
import clean from './templates/card-clean';
import frame from './templates/card-frame';
import full from './templates/card-full';
import logo from './templates/card-logo';
import param from './templates/card-param';

register('card-classic', classic);
register('card-clean', clean);
register('card-frame', frame);
register('card-full', full);
register('card-logo', logo);
register('card-param', param);

export class CardRenderer extends Renderer<CardConfig> {
  defaultConfig(config: DeepPartial<CardConfig>): CardConfig {
    const conf = defaultsDeep(config, {
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
      output: {
        quality: 95
      },
      background: '#fff'
    });
    if (conf.variation === 'frame') {
      conf.size = conf.border;
    }
    return conf;
  }

  spec(): Spec {
    return {
      canvas: {
        width: this.photo.info.width + this.config.border * 2,
        height: this.config.overlay
          ? this.photo.info.height + this.config.border * 2
          : this.photo.info.height + this.config.border + this.config.size,
        background: this.config.background
      },
      photo: {
        width: this.photo.info.width,
        height: this.photo.info.height,
        left: this.config.border,
        top: this.config.border
      },
      manifest: {
        width: this.photo.info.width + this.config.border * 2,
        height: this.config.size,
        left: 0,
        top: this.config.overlay
          ? this.photo.info.height - this.config.size
          : this.photo.info.height + this.config.border
      }
    };
  }
}
