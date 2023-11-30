---
title: "Day 22: Clock"
component: Clock
previous:
  title: Background patterns
  link: background-pattern
next:
  title: How to add Interaction?
  link: interaction
---

SVG elements can be manipulated from JavaScript the same way as any other HTML tag. In this example, we are using a short code snipped to show the actual time on a clock. We access the hour and minute hands in JavaScript with `getElementById` then set their `transform` attribute with a rotation that reflects the current time.

There’s another trick here worth mentioning. The dots here showing each hour are drawn as a dashed circle. This works similarly as we can set the `border-style` CSS property for regular HTML elements, but more sophisticated. In SVG we can fine-tune the length of each dash segment and the space in between with the `stroke-dasharray` property. We can also set an offset with `stroke-dashoffset`. That’s what we use here to show the dots for each hour.

<div class="code-flex">

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <rect x="-100" y="-100" width="200" height="200" fill="#CD803D" />

  <circle r="55" stroke="#FCCE7B" stroke-width="10" fill="white" />

  <circle
    r="45"
    stroke="#B6705F"
    stroke-width="6"
    stroke-dasharray="6 17.56194490192345"
    stroke-dashoffset="3"
    fill="none"
  />

  <g stroke="#5f4c6c" stroke-linecap="round">
    <line id="hours" y2="-20" stroke-width="8" />
    <line id="minutes" y2="-35" stroke-width="6" />
  </g>
</svg>
```

```html
<script>
  window.addEventListener("DOMContentLoaded", () => {
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");

    const hour = new Date().getHours() % 12;
    const minute = new Date().getMinutes();

    hoursElement.setAttribute("transform", `rotate(${(360 / 12) * hour})`);
    minutesElement.setAttribute("transform", `rotate(${(360 / 60) * minute})`);
  });
</script>
```

</div>
