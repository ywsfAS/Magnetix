import engine from "./engine";

function createAnimation(config) {
    const start = performance.now();

    const anim = {
        update(time) {
            const elapsed = time - start;

            let progress = elapsed / config.duration;
            if (progress > 1) progress = 1;

            const value =
                config.from + (config.to - config.from) * progress;

            if (config.onUpdate) {
                config.onUpdate(value, progress);
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

export default {
    createAnimation
};