import { DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./constants.js";
import { splitText } from "./helper.js";
import { buildTransform, computeSpacing, applyTransform } from "../common.js";
import createAnimation from "../../core/motion.js";

function SplitText(selector, type = "chars", config = {}) {
    const element = document.querySelector(selector);
    const letters = splitText(element, type);

    const { from, to, delay, duration, transform: userTransform, easing, yoyo, repeat } =
        { ...DEFAULT_CONFIG, ...config };

    const transform = buildTransform(userTransform, DEFAULT_TRANSFORM);
    const factor = config?.transform?.factor ?? transform.scale.value - 1;

    const anims = letters.map((el, i) =>
        createAnimation({
            from, to, duration,
            delay: i * delay,
            easing, yoyo, repeat,
            onUpdate(_, progress) {
                const { scale } = applyTransform(el, transform, progress);
                el.style.marginRight = `${computeSpacing(scale, factor)}em`;
            },
        })
    );

    const totalDuration = delay * (letters.length - 1) + duration;

    return {
        totalDuration,
        update(localTime) {
            anims.forEach((anim) => anim.update(localTime));
        },
    };
}

export default SplitText;