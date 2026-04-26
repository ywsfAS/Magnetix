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
        btn.textContent = 'copied';
        setTimeout(() => {
            btn.textContent = 'copy';
        }, 3000);
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
// logo 
const newTimeline = new Magnetix.Timeline();
const logoMotion = Magnetix.svgMotion(".logo-svg", {
    duration: 12000,
    path: [
        {
            from: [0, 0],
            p1: [0, 300],        // go down
            p2: [600, 300],
            to: [800, 50]        // reach far right top
        },
        {
            from: [800, 50],
            p1: [800, 50],
            p2: [800, 50],
            to: [800, 50],
        },

        {
            from: [800, 50],
            p1: [800, 50],
            p2: [800, 50],
            to: [800, 50],
        },
        {
            from: [800, 50],
            p1: [800, -200],    // go up
            p2: [700, 200],
            to: [500, 200]       // middle peak
        },
        {
            from: [500, 200],
            p1: [200, 200],
            p2: [0, 100],
            to: [0, 0]          // back to origin
        }
    ],

    transform: {
        rotate: {
            value: 2880,
            easing: Easings.easeInOutQuad
        },
        scale: {
            value: 1.15,
            easing: Easings.easeInOutQuad
        }
    }
});
const slideBtn = Magnetix.svgMotion(".hero-ctas .btn-primary", {
    duration: 900,
    path: [{
        from: [8000, 0],
        p1: [2000, 0],        // go down
        p2: [1000, 0],
        to: [0, 0]        // reach far right top
    }],
    transform: {
        opacity: { value: 1, easing: Easings.easeInOutCubic },
    }
})
const slideRefBtn = Magnetix.svgMotion(".hero-ctas .btn-ghost", {
    duration: 1000,
    path: [{
        from: [8000, 0],
        p1: [4000, 0],
        p2: [2000, 0],
        to: [1000, 0]
    },
    {
        from: [1000, 0],
        p1: [900, 0],
        p2: [800, 0],
        to: [700, 0]
    },

    {
        from: [700, 0],
        p1: [500, 0],
        p2: [400, 0],
        to: [0, 0]
    }
    ],

    transform: {
        opacity: { value: 1, easing: Easings.easeInOutCubic },
        rotate: { value: 360, easing: Easings.easeInOutCubic },
    }
})

const slideGitBtn = Magnetix.svgMotion(".hero-ctas .btn-ghost.github", {
    duration: 1200,

    path: [
        {
            from: [8000, -4000],
            p1: [800, 0],
            p2: [750, 0],
            to: [700, 0]
        },

        {
            from: [700, 0],
            p1: [650, 0],
            p2: [600, 0],
            to: [550, 0]
        },
        {
            from: [500, 0],
            p1: [490, 0],
            p2: [480, 0],
            to: [470, 0]
        },

        {
            from: [460, 0],
            p1: [450, 0],
            p2: [440, 0],
            to: [430, 0]
        },

        {
            from: [420, 0],
            p1: [410, 0],
            p2: [400, 0],
            to: [400, 0]
        },

        {
            from: [400, 0],
            p1: [360, 0],
            p2: [280, 0],
            to: [200, 0]
        },

        {
            from: [200, 0],
            p1: [180, 0],
            p2: [120, 0],
            to: [100, 0]
        },

        {
            from: [100, 0],
            p1: [90, 0],
            p2: [60, 0],
            to: [40, 0]
        },

        {
            from: [40, 0],
            p1: [30, 0],
            p2: [15, 0],
            to: [0, 0]
        }
    ],

    transform: {
        opacity: {
            value: 1,
            easing: Easings.easeOutCubic
        },
        rotate: {
            value: 360,
            easing: Easings.easeInOutCubic
        }
    }
});
newTimeline.add(logoMotion, slideBtn, slideRefBtn, slideGitBtn);
newTimeline.play();