import engine from "./engine.js";
import Easings from "./easing.js";

function createAnimation(config) {
    const { easing, delay = 0, duration, onUpdate, from, to, repeat = 0, yoyo = false } = config;

    const easefn = easing ?? Easings.linear;

    const totalCycles = repeat === Infinity ? Infinity : repeat + 1;
    const totalDuration = delay + (totalCycles === Infinity ? Infinity : totalCycles * duration);
    const anim = {
        totalDuration,
        update(localTime) {
            if (localTime < delay) return;
            const elapsed = localTime - delay;
            let progress, cycleIndex;

            if (totalCycles === Infinity) {
                cycleIndex = Math.floor(elapsed / duration);
                progress = (elapsed % duration) / duration; // each cycle 0->1
            } else {
                const total = totalCycles * duration;

                if (elapsed >= total) {
                    cycleIndex = totalCycles - 1;
                    progress = 1;
                } else {
                    cycleIndex = Math.floor(elapsed / duration);
                    progress = (elapsed % duration) / duration;
                }
            }
            // change direction based on yoyo and cycleIndex
            const directedProgress = yoyo && (cycleIndex % 2 === 1) ? 1 - progress : progress;
            const easedProgress = easefn(directedProgress);
            const value = from + (to - from) * easedProgress;
            onUpdate?.(value, easedProgress);
        }
    };
    return anim;
}

export default createAnimation;