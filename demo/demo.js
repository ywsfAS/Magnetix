import Magnetix from "../src/index.js";
const { Easings } = Magnetix;

const timeline = new Magnetix.Timeline();
const motion = Magnetix.svgMotion(".box", {
    duration: 12000,

    path: [
        {
            from: [0, 0],
            p1: [300, -200],
            p2: [600, 200],
            to: [300, 400]
        },
        {
            from: [300, 400],
            p1: [0, 600],
            p2: [-300, 200],
            to: [0, 0]
        },
        {
            from: [0, 0],
            p1: [-400, -300],
            p2: [-600, 300],
            to: [-200, 500]
        },
        {
            from: [-200, 500],
            p1: [200, 800],
            p2: [600, 400],
            to: [300, 0]
        },
        {
            from: [300, 0],
            p1: [0, -400],
            p2: [-300, -200],
            to: [0, 0]
        }
    ],

    transform: {
        rotate: { value: 720, easing: Easings.easeInOutQuad },
        scale: { value: 1.8, easing: Easings.easeInOutQuad }
    }
});

const motion1 = Magnetix.svgMotion(".box", {
    duration: 12000,
    path: [
        {
            from: [0, 0],
            p1: [100, -200],
            p2: [600, 200],
            to: [0, 0]
        },

        {
            from: [0, 0],
            p1: [300, -200],
            p2: [600, 200],
            to: [300, 400]
        },
    ],

    transform: {
        rotate: { value: 720, easing: Easings.easeInOutQuad },
        scale: { value: 1.8, easing: Easings.easeInOutQuad }
    }
});


const motion2 = Magnetix.svgMotion(".box", {
    duration: 12000,
    path: [
        {
            from: [0, 0],
            p1: [170, -800],
            p2: [300, 200],
            to: [0, 0]
        },
    ],

    transform: {
        rotate: { value: 720, easing: Easings.easeInOutQuad },
        scale: { value: 1.8, easing: Easings.easeInOutQuad }
    }
});
console.log(motion);


timeline.add(motion).add(motion1).add(motion2);
timeline.play();
timeline.seek(0.5);
