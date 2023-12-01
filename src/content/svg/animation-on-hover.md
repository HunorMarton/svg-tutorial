---
title: "Day 19: How to Add Animation on Hover of an SVG element"
component: RingingBell
image: animation-on-hover
previous:
  title: Path-based animation
  link: path-based-animation
next:
  title: How to Animate a Snowing effect with SVG and CSS
  link: snowing
---

We can also set more traditional animations with CSS. Here we animate the `transform` property with keyframes. We can even trigger this effect on mouse hover.

Here we are reusing <a href="/svg/bell">the bell example</a> we went through earlier, then adding a keyframe animation on `hover` on both the whole bell itself and the bell tongue.

<div class="code-flex">

```html
<svg class="bell" width="200" height="200" viewBox="-100 -100 200 200">
  <g stroke="#001514" stroke-width="2">
    <circle cx="0" cy="-45" r="7" fill="#4F6D7A" />
    <circle class="bell-tongue" cx="0" cy="50" r="10" fill="#F79257" />
    <path
      d="
        M -50 40
        L -50 50
        L 50 50
        L 50 40
        Q 40 40 40 10
        C 40 -60 -40 -60 -40 10
        Q -40 40 -50 40"
      fill="#FDEA96"
    />
  </g>
</svg>
```

```css
.bell:hover {
  transform-origin: center 30%;
}

.bell:hover,
.bell:hover .bell-tongue {
  animation-duration: 0.5s;
  animation-delay: -0.25s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  animation-name: ring;
}

@keyframes ring {
  from {
    transform: rotate(-20deg);
  }
  to {
    transform: rotate(20deg);
  }
}
```

</div>
