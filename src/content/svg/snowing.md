---
title: "Day 20: Snowing"
component: Snowing
previous:
  title: Animation on hover
  link: animation-on-hover
next:
  title: How to create Background Patterns?
  link: background-pattern
---

To continue our <a href="/svg/forest">forest example</a> we can add a snowing effect with a similar animation. We animate `transform` again, but this time we move many more elements.

We extend our <a href="/svg/forest">forest example</a> with simple reusable snowflakes and add a bunch of them to the scene with various CSS classes to set some variation in speed and appearance. Then we add animation in CSS to make them look like snowing. It's a bit glitchy and not the most sophisticated animation, but you get the idea.

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <defs>
    <g id="tree">
      <polygon points="-10,0 10,0 0 -50" fill="#38755b" />
      <line x2="0" y2="10" stroke="#778074" stroke-width="2" />
    </g>
    <circle id="big" cx="0" cy="0" r="5" fill="white" />
    <circle id="small" cx="0" cy="0" r="3" fill="white" />
  </defs>

  <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
  <circle cx="0" cy="380" r="350" fill="#F8F4E8" />

  <use href="#tree" x="-30" y="25" transform="scale(2)" />
  <use href="#tree" x="-20" y="40" transform="scale(1.2)" />
  <use href="#tree" x="40" y="40" />
  <use href="#tree" x="50" y="30" transform="scale(1.5)" />

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
</svg>
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
