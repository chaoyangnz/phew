import { render } from './index';
import yargs, { type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

// process.chdir(__dirname)

const common = (_: Argv): Argv => {
  _
    .option('background', {
      description: 'background color',
      type: 'string'
    })
    .option('border', {
      description: 'border of photo',
      type: 'number'
    })
    .option('font-color-primary', {
      description: 'primary font color',
      type: 'string'
    })
    .option('font-color-secondary', {
      description: 'primary font color',
      type: 'string'
    })
    .option('font-size-primary', {
      description: 'primary font size',
      type: 'number'
    })
    .option('font-size-secondary', {
      description: 'secondary font size',
      type: 'number'
    })
    .option('shadow-color', {
      description: 'shadow color',
      type: 'string'
    })
    .option('shadow-margin', {
      description: 'shadow margin',
      type: 'number'
    })
    .option('shadow-spread', {
      description: 'shadow spread',
      type: 'number'
    })
    .option('shadow-blur', {
      description: 'shadow blur',
      type: 'number'
    })
    .option('output-quality', {
      description: 'output quality',
      type: 'number'
    });
  return _;
};

const card = {
  command: 'card <input> [output]',
  describe: 'card layout',
  builder: (_: Argv) => {
    return common(_)
      .option('variation', {
        describe: 'variation: full, classic, clean, param, logo',
        type: 'string',
        default: 'full'
      })
      .option('size', {
        describe: 'size of watermark',
        type: 'number'
      })
      .option('overlay', {
        describe: 'overlay watermark',
        type: 'boolean'
      });
  },
  handler: (args: any) => {
    console.log(args)
    const {
      input,
      output,
      variation,
      size,
      background,
      fontColorPrimary,
      fontColorSecondary,
      fontSizePrimary,
      fontSizeSecondary,
      border,
      overlay,
      shadowColor,
      shadowMargin,
      shadowOffset,
      shadowBlur,
      outputQuality
    } = args;
    render(
      {
        layout: 'card',
        variation,
        size,
        border,
        background,
        font: {
          color: {
            primary: fontColorPrimary,
            secondary: fontColorSecondary
          },
          size: {
            primary: fontSizePrimary,
            secondary: fontSizeSecondary
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
  }
};

const expo = {
  command: 'expo <input> [output]',
  describe: 'expo layout',
  builder: (_: Argv) => {
    return common(_)
      .option('variation', {
        describe: 'variation: around, left, right, bottom',
        type: 'string',
        default: 'around'
      })
      .option('size-start', {
        describe: 'start size of watermark',
        type: 'number'
      })
      .option('size-end', {
        describe: 'end size of watermark',
        type: 'number'
      });
  },
  handler: (args: any) => {
    const {
      input,
      output,
      variation,
      sizeStart,
      sizeEnd,
      background,
      fontColorPrimary,
      fontColorSecondary,
      fontSizePrimary,
      fontSizeSecondary,
      border,
      shadowColor,
      shadowMargin,
      shadowOffset,
      shadowBlur,
      outputQuality
    } = args;
    render(
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
            primary: fontColorPrimary,
            secondary: fontColorSecondary
          },
          size: {
            primary: fontSizePrimary,
            secondary: fontSizeSecondary
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
  }
};

yargs(hideBin(process.argv))
  .scriptName('phew')
  .version()
  .command(card)
  .command(expo)
  .showHelpOnFail(false, `Use ' --help' for usage`)
  .help('help')
  .demandCommand(1, '')
  .completion()
  .parse();
