import engine from "./engine.js";
import Easings from "./easing.js";
function createAnimation(config) {
    const start = performance.now();
    let localStart = null;
    let pauseTime = null;
    let elapsedTimeBeforePause = 0;
    let isPaused = false;
    const anim = {
        update(time) {
            if (isPaused) return;
            if (localStart === null) {
                if (time < config.delay) return;
                localStart = time;
            }
            let localTime = time - localStart - elapsedTimeBeforePause;
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
        },
        pause() {
            if (isPaused) return;
            isPaused = true;
            pauseTime = performance.now();
        },
        resume() {
            if (!isPaused) return;
            isPaused = false;
            let now = performance.now();
            elapsedTimeBeforePause += (now - pauseTime);
        }

    };

    engine.add(anim);
    return anim;
}

export default createAnimation
