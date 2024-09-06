import { Renderer } from './base';
import { RowConfig, Spec } from './types';
import { defaultsDeep } from 'lodash'

export class RowRenderer extends Renderer {
  constructor(
    file: string,
    public config: RowConfig,
  ) {
    super(
      file,
      defaultsDeep(config, {
        height: 400,
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
        background: '#ffffffff',
      }),
    );
  }

  spec(): Spec {
    return {
      background: {
        width: this.info.width,
        height: this.info.height + this.config.height,
        background: this.config.background,
      },
      original: {
        width: this.info.width,
        height: this.info.height,
        left: 0,
        top: 0,
      },
      watermark: {
        width: this.info.width,
        height: this.config.height,
        left: 0,
        top: this.info.height,
      }
    };
  }
}

