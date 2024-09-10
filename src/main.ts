import { program } from 'commander';
import { render } from './index';
import { version } from '../package.json';

// process.chdir(__dirname)

const numberArg = (value: string) => (value ? parseInt(value) : NaN);

program.version(version);

program
  .command('card <input> [output]')
  .description('card layout')
  .option('--variation <string>', 'variation: full, classic, clean, param, logo', 'full')
  .option('--size <number>', 'size of watermark', numberArg)
  .option('--border <number>', 'border of photo', numberArg)
  .option('--overlay', 'overlay watermark')
  .option('--background <string>', 'background color')
  .option('--primary-font-color <string>', 'primary font color')
  .option('--secondary-font-color <string>', 'primary font color')
  .option('--primary-font-size <number>', 'primary font size', numberArg)
  .option('--secondary-font-size <number>', 'primary font size', numberArg)
  .option('--shadow-color <string>', 'shadow color')
  .option('--shadow-margin <number>', 'shadow margin', numberArg)
  .option('--shadow-spread <number>', 'shadow spread', numberArg)
  .option('--shadow-blur <number>', 'shadow blur', numberArg)
  .option('--output-quality <number>', 'output quality', numberArg)
  .action(async (input, output, options) => {
    const {
      variation,
      size,
      background,
      primaryFontColor,
      secondaryFontColor,
      primaryFontSize,
      secondaryFontSize,
      border,
      overlay,
      shadowColor,
      shadowMargin,
      shadowOffset,
      shadowBlur,
      outputQuality
    } = options;
    await render(
      {
        layout: 'card',
        variation,
        size,
        border,
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
        overlay: overlay,
        shadow: {
          color: shadowColor,
          margin: shadowMargin,
          spread: shadowOffset,
          blur: shadowBlur
        },
        output: {
          quality: outputQuality
        }
      },
      input,
      output
    );
  });

program
  .command('expo <input> [output]')
  .description('expo layout')
  .option('--variation <string>', 'variation: around, left, right, bottom', 'around')
  .option('--height <number>', 'height of watermark', numberArg)
  .option('--border <number>', 'border of photo', numberArg)
  .option('--size-start <number>', 'start size of watermark')
  .option('--size-end <number>', 'end size of watermark')
  .option('--background <string>', 'background color')
  .option('--primary-font-color <string>', 'primary font color')
  .option('--secondary-font-color <string>', 'primary font color')
  .option('--primary-font-size <number>', 'primary font size', numberArg)
  .option('--secondary-font-size <number>', 'primary font size', numberArg)
  .option('--shadow-color <string>', 'shadow color')
  .option('--shadow-margin <number>', 'shadow margin', numberArg)
  .option('--shadow-spread <number>', 'shadow spread', numberArg)
  .option('--shadow-blur <number>', 'shadow blur', numberArg)
  .option('--output-quality <number>', 'output quality', numberArg)
  .action(async (input, output, options) => {
    const {
      variation,
      sizeStart,
      sizeEnd,
      background,
      primaryFontColor,
      secondaryFontColor,
      primaryFontSize,
      secondaryFontSize,
      border,
      shadowColor,
      shadowMargin,
      shadowOffset,
      shadowBlur,
      outputQuality
    } = options;
    await render(
      {
        layout: 'expo',
        variation,
        size: {
          start: sizeStart,
          end: sizeEnd
        },
        border,
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
        shadow: {
          color: shadowColor,
          margin: shadowMargin,
          spread: shadowOffset,
          blur: shadowBlur
        },
        output: {
          quality: outputQuality
        }
      },
      input,
      output
    );
  });

program.parse(process.argv);
