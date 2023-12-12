---
day: 3
title: How to Make a Gingerbread Figure with SVG
component: Gingerbread
description: In the third example we learn how to draw a Gingerbread Figure with SVG. We also learn how to move the styling properties to CSS and how to make rounded lines and rectangles.
id: gingerbread-figure
previous:
  title: Tree
  link: polygon
next:
  title: How to Build a House with SVG
  link: house
---

### Moving styling properties to CSS

Since our SVG is living inside an HTML file now, we can assign CSS classes to each element and move some of the attributes to CSS. We can only move the presentation attributes though. Position attributes and attributes that define the shapes have to stay in HTML. But colors, stroke, and font attributes can be moved to CSS.

<div class="grid-200-2">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <circle class="head" cx="0" cy="-50" r="30" fill="#cd803d" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <circle 
    class="head"
    cx="0"
    cy="-50"
    r="30" 
  />
</svg>
```

```css
.head {
  fill: #cd803d;
}
```

</div>

### Rounded lines

We already saw the `fill` and some of the `stroke` properties, but here’s another styling property. The `stroke-linecap`. This can make our line cap rounded. Note that the legs and the arms are simple lines here.

To give you a comparison if we remove the line cap and set a smaller stroke-width, then this is how it would look like.

<div class="grid-200-2">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <line x1="-40" y1="-10" x2="40" y2="-10" stroke="#cd803d" />
    <line x1="-25" y1="50" x2="0" y2="-15" stroke="#cd803d" />
    <line x1="25" y1="50" x2="0" y2="-15" stroke="#cd803d" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <line 
    class="limb"
    x1="-40"
    y1="-10"
    x2="40"
    y2="-10"
  />
  <line 
    class="limb"
    x1="-25"
    y1="50"
    x2="0"
    y2="-15"
  />
  <line 
    class="limb"
    x1="25"
    y1="50"
    x2="0"
    y2="-15"
  />
</svg>
```

```css
.limb {
  stroke: #cd803d;
}
```

</div>

But by setting a thick stroke width and a round line cap we can shape legs and arms for our figure.

<div class="grid-200-2">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <line x1="-40" y1="-10" x2="40" y2="-10" stroke="#cd803d" stroke-width="35"
  stroke-linecap="round" />
    <line x1="-25" y1="50" x2="0" y2="-15" stroke="#cd803d" stroke-width="35"
  stroke-linecap="round" />
    <line x1="25" y1="50" x2="0" y2="-15" stroke="#cd803d" stroke-width="35"
  stroke-linecap="round" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <line 
    class="limb"
    x1="-40"
    y1="-10"
    x2="40"
    y2="-10"
  />
  <line 
    class="limb"
    x1="-25"
    y1="50"
    x2="0"
    y2="-15"
  />
  <line 
    class="limb"
    x1="25"
    y1="50"
    x2="0"
    y2="-15"
  />
</svg>
```

```css
.limb {
  stroke: #cd803d;
  stroke-width: 35px;
  stroke-linecap: round;
}
```

</div>

### Rounded rectangles

Also, note the `rx` property at the rectangle defining the mouth. This will make the edges rounded. It is similar to the `border-radius` property for regular HTML elements.

<div class="grid-200-2">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <circle class="head" cx="0" cy="-50" r="30" fill="#cd803d" />
    <rect class="mouth" x="-10" y="-40" width="20" height="5" fill="none" stroke="white" stroke-width="2" rx="2" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <circle 
    class="head"
    cx="0"
    cy="-50"
    r="30" 
  />
  <rect
    class="mouth"
    x="-10"
    y="-40"
    width="20"
    height="5"
    rx="2"
  />
</svg>
```

```css
.head {
  fill: #cd803d;
}

.mouth {
  fill: none;
  stroke: white;
  stroke-width: 2px;
}
```

</div>

### Gingerbread figure

Once we put it all together, and add eyes and buttons, this is how the final code looks like:

<div class="code-flex">

```html
<svg class="gingerbread" width="200" height="200" viewBox="-100 -100 200 200">
  <circle class="head" cx="0" cy="-50" r="30" />

  <circle class="eye" cx="-12" cy="-55" r="3" />
  <circle class="eye" cx="12" cy="-55" r="3" />
  <rect class="mouth" x="-10" y="-40" width="20" height="5" rx="2" />

  <line class="limb" x1="-40" y1="-10" x2="40" y2="-10" />
  <line class="limb" x1="-25" y1="50" x2="0" y2="-15" />
  <line class="limb" x1="25" y1="50" x2="0" y2="-15" />

  <circle class="button" cx="0" cy="-10" r="5" />
  <circle class="button" cx="0" cy="10" r="5" />
</svg>
```

```css
.head {
  fill: #cd803d;
}

.eye {
  fill: white;
}

.mouth {
  fill: none;
  stroke: white;
  stroke-width: 2px;
}

.limb {
  stroke: #cd803d;
  stroke-width: 35px;
  stroke-linecap: round;
}
```

</div>
