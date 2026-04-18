import createAnimation from "../src/core/motion.js";
import Easings from "../src/core/easing.js";
import reveal from "../src/features/reveal/reveal.js";
import magnetic from "../src/features/magnetic/magnetic.js";
import { parallax } from "../src/features/parallax/parallex.js";
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
})

parallax(".blue", {
    speed: 0.08,
})
