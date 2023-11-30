---
title: "Day 7: Snowflake"
component: Snowflake
previous:
  title: Transform
  link: transform
next:
  title: How to draw a Forest?
  link: forest
---

Instead of repeating the same code over and over again we can also create a definition for a shape and reuse it. Here we define a branch of a snowflake and then use it six times with different rotations.

### Paths

The branch is defined as a `path`. The path is the most powerful SVG tag. We can define pretty much anything with paths and if you open any SVG file, you will see paths mostly.

The shape of the path is defined by the `d` attribute. Here we define several drawing commands. A command always starts with a letter defining the command type and ends with a coordinate. Here we only have the two most simple commands, move to and line to. The move to command moves the cursor to a point without drawing a line and the line to command draws a straight line from the previous point. A command always continues the previous command so when we draw a line we only define the endpoint. The starting point will be the previous command’s endpoint. This path is a bit unusual because there are several move to commands in it to draw the main branch and each side branches with the same path.

We can draw a simple line – the main branch – by using the move to (`M`) and line to (`L`) commands:

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path d="M 0 0 L 0 -90" stroke="#E5C39C" stroke-width="5" />
</svg>

<!-- prettier-ignore -->
```html
<svg
  width="200"
  height="200"
  viewBox="-100 -100 200 200"
>
  <path
    d="M 0 0 L 0 -90"
    stroke="#E5C39C"
    stroke-width="5"
  />
</svg>
```

</div>

Then we can continue drawing, and add a side branch by adding another move to and line to commands:

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
  <path d="M 0 0 L 0 -90 M 0 -20 L 20 -34" stroke="#E5C39C" stroke-width="5" />
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
      M 0 0 L 0 -90 
      M 0 -20 L 20 -34"
    stroke="#E5C39C"
    stroke-width="5"
  />
</svg>
```

</div>

The finished branch would look like this:

<div class="grid-200">

<svg width="200" height="200" viewBox="-100 -100 200 200">
    <path
      id="branch"
      d="
        M 0   0 L 0 -90
        M 0 -20 L 20 -34
        M 0 -20 L -20 -34
        M 0 -40 L 20 -54
        M 0 -40 L -20 -54
        M 0 -60 L 20 -74
        M 0 -60 L -20 -74"
      stroke="#E5C39C"
      stroke-width="5"
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
    id="branch"
    d="
        M 0   0 L   0 -90
        M 0 -20 L  20 -34
        M 0 -20 L -20 -34
        M 0 -40 L  20 -54
        M 0 -40 L -20 -54
        M 0 -60 L  20 -74
        M 0 -60 L -20 -74"
    stroke="#E5C39C"
    stroke-width="5"
  />
</svg>
```

</div>

### Reusing image elements

Then we can move the entire branch path into the `defs` section and reuse it multiple times with the `use` command the following way.

Then we can move the individual branches to their correct position with the `transform` command in the same way as we did with <a href="/svg/transform/">the star example</a>.

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
  <defs>
    <path
      id="branch"
      d="
        M 0 0 L 0 -90
        M 0 -20 L 20 -34
        M 0 -20 L -20 -34
        M 0 -40 L 20 -54
        M 0 -40 L -20 -54
        M 0 -60 L 20 -74
        M 0 -60 L -20 -74"
      stroke="#E5C39C"
      stroke-width="5"
    />
  </defs>

  <use href="#branch" />
  <use href="#branch" transform="rotate(60)" />
  <use href="#branch" transform="rotate(120)" />
  <use href="#branch" transform="rotate(180)" />
  <use href="#branch" transform="rotate(240)" />
  <use href="#branch" transform="rotate(300)" />
</svg>
```
