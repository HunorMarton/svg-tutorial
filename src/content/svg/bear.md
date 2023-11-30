---
title: "Day 16: Bear"
component: Bear
previous:
  title: Ribbon
  link: ribbon
next:
  title: How to draw text along a path?
  link: text-path
---

As the ultimate drawing challenge let's draw a bear.

We start with the ears. These are two circles that both have the `fill` and the `stroke` attributes set. We also defined a class on the SVG element to set the background color. Note, that here we set the regular `background-color` CSS property and not the `fill` attribute. Fill works with shapes, but the SVG tag itself is not a shape.

<div class="grid-200-2">

  <svg style="background-color: #f5eed7" width="200" height="200" viewBox="-100 -100 200 200">
    <circle cx="-40" cy="-50" r="18" fill="#E5C39C" stroke="white" stroke-width="5"/>
    <circle cx="40" cy="-50" r="18" fill="#E5C39C" stroke="white" stroke-width="5" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  class="bear"
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <circle 
    class="ear"
    cx="-40" 
    cy="-50" 
    r="18" 
  />
  <circle 
    class="ear"
    cx="40" 
    cy="-50" 
    r="18" 
  />
</svg>
```

```css
.bear {
  background-color: #f5eed7;
}

.bear .ear {
  fill: #e5c39c;
  stroke: white;
  stroke-width: 5;
}
```

</div>

Then let's add the face and the eyes. Here's another thing we haven't covered before. Earlier we saw that we can round rectangles with the `rx` property. We can be even more specific and set a different radius on the Y-axis with the `ry` property. If the latter is not set, it falls back to the other one.

<div class="grid-200-2">

  <svg style="background-color: #f5eed7" width="200" height="200" viewBox="-100 -100 200 200">
    <rect x="-55" y="-60" width="110" height="120" fill="white" rx="50" ry="30" />
    <circle cx="20" cy="-30" r="3" />
    <circle cx="-20" cy="-30" r="3" />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  class="bear"
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <rect 
    class="face"
    x="-55"
    y="-60"
    width="110"
    height="120" 
     rx="50"
     ry="30"
  />
  <circle cx="20" cy="-30" r="3" />
  <circle cx="-20" cy="-30" r="3" />
</svg>
```

```css
.bear {
  background-color: #f5eed7;
}

.bear .face {
  fill: white;
}
```

</div>

Finally, we can add the nose and the mouth as a few paths as follows.

<div class="grid-200-2">

<svg style="background-color: #f5eed7" width="200" height="200" viewBox="-100 -100 200 200">
  <path
    d="
      M -30 0
      C -30 -25 30 -25 30 0
      L 30 30
      Q 30 40 20 40
      L -20 40
      Q -30 40 -30 30"
    fill="#E5C39C"
  />
  <path
    d="
      M -10 0
      L 10 0
      C 10 20 -10 20 -10 0"
  />
  <path
    d="
      M 0 10
      Q 0 25 10 25
      M 0 10
      Q 0 25 -10 25"
    fill="none"
    stroke="black"
    stroke-width="2"
  />
</svg>

<!-- prettier-ignore -->
```html
<svg 
  class="bear"
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <path
    d="
      M -30 0
      C -30 -25 30 -25 30 0
      L 30 30
      Q 30 40 20 40
      L -20 40
      Q -30 40 -30 30"
    fill="#E5C39C"
  />
  <path
    d="
      M -10 0
      L 10 0
      C 10 20 -10 20 -10 0"
  />
  <path
    class="mouth"
    d="
      M 0 10
      Q 0 25 10 25

      M 0 10
      Q 0 25 -10 25"
  />
</svg>
```

```css
.bear {
  background-color: #f5eed7;
}

.bear .mouth {
  fill: none;
  stroke: black;
  stroke-width: 2;
}
```

</div>

Once we put it all together we end up with the image on the left.

<div class="code-flex">

```html
<svg class="bear" width="200" height="200" viewBox="-100 -100 200 200">
  <circle class="ear" cx="-40" cy="-50" r="18"></circle>
  <circle class="ear" cx="40" cy="-50" r="18"></circle>

  <rect class="face" x="-55" y="-60" width="110" height="120" rx="50" ry="30" />
  <circle cx="20" cy="-30" r="3" />
  <circle cx="-20" cy="-30" r="3" />

  <path
    d="
      M -30 0
      C -30 -25 30 -25 30 0
      L 30 30
      Q 30 40 20 40
      L -20 40
      Q -30 40 -30 30"
    fill="#E5C39C"
  />
  <path
    d="
      M -10 0
      L 10 0
      C 10 20 -10 20 -10 0"
  />
  <path
    class="mouth"
    d="
      M 0 10
      Q 0 25 10 25

      M 0 10
      Q 0 25 -10 25"
  />
</svg>
```

```css
.bear {
  background-color: #f5eed7;
}

.bear .ear {
  fill: #e5c39c;
  stroke: white;
  stroke-width: 5;
}

.bear .face {
  fill: white;
}

.bear .mouth {
  fill: none;
  stroke: black;
  stroke-width: 2;
}
```

</div>
