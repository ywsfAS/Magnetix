import engine from "../../core/engine.js";
import createAnimation from "../../core/motion.js";
import { DEFAULT_PATH, DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./constant.js";
import { getBezierOnPath } from "./helper.js";
import { applyTransform } from "./helper.js";
import { getBezierPoint } from "./helper.js";
function svgMotion(selector, config = {}) {
    const element = document.querySelector(selector);
    const { from, to, easing, duration, delay, path: userPath, transform: userTransform } = { ...DEFAULT_CONFIG, ...config };
    const path = userPath?.length === 0 ? DEFAULT_PATH : userPath;
    const transform = { ...DEFAULT_TRANSFORM, ...userTransform };
    const anim = createAnimation({
        from,
        to,
        duration,
        delay: delay,
        easing,
        onUpdate(_, progress) {
            console.log(progress);
            const { x, y } = getBezierOnPath(progress, path);
            transform.x = x;
            transform.y = y;
            applyTransform(element, transform, progress);
        }

    })


    return {
        duration,
        update: anim.update,
        run: anim.run,
        pause: () => {
            anim.pause();
        },
        play: () => {
            anim.resume();
        },
        to: () => {
            anim.to();
        },
        kill: () => {
            anim.kill();
        }

    };
}
export default svgMotion;