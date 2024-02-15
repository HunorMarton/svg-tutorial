---
day: 7
title: How to reuse image elements with SVG
component: Snowflake
description: In this example we draw a Snowflake with SVG, learn how to draw basic paths and how to reuse image elements.
---

### How to Draw a Snowflake with SVG

Instead of repeating the same code over and over again we can also create a definition for a shape and reuse it. Here we define a branch of a snowflake and then use it six times with different rotations.

The branch is defined as a `path`. Earlier we already covered [how to draw basic paths](/svg/basic-path). Here we draw the branch in a similar way. We can draw a simple line – the main branch – by using the move to (`M`) and line to (`L`) commands:

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

Then we can move the entire branch path into the `defs` section. The `defs` section is a hidden compartment of our image. Things here don't show up on the screen, but we can refer to them and use them later.

Once we defined a branch, we can reuse it multiple times with the `use` command the following way.

Then we can move the individual branches to their correct position with the `transform` command in the same way as we did with [the star example](/svg/transform).

<div class="code-flex">

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

</div>
