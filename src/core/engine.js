import ticker from "./ticker.js";


class Engine {
    constructor() {
        this.timelines = new Set();
        this.update = this.update.bind(this);
        ticker.add(this.update);
    }

    add(timeline) {
        this.timelines.add(timeline);
    }
    remove(timeline) {
        this.timelines.delete(timeline);
    }
    update(time) {
        this.timelines.forEach(tl => tl.update(time));
    }
}

export default new Engine();