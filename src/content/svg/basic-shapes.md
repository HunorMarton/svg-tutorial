---
day: 1
title: How to Draw Basic Shapes with SVG
component: Decoration
description: Learn how to draw basic shaped with SVG. In the first example we draw a Christmas Ornament with two circles and a rectangle element.
id: basic-shapes
next:
  title: How to Build a Christmas Tree with SVG
  link: polygon
---

SVG has a similar syntax as HTML. They are both based on XML. Since HTML5 we can simply include the code of an SVG image inside an HTML file like below.

```html
<html>
  <h1>Hi there</h1>
  <svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="25" fill="red" />
  </svg>
</html>
```

This opens up a lot of cool options. We can access parts of an image with JavaScript to make something interactive or we can generate art with code. We can also move some of the styling to CSS and animate image elements with CSS.

In this tutorial series, we learn the foundations of the SVG syntax step by step from basic to more advanced topics.

### Sizing an SVG

Before we start drawing, we have to talk about the `svg` tag itself. The SVG element contains the image elements and defines the frame of our image. It sets the inner size and the outer size of the image.

The `width` and `height` properties define how much space the image takes up in the browser. There's also a `viewBox` property that defines a coordinate system for the image elements. The first two values in viewBox define the top-left coordinate in the image and the last two define the size from the perspective of the image elements.

- The size defined by `width` and `height` is how the rest of the HTML thinks of the image and how big it appears in the browser.
- The size defined by `viewBox` is how the image elements think of the image when they position themself.

In these next three examples, we have three SVGs that have the very same content. A `circle` element with the same center coordinate and same radius. They appear quite different though. In case the size defined by viewBox does not match the width and the height properties, then the image scales up or scales down.

<div class="grid-200">

  <svg width="100" height="100" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="100" 
  height="100" 
  viewBox="0 0 200 200"
>
  <circle cx="100" cy="100" r="50" />
</svg>
```

</div>

<div class="grid-200">

  <svg width="200" height="200" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200" 
  height="200" 
  viewBox="0 0 200 200"
>
  <circle cx="100" cy="100" r="50" />
</svg>
```

</div>

<div class="grid-200">

  <svg width="200" height="200" viewBox="0 0 100 100">
    <circle cx="100" cy="100" r="50" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200" 
  height="200" 
  viewBox="0 0 100 100"
>
  <circle cx="100" cy="100" r="50" />
</svg>
```

</div>

We can also set what coordinate should be in the top-left corner of the image. In the following example, we move the origin of the coordinate system to the center of the image. We set the top left corner to `-100,-100` which is half of the image size in negative.

Note that now the center position of the circle is `0,0`.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <circle cx="0" cy="0" r="50" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <circle cx="0" cy="0" r="50" />
</svg>
```

</div>

SVGs often have an `xmlns` property as well. This, however – if the image is embedded in HTML – can be omitted.

### How to draw a Christmas Ornament

Let’s start with a simple Christmas ornament. Here we only use simple shapes, a rectangle, and two circles. Note, that the origin of the coordinate system is in the center of the image.

First, we define the main part of the Christmas ornament, by drawing a `circle`. To draw a circle we set their center position (`cx` and `cy`) and the radius with the `r` property.

We also have presentational attributes that style our shapes. Similar to the `background-color` property in CSS, we set the color for the shape with the `fill` attribute.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <circle cx="0" cy="20" r="70" fill="#D1495B" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <circle 
    cx="0"
    cy="20"
    r="70"
    fill="#D1495B" 
  />
</svg>
```

</div>

Then we draw a rectangle as a little cap on top of the Christmas ornament with the `rect` element. In this case, we have to set the top-left position of the rectangle and its size. We use the `fill` attribute the same way as we did with the circle.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <circle cx="0" cy="20" r="70" fill="#D1495B" />
    <rect x="-17.5" y="-65" width="35" height="20" fill="#F79257" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <circle 
    cx="0"
    cy="20"
    r="70"
    fill="#D1495B" 
  />
  <rect 
    x="-17.5" 
    y="-65"
    width="35"
    height="20"
    fill="#F79257" 
  />
</svg>
```

</div>

Finally, we add another circle as a hanger on top of these. Note that we use the same `circle` element, but with different attributes. We set the fill property to "none" and set a border for the shape with the `stroke` and `stroke-width` properties.

The final code of the image on the left is as follows:

<div class="code-flex">

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <circle cx="0" cy="20" r="70" fill="#D1495B" />
  <rect x="-17.5" y="-65" width="35" height="20" fill="#F79257" />
  <circle
    cx="0"
    cy="-75"
    r="12"
    fill="none"
    stroke="#F79257"
    stroke-width="2"
  />
</svg>
```

</div>

Great! We drew our first SVG image. Now let's get into something more complicated!
