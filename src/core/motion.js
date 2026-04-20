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
    let finished = false;

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
            if (!finished) {
                onUpdate?.(value, easedProgress);
            }

            if (progress >= 1) {
                if (repeat > 0 || repeat === Infinity) {
                    if (yoyo) {
                        anim.reverse();
                    }
                    if (repeat !== Infinity) repeat--;
                    anim.reset(time);
                } else {
                    finished = true;
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
            direction *= -1;
            finished = false;
        },
        to(percent) {
            percent = Math.max(0, Math.min(percent, 1));
            let now = performance.now();
            localStart = now - percent * duration;
            finished = false;
            this.update(now);
            this.pause();
        }
    };

    engine.add(anim);
    return anim;
}

export default createAnimation;