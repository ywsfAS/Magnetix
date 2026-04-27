import Magnetix from "../src/index.js";

const { Easings } = Magnetix;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.getElementById(s);


// 1. Magnetic
const magneticTimeline = new Magnetix.Timeline();
const magnetic = Magnetix.magnetic(".mag-circle");
magneticTimeline.add(magnetic).play();

// 2. Svg Motion
const svgMotionTimeline = new Magnetix.Timeline();
const svgMotion = Magnetix.svgMotion(".svg-mover", {
    duration: 10000,
    path: [
        { from: [0, 0], p1: [300, -200], p2: [600, 200], to: [300, 400] },
        { from: [300, 400], p1: [0, 600], p2: [-300, 200], to: [0, 0] },
        { from: [0, 0], p1: [-400, -300], p2: [-600, 300], to: [-200, 500] },
        { from: [-200, 500], p1: [200, 800], p2: [600, 400], to: [300, 0] },
        { from: [300, 0], p1: [0, -400], p2: [-300, -200], to: [0, 0] },
    ],
    transform: {
        rotate: { value: 720, easing: Easings.easeInOutQuad },
        scale: { value: 1.8, easing: Easings.easeInOutQuad },
    },
});
svgMotionTimeline.add(svgMotion).play();

// 3. Split Text
const splitTextTimeline = new Magnetix.Timeline();
const splitText = Magnetix.splitText(".split-word", "chars", {
    from: 0, to: 100,
    easing: Easings.easeInOutCubic,
    delay: 100, duration: 1000,
    transform: {
        scale: { value: 1.1, easing: Easings.easeInOutSine },
        rotate: { value: 360, easing: Easings.easeInOutQuad },
    },
});
splitTextTimeline.add(splitText).play();

// 4. Morph
const morphTimeline = new Magnetix.Timeline();
const morph = Magnetix.morph(".morph-path", {
    from: [
        { x: 60, y: 10 },
        { x: 90, y: 10 }, { x: 110, y: 30 }, { x: 110, y: 60 },
        { x: 110, y: 90 }, { x: 90, y: 110 }, { x: 60, y: 110 },
        { x: 30, y: 110 }, { x: 10, y: 90 }, { x: 10, y: 60 },
        { x: 10, y: 30 }, { x: 30, y: 10 }, { x: 60, y: 10 },
    ],
    to: [
        { x: 40, y: 10 },
        { x: 80, y: 10 }, { x: 110, y: 10 }, { x: 110, y: 40 },
        { x: 110, y: 80 }, { x: 110, y: 110 }, { x: 80, y: 110 },
        { x: 40, y: 110 }, { x: 10, y: 110 }, { x: 10, y: 80 },
        { x: 10, y: 40 }, { x: 10, y: 10 }, { x: 40, y: 10 },
    ],
    pointsCount: 50,
});
morphTimeline.add(morph).play();

// 5. Cursor Follow
const cursorTimeline = new Magnetix.Timeline();
const cursor = Magnetix.cursor(".cursor-follower");
cursorTimeline.add(cursor).play();

// 6. Drag
const dragTimeline = new Magnetix.Timeline();
const draggable = Magnetix.drag(".drag-box");
dragTimeline.add(draggable).play();


const masterTimeline = new Magnetix.Timeline();
masterTimeline.add(magnetic, svgMotion, splitText, morph, cursor, draggable);
masterTimeline.play();

// Track bars
const tracks = [
    $$("track1"), $$("track2"), $$("track3"),
    $$("track4"), $$("track5"), $$("tlFill"),
];
const tlPercent = $$("tlPercent");

const trackAnim = (el, tl) => ({
    totalDuration: Infinity,
    update() { el.style.width = (tl.progress() * 100) + "%"; },
});
const percentAnim = (el) => ({
    totalDuration: Infinity,
    update() { el.textContent = Math.round(svgMotionTimeline.progress() * 100) + "%"; },
});

const uiTimeline = new Magnetix.Timeline();
uiTimeline.add(tracks.map(trackAnim));
uiTimeline.add(percentAnim(tlPercent));
uiTimeline.play();

// Controls
$$("tlPlay").addEventListener("click", () => masterTimeline.play());
$$("tlPause").addEventListener("click", () => masterTimeline.pause());
$$("tlSeek25").addEventListener("click", () => masterTimeline.seek(0.25));
$$("tlSeek50").addEventListener("click", () => masterTimeline.seek(0.5));
$$("tlSeek75").addEventListener("click", () => masterTimeline.seek(0.75));

// Restart buttons — each resets its own timeline
$$("restart-svgMotion").addEventListener("click", () => { svgMotionTimeline.seek(0); });
$$("restart-splitText").addEventListener("click", () => { splitTextTimeline.seek(0) });
$$("restart-morph").addEventListener("click", () => { morphTimeline.seek(0) });


document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const code = btn.closest(".code-block").querySelector("pre").innerText;
        navigator.clipboard.writeText(code);
        btn.textContent = "copied";
        setTimeout(() => { btn.textContent = "copy"; }, 3000);
    });
});


let lastActive = null;
document.querySelectorAll(".nav-item").forEach((el) => {
    el.addEventListener("click", () => {
        lastActive?.classList.remove("active");
        el.classList.add("active");
        lastActive = el;
    });
});


const heroTimeline = new Magnetix.Timeline();

const logoMotion = Magnetix.svgMotion(".logo-svg", {
    duration: 12000,
    path: [
        { from: [0, 0], p1: [0, 300], p2: [600, 300], to: [800, 50] },
        { from: [800, 50], p1: [800, 50], p2: [800, 50], to: [800, 50] },
        { from: [800, 50], p1: [800, 50], p2: [800, 50], to: [800, 50] },
        { from: [800, 50], p1: [800, -200], p2: [700, 200], to: [500, 200] },
        { from: [500, 200], p1: [200, 200], p2: [0, 100], to: [0, 0] },
    ],
    transform: {
        rotate: { value: 2880, easing: Easings.easeInOutQuad },
        scale: { value: 1.15, easing: Easings.easeInOutQuad },
    },
});

const slideBtn = Magnetix.svgMotion(".hero-ctas .btn-primary", {
    duration: 900,
    path: [{ from: [8000, 0], p1: [2000, 0], p2: [1000, 0], to: [0, 0] }],
    transform: {
        opacity: { value: 1, easing: Easings.easeInOutCubic },
    },
});

const slideRefBtn = Magnetix.svgMotion(".hero-ctas .btn-ghost", {
    duration: 1000,
    path: [
        { from: [8000, 0], p1: [4000, 0], p2: [2000, 0], to: [1000, 0] },
        { from: [1000, 0], p1: [900, 0], p2: [800, 0], to: [700, 0] },
        { from: [700, 0], p1: [500, 0], p2: [400, 0], to: [0, 0] },
    ],
    transform: {
        opacity: { value: 1, easing: Easings.easeInOutCubic },
        rotate: { value: 360, easing: Easings.easeInOutCubic },
    },
});

const slideGitBtn = Magnetix.svgMotion(".hero-ctas .btn-ghost.github", {
    duration: 1200,
    path: [
        { from: [8000, -4000], p1: [800, 0], p2: [750, 0], to: [700, 0] },
        { from: [700, 0], p1: [650, 0], p2: [600, 0], to: [550, 0] },
        { from: [500, 0], p1: [490, 0], p2: [480, 0], to: [470, 0] },
        { from: [460, 0], p1: [450, 0], p2: [440, 0], to: [430, 0] },
        { from: [420, 0], p1: [410, 0], p2: [400, 0], to: [400, 0] },
        { from: [400, 0], p1: [360, 0], p2: [280, 0], to: [200, 0] },
        { from: [200, 0], p1: [180, 0], p2: [120, 0], to: [100, 0] },
        { from: [100, 0], p1: [90, 0], p2: [60, 0], to: [40, 0] },
        { from: [40, 0], p1: [30, 0], p2: [15, 0], to: [0, 0] },
    ],
    transform: {
        opacity: { value: 1, easing: Easings.easeOutCubic },
        rotate: { value: 360, easing: Easings.easeInOutCubic },
    },
});

heroTimeline.add(logoMotion, slideBtn, slideRefBtn, slideGitBtn);
heroTimeline.play();


const testTimeline = new Magnetix.Timeline();

const sections = Magnetix.reveal("section", {
    duration: 500,
    transform: {
        scale: { value: 1, easing: Easings.easeInOutQuad },
        opacity: { value: 1, easing: Easings.easeOutQuad },
        x: { value: 0, easing: Easings.easeOutQuad },
    },
});

const revealCard = Magnetix.reveal(".feature-card", {
    duration: 1000,
    delay: 1000,
    transform: {
        y: { value: -20, easing: Easings.easeInOutQuad },
        opacity: { value: 1, easing: Easings.easeInOutSine },
    },
});

const tipCards = Magnetix.reveal(".tip", {
    duration: 1000,
    delay: 300,
    transform: {
        scale: { value: 1, easing: Easings.easeInOutQuad },
        opacity: { value: 1, easing: Easings.easeOutQuad },
        x: { value: 0, easing: Easings.easeOutQuad },
    },
});

// Code boxes parallax
const slowParallax = Magnetix.parallax(".parallax-layer.slow", { speed: 1.01 });
const midParallax = Magnetix.parallax(".parallax-layer.mid", { speed: 2.02 });
const fastParallax = Magnetix.parallax(".parallax-layer.fast", { speed: 3.04 });

testTimeline.add(sections, revealCard, tipCards, slowParallax, midParallax, fastParallax);
testTimeline.play();