import Magnetix from "../src/index.js";
const { Easings } = Magnetix;


const { pause, play, to, reverse } = Magnetix.reveal(".box", {
    duration: 5000,
    repeat: 2,
    yoyo: true,
    transform: {
        y: { value: -120, easing: Easings.easeInOutCubic },
        rotate: { value: 360, easing: Easings.easeInOutQuad }
    }
})
setTimeout(() => {
    console.log("to 40%");
    to(0.4);
    setTimeout(() => {
        console.log("play");
        play();

    }, 2000);
}, 12000);
