---
day: 15
title: How to Draw a Ribbon with SVG
component: Ribbon
description: In this example we draw a Ribbon with SVG and practice quadratic and cubic bézier curves.
id: ribbon
previous:
  title: Arc
  link: arc
next:
  title: How to Draw a Bear with SVG
  link: bear
---

After we learned about [quadratic Bézier curves](/svg/quadratic-bezier) and [cubic Bézier curves](/svg/cubic-bezier) let's do another practice round where we use both.

We start with the right side of the ribbon with a quadratic Bézier curve. The dot represents the control point again.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path
      d="
        M 0 -20
        Q 28 -40 56 -45"
      fill="#B73A3B"
    />
    <circle 
      cx="28"
      cy="-40"
      r="2" 
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
      M 0 -20
      Q 28 -40 56 -45"
    fill="#B73A3B"
  />
</svg>
```

</div>

Then we continue with a cubic Bézier.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path
      d="
        M 0 -20
        Q 28 -40 56 -45
        C 96 -48 96 48 56 45"
      fill="#B73A3B"
    />
    <circle 
      cx="96"
      cy="-48"
      r="2" 
    />
    <circle 
      cx="96"
      cy="48"
      r="2" 
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
      M 0 -20
      Q 28 -40 56 -45
      C 96 -48 96 48 56 45"
    fill="#B73A3B"
  />
</svg>
```

</div>

And finish up with another quadratic cubic Bézier that mirrors the first one.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <path
      d="
        M 0 -20
        Q 28 -40 56 -45
        C 96 -48 96 48 56 45
        Q 28 40 0 20"
      fill="#B73A3B"
    />
    <circle 
      cx="28"
      cy="40"
      r="2" 
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
      M 0 -20
      Q 28 -40 56 -45
      C 96 -48 96 48 56 45
      Q 28 40 0 20"
    fill="#B73A3B"
  />
</svg>
```

</div>

Then we can move the whole shape into a reusable component and use it for both sizes. Note that to mirror it to the left side we use negative scaling.

<div class="grid-200">

  <svg width="200" height="200" viewBox="-100 -100 200 200">
    <defs>
      <path
        id="ribbon"
        d="
          M 0 -20
          Q 28 -40 56 -45
          C 96 -48 96 48 56 45
          Q 28 40 0 20"
        fill="#B73A3B"
      />
    </defs>
    <use href="#ribbon" />
    <use 
      href="#ribbon"
      transform="scale(-1)" 
    />
  </svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <defs>
    <path
      id="ribbon"
      d="
        M 0 -20
        Q 28 -40 56 -45
        C 96 -48 96 48 56 45
        Q 28 40 0 20"
      fill="#B73A3B"
    />
  </defs>

  <use href="#ribbon" />
  <use 
    href="#ribbon"
    transform="scale(-1)" 
  />
</svg>
```

</div>

We finish up the image by adding an `ellipse` element in the middle and a stroke for the rest.

<div class="code-flex">

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <defs>
    <path
      id="ribbon"
      d="
        M 0 -20
        Q 28 -40 56 -45
        C 96 -48 96 48 56 45
        Q 28 40 0 20"
      fill="#B73A3B"
    />
  </defs>

  <use href="#ribbon" />
  <use href="#ribbon" transform="scale(-1)" />
  <ellipse cx="0" cy="0" rx="20" ry="24" fill="#9C2D2A" />

  <path
    d="
      M 0 20
      Q 40 40 30 60
      Q 20 80 40 90

      M 0 20
      Q -30 30 -20 60
      Q -10 90 -50 100"
    fill="none"
    stroke="#B73A3B"
    stroke-width="3"
  />
</svg>
```

</div>
