import engine from "./engine.js";
import Easings from "./easing.js";
function createAnimation(config) {
    const start = performance.now();

    const anim = {
        update(time) {

            const elapsed = time - start;

            let progress = elapsed / config.duration;
            const easefn = config.easing || Easings.linear;
            let easedProgress = easefn(progress);
            if (progress > 1) progress = 1;

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
