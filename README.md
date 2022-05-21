# Introduction

Stonework is a lightweight vanilla JavaScript library for arranging images in a masonry row type layout.

# Installation

Install `stonework` via [NPM](https://www.npmjs.com):

`npm install stonework`

# Usage

Import the stonework library:

`import Stonework from 'stonework'`

Create a new instance of Stonework:

`new Stonework(gallery_element_id, minimum_frame_width, frame_border_width, transition_time);`

## Arguments

`gallery_element_id` (string) - the id of a div element with a gallery layout

`minimum_frame_width` (integer) - the minimum width, in pixels, that a frame should be displayed

`frame_border_width` [optional] (integer) - the width of the border between frames

`transition_time` [optional] (float) - the length, in seconds, of the CSS transistion animation from solid colour to loaded image

## Gallery layout

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
