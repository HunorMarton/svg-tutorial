---
day: 10
title: How to Draw a Snowman with SVG
component: Snowman
description: In this example we draw a Snowman with SVG and practice radial gradients.
id: gradient
previous:
  title: Forest
  link: forest
next:
  title: How to Draw Quadratic Bézier Curves with SVG
  link: quadratic-bezier
---

The filling of a shape can be defined as a gradient. Here we define a `radialGradient` in the `defs` section. It has a different syntax than CSS, but the capabilities are rather similar.

We define its ID, center position with `cx` and `cy`, set its radian, and the stop colors. Then we can use it as an attribute for the `fill` property of a shape.

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200" style="background-color: lightblue">
  <defs>
    <radialGradient id="snowball0" cx="0.25" cy="0.25" r="1">
      <stop offset="0%" stop-color="white" />
      <stop offset="50%" stop-color="white" />
      <stop offset="100%" stop-color="#d6d6d6" />
    </radialGradient>
  </defs>
  <circle cx="0" cy="0" r="80" fill="url(#snowball0)" />
</svg>

<!-- prettier-ignore -->
```html
<svg
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
  style="background-color: lightblue"
>
  <defs>
    <radialGradient 
      id="snowball" 
      cx="0.25" 
      cy="0.25" 
      r="1"
    >
      <stop 
        offset="0%" 
        stop-color="white"
      />
      <stop 
        offset="50%" 
        stop-color="white" 
      />
      <stop 
        offset="100%" 
        stop-color="#d6d6d6" 
      />
    </radialGradient>
  </defs>

  <circle 
    cx="0" 
    cy="0" 
    r="80" 
    fill="url(#snowball)" 
  />
</svg>
```

</div>

For the snowman we draw two circles with the same radial gradient to make up the body of a snowman. Then we add a polygon for the nose, two circles for the eyes, and two lines for the arm. Simple.

<div class="code-flex">

```html
<svg
  width="200"
  height="400"
  viewBox="-100 -200 200 400"
  style="background-color: lightblue"
>
  <defs>
    <radialGradient id="snowball" cx="0.25" cy="0.25" r="1">
      <stop offset="0%" stop-color="white" />
      <stop offset="50%" stop-color="white" />
      <stop offset="100%" stop-color="#d6d6d6" />
    </radialGradient>
  </defs>

  <circle cx="0" cy="60" r="80" fill="url(#snowball)" />
  <circle cx="0" cy="-40" r="50" fill="url(#snowball)" />
  <polygon points="10,-46 50,-40 10,-34" fill="#e66465" />

  <circle cx="0" cy="-55" r="5" />
  <circle cx="20" cy="-55" r="5" />

  <line x1="-40" y1="30" x2="-90" y2="-30" stroke="black" stroke-width="5" />
  <line x1="-65" y1="0" x2="-90" y2="-10" stroke="black" stroke-width="5" />
</svg>
```

</div>
