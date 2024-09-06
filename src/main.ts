import { program } from 'commander';
import { render } from './index';

process.chdir(__dirname)

const numberArg = (value, _) => value ? parseInt(value) : undefined

program
  .command('card <input>')
  .description('card layout')
  .option('-o, --output <string>', 'output photo path')
  .option('--variation <string>', 'variation: full, classic, clean, param, logo', 'full')
  .option('--height <number>', 'height of watermark', numberArg)
  .option('--border <number>', 'border of photo', numberArg)
  .option('--overlay', 'overlay watermark')
  .option('--background <string>', 'background color')
  .option('--primary-font-color <string>', 'primary font color')
  .option('--secondary-font-color <string>', 'primary font color')
  .option('--primary-font-size <number>', 'primary font color', numberArg)
  .option('--secondary-font-size <number>', 'primary font color', numberArg)
  .action(async (input, options) => {
    const {output, variation, height, background, primaryFontColor, secondaryFontColor, primaryFontSize, secondaryFontSize, border, overlay} = options;
    await render({
      layout: 'card',
      variation,
      height,
      background,
      font: {
        color: {
          primary: primaryFontColor,
          secondary: secondaryFontColor
        },
        size: {
          primary: primaryFontSize,
          secondary: secondaryFontSize
        }
      },
      border,
      overlay: overlay
    }, input, output);
  })

program.parse(process.argv)
