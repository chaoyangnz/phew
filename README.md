# phew

aka. **PH**oto **E**xif **W**atermark

A tool to add Exif watermark to photos. The layout can be flexible to define and use different templates.

We use `JSX` to define the watermark templates, render it to `SVG` and composite over the original image.
- no quality loss
- no metadata (EXIF) loss

## Usage

- Module

```ts

import { render } from 'phew'

render({
 layout: 'row',
 variation: 'double',
 height: 400, 
}, file, 'dest')

```

- CLI

```
node phew.js row -i examples/example.JPG -o examples
```

## Examples


|                       layout                        |
|:---------------------------------------------------:|
|                    row / double                     |
|      ![](examples/example-phew-row-double.JPG)      |
|                    row / single                     |
|      ![](examples/example-phew-row-single.JPG)      |
|                     row / logo                      | 
|       ![](examples/example-phew-row-logo.JPG)       |
|                    card / double                    |
|     ![](examples/example-phew-card-double.JPG)      |
|                 card / double/blur                  |
|   ![](examples/example-phew-card-double-blur.JPG)   |
|                    card / single                    |
|     ![](examples/example-phew-card-single.JPG)      |
|                     card / logo                     |
|   ![](examples/example-small-phew-card-logo.JPG)    |
|                 card / logo / blur                  |
| ![](examples/example-small-phew-card-logo-blur.JPG) |
|                card / logo / overlay                |
|  ![](examples/example-phew-card-logo-overlay.JPG)   |