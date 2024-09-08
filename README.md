# phew 😮‍💨

aka. **PH**oto **E**xif **W**atermark

A tool to add Exif watermark to photos. The layout can be flexible to define and use different templates.

We use `JSX` to define the watermark templates, render it to `SVG` and composite over the original image.
- no quality loss
- no metadata (EXIF) loss

## Install

Download the released files: 
- `phew.exe`
- `phew.bat`
- `libvips-42.dll`
- `libvips-cpp.dll`

Then you can run `phew.exe` as command.

> If you get errors: `Fail to load Library`, then you can put two `.dll` files to `C:\Windows`.

## Usage

- CLI

```
phew.exe card examples/example.JPG -o examples --variation classic
```

- Javascript module

```ts

import { render } from 'phew'

render({
 layout: 'card',
 variation: 'full',
 height: 400, 
}, file, 'dest')

```

- Lightroom

In `Export` dialog, the last section `Post-Pocessing`, select `Open in Other Application...`, choose the bat script `phew.bat` location.

You can edit `phew.bat` as you need to customise the parameters: layout, other tweaks etc.

![lightroom.png](lightroom.png)

## Examples


|                    layout / gallery                     |
|:-------------------------------------------------------:|
|                       card / full                       |
|        ![](examples/example-phew-card-full.JPG)         |
|                     card / classic                      |
|       ![](examples/example-phew-card-classic.JPG)       |
|                       card / logo                       | 
|        ![](examples/example-phew-card-logo.JPG)         |
|                      card / clean                       |
|        ![](examples/example-phew-card-clean.JPG)        |
|                   card / clean / blur                   |
|     ![](examples/example-phew-card-clean-blur.JPG)      |
|                      card / param                       |
|        ![](examples/example-phew-card-param.JPG)        |
|                       card / logo                       |
|      ![](examples/example-alt-phew-card-logo.JPG)       |
|                   card / logo / blur                    |
|    ![](examples/example-alt-phew-card-logo-blur.JPG)    |
|                  card / logo / overlay                  |
|    ![](examples/example-phew-card-logo-overlay.JPG)     |
|                      card / param                       |
|        ![](examples/example-phew-card-param.JPG)        |
|                       card / logo                       |
|      ![](examples/example-alt-phew-card-logo.JPG)       |
|                   card / logo / blur                    |
|    ![](examples/example-alt-phew-card-logo-blur.JPG)    |
|                  card / logo / overlay                  |
|    ![](examples/example-phew-card-logo-overlay.JPG)     |
|                                                         |
|                                                         |
|                   impression / around                   |
|   ![](examples/example-v-phew-impression-around.JPG)    |
|               impression / around / blur                |
| ![](examples/example-v-phew-impression-around-blur.JPG) |
|                    impression / left                    |
|    ![](examples/example-v-phew-impression-left.JPG)     |
|                   impression / right                    |
|    ![](examples/example-v-phew-impression-right.JPG)    |
