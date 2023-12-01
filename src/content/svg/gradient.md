---
title: "Day 9: How to Use Gradients with SVG"
component: DecorationWithGradient
description: In this example we draw another Christmas Ornament with SVG and learn how to draw a radial gradient.
image: gradient
previous:
  title: Forest
  link: forest
next:
  title: How to Draw a Snowman with SVG
  link: snowman
---

The filling of a shape can be defined as a gradient. Here we apply a radial gradient to our Christmas decoration to have a subtle 3D effect. Here we are reusing the same image we saw in <a href="/svg/basic-shapes">the first example</a> again.

<div class="grid-200">

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

Then we define a `radialGradient` in the `defs` section. It has a different syntax than CSS, but the capabilities are rather similar.

We define its ID, center position with `cx` and `cy`, set its radian, and the stop colors. Then we can use it as an attribute for the `fill` property of a shape.

<div class="code-flex">

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <defs>
    <radialGradient id="shine" cx="0.25" cy="0.25" r="0.35">
      <stop offset="0%" stop-color="#e3a8b0" />
      <stop offset="100%" stop-color="#D1495B" />
    </radialGradient>
  </defs>

  <circle cx="0" cy="20" r="70" fill="url(#shine)" />
  <circle
    cx="0"
    cy="-75"
    r="12"
    fill="none"
    stroke="#F79257"
    stroke-width="2"
  />
  <rect x="-17.5" y="-65" width="35" height="20" fill="#F79257" />
</svg>
```

</div>
