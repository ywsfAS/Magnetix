
// container of magnetic animations
const magneticItems = new Set();
let position = { x: 0, y: 0 };
// track mouse position using one centerlized event listener
function onMove(e) {
    position.x = e.clientX;
    position.y = e.clientY;
}
let initialized = false;
function initMagnetic() {
    if (initialized) return;
    window.addEventListener("mousemove", onMove);
    initialized = true;
}
// apply effect on registred animations
function updateMagnetic() {
    magneticItems.forEach(({ el, strength, maxDistance }) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = position.x - cx;
        const dy = position.y - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > maxDistance) {
            el.style.transform = `translate(0px, 0px)`;
            return;
        }

        const force = (1 - distance / maxDistance) * strength;
        el.style.transform = `translate(${dx * force}px, ${dy * force}px)`;
    })
}
export { updateMagnetic, magneticItems, initMagnetic };