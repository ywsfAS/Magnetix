import { animate, trackMousePos } from "./helper.js";

function cursor(selector, config = {}) {
    const element = document.querySelector(selector);
    let state = {
        mouseX: 0,
        mouseY: 0,
        currentX: 0,
        currentY: 0,
        speed: config.speed ?? 0.08,
    }
    trackMousePos(state);
    return {
        totalDuration: Infinity,
        update: () => animate(element, state),
    }
}
export default cursor;