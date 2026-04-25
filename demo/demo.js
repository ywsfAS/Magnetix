import Magnetix from "../src/index.js";

const { Easings } = Magnetix;
const timeline = new Magnetix.Timeline();

// 1. Complex Path Motion
const motion = Magnetix.svgMotion(".box", {
    duration: 12000,
    path: [
        { from: [0, 0], p1: [300, -200], p2: [600, 200], to: [300, 400] },
        { from: [300, 400], p1: [0, 600], p2: [-300, 200], to: [0, 0] },
        { from: [0, 0], p1: [-400, -300], p2: [-600, 300], to: [-200, 500] },
        { from: [-200, 500], p1: [200, 800], p2: [600, 400], to: [300, 0] },
        { from: [300, 0], p1: [0, -400], p2: [-300, -200], to: [0, 0] }
    ],
    transform: {
        rotate: { value: 720, easing: Easings.easeInOutQuad },
        scale: { value: 1.8, easing: Easings.easeInOutQuad }
    }
});

// 2. Secondary Path Motion
const motion1 = Magnetix.svgMotion(".box", {
    duration: 12000,
    path: [
        { from: [0, 0], p1: [100, -200], p2: [600, 200], to: [0, 0] },
        { from: [0, 0], p1: [300, -200], p2: [600, 200], to: [300, 400] },
    ],
    transform: {
        rotate: { value: 720, easing: Easings.easeInOutQuad },
        scale: { value: 1.8, easing: Easings.easeInOutQuad }
    }
});

// 3. Tertiary Path Motion
const motion2 = Magnetix.svgMotion(".box", {
    duration: 12000,
    path: [
        { from: [0, 0], p1: [170, -800], p2: [300, 200], to: [0, 0] },
    ],
    transform: {
        rotate: { value: 720, easing: Easings.easeInOutQuad },
        scale: { value: 1.8, easing: Easings.easeInOutQuad }
    }
});

// 4. Magnetic Element
const motion3 = Magnetix.magnetic(".circle");

// 5. Split Text
const motion4 = Magnetix.splitText(".title", "chars", {
    from: 0,
    to: 100,
    easing: Easings.easeInOutCubic,
    delay: 100,
    duration: 1200,
    transform: {
        scale: 2,
        rotate: 360,
    }
});
const motion5 = Magnetix.morph(".shape");
const motion6 = Magnetix.cursor(".cursor", { speed: 0.09 });
const motion7 = Magnetix.drag(".drag");
// Add all sequences to the timeline
timeline.add(motion7, motion6, motion5, motion, motion1, motion2, motion3, motion4);

// Play the timeline
timeline.play();

// Interactive button to demonstrate timeline.seek() API
const $$ = (s) => document.getElementById(s);
$$('seekBtn').addEventListener('click', () => {
    timeline.seek(0.5);
});

$$('PlayBtn').addEventListener('click', () => {
    timeline.play();
});

$$('PauseBtn').addEventListener('click', () => {
    timeline.pause();
});