import { render } from './';

describe('phew test', () => {

  it('generate', async () => {
    const file = 'examples/example.JPG';
    const file1 = 'examples/example-small.JPG';
    const dest = 'examples'

    await render({
      layout: 'row',
      variation: 'double',
    }, file, dest)

    await render({
      layout: 'row',
      variation: 'single',
    }, file, dest)

    await render({
      layout: 'row',
      variation: 'logo',
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'logo',
    }, file1, dest)

    await render({
      layout: 'card',
      variation: 'logo',
      border: 150,
      background: 'blur',
    }, file1, dest)

    await render({
      layout: 'card',
      variation: 'logo',
      overlay: true,
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'double',
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'double',
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
      variation: 'double',
      height: 500,
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
      variation: 'single',
    }, file, dest)

    expect(true).toBeTruthy()

  }, 7200000)
})
