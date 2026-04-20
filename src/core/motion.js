import engine from "./engine.js";
import Easings from "./easing.js";

function createAnimation(config) {
    const { easing, delay, duration, onUpdate } = config;
    let { from, to, repeat, yoyo } = config;

    let localStart = null;
    let pauseTime = null;
    let elapsedTimeBeforePause = 0;
    let direction = 1;
    let isPaused = false;

    const easefn = easing ?? Easings.linear;

    const anim = {
        update(time) {
            if (isPaused) return;

            if (localStart === null) {
                if (time < delay) return;
                localStart = time;
            }

            const localTime = time - localStart - elapsedTimeBeforePause;
            const progress = Math.min(localTime / duration, 1);
            const directedProgress = direction === 1 ? progress : 1 - progress;
            const easedProgress = easefn(directedProgress);
            const value = from + (to - from) * easedProgress;

            onUpdate?.(value, easedProgress);

            if (progress >= 1) {
                if (repeat > 0 || repeat === Infinity) {
                    if (yoyo) {
                        direction *= -1;
                        anim.reverse();
                    }
                    if (repeat !== Infinity) repeat--;
                    anim.reset(time);
                } else {
                    anim.kill();
                }
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
            elapsedTimeBeforePause += performance.now() - pauseTime;
        },

        reset(time) {
            localStart = time;
        },

        reverse() {
            [from, to] = [to, from];
        },
    };

    engine.add(anim);
    return anim;
}

export default createAnimation;