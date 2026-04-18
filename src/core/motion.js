import engine from "./engine.js";
import Easings from "./easing.js";
function createAnimation(config) {
    const start = performance.now();
    let currentState = null;
    const anim = {
        update(time) {

            const elapsed = time - start;
            if (currentState === null) {
                if (elapsed < config.delay) {
                    return;
                }
                currentState = time;
            }
            let localTime = time - currentState;
            let progress = localTime / config.duration;
            const easefn = config.easing || Easings.linear;
            if (progress > 1) progress = 1;
            let easedProgress = easefn(progress);

            const value =
                config.from + (config.to - config.from) * easedProgress;

            if (config.onUpdate) {

                config.onUpdate(value, easedProgress);
            }

            if (progress === 1) {
                anim.kill();
            }
        },

        kill() {
            engine.remove(anim);
        }
    };

    engine.add(anim);
    return anim;
}

export default createAnimation
