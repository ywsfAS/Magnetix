
const subscribers = new Set();

function add(fn) {
    subscribers.add(fn);
}

function remove(fn) {
    subscribers.remove(fn);
}
function tick(time) {
    subscribers.forEach(sub => sub(time));
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
export default {
    add,
    remove,
}