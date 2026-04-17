import ticker from "./ticker.js";


class Engine {
    constructor() {
        this.animations = new Set();
        this.update = this.update.bind(this);
        ticker.add(this.update);
    }

    add(animation) {
        this.animations.add(animation);
    }
    remove(animation) {
        this.animations.delete(animation);
    }
    update(time) {
        this.animations.forEach(animation => animation.update(time));
    }
}

export default new Engine();