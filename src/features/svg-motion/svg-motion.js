import createAnimation from "../../core/motion.js";
import { DEFAULT_PATH, DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./constant.js";
import { getBezierOnPath, applyTransform } from "./helper.js";

function svgMotion(selector, config = {}) {
    const element = document.querySelector(selector);
    const {
        from, to, easing, duration, delay,
        path: userPath,
        transform: userTransform,
    } = { ...DEFAULT_CONFIG, ...config };

    const path = !userPath || userPath.length === 0 ? DEFAULT_PATH : userPath;
    const transform = { ...DEFAULT_TRANSFORM, ...userTransform };

    const anim = createAnimation({
        from, to, duration, delay, easing,
        onUpdate(_, progress) {
            const { x, y } = getBezierOnPath(progress, path);
            transform.x = x;
            transform.y = y;
            applyTransform(element, transform, progress);
        },
    });

    // Timeline-compatible interface — totalDuration + update(localTime)
    return {
        totalDuration: anim.totalDuration,
        update: (localTime) => anim.update(localTime),
    };
}

export default svgMotion;