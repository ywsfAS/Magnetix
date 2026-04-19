import createAnimation from "../src/core/motion.js";
import Easings from "../src/core/easing.js";
import reveal from "../src/features/reveal/reveal.js";
import magnetic from "../src/features/magnetic/magnetic.js";
import { parallax } from "../src/features/parallax/parallex.js";
import SplitTextAnimation from "../src/features/split-text/split-text.js";
createAnimation({
    from: 0,
    to: 100,
    duration: 1000,
    delay: 2000,
    onUpdate: (v) => {
        //console.log(v);
    },
    easing: Easings.easeInOutCubic
});

parallax(".box", {
    speed: 0.1,
});

parallax(".blue", {
    speed: 0.09,
})
SplitTextAnimation(".title", "chars", {
    from: 0,
    to: 200,
    easing: Easings.easeInOutCubic,
    delay: 100,
    duration: 1200,
    transform: {
        scale: 2,
        rotate: 360,
    }
});