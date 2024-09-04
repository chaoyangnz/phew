# phew

aka. **PH**oto **E**xif **W**atermark

A tool to add Exif watermark to photos. The layout can be flexible to define and use different templates.


## Usage

```ts

import { render } from 'phew'

render({
 layout: 'row',
 variation: 'double',
 height: 400, 
}, file, 'dest')

```

## Examples

| layout | variation | decoration | image                                            |
|--------|-----------|------------|--------------------------------------------------|
| row    | double    |            | ![](examples/example-phew-row-double.JPG)        |
| row    | single    |            | ![](examples/example-phew-row-single.JPG)        |
| row    | logo      |            | ![](examples/example-phew-row-logo.JPG)          |
| card   | double    |            | ![](examples/example-phew-card-double.JPG)       |
| card   | double    |            | ![](examples/example-phew-card-double-blur.JPG)  |
| card   | single    |            | ![](examples/example-phew-card-single.JPG)       |
| card   | logo      |            | ![](examples/example-phew-card-logo.JPG)         |
| card   | logo      | blur       | ![](examples/example-phew-card-logo-blur.JPG)    |
| card   | logo      | overlay    | ![](examples/example-phew-card-logo-overlay.JPG) |