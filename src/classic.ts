import { Renderer } from './base'

export class ClassicRenderer extends Renderer {
  base(): { width: number; height: number } {
    return { width: this.metadata.width, height: this.metadata.height + 400 };
  }

  watermark(): { svg: string; width: number; height: number; left: number; top: number } {
    return { svg: 'classic.svg', width: this.metadata.width, height: 400, left: 0, top: this.metadata.height };
  }

}
