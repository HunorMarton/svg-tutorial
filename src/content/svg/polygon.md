---
day: 2
title: How to Build a Christmas Tree with SVG
component: Tree
description: In the second example we draw a Christmas Tree with SVG and learn how to use the polygon element.
previous:
  title: Basic Shapes
  link: basic-shapes
next:
  title: How to Make a Gingerbread Figure with SVG
  link: gingerbread-figure
---

### How to use the `polygon` element

We can’t always use basic shapes to assemble our images. A `polygon` is the easiest way to draw a freeform shape. Polygons have a `points` property that sets a list of coordinates that are connected with straight lines.

We can me the crown of the tree from three triangles. We start with the one at the bottom, and we add it layer by layer.

<div class="grid-200">

  <svg width="200" height="400" viewBox="-100 -200 200 400">
    <polygon points="0,0 80,120 -80,120" fill="#234236" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="400"
  viewBox="-100 -200 200 400"
>
  <polygon 
    points="0,0 80,120 -80,120" 
    fill="#234236" 
  />
</svg>
```

</div>

<div class="grid-200">

  <svg width="200" height="400" viewBox="-100 -200 200 400">
    <polygon points="0,0 80,120 -80,120" fill="#234236" />
    <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="400"
  viewBox="-100 -200 200 400"
>
  <polygon 
    points="0,0 80,120 -80,120" 
    fill="#234236" 
  />
  <polygon
    points="0,-40 60,60 -60,60"
    fill="#0C5C4C" 
  />
</svg>
```

</div>

<div class="grid-200">

  <svg width="200" height="400" viewBox="-100 -200 200 400">
    <polygon points="0,0 80,120 -80,120" fill="#234236" />
    <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
    <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="400"
  viewBox="-100 -200 200 400"
>
  <polygon 
    points="0,0 80,120 -80,120" 
    fill="#234236" 
  />
  <polygon
    points="0,-40 60,60 -60,60"
    fill="#0C5C4C" 
  />
  <polygon 
    points="0,-80 40,0 -40,0"
    fill="#38755B" 
  />
</svg>
```

</div>

Finally, we add the trunk of the tree as a rectangle.

<div class="code-flex">

```html
<svg width="200" height="400" viewBox="-100 -200 200 400">
  <polygon points="0,0 80,120 -80,120" fill="#234236" />
  <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
  <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
  <rect x="-20" y="120" width="40" height="30" fill="brown" />
</svg>
```

</div>
