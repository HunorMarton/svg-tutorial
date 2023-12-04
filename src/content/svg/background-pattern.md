---
day: 21
title: How to Create Background Patterns with SVG and CSS
component: Background
description: In this example we learn how to create background patterns with SVG and CSS.
id: background-pattern
previous:
  title: Snowing
  link: snowing
next:
  title: How to Draw a Clock that Shows the Actual Time with SVG and JavaScript
  link: clock
---

This example is a bit of an easter egg because we only have a regular HTML element in our document here. For any HTML element, you can set a `background-image` with CSS. For this CSS property, we usually provide a link to an image, but we can also inline one in CSS.

Normally you wouldn't do that, because you end up with something gibberish in your CSS. If we do that with an SVG though then it’s not that cryptic. This SVG code is still character-encoded, so that’s why you still see some weird parts. The pointy brackets and the hastag key have to be escaped here.

<div class="code-flex">

```html
<div class="background" />
```

```css
.background {
  background-color: #38755b;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 120 120'%3E%3Cpolygon fill='%230c5c4c' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E");
}
```

</div>

If we look under the hood, this is the image we define in CSS. Because the `background-image` is repeating by default, we only have to define one tile. You might also note that this image doesn't even have a background color set. We also define that in CSS.

Also note, that because this image is not defined as part of the HTML document structure, we also need to set the `xmlns` property.

<div class="grid-200">

<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 120 120'><polygon fill='#0c5c4c' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/></svg>

<!-- prettier-ignore -->
```html
<svg 
  xmlns='http://www.w3.org/2000/svg' 
  width="50"
  height="50"
  viewBox="0 0 120 120"
>
  <polygon 
    fill="#0c5c4c"
    points="
      120 120 60 120 
      90 90 120 60 
      120 0 120 0 
      60 60 0 0 
      0 60 30 90 
      60 120 120 120"
  />
</svg>
```

</div>

This is a great way to create background patterns with only a few lines of code in CSS. If you like this idea check out <a href="svgbackgrounds.com" target="_blank" rel="noopener">svgbackgrounds.com</a> for a lot more great patterns.
