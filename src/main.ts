import { program } from 'commander';
import { render } from './index';
import path from 'path';

program
  .command('row')
  .description('row layout')
  .requiredOption('-i, --input <string>', 'input photo')
  .option('-o, --output <string>', 'output photo')
  .requiredOption('--variation <string>', 'variation: single, double, logo', 'double')
  .option('--height <number>', 'height of watermark')
  .option('--background <string>', 'background color')
  .option('--font-color <string>', 'font color')
  .action(async (options) => {
    const {input, output, variation, height, background, fontColor} = options;
    await render({
      layout: 'row',
      variation,
      height,
      background,
      font: {
        color: fontColor
      }
    }, input, output || path.dirname(input));
  })

program
  .command('card')
  .description('card layout')
  .requiredOption('-i, --input <string>', 'input photo')
  .option('-o, --output <string>', 'output photo')
  .requiredOption('--variation <string>', 'variation: single, double, logo', 'double')
  .option('--height <number>', 'height of watermark')
  .option('--border <number>', 'border of photo')
  .option('--overlay <boolean>', 'overlay watermark')
  .option('--background <string>', 'background color')
  .option('--font-color <string>', 'font color')
  .action(async (options) => {
    const {input, output, variation, height, background, fontColor, border, overlay} = options;
    await render({
      layout: 'card',
      variation,
      height,
      background,
      font: {
        color: fontColor
      },
      border,
      overlay,
    }, input, output || path.dirname(input));
  })

program.parse(process.argv)
