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
node phew.js row examples/example.JPG -o examples
```

## Examples


|                      layout                       |
|:-------------------------------------------------:|
|                   card / double                   |
|     ![](examples/example-phew-card-full.JPG)      |
|                   card / single                    |
|    ![](examples/example-phew-card-classic.JPG)    |
|                    card / logo                     | 
|     ![](examples/example-phew-card-logo.JPG)      |
|                   card / double                   |
|     ![](examples/example-phew-card-clean.JPG)     |
|               card / double / blur                |
|  ![](examples/example-phew-card-clean-blur.JPG)   |
|                   card / single                   |
|     ![](examples/example-phew-card-param.JPG)     |
|                    card / logo                    |
|   ![](examples/example-alt-phew-card-logo.JPG)    |
|                card / logo / blur                 |
| ![](examples/example-alt-phew-card-logo-blur.JPG) |
|               card / logo / overlay               |
| ![](examples/example-phew-card-logo-overlay.JPG)  |