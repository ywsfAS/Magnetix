import engine from "./engine.js";

class Timeline {
    constructor() {
        this.animations = [];
        this.totalDuration = 0;
        this.currentTime = 0;
        this.isPaused = true;
        this.lastTime = null;
        this.finitOffset = 0;
        engine.add(this);

    }

    add(...args) {
        // Convert config to animation object
        const configs = args.flat().filter(Boolean);
        configs.forEach(config => {
            this.addOneAnim(config);
        });
        return this;
    }
    addOneAnim(config) {
        const anim = {
            start: this.finitOffset,
            anim: config,
        };
        this.animations.push(anim);
        if (isFinite(config.totalDuration)) {
            this.finitOffset += config.totalDuration;
            this.totalDuration = this.finitOffset;
        } else {
            this.totalDuration = Infinity;
        }
    }
    play() {
        this.isPaused = false;
        return this;
    }
    pause() {
        this.isPaused = true;
        return this;
    }
    seek(progress) {
        this.currentTime = Math.max(Math.min(progress, 1), 0) * this.finitOffset;
        this.dispatch(this.currentTime);
        return this;
    }
    progress() {
        return Math.min(Math.max(this.currentTime / this.finitOffset, 0), 1);
    }
    reset() {
        this.currentTime = 0;
        this.isPaused = true;
        return this;
    }
    clear() {
        this.reset();
        this.animations = [];
        return this;
    }
    dispatch(currentTime) {

        for (const { anim, start } of this.animations) {
            anim.update(currentTime - start);
        }
    }
    update(time) {
        if (this.lastTime === null) {
            this.lastTime = time;
        }
        const dt = time - this.lastTime;
        this.lastTime = time;

        if (this.isPaused) return;

        this.currentTime = isFinite(this.totalDuration)
            ? Math.min(this.currentTime + dt, this.totalDuration)
            : this.currentTime + dt;
        this.dispatch(this.currentTime);
    }
}

export default Timeline;
