import { render } from './main';

describe('phew test', () => {

  it('generate', async () => {
    const file = 'examples/example.JPG';
    const dest = 'examples'

    await render({
      layout: 'row',
      variation: 'double',
      height: 400,
    }, file, dest)

    await render({
      layout: 'row',
      variation: 'single',
      height: 400,
    }, file, dest)

    await render({
      layout: 'row',
      variation: 'logo',
      height: 400,
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'logo',
      height: 400,
      border: 60,
      overlay: false,
      blur: false,
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'logo',
      height: 400,
      border: 150,
      overlay: false,
      blur: true,
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'logo',
      height: 400,
      border: 60,
      overlay: true,
      blur: false,
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'double',
      height: 400,
      border: 60,
      overlay: false,
      blur: false,
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'double',
      height: 400,
      border: 60,
      overlay: false,
      blur: true,
      font: {
        color: '#fff'
      }
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'double',
      height: 500,
      border: 60,
      overlay: true,
      blur: true,
      font: {
        color: '#fff'
      }
    }, file, dest)

    await render({
      layout: 'card',
      variation: 'single',
      height: 400,
      border: 60,
      overlay: false,
      blur: false,
    }, file, dest)

  })
})
