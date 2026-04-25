import { animate, trackMouseDown, trackMouseMove, trackMouseRelease } from "./helper.js";


function drag(selector, config = {}) {
    const el = document.querySelector(selector);
    const state = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        speed: config.speed ?? 0.17
    }
    // event listeners
    trackMouseDown(el, state);
    trackMouseMove(state);
    trackMouseRelease(state);
    return {
        totalDuration: Infinity,
        update: () => animate(el, state),
    }


}
export default drag;