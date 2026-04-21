import Magnetix from "../src/index.js";
const { Easings } = Magnetix;

const Timeline = new Magnetix.Timeline();
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
