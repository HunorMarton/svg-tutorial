---
title: "Day 8: Forest"
component: Forest
---

Rotation is not the only way we can generate images from simple shapes. In this example, we define a tree shape and then place it at various positions in different sizes to draw a forest.

First, we create a background out of a rectangle and a circle.

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
  <circle cx="0" cy="380" r="350" fill="#F8F4E8" />
</svg>

<!-- prettier-ignore -->
```html
<svg
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <rect 
    x="-100" 
    y="-100" 
    width="200" 
    height="200" 
    fill="#F1DBC3"
  />
  <circle 
    cx="0" 
    cy="380" 
    r="350" 
    fill="#F8F4E8" 
  />
</svg>
```

</div>

Then we define a tree shape from a simple polygon and a line.

<style>
  .grid-200 {
    display: grid;
    grid-template-grid-200: 202px 1fr;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
  }

  .grid-200 svg {
    border: 1px dashed gray;
  }
</style>

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <polygon points="-10,0 10,0 0 -50" fill="#38755b" />
  <line x1="0" y1="0" x2="0" y2="10" stroke="#778074" stroke-width="2" />
</svg>

<!-- prettier-ignore -->
```html
<svg
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <polygon 
    points="-10,0 10,0 0 -50" 
    fill="#38755b" 
  />
  <line 
    x1="0" 
    y1="0" 
    x2="0" 
    y2="10" 
    stroke="#778074"
    stroke-width="2" 
  />
</svg>
```

</div>

Then we can reuse it in a similar way as we did in <a href="/svg/path">the snowflake example</a>. We move it to the `defs` section, wrap it into a group element, set an ID for it, and then reuse it with the `use` element.

Here we also position the reused elements by setting an `x` and `y` coordinate and to add some perspective to the image we use the `scale` transformation.

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <defs>
    <g id="tree">
      <polygon points="-10,0 10,0 0 -50" fill="#38755b" />
      <line x1="0" y1="0" x2="0" y2="10" stroke="#778074" stroke-width="2" />
    </g>
  </defs>

  <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
  <circle cx="0" cy="380" r="350" fill="#F8F4E8" />

  <use href="#tree" x="-30" y="25" transform="scale(2)" />
  <use href="#tree" x="-20" y="40" transform="scale(1.2)" />
  <use href="#tree" x="40" y="40" />
  <use href="#tree" x="50" y="30" transform="scale(1.5)" />
</svg>
```
