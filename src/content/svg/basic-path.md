---
day: 5
title: How to Draw Basic Paths with SVG
component: Arrow
description: In this example we draw a hamburger menu icon and simple arrow and learn how to draw basic paths with SVG.
next:
  title: How to use clip-path with SVG
  link: clip-path
---

Once we covered basic shapes, it's time to move on to the `path` element. The path is the most powerful SVG element. We can define pretty much anything with paths and if you open any SVG file, you will mostly see paths.

The shape of a path is defined by the `d` attribute. Here we define several drawing commands. A command always starts with a letter defining the command type and ends with a coordinate. 

Here we only have the two most basic commands, move-to and line-to. The move-to command moves the cursor to a point without drawing a line and the line-to command draws a straight line from the previous point. A command always continues the previous command. When we draw a line we only define the endpoint. The starting point will be the previous command’s endpoint.

### Hamburger menu icon

Before we get to the arrow example, let's draw a simple hamburger menu icon. We draw three lines within the same path with the move-to (`M`) and line-to (`L`) commands. First, we move to the start of the top line (`M -40, -40`) and draw a line to its end (`L 40, -40`).

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path 
    d="M -40, -40 L 40, -40"
    stroke="#333333"
    stroke-width="25"
    stroke-linecap="round" />
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
        M -40, -40
        L  40, -40"
    stroke="#333333"
    stroke-width="25"
    stroke-linecap="round"
  />
</svg>
```

</div>

Then we continue and draw to more lines the same way. What is cool about paths, is that they don't have to be continuous. We can have several move-to commands within the same path. The commas between the X and Y coordinates are optional. We skip them this time.

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path 
    d="M -40 -40 L 40 -40 M -40 0 L 40 0 M -40 40 L 40 40"
    stroke="#333333"
    stroke-width="25"
    stroke-linecap="round" />
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
        L  40 -40 
        M -40   0 
        L  40   0 
        M -40  40 
        L  40  40"
    stroke="#333333"
    stroke-width="25"
    stroke-linecap="round"
  />
</svg>
```

</div>

### Heart shape icon

Here's another example made with a move to command and two line to commands.

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path 
    d="M -30 -20 L 0 10 L 30 -20"
    fill="none"
    stroke="black"
    stroke-width="80"
    stroke-linecap="round"/>
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
        M -30 -20 
        L   0  10 
        L  30 -20"
    fill="none"
    stroke="black"
    stroke-width="80"
    stroke-linecap="round"
  />
</svg>
```

</div>

In the example above if we reduce the value of the `stroke-width` property, then we realize that the code above is actually a simple V shape.

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path 
    d="M -30 -20 L 0 10 L 30 -20"
    fill="none"
    stroke="black"
    stroke-width="10"
    stroke-linecap="round"/>
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
        M -30 -20 
        L   0  10 
        L  30 -20"
    fill="none"
    stroke="black"
    stroke-width="10"
    stroke-linecap="round"
  />
</svg>
```

</div>

### Exercise: How would you do a full-screen icon?

Did you know you can put not only videos on full screen but any other web elements as well? Click the icon below to see how it works.

How would you do the full-screen icon below?

Hint: You can always right-click on an SVG in the browser, select Inspect, and check its source code.

<style>
button {
  all: unset;
  cursor: pointer;
}
</style>

<div style="display: flex; gap: 10px; align-items: center">
<button id="fullscreen" onclick="toggleFullscreen()">
  <svg width="30" height="30">
    <path
      id="enter-fullscreen"
      stroke="black"
      stroke-width="3"
      fill="none"
      d="
        M 10, 2 L 2,2 L 2, 10
        M 20, 2 L 28,2 L 28, 10
        M 28, 20 L 28,28 L 20, 28
        M 10, 28 L 2,28 L 2, 20"
    />
    <path
      id="exit-fullscreen"
      stroke="transparent"
      stroke-width="3"
      fill="none"
      d="
        M 10, 2 L 10,10 L 2, 10
        M 20, 2 L 20,10 L 28, 10
        M 28, 20 L 20,20 L 20, 28
        M 10, 28 L 10,20 L 2, 20"
    />
  </svg>
</button>
<div>
Click this icon to open this page in full screen
</div>
</div>

<script>
  const enterFullscreen = document.getElementById("enter-fullscreen");
  const exitFullscreen = document.getElementById("exit-fullscreen");

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      enterFullscreen.setAttribute("stroke", "transparent");
      exitFullscreen.setAttribute("stroke", "black");
    } else {
      document.exitFullscreen();
      enterFullscreen.setAttribute("stroke", "black");
      exitFullscreen.setAttribute("stroke", "transparent");
    }
  }
</script>

### Arrow icon

Then to get to our example for today, we can draw an arrow in a very similar way. We start with a line in the middle, then we continue the line to draw the upper wing.

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path 
    d="M -70 0 L 70 0 L 30 -50"
    fill="none"
    stroke="#D1495B"
    stroke-width="25"
    stroke-linecap="round"
    stroke-linejoin="round"/>
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
        M -70 0 
        L 70 0 
        L 30 -50"
    fill="none"
    stroke="#D1495B"
    stroke-width="25"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

</div>

You might note that with the previous example, we also had a `stroke-linejoin` property to make the join rounded. It works in a similar way to `stroke-linecap` but that only affects the end of the lines. Without that property, the same line would look as follows.

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path 
    d="M -70 0 L 70 0 L 30 -50"
    fill="none"
    stroke="#D1495B"
    stroke-width="25"
    stroke-linecap="round"/>
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
        M -70 0 
        L 70 0 
        L 30 -50"
    fill="none"
    stroke="#D1495B"
    stroke-width="25"
    stroke-linecap="round"
  />
</svg>
```

</div>

Then we can finish the line with moving to the end of the horizontal line again, and drawing a straight line downwards to draw the lower wing of the arrow. You might notice that at the bottom of this and other pages in the navigation button we include a similar SVG.

<div class="code-flex">

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path
    d="M -70 0 L 70 0 L 30 -50 M 70 0 L 30 50"
    fill="none"
    stroke="#D1495B"
    stroke-width="25"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

</div>
