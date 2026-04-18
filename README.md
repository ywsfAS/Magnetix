# Magnetix

A simple animation engine.



## Features


* Central engine to manage all motion
* Time-based animations
* Reveal animations with transforms (x, y, scale, rotate)
* Magnetic mouse interaction
* Parallax scroll effect
* Easing functions support
* Works with multiple elements
* Easy to extend


## Usage

```js
import { createAnimation } from "./core/motion.js";
import Easings from "./core/easings.js";

createAnimation({
  from: 0,
  to: 100,
  duration: 800,
  easing: Easings.easeOutQuad,
  onUpdate: (value) => {
    element.style.transform = `translateY(${value}px)`;
  }
});

```

## Reveal

```js
Motion.reveal(element, {
  delay: 200,
  duration: 800,

  x: 50,
  y: 100,
  scale: 0.8,
  rotate: 10
});

Properties

x        translate X (px)
y        translate Y (px)
scale    scale value
rotate   rotation (deg)
```

## Magnetic
```js
Motion.magnetic(element, {
  strength: 0.2,
  maxDistance: 120
});

```

## Parallax
```js
Motion.parallax(element, {
  speed: 0.3
});

```

## API
```js
createAnimation(config)

from       starting value
to         ending value
duration   duration in ms
delay      optional delay before start
easing     easing function
onUpdate   runs every frame

```


## Structure

```bash
Magnetix/

├── src/
│   ├── core/
│   │   ├── engine.js
│   │   ├── ticker.js
│   │   └── motion.js
│   │
│   ├── features/
│       ├── reveal/
│       │   └── reveal.js
│       │
│       ├── parallax/
|       |    └── parallex.js
│       │
│       ├── magnetic/
|       |    └── magnetic.js
│       |  
│       └── split-text/
│
├── demo/
│   ├── demo.html
│   └── demo.js
│
├── docs/
├── tests/ (vitest)
├── .gitignore
|── package.json
|── vitest.config.js
└── README.md
```
