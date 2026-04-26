import Magnetix from "../src/index.js";

const { Easings } = Magnetix;
const timeline = new Magnetix.Timeline();

// 1. Magnetic Element
const magnetic = Magnetix.magnetic(".mag-circle");
// 2. Svg Motion
const svgMotion = Magnetix.svgMotion(".svg-mover", {
    duration: 10000,
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
// 3. Split text
const splitText = Magnetix.splitText(".split-word", "chars", {
    from: 0,
    to: 100,
    easing: Easings.easeInOutCubic,
    delay: 100,
    duration: 1000,
    transform: {
        scale: { value: 1.1, easing: Easings.easeInOutSine },
        rotate: { value: 360, easing: Easings.easeInOutQuad },
    }
});
// 4. Morph 
const morph = Magnetix.morph(".morph-path", {
    from: [{ x: 60, y: 10 },   // M (start)

    { x: 90, y: 10 },
    { x: 110, y: 30 },
    { x: 110, y: 60 },

    { x: 110, y: 90 },
    { x: 90, y: 110 },
    { x: 60, y: 110 },

    { x: 30, y: 110 },
    { x: 10, y: 90 },
    { x: 10, y: 60 },

    { x: 10, y: 30 },
    { x: 30, y: 10 },
    { x: 60, y: 10 }],
    to: [
        { x: 40, y: 10 },

        { x: 80, y: 10 },
        { x: 110, y: 10 },
        { x: 110, y: 40 },

        { x: 110, y: 80 },
        { x: 110, y: 110 },
        { x: 80, y: 110 },

        { x: 40, y: 110 },
        { x: 10, y: 110 },
        { x: 10, y: 80 },

        { x: 10, y: 40 },
        { x: 10, y: 10 },
        { x: 40, y: 10 }
    ],
    pointsCount: 50,
});
// 5. cursor follow
const cursor = Magnetix.cursor(".cursor-follower");
// 6. drag 
const draggable = Magnetix.drag(".drag-box");
// Add all sequences to the timeline
timeline.add(magnetic, svgMotion, splitText, morph, cursor, draggable);

// Play the timeline
timeline.play();

const $$ = (s) => document.getElementById(s);
// TimeLine section
const tlPlayBtn = $$("tlPlay");
const tlPauseBtn = $$("tlPause");
const tlSeek25 = $$("tlSeek25");
const tlSeek50 = $$("tlSeek50");
const tlSeek75 = $$("tlSeek75");
// timeline track bars
let isPaused = false;
// tracks
const tracks = [];
const svgMotionTrack = $$("track1");
const magneticMotionTrack = $$("track2");
const splitTextMotionTrack = $$("track3");
const morphTrack = $$("track4");
const cursorTrack = $$("track5");
const tlBarTrack = $$("tlFill");
const tlPercent = $$("tlPercent");
tracks.push(svgMotionTrack, magneticMotionTrack, splitTextMotionTrack, morphTrack, cursorTrack, tlBarTrack);
const anim = (el) => ({
    totalDuration: Infinity, update() {
        let progress = timeline.progress();
        el.style.width = (progress * 100) + '%';
    }
});
const percentAnim = (el) => ({
    totalDuration: Infinity, update() {
        let progress = timeline.progress() * 100;
        let roundedProg = Math.round(progress);
        el.textContent = roundedProg + '%';
    }
})
const animationTracks = tracks.map(anim);

timeline.add(animationTracks);
timeline.add(percentAnim(tlPercent));
const totalDuration = timeline.totalDuration;
// Play btn
tlPlayBtn.addEventListener('click', () => {
    timeline.play();
})
// Pause btn
tlPauseBtn.addEventListener('click', () => {
    timeline.pause();
    isPaused = true;
})

// Seek 25% btn
tlSeek25.addEventListener('click', () => {
    timeline.seek(0.25);
})

// Seek 50% btn
tlSeek50.addEventListener('click', () => {
    timeline.seek(0.5);
})

// Seek 75% btn
tlSeek75.addEventListener('click', () => {
    timeline.seek(0.75);
})
// copy btn
const btns = document.querySelectorAll(".copy-btn");
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const code = btn.closest('.code-block').querySelector("pre").innerText;
        navigator.clipboard.writeText(code);
    })
})
// nav links active state
const links = document.querySelectorAll(".nav-item");
let lastActive = links[0];
links.forEach((el) => {
    el.addEventListener('click', () => {
        if (lastActive) {
            lastActive.classList.remove('active');
        };
        // add active class
        el.classList.add('active');
        lastActive = el;
    })

})