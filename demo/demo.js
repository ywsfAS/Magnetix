import createAnimation from "../src/core/motion.js";
import Easings from "../src/core/easing.js";
createAnimation({
    from: 0,
    to: 100,
    duration: 1000,
    onUpdate: (v) => {
        console.log(v);
    },
    easing: Easings.easeInOutCubic
});
