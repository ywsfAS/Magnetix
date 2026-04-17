import { ticker } from "./ticker";


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
        this.animations.remove(animation);
    }
    update(time) {
        this.animations.forEach(animation => animation.update());
    }
}

export default new Engine();