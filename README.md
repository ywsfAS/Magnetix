# Magnetix

A simple animation engine built on `requestAnimationFrame`.

---

## Features

* Single animation loop (no multiple `requestAnimationFrame`)
* Central engine to manage animations
* Config-based animation system
* Easing functions support
* Easy to extend

---

## Usage

```js
import { createAnimation } from "./core/motion.js";
import Easings from "./core/easings.js";

createAnimation({
  from: 0,
  to: 100,
  duration: 1000,
  easing: Easings.easeOutQuad,
  onUpdate: (value) => {
    element.style.transform = `translateY(${value}px)`;
  }
});
```

---

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
│   │   ├── reveal/
│   │   │   └── reveal.js
│   │   │
│   │   ├── parallax/
│   │   │
│   │   ├── magnetic/
│   │   │
│   │   └── split-text/
│
├── demo/
│   ├── demo.html
│   └── demo.js
│
├── docs/
├── tests/
├── dist/
└── README.md
```

---

## API

### `createAnimation(config)`

| Property   | Description                               |
| ---------- | ----------------------------------------- |
| `from`     | Starting value                            |
| `to`       | Ending value                              |
| `duration` | Animation duration (ms)                   |
| `easing`   | Optional easing function                  |
| `onUpdate` | Called every frame with the updated value |

---

## Status

* Core system is complete
* Next steps:

  * Reveal animations
  * Parallax effects
  * Timeline system
