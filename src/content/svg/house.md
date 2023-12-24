---
day: 4
title: How to Build a House with SVG
component: House
description: In this example we draw a House with SVG. and learn how to use the polygon element. We practice using polygons, polylines, rectangles and circles to draw more complex shapes.
id: house
previous:
  title: Gingerbread Figure
  link: gingerbread-figure
next:
  title: How to use clip-path with SVG
  link: clip-path
---

In this example, we combine everything we learned so far. We use circles, rectangles, lines, polylines, and polygons here.

We start with the front itself. Note that we not only have a class on the wall element but on the whole SVG as well.

<div class="grid-200-2">

<svg width="200" height="200" viewBox="-100 -100 200 200" stroke="black" stroke-width="2" fill="white">
<polygon points="-65,80 -65,-10 0,-70 65,-10 65,80" />
</svg>

<!-- prettier-ignore -->
```html
<svg 
  class="house"
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <polygon
    class="wall"
    points="-65,80 -65,-10 0,-70 65,-10 65,80" 
  />
</svg>
```

```css
.house {
  stroke: black;
  stroke-width: 2px;
  fill: white;
}
```

</div>

Then we add a roof on top of it. This is the only thing that is new here. We use a `polyline`. The difference between a polyline and a polygon is that a polygon will always close itself, and the polyline will stay open. Note that we are using the `stroke-linecap` property again as we did with [the gingerbread figure example](/svg/gingerbread-figure).

<div class="grid-200-2">

<svg width="200" height="200" viewBox="-100 -100 200 200" stroke="black" stroke-width="2" fill="white">
<polyline class="roof" points="-75,-8 0,-78 75,-8" stroke="#d1495b" stroke-width="10" stroke-linecap="round" />
</svg>

<!-- prettier-ignore -->
```html
<svg 
  class="house"
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <polyline
    class="roof"
    points="-75,-8 0,-78 75,-8" 
  />
</svg>
```

```css
.house .roof {
  fill: none;
  stroke: #d1495b;
  stroke-width: 10px;
  stroke-linecap: round;
}
```

</div>

Then we keep adding simple elements for the door, the windows, and the stairs. The final code for the image on the left will be as follows:

<div class="code-flex">

```html
<svg class="house" width="200" height="200" viewBox="-100 -100 200 200">
  <polygon class="wall" points="-65,80 -65,-10 0,-70 65,-10 65,80" />
  <polyline class="roof" points="-75,-8 0,-78 75,-8" />

  <rect class="door" x="-45" y="10" width="30" height="60" rx="2" />
  <circle class="door-knob" cx="-35" cy="40" r="2" />
  <rect class="stair" x="-47" y="70" width="34" height="5" />
  <rect class="stair" x="-49" y="75" width="38" height="5" />

  <rect class="window" x="5" y="15" width="40" height="35" rx="5" />
  <line x1="5" y1="32.5" x2="45" y2="32.5" />
  <line x1="25" y1="15" x2="25" y2="50" />
  <rect class="window-sill" x="2" y="48" width="46" height="5" rx="5" />

  <circle class="window" cx="0" cy="-25" r="15" />
  <line x1="-15" y1="-25" x2="15" y2="-25" />
  <line x1="0" y1="-40" x2="0" y2="-10" />
</svg>
```

```css
.house {
  stroke: black;
  stroke-width: 2px;
  fill: white;
}

.house .roof {
  fill: none;
  stroke: #d1495b;
  stroke-width: 10px;
  stroke-linecap: round;
}

.house .door {
  fill: #d1495b;
}

.house .stair {
  fill: gray;
}

.house .window {
  fill: #fdea96;
}

.house .window-sill {
  fill: #d1495b;
  stroke-linecap: round;
}
```

</div>
