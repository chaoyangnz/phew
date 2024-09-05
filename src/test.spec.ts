import { render } from './main';

describe('phew test', () => {

  it('generate', async () => {
    const file = 'examples/example.JPG';
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
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'logo',
      border: 150,
      blur: true,
    }, file, dest)

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
      blur: true,
      font: {
        color: '#fff'
      }
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'double',
      height: 500,
      overlay: true,
      blur: true,
      font: {
        color: '#fff'
      }
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'single',
    }, file, dest)

  })
})
