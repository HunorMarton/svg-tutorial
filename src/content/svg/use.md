---
day: 7
title: How to reuse image elements with SVG
component: Snowflake
description: In this example we draw a Snowflake with SVG, learn how to draw basic paths and how to reuse image elements.
---

Instead of repeating the same code over and over again we can also reuse image elements.

### How to draw a Sun icon with SVG

Let's draw simple sun icon. We start with a circle element to draw the core of the sun, and we draw a line to draw a sunray.

<div class="grid-200">

<svg width="200" height="200" viewBox="-15 -15 30 30">
  <circle r="6" />
  <line id="ray" stroke="black" stroke-width="2" stroke-linecap="round" x1="0" y1="11" x2="0" y2="14" />
</svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200" 
  height="200" 
  viewBox="-15 -15 30 30"
>
  <circle r="6" />

  <line
    stroke="black"
    stroke-width="2"
    stroke-linecap="round"
    x1="0"
    y1="11"
    x2="0"
    y2="14"
  ></line>
</svg>
```

</div>

Now, once we have one ray, we can reuse the same line element to draw the others. We can give this ray an `id` and reuse it with the `use` element.

Then, we can move the lines to their correct position with the `transform` command in the same way we did with [the star example](/svg/transform), except that this time, we increment the rotation by 45 degrees for each ray.

<div class="grid-200">

<svg width="200" height="200" viewBox="-15 -15 30 30">
  <circle r="6" />
  <line id="ray" stroke="black" stroke-width="2" stroke-linecap="round" x1="0" y1="11" x2="0" y2="14" />
  <use href="#ray" transform="rotate(45)" />
  <use href="#ray" transform="rotate(90)" />
  <use href="#ray" transform="rotate(135)" />
  <use href="#ray" transform="rotate(180)" />
  <use href="#ray" transform="rotate(225)" />
  <use href="#ray" transform="rotate(270)" />
  <use href="#ray" transform="rotate(315)" />
</svg>

<!-- prettier-ignore -->
```html
<svg 
  width="200" 
  height="200" 
  viewBox="-15 -15 30 30"
>
  <circle r="6" />

  <line
    id="ray"
    stroke="black"
    stroke-width="2"
    stroke-linecap="round"
    x1="0"
    y1="11"
    x2="0"
    y2="14"
  ></line>

  <use 
    href="#ray" 
    transform="rotate(45)" />
  <use 
    href="#ray" 
    transform="rotate(90)" />
  <use 
    href="#ray"
    transform="rotate(135)" />
  <use 
    href="#ray"
    transform="rotate(180)" />
  <use 
    href="#ray" 
    transform="rotate(225)" />
  <use 
    href="#ray"
    transform="rotate(270)" />
  <use 
    href="#ray"
    transform="rotate(315)" />
</svg>
```

</div>

You can use the Sun icon above and the [Moon icon](/svg/arc) we are about to cover later to create a toggle button that can switch between bright and dark modes. Check out this [YouTube tutorial](https://youtu.be/GUSUA72t7p0) to learn how.

### How to Draw a Snowflake with SVG

We can use the same technique to define a branch of a snowflake and then reuse it six times to draw a snowflake.

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

The finished branch looks like this:

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

Once we defined a branch, we can reuse it multiple times with the `use` command.

<div class="code-flex">

```html
<svg width="200" height="200" viewBox="-100 -100 200 200">
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

  <use href="#branch" transform="rotate(60)" />
  <use href="#branch" transform="rotate(120)" />
  <use href="#branch" transform="rotate(180)" />
  <use href="#branch" transform="rotate(240)" />
  <use href="#branch" transform="rotate(300)" />
</svg>
```

</div>
