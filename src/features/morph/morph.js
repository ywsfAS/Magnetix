import createAnimation from "../../core/motion.js";
import DEFAULT_MORPH_CONFIG from "./constants.js";
import { interpolatePoints, pointsToPath } from "./helper.js";


function morph(selector, config = {}) {
    const element = document.querySelector(selector);
    console.log(element);
    const { from, to, delay, easing, duration, start, end } = { ...config, ...DEFAULT_MORPH_CONFIG };
    const anim = createAnimation({
        from: start,
        to: end,
        delay,
        easing,
        duration,
        onUpdate(_, progress) {
            const points = interpolatePoints(from, to, progress);
            const d = pointsToPath(points);
            element.setAttribute("d", d);
        }

    })
    return {
        totalDuration: anim.totalDuration,
        update: (localTime) => anim.update(localTime),
    }

}
export default morph;