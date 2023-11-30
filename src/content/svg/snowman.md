---
title: "Day 10: Snowman"
component: Snowman
previous:
  title: Gradient
  link: gradient
next:
  title: How to draw Quadratic Bézier curves?
  link: quadratic-bezier
---

Once we know how to create a gradient, we can also draw a snowman. Here we draw two circles with the same radial gradient to make up the body of a snowman. Then we add a polygon for the nose, two circles for the eyes, and two lines for the arm. Simple.

```html
<svg width="200" height="400" viewBox="-100 -200 200 400">
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
