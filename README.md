# Stonework

![cover.jpg](examples/images/cover.jpg)

## Introduction

Stonework is a lightweight vanilla JavaScript library for arranging images in a masonry row type layout.

## Installation

Install `stonework` via [NPM](https://www.npmjs.com):

`npm install stonework`

## Usage

### Lightbox

### Gallery

Import stonework gallery the stonework library:

`import StoneworkGallery from 'stonework/src/stonework_gallery.js'`

Create a new instance of StoneworkGallery:

`new StoneworkGallery(gallery_element_id, minimum_frame_width, frame_border_width, transition_time);`

#### Arguments

`gallery_element_id` (string) - the id of a div element with a gallery structure

`minimum_frame_width` (integer) - the minimum width, in pixels, that a frame should be displayed

`frame_border_width` [optional] (integer) - the width of the border between frames

`transition_time` [optional] (float) - the length, in seconds, of the CSS transistion animation from solid colour to loaded image

#### Gallery structure

Just like in real life, photos are placed in frames that are hung in galleries:

```
<div id="gallery">
  <div class="frame" data-width="640" data-height="427" data-hex_colour="#808080">
    <img class="photo" src="/examples/images/1.jpg">
  </div>
  <div class="frame" data-width="640" data-height="853" data-hex_colour="#C2B280">
    <img class="photo" src="/examples/images/2.jpg">
  </div>
  ...
  <div class="frame" data-width="640" data-height="960" data-hex_colour="#FFC1CC">
    <img class="photo" src="/examples/images/10.jpg">
  </div>
</div>
```

#### Dataset properties

`data-width` (integer) - the width of the photo, if supplied (along with `data-height`) this value will be used to arrange the layout rather than waiting for the image to load

`data-height` (integer) - the height of the photo, if supplied (along with `data-width`) this value will be used to arrange the layout rather than waiting for the image to load

`data-hex_colour` (string) - when the layout is arranged before waiting for the image to load, this will be the background colour of the frame
