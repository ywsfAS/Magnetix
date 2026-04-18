import createAnimation from "../../core/motion.js";
import engine from "../../core/engine.js";

function magnetic(selector, config = {}) {
    const strength = config.strength ?? 0.3;
    const maxDistance = config.maxDistance ?? 200;
    const el = document.querySelector(selector);

    let position = { x: 0, y: 0 };

    function onMove(e) {
        position.x = e.clientX;
        position.y = e.clientY;
    }
    // update mouse position
    window.addEventListener('mousemove', onMove);
    const anim = {
        update() {

            const rect = el.getBoundingClientRect();
            const cx = rect.left + (rect.width / 2);
            const cy = rect.top + (rect.height / 2);

            const dx = position.x - cx;
            const dy = position.y - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > maxDistance) {
                el.style.transform = `translate(0px,0px)`;
                return;
            };
            const force = (1 - distance / maxDistance) * strength;
            const moveX = dx * force;
            const moveY = dy * force;
            el.style.transform = `translate(${moveX}px,${moveY}px)`;
        },
        kill() {
            // set to origin
            el.style.transform = `translate(0px,0px)`;
            window.removeEventListener('mousemove', onMove);
        }
    }
    engine.add(anim);
    return anim;



}
export default magnetic;