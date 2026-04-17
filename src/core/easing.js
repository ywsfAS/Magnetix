
const Easings = {
    // Linear (no easing)
    linear: (t) => t,

    // Start slow, speed up
    easeInQuad: (t) => t * t,

    // Start fast, slow down
    easeOutQuad: (t) => 1 - (1 - t) * (1 - t),

    easeInOutQuad: (t) =>
        t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2,

    // Strong smooth start/end
    easeInCubic: (t) => t * t * t,

    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),

    easeInOutCubic: (t) =>
        t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2,

    // sine wave motion
    easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),

    easeOutSine: (t) => Math.sin((t * Math.PI) / 2),

    easeInOutSine: (t) =>
        -(Math.cos(Math.PI * t) - 1) / 2,
};

export default Easings;