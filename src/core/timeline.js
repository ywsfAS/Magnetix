import engine from "./engine.js";

class Timeline {
    constructor() {
        this.animations = [];
        this.totalDuration = 0;
        this.currentTime = 0;
        this.isPaused = true;
        this.lastTime = null;
        engine.add(this);

    }

    add(config) {
        // Convert config to animation object
        const anim = {
            start: this.totalDuration,
            anim: config,
        };
        this.animations.push(anim);
        if (isFinite(config.totalDuration)) {
            this.totalDuration += config.totalDuration;
        }
        return this;
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
        this.currentTime = Math.max(Math.min(progress, 1), 0) * this.totalDuration;
        this.dispatch(this.currentTime);
        return this;
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
