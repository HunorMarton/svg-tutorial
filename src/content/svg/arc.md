---
title: "Day 14: Arc"
component: Candy
previous:
  title: Bell
  link: bell
next:
  title: How to draw a Ribbon?
  link: ribbon
---

If you thought that cubic Béziers are the most complicated parts of SVGs then I have bad news for you. Arcs are way more complicated. The good news though, is that they are rarely used, and we won't use them much in the upcoming examples either.

### The different parameters of an SVG arc

The last two parameters are still the endpoint of the arc. Arcs have five extra parameters on top of that though. With the first two, we define a horizontal and vertical radius for the arc.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path 
      d="
        M -40 -40
        A 70 70 0 0 0 40 40"
      fill="none"
      stroke="red"
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
  <path 
    d="
      M -40 -40
      A 70 70 0 0 0 40 40"
    fill="none"
    stroke="red"
    stroke-width="2"
  />
</svg>
```

</div>

You might realize, that even with the same starting point and endpoint, and the same radiuses, there are actually four different variations. The 5th argument is a boolean flag, that tells us if we want to flip the arc the other way.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path 
      d="
        M -40 -40
        A 70 70 0 0 1 40 40"
      fill="none"
      stroke="red"
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
  <path 
    d="
      M -40 -40
      A 70 70 0 0 1 40 40"
    fill="none"
    stroke="red"
    stroke-width="2"
  />
</svg>
```

</div>

You might notice that in both cases, the arc ends up the shortest possible way with these parameters. It is also possible to go the long way and still keep the same start and endpoints, and the same radiuses. Then the 4th argument is another boolean flag that sets if we want to want to the long way. This also has two variations. You can mirror it, by flipping the 5th argument to the other value.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path 
      d="
        M -40 -40
        A 70 70 0 1 1 40 40"
      fill="none"
      stroke="red"
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
  <path 
    d="
      M -40 -40
      A 70 70 0 1 1 40 40"
    fill="none"
    stroke="red"
    stroke-width="2"
  />
</svg>
```

</div>

To complicate things even further, if we set the horizontal and vertical radiuses to two different values then we end up with an arc of an ellipse. Again, the same start and end points, and this also has 4 different variations.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path 
      d="
        M -40 -40
        A 70 40 0 1 1 40 40"
      fill="none"
      stroke="red"
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
  <path 
    d="
      M -40 -40
      A 70 40 0 1 1 40 40"
    fill="none"
    stroke="red"
    stroke-width="2"
  />
</svg>
```

</div>

Finally, if we draw an ellipse we can also turn it by an angle. We can set this by the 3rd parameter. What makes things even more twisted, is that our imaginary ellipse is not rotated around its center, because this arc still has to maintain the same start and end points.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path 
      d="
        M -40 -40
        A 70 40 30 1 1 40 40"
      fill="none"
      stroke="red"
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
  <path 
    d="
      M -40 -40
      A 70 40 30 1 1 40 40"
    fill="none"
    stroke="red"
    stroke-width="2"
  />
</svg>
```

</div>

Click here for <a href="https://hunormarton.github.io/svg-curves" target="_blank" rel="noopener">an interactive demo</a> of arcs.

### Drawing a candy

Now after all these introductions we finally got to today's example. The good news is that we are only going to draw a simple arc in this one.

<div class="grid-200-2">

  <svg width="200" height="400" viewBox="-100 -200 200 400">
    <path 
      d="
        M 50 120
        L 50 -80
        A 50 50 0 0 0 -50 -80"
      fill="none"
      stroke="#cd803d"
      stroke-width="45"
      stroke-linecap="round"
    />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="400"
  viewBox="-100 -200 200 400"
>
  <path
    class="body" 
    d="
      M 50 120
      L 50 -80
      A 50 50 0 0 0 -50 -80"
    stroke="#cd803d"
    stroke-width="45"
  />
</svg>
```

```css
.body {
  stroke-linecap: round;
  fill: none;
}
```

</div>

To draw a candy, we draw a thick line that consists of a straight line and a half circle. Then we draw the same line again, with a lightly thinner stroke width. By setting two different colors for them, they will look as if one is the border of the other.

For the finishing touches, we add a few straight lines inside this shape as markings.

```html
<svg width="200" height="400" viewBox="-100 -200 200 400">
  <path
    class="body"
    d="
      M 50 120
      L 50 -80
      A 50 50 0 0 0 -50 -80"
    stroke="#cd803d"
    stroke-width="45"
  />

  <path
    class="body"
    d="
      M 50 120
      L 50 -80
      A 50 50 0 0 0 -50 -80"
    stroke="white"
    stroke-width="40"
    class="body"
  />

  <line class="green-mark" x1="-35" y1="-90" x2="-60" y2="-100" />
  <line class="red-mark" x1="-15" y1="-115" x2="-25" y2="-135" />
  <line class="green-mark" x1="20" y1="-110" x2="35" y2="-130" />
  <line class="red-mark" x1="40" y1="-60" x2="60" y2="-80" />
  <line class="green-mark" x1="40" y1="-10" x2="60" y2="-30" />
  <line class="red-mark" x1="40" y1="40" x2="60" y2="20" />
  <line class="green-mark" x1="40" y1="90" x2="60" y2="70" />
</svg>
```

```css
.body {
  stroke-linecap: round;
  fill: none;
}

.red-mark {
  stroke: #d1495b;
  stroke-width: 2.5px;
}

.green-mark {
  stroke: #234236;
  stroke-width: 2.5px;
}
```
