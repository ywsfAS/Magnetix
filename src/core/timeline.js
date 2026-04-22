import engine from "./engine.js";

class Timeline {
    constructor() {
        this.animations = [];
        this.time = 0;
        engine.add(this);

    }

    add(config) {
        // Convert config to animation object
        const anim = {
            start: this.time,
            duration: config.duration,
            run: config.run,
            update: (p) => {
                config.update(p);
            },
            finished: false
        };
        this.animations.push(anim);
        this.time += config.duration;
        return this;
    }

    update(time) {

        this.animations.forEach(a => {
            if (time < a.start) return;
            let end = a.start + a.duration;
            if (time <= end) {
                a.run();
                a.update(time);
            } else if (!a.finished) {
                console.log("finished", a)
                a.update(end + time);
                a.finished = true;
            }
        });
    }
}

export default Timeline;
