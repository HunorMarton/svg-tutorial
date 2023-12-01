---
title: "Day 25: How to Break Down an SVG Image into Multiple Components"
component: SnowGlobe
description: In this example we learn how to break down more complex SVG images into multiple components.
image: multiple-components
previous:
  title: Data-driven-diagram
  link: data-driven-diagram
---

If you got this far then give yourself a well-deserved pat on the back as you just learned the basics of SVG with many cool use cases.

If you continue on your journey and you start to write more and more complex SVGs then at one point you might find that their code starts to get a bit out of hand. Then you can break them down into components. Here we are using React again, but the same concept applies to any other frontend library that you might use. Mind though that there’s only one SVG tag at the root of the component as there’s still only one image. The child components have their content in group elements.

<div class="code-flex">

```jsx
function SnowGlobe() {
  return (
    <svg width="200" height="200" viewBox="-100 -100 200 200">
      <clipPath id="snow-globe">
        <circle cx="0" cy="0" r="80" />
      </clipPath>

      <g clip-path="url(#snow-globe)">
        <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
        <circle cx="0" cy="380" r="350" fill="#F8F4E8" />

        <Threes />
        <Snow />
      </g>

      <circle cx="0" cy="0" r="80" fill="none" stroke="gray" stroke-width="2" />
    </svg>
  );
}

function Threes() {
  return (
    <g>
      <defs>
        <g id="tree">
          <polygon points="-10,0 10,0 0 -50" fill="#38755b" />
          <line x2="0" y2="10" stroke="#778074" stroke-width="2" />
        </g>
      </defs>

      <use href="#tree" x="-20" y="25" transform="scale(1.8)" />
      <use href="#tree" x="-10" y="40" transform="scale(1)" />
      <use href="#tree" x="30" y="40" transform="scale(0.8)" />
      <use href="#tree" x="40" y="30" transform="scale(1.2)" />
    </g>
  );
}

function Snow() {
  return (
    <g class="snowing">
      <defs>
        <circle id="big" cx="0" cy="0" r="5" fill="white" />
        <circle id="small" cx="0" cy="0" r="3" fill="white" />
      </defs>

      <use href="#big" x="0" y="0" class="flake fast" />
      <use href="#big" x="-50" y="-20" class="flake fast opaque" />
      <use href="#big" x="30" y="-40" class="flake fast" />
      <use href="#big" x="50" y="-20" class="flake fast opaque" />
      <use href="#big" x="30" y="50" class="flake slow" />
      <use href="#big" x="-70" y="-80" class="flake slow opaque" />
      <use href="#big" x="30" y="50" class="flake slow" />
      <use href="#big" x="90" y="-80" class="flake slow opaque" />
      <use href="#small" x="10" y="-50" class="flake slow" />
      <use href="#small" x="-50" y="-60" class="flake slow opaque" />
      <use href="#small" x="30" y="70" class="flake slow" />
      <use href="#small" x="10" y="-80" class="flake slow opaque" />
    </g>
  );
}
```

```css
.flake {
  animation-duration: inherit;
  animation-name: snowing;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes snowing {
  from {
    transform: translate(0, -100px);
  }
  to {
    transform: translate(0, 100px);
  }
}

.flake.opaque {
  opacity: 0.7;
}

.flake.slow {
  animation-duration: 5s;
}

.flake.fast {
  animation-duration: 3s;
}
```

</div>
