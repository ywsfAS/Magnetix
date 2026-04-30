import { magneticItems, updateMagnetic, initMagnetic } from "./helpers.js";
function magnetic(selector, config = {}) {
    const strength = config.strength ?? 0.3;
    const maxDistance = config.maxDistance ?? 200;
    const el = document.querySelector(selector);
    if (!el) {
        console.warn(`[Magnetix] Magnetic: No element found for selector "${selector}"`);
        return null;
    };
    // attach one event listener to window 
    initMagnetic();
    const item = { el, strength, maxDistance }
    magneticItems.add(item);
    return {
        totalDuration: Infinity,
        update(_localTime) {
            updateMagnetic();
        },
        kill() {
            magneticItems.delete(item);
            el.style.transform = `translate(0px, 0px)`;
        },
    };
}

export default magnetic;