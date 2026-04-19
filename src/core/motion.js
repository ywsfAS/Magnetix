import engine from "./engine.js";
import Easings from "./easing.js";
function createAnimation(config) {
    const start = performance.now();
    let localStart = null;
    const anim = {
        update(time) {

            const elapsed = time - start;
            if (localStart === null) {
                if (elapsed < config.delay) {
                    return;
                }
                localStart = time;
            }
            let localTime = time - localStart;
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
