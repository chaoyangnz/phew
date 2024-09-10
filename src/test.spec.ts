import { expect, it, describe } from 'bun:test';
import { render } from './';

describe('phew test', () => {
  describe('card', () => {
    it.each([['examples/landscape.jpg'], ['examples/square.jpg']])('card', async (file) => {
        const dest = 'examples';

        await render(
          {
            layout: 'card',
            variation: 'full',
            border: 40
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'classic',
            border: 40
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'logo'
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'logo',
            border: 150,
            background: 'blur'
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'logo',
            overlay: true
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'clean'
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'clean',
            background: 'blur',
            border: 150,
            font: {
              color: {
                primary: '#ffffffff',
                secondary: '#999999ff'
              }
            }
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'clean',
            size: 500,
            overlay: true,
            border: 150,
            background: 'blur',
            font: {
              color: {
                primary: '#ffffffff',
                secondary: '#999999ff'
              }
            }
          },
          file,
          dest
        );

        await render(
          {
            layout: 'card',
            variation: 'param'
          },
          file,
          dest
        );

        expect(true).toBeTruthy();
      },
      7200000
    );
  });

  describe('expo', () => {

    it.each([['examples/portrait.jpg'], ['examples/square.jpg']])('expo', async (file) => {
      const dest = 'examples';

      await render(
          {
            layout: 'expo',
            variation: 'around',
            size: {start: 1200, end: 1200},
            border: 160
          },
          file,
          dest
      );

      await render(
          {
            layout: 'expo',
            variation: 'around',
            size: {start: 1200, end: 1200},
            border: 160,
            background: 'blur',
            font: {
              color: {
                primary: '#ffffffff',
                secondary: '#ccccccff'
              }
            }
          },
          file,
          dest
      );

      await render(
          {
            layout: 'expo',
            variation: 'left',
            size: {start: 1200, end: 200},
            border: 160
          },
          file,
          dest
      );

      await render(
          {
            layout: 'expo',
            variation: 'right',
            size: {start: 200, end: 1200},
            border: 160
          },
          file,
          dest
      );
    }, 7200000)
  });
});
