<div align="center">

<!-- Logo SVG -->
# Magnetix
<svg width="160" height="32" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6"   y="8" width="8"  height="8"  transform="rotate(45 10 12)"  fill="#111" opacity="0.9"/>
  <rect x="56"  y="7" width="10" height="10" transform="rotate(45 61 12)"  fill="#111"/>
  <rect x="106" y="8" width="8"  height="8"  transform="rotate(45 110 12)" fill="#111" opacity="0.9"/>
  <line x1="14" y1="12" x2="56"  y2="12" stroke="#111" stroke-width="1.5" opacity="0.7"/>
  <line x1="66" y1="12" x2="106" y2="12" stroke="#111" stroke-width="2"   opacity="0.9"/>
</svg>



<p>
  <img src="https://img.shields.io/badge/animation-engine-00d4ff?style=for-the-badge" />
  <img src="https://img.shields.io/badge/javascript-ES6+-f7df1e?style=for-the-badge&logo=javascript" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/status-active-success?style=for-the-badge" />
</p>

A lightweight, modular JavaScript animation engine for timelines, SVG path motion,
scroll effects, and interactive UI animations.

</div>

---

## Features

- Timeline-based animation system with full playback control
- SVG path motion along cubic Bezier curves
- Scroll-triggered reveal animations via IntersectionObserver
- Scroll-relative parallax with viewport-centered offset
- Split text animations by character or word with per-property easing
- Magnetic hover interactions with configurable strength and falloff
- Drag interactions
- Cursor follower system
- Repeat and Yoyo loop support
- High-performance frame engine

---

## Installation

```bash
npm install
```

---

## Quick Start

```js
import Magnetix from "./src/index.js";
const { Easings } = Magnetix;

const tl = new Magnetix.Timeline();

const anim = Magnetix.createAnimation({
  from: 0,
  to: 100,
  duration: 1000,
  easing: Easings.easeOutCubic,
  onUpdate: (value) => {
    element.style.transform = `translateY(${value}px)`;
  }
});

tl.add(anim);
tl.play();
```

---

## Project Structure

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
│   │   ├── parallax/
│   │   ├── magnetic/
│   │   ├── split-text/
│   │   ├── morph/
│   │   ├── drag/
│   │   └── cursor/
│   └── index.js
├── demo/
├── docs/
├── tests/
├── vitest.config.js
├── package.json
└── README.md
```

---

## API Reference

### Timeline

The Timeline is the single clock that drives all animations. Every animation added to it receives its local time from the timeline — enabling unified pause, seek, and playback control across all features.

```js
const tl = new Magnetix.Timeline();

tl.add(animation);
tl.play();
tl.pause();
tl.seek(0.5);   // jump to 50%
```

| Method       | Description                        |
|--------------|------------------------------------|
| `add()`      | Add one or more animation objects  |
| `play()`     | Start or resume the timeline       |
| `pause()`    | Freeze the timeline                |
| `seek(p)`    | Jump to a progress value (0 to 1)  |
| `progress()` | Return current progress (0 to 1)   |
| `reset()`    | Return to time zero and pause      |

---

### createAnimation(config)

Low-level animation primitive. Produces a timeline-compatible object that maps local time to a value.

```js
Magnetix.createAnimation({
  from: 0,
  to: 200,
  duration: 800,
  delay: 100,
  easing: Easings.easeInOutCubic,
  repeat: 2,
  yoyo: true,
  onUpdate: (value, progress) => {}
});
```

| Option     | Type       | Default    | Description                           |
|------------|------------|------------|---------------------------------------|
| `from`     | `number`   | —          | Start value                           |
| `to`       | `number`   | —          | End value                             |
| `duration` | `number`   | —          | Duration in milliseconds              |
| `delay`    | `number`   | `0`        | Delay before the animation begins     |
| `easing`   | `function` | `linear`   | Easing function                       |
| `repeat`   | `number`   | `0`        | Number of additional cycles           |
| `yoyo`     | `boolean`  | `false`    | Reverse direction on alternate cycles |
| `onUpdate` | `function` | —          | Called every frame with `(value, progress)` |

---

### svgMotion(selector, config)

Animates an element along a sequence of cubic Bezier path segments.

```js
Magnetix.svgMotion(".box", {
  duration: 2000,
  path: [
    {
      from: [0, 0],
      p1:   [120, -80],
      p2:   [240,  80],
      to:   [360,   0]
    }
  ],
  transform: {
    rotate:  { value: 360, easing: Easings.easeInOutQuad },
    scale:   { value: 1.2, easing: Easings.easeInOutSine },
    opacity: { value: 1,   easing: Easings.easeOutCubic  }
  }
});
```

Each path segment defines a cubic Bezier curve via `from`, `p1`, `p2`, `to` as `[x, y]` pairs. Segments are joined sequentially and the overall progress is distributed evenly across them.

---

### reveal(selector, config)

Animates elements into view when they enter the viewport. Each element gets its own elapsed clock that starts only after it becomes visible, so late-scrolling users always see the full animation regardless of how far the timeline has advanced.

```js
Magnetix.reveal(".card", {
  duration: 800,
  delay: 150,
  transform: {
    y:       { value: -40, easing: Easings.easeOutQuad   },
    opacity: { value: 1,   easing: Easings.easeInOutSine }
  }
});
```

| Option      | Type     | Default | Description                              |
|-------------|----------|---------|------------------------------------------|
| `duration`  | `number` | —       | Animation duration per element (ms)      |
| `delay`     | `number` | `0`     | Stagger delay between elements (ms)      |
| `transform` | `object` | —       | Per-property `{ value, easing }` targets |

**Transform properties:** `x`, `y`, `scale`, `rotate`, `opacity`

---

### parallax(selector, config)

Shifts elements relative to their position in the document as the user scrolls. The offset is zero when the element center is at the viewport center and grows in proportion to the scroll distance from that point.

```js
Magnetix.parallax(".layer", { speed: 1.5 });
```

| Option  | Default | Description                                              |
|---------|---------|----------------------------------------------------------|
| `speed` | `0.3`   | Parallax intensity. Values below 1 feel like background layers; values above 1 feel like foreground layers. |

Accepts `querySelectorAll` — all matched elements are handled by a single returned object.

---

### splitText(selector, mode, config)

Splits an element's text into characters or words, wraps each in a `span`, and animates them with a staggered delay.

```js
Magnetix.splitText(".title", "chars", {
  from: 0,
  to: 100,
  duration: 1000,
  delay: 50,
  easing: Easings.easeOutCubic,
  transform: {
    scale:  { value: 1.2, easing: Easings.easeInOutSine },
    rotate: { value: 360, easing: Easings.easeInOutQuad }
  }
});
```

| Option      | Type       | Description                              |
|-------------|------------|------------------------------------------|
| `mode`      | `string`   | `"chars"` or `"words"`                   |
| `from`      | `number`   | Start value                              |
| `to`        | `number`   | End value                                |
| `duration`  | `number`   | Duration per element (ms)               |
| `delay`     | `number`   | Stagger delay between elements (ms)     |
| `easing`    | `function` | Default easing                          |
| `transform` | `object`   | Per-property `{ value, easing }` targets |

---

### magnetic(selector, config)

Pulls an element toward the cursor when it enters the configured radius. The force scales linearly from zero at `maxDistance` to `strength` at the cursor position.

```js
Magnetix.magnetic(".btn", {
  strength:    0.3,
  maxDistance: 120
});
```

| Option        | Default | Description                                |
|---------------|---------|--------------------------------------------|
| `strength`    | `0.3`   | Pull intensity                             |
| `maxDistance` | `200`   | Cursor radius that activates the effect (px) |

---

### drag(selector)

Makes an element draggable within the page.

```js
Magnetix.drag(".box");
```

---

### morph(selector, config)

Interpolates an SVG path's points from one shape to another.

```js
Magnetix.morph(".path", {
  from: [ /* array of {x, y} points */ ],
  to:   [ /* array of {x, y} points */ ],
  pointsCount: 50
});
```

---

### cursor(selector)

Attaches an element to follow the cursor position.

```js
Magnetix.cursor(".cursor-follower");
```

---

## Easings

```js
const { Easings } = Magnetix;
```

| Name                 |
|----------------------|
| `linear`             |
| `easeInQuad`         |
| `easeOutQuad`        |
| `easeInOutQuad`      |
| `easeInCubic`        |
| `easeOutCubic`       |
| `easeInOutCubic`     |
| `easeInSine`         |
| `easeOutSine`        |
| `easeInOutSine`      |
| `easeInExpo`         |
| `easeOutExpo`        |
| `easeInOutExpo`      |
| `easeOutBack`        |
| `easeInOutElastic`   |

---

## Rules and Patterns

### One instance per timeline

Each animation object should belong to only one timeline. Creating a new animation per timeline is the correct pattern.

```js
// Wrong
timelineA.add(anim);
timelineB.add(anim);

// Correct
timelineA.add(Magnetix.svgMotion(...));
timelineB.add(Magnetix.svgMotion(...));
```

### Infinite-duration animations

Features like `parallax`, `magnetic`, `cursor`, and `drag` return `totalDuration: Infinity`. Adding any of these to a timeline sets that timeline's total duration to `Infinity`, which disables clamping and lets `currentTime` grow indefinitely. Finite animations added alongside them are unaffected and still receive correct local time.

### Restart pattern

```js
timeline.seek(0);
timeline.play();
```

### Per-feature timelines

For independent restart buttons or isolated playback control, give each feature its own timeline rather than sharing a master timeline.

```js
const svgTimeline = new Magnetix.Timeline();
svgTimeline.add(Magnetix.svgMotion(...)).play();

const splitTimeline = new Magnetix.Timeline();
splitTimeline.add(Magnetix.splitText(...)).play();
```

---

## Testing

```bash
npx vitest
```