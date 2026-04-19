import Magnetix from "../src/index.js";
const { Easings } = Magnetix;
Magnetix.createAnimation({
    from: 0,
    to: 100,
    duration: 1000,
    delay: 2000,
    onUpdate: (v, w) => {
        //console.log(w);
    },
    easing: Easings.easeInOutCubic
});

const { pause, resume } = Magnetix.reveal(".box", {
    transform: {
        y: { value: -120, easing: Easings.easeInOutCubic },
        rotate: { value: 360, easing: Easings.easeInOutQuad }
    }
})
setTimeout(() => {
    console.log("paused");
    pause();
    setTimeout(() => {
        console.log("resumed");
        resume();
    }, 3000);
}, 100)

const { pause: pauseText, resume: resumeText } = Magnetix.splitText(".title", "chars", {
    from: 0,
    to: 200,
    easing: Easings.easeInOutCubic,
    delay: 100,
    duration: 1200,
    transform: {
        scale: { value: 2, easing: Easings.linear },
        rotate: { value: 360, easing: Easings.linear },
    }
});

setTimeout(() => {
    console.log("paused Text");
    pauseText();
    setTimeout(() => {
        console.log("resumed Text");
        resumeText();
    }, 3000);
}, 900)