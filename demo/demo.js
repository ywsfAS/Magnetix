import Magnetix from "../src/index.js";
const { Easings } = Magnetix;

Magnetix.svgMotion(".box", {
    duration: 9000,
    path: {
        from: [0, 0],
        p1: [400, 0],
        p2: [400, -900],
        to: [0, 0]
    },
    transform: {
        rotate: { value: 340, easing: Easings.easeInOutQuad },
        scale: { value: 1.5, easing: Easings.easeInOutQuad },

    }
});