---
day: 23
title: How to Add Interaction to SVG elements with JavaScript
component: Lights
description: In this example we learn how to make an SVG image interactive with JavaScript.
previous:
  title: Clock
  link: clock
next:
  title: How to Generate an SVG Diagram from JavaScript
  link: data-driven-diagram
---

We can not only manipulate an SVG from JavaScript but we can also assign event listeners to parts of an SVG. Here, by clicking the red button we switch on or off the lights. The possibilities are endless. You can even create a full-featured game with SVG and JavaScript.

<div class="code-flex">

<!-- prettier-ignore -->
```html
<svg class="lights" width="200" height="200" viewBox="-100 -100 200 200">
  <script>
    window.addEventListener("DOMContentLoaded", () => {
      const button = document.getElementById("button");
      let lightsOn = false;

      button.addEventListener("click", () => {
        const bulbs = document.querySelectorAll(".b");
        bulbs[0].setAttribute("fill", lightsOn ? "white" : "#FFC05B");
        bulbs[1].setAttribute("fill", lightsOn ? "white" : "#F86285");
        bulbs[2].setAttribute("fill", lightsOn ? "white" : "#03A8A8");
        bulbs[3].setAttribute("fill", lightsOn ? "white" : "#748CEF");
        
        lightsOn = !lightsOn;
      });
    });
  </script>

  <defs>
    <g id="bulb">
      <path d="M 0,0 Q 20 25 0 40 Q -20 25 0 0" />
      <rect x="-6" y="-1" width="12" height="10" rx="3" fill="#5F4C6C" />
    </g>
  </defs>

  <path d="M -140 -60 Q -70 -50 0 -60 Q 110 -70 110 10" />
  <line x1="-70" y1="-15" x2="-70" y2="-55" />
  <line x1="30" y1="-25" x2="30" y2="-60" />
  <use class="b" href="#bulb" x="-120" y="-45" transform="rotate(5)" />
  <use class="b" href="#bulb" x="-70" y="-15" />
  <use class="b" href="#bulb" x="-20" y="-57" transform="rotate(-5)" />
  <use class="b" href="#bulb" x="30" y="-25" />

  <rect x="90" y="10" width="40" height="40" fill="lightgray" />
  <circle id="button" cx="110" cy="30" r="15" fill="red" />
</svg>
```

```css
.lights {
  fill: none;
  stroke: #5f4c6c;
  stroke-width: 2;
}

.lights #button {
  cursor: pointer;
}
```

</div>
