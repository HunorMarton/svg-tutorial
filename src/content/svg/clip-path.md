---
day: 5
title: How to use clip-path with SVG
component: DecorationWithClip
description: In this example we draw a Christmas Ornament with a decorational motif on the side of it with SVG and learn how to clip-path.
id: clip-path
previous:
  title: House
  link: house
next:
  title: How to use the transform property of SVG elements
  link: transform
---

This ornament is the same as we drew on <a href="/svg/basic-shapes">the first day</a>, except it has a motif on its side defined as a polyline. By default, the polyline wouldn’t match the edge of the circle shape. Without clipping this motif would look like this:

<div class="center">
  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <circle cx="0" cy="20" r="70" fill="#D1495B" />
    <polyline
      points="-120 40 -80 0 -40 40 0 0 40 40 80 0 120 40"
      fill="none"
      stroke="#9C2D2A"
      stroke-width="20"
    />
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
</div>

We use clip-path here to make sure that the motif fits perfectly on the ornament. The clip-path is defined in the definitions section. The `defs` section is a hidden compartment of our image. Things here don't show up on the screen, but we can refer to them and use them later.

Here we define a `clipPath` with an ID. The content of this clip-path is a circle that matches the size of our ornament. Then we use it to clip the polyline, by setting its `clip-path` property.

<div class="code-flex">

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <defs>
    <clipPath id="ball">
      <circle cx="0" cy="20" r="70" />
    </clipPath>
  </defs>

  <circle cx="0" cy="20" r="70" fill="#D1495B" />

  <polyline
    clip-path="url(#ball)"
    points="-120 40 -80 0 -40 40 0 0 40 40 80 0 120 40"
    fill="none"
    stroke="#9C2D2A"
    stroke-width="20"
  />

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
