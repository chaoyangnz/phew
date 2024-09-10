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
phew.exe card examples/landscape.jpg -o examples --variation classic
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
|        ![](examples/landscape-phew-card-full.jpg)         |
|                     card / classic                      |
|       ![](examples/landscape-phew-card-classic.jpg)       |
|                       card / logo                       | 
|        ![](examples/landscape-phew-card-logo.jpg)         |
|                      card / clean                       |
|        ![](examples/landscape-phew-card-clean.jpg)        |
|                   card / clean / blur                   |
|     ![](examples/landscape-phew-card-clean-blur.jpg)      |
|                      card / param                       |
|        ![](examples/landscape-phew-card-param.jpg)        |
|                       card / logo                       |
|      ![](examples/square-phew-card-logo.jpg)       |
|                   card / logo / blur                    |
|    ![](examples/square-phew-card-logo-blur.jpg)    |
|                  card / logo / overlay                  |
|    ![](examples/landscape-phew-card-logo-overlay.jpg)     |
|                      card / param                       |
|        ![](examples/landscape-phew-card-param.jpg)        |
|                       card / logo                       |
|      ![](examples/square-phew-card-logo.jpg)       |
|                   card / logo / blur                    |
|    ![](examples/square-phew-card-logo-blur.jpg)    |
|                  card / logo / overlay                  |
|    ![](examples/landscape-phew-card-logo-overlay.jpg)     |
|                                                         |
|                                                         |
|                   expo / around                   |
|   ![](examples/portrait-phew-expo-around.jpg)    |
|               expo / around / blur                |
| ![](examples/portrait-phew-expo-around-blur.jpg) |
|                    expo / left                    |
|    ![](examples/portrait-phew-expo-left.jpg)     |
|                   expo / right                    |
|    ![](examples/portrait-phew-expo-right.jpg)    |
