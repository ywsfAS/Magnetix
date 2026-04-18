import createAnimation from "../src/core/motion.js";
import Easings from "../src/core/easing.js";
import reveal from "../src/features/reveal/reveal.js";
createAnimation({
    from: 0,
    to: 100,
    duration: 1000,
    delay: 2000,
    onUpdate: (v) => {
        console.log(v);
    },
    easing: Easings.easeInOutCubic
});
reveal(".box", {
    easing: Easings.easeInSine,
    duration: 5000,
    transform: {
        x: -200,
        y: 500,
        rotate: 3120,
        scale: 6,
    },
    delay: 6000,
});
