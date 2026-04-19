import Easings from "../../core/easing.js";
import engine from "../../core/engine.js";
import createAnimation from "../../core/motion.js";
import { DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./contants.js";
import { splitText } from "./helper.js";
import { buildTransform, computeSpacing, applyTransform } from "../common.js";

export default function SplitTextAnimation(selector, type = "chars", config = {}) {
    const element = document.querySelector(selector);
    const letters = splitText(element, type);
    const { from, to, delay, duration, transform: userTransform, easing } = { ...DEFAULT_CONFIG, ...config };

    const transform = buildTransform(userTransform, DEFAULT_TRANSFORM);
    const factor = config?.transform?.factor ?? transform.scale.value - 1;

    letters.forEach((el, i) => {
        createAnimation({
            from,
            to,
            duration,
            delay: i * delay,
            easing: easing,
            onUpdate: (_, progress) => {
                const { scale } = applyTransform(el, transform, progress);
                el.style.marginRight = `${computeSpacing(scale, factor)}em`;
            }
        })
    });
}