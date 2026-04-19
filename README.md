# Magnetix

A lightweight JavaScript animation engine with magnetic interactions, scroll parallax, reveal animations, and split-text effects.

## Installation

```bash
npm install
```

## Import

```js
import Magnetix from "./src/index.js";
const { Easings } = Magnetix;
```

## Structure

```
Magnetix/
├── src/
│   ├── core/
│   │   ├── engine.js
│   │   ├── ticker.js
│   │   ├── easing.js
│   │   └── motion.js
│   ├── features/
│   │   ├── reveal/
│   │   │   └── reveal.js
│   │   ├── parallax/
│   │   │   └── parallax.js
│   │   ├── magnetic/
│   │   │   └── magnetic.js
│   │   └── split-text/
│   │       └── split-text.js
│   └── index.js
├── demo/
│   ├── demo.html
│   └── demo.js
├── docs/
├── tests/
├── vitest.config.js
├── package.json
└── README.md
```

---

## API

### `createAnimation(config)`

Core time-based animation primitive.

```js
Magnetix.createAnimation({
  from: 0,
  to: 100,
  duration: 1000,
  delay: 500,
  easing: Easings.easeInOutCubic,
  onUpdate: (value) => {
    element.style.transform = `translateY(${value}px)`;
  }
});
```

| Option     | Type       | Description                       |
|------------|------------|-----------------------------------|
| `from`     | `number`   | Starting value                    |
| `to`       | `number`   | Ending value                      |
| `duration` | `number`   | Duration in milliseconds          |
| `delay`    | `number`   | Optional delay before start (ms)  |
| `easing`   | `function` | Easing function                   |
| `onUpdate` | `function` | Called every frame with `(value)` |

---

### `reveal(target, options)` → `{ pause, resume }`

Animates an element into view with per-property transforms and easings.

```js
const { pause, resume } = Magnetix.reveal(".box", {
  delay: 200,
  duration: 800,
  transform: {
    y:      { value: -120, easing: Easings.easeInOutCubic },
    x:      { value: 50,   easing: Easings.easeOutQuad    },
    scale:  { value: 0.8,  easing: Easings.easeOutBack    },
    rotate: { value: 360,  easing: Easings.easeInOutQuad  }
  }
});
```

**Transform properties:**

| Property | Unit | Description  |
|----------|------|--------------|
| `x`      | px   | Translate X  |
| `y`      | px   | Translate Y  |
| `scale`  | —    | Scale factor |
| `rotate` | deg  | Rotation     |

Each property accepts `{ value, easing }` for independent easing control.

**Returns:** `{ pause, resume }` — call to pause or resume the animation mid-flight.

```js
pause();
setTimeout(() => resume(), 3000);
```

---

### `splitText(target, mode, options)` → `{ pause, resume }`

Splits text into characters or words and animates each one with a staggered delay.

```js
const { pause, resume } = Magnetix.splitText(".title", "chars", {
  from: 0,
  to: 200,
  duration: 1200,
  delay: 100,
  easing: Easings.easeInOutCubic,
  transform: {
    scale:  { value: 2,   easing: Easings.linear },
    rotate: { value: 360, easing: Easings.linear  }
  }
});
```

| Option      | Type       | Description                         |
|-------------|------------|-------------------------------------|
| `mode`      | `string`   | `"chars"` or `"words"`              |
| `from`      | `number`   | Starting value passed to `onUpdate` |
| `to`        | `number`   | Ending value                        |
| `duration`  | `number`   | Duration per element (ms)           |
| `delay`     | `number`   | Stagger delay between elements (ms) |
| `easing`    | `function` | Default easing                      |
| `transform` | `object`   | Per-property `{ value, easing }`    |

**Returns:** `{ pause, resume }`

---

### `magnetic(element, options)`

Applies a magnetic pull effect toward the cursor.

```js
Magnetix.magnetic(element, {
  strength: 0.2,
  maxDistance: 120
});
```

| Option        | Default | Description                             |
|---------------|---------|-----------------------------------------|
| `strength`    | `0.3`   | Pull intensity (0–1)                    |
| `maxDistance` | `100`   | Cursor radius that activates the effect |

---

### `parallax(element, options)`

Shifts an element at a different speed during scroll.

```js
Magnetix.parallax(element, {
  speed: 0.3
});
```

| Option  | Default | Description                                          |
|---------|---------|------------------------------------------------------|
| `speed` | `0.5`   | Scroll multiplier — lower = slower, higher = faster  |

---

## Easings

```js
import Magnetix from "./src/index.js";
const { Easings } = Magnetix;
```

| Name               |
|--------------------|
| `linear`           |
| `easeInQuad`       |
| `easeOutQuad`      |
| `easeInOutQuad`    |
| `easeInCubic`      |
| `easeOutCubic`     |
| `easeInOutCubic`   |
| `easeOutBack`      |
| `easeInOutElastic` |

---

## Pause & Resume

`reveal` and `splitText` both return `{ pause, resume }` handles:

```js
const { pause, resume } = Magnetix.reveal(".box", { ... });

setTimeout(() => {
  pause();
  setTimeout(() => resume(), 3000);
}, 100);
```

---

## Testing

```bash
npx vitest
```