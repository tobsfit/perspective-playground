# Perspective Playground &#128302;

Playground to experiment with mouse movements. The images are from [placedog]((https://placedog.net/)). 

[View Demo](./public/perspective-raf.html)

For the module we have to provide:

1. **parent container** (there we messuere the mmouse-movement inside).
2. **child container** (the container we want to animate and listen to the mouse-movement from the parent).

You can provide a single `item` like that, or multiple `items`:

```js
// single items
const container = document.querySelector('body');
const item = document.querySelector('.container__inner');

let perspective = new Perspective({
  container,
  item,
  isRaf: true,
  dropshadow: false
}).init();
```

```js
// multiple items
const container = document.querySelector('body');
const items = document.querySelectorAll('.container__inner__item');

let perspective = new Perspective({
  container,
  items,
  isRaf: true,
  dropshadow: false
}).init();
```

Additionaly you can set the value for:

- `dropshadow` = `true` or `false`.
- `isRaf` ([requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)). If the value for `isRaf` is set to false, there will be an alternative variant with a counter, which updates the animation after ten mouse movements. 