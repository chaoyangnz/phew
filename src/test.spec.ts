import { render } from './';

describe('phew test', () => {

  describe('card', () => {
    it.each([
      ['examples/example.JPG'],
      ['examples/example-alt.JPG']
    ])('generate', async (file) => {
      const dest = 'examples'

      await render({
        layout: 'card',
        variation: 'full',
        border: 40
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'classic',
        border: 40
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'logo',
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'logo',
        border: 150,
        background: 'blur',
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'logo',
        overlay: true,
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'clean',
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'clean',
        background: 'blur',
        font: {
          color: {
            primary: '#ffffffff',
            secondary: '#999999ff'
          }
        }
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'clean',
        size: 500,
        overlay: true,
        background: 'blur',
        font: {
          color: {
            primary: '#ffffffff',
            secondary: '#999999ff'
          }
        }
      }, file, dest)

      await render({
        layout: 'card',
        variation: 'param',
      }, file, dest)

      expect(true).toBeTruthy()

    }, 7200000)
  })

  describe('impression', () => {
    const file = 'examples/example-v.JPG'
    const dest = 'examples'

    it('around', async () => {
      await render({
        layout: 'impression',
        variation: 'around',
        size: {start: 1200, end: 1200},
        border: 160,
      }, file, dest)
    })

    it('around blur', async () => {
      await render({
        layout: 'impression',
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
      }, file, dest)
    })

    it('left', async () => {
      await render({
        layout: 'impression',
        variation: 'left',
        size: {start: 1200, end: 200},
        border: 160,
      }, file, dest)
    })

    it('right', async () => {
      await render({
        layout: 'impression',
        variation: 'right',
        size: {start: 200, end: 1200},
        border: 160,
      }, file, dest)
    })
  })
})
