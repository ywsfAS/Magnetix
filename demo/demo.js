import Magnetix from "../src/index.js";
const { Easings } = Magnetix;


const { pause, resume } = Magnetix.reveal(".box", {
    repeat: 6,
    yoyo: true,
    transform: {
        y: { value: -120, easing: Easings.easeInOutCubic },
        rotate: { value: 360, easing: Easings.easeInOutQuad }
    }
})
