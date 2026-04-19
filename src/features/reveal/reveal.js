import Easings from "../../core/easing.js";
import createAnimation from "../../core/motion.js";
import { applyTransform, buildTransform } from "../common.js";
import { DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./constants.js";

function reveal(selector, config = {}) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            const { from, to, duration, delay, easing, transform: userTransform } = { ...DEFAULT_CONFIG, ...config };
            const transform = buildTransform(userTransform, DEFAULT_TRANSFORM);

            createAnimation({
                from,
                to,
                duration,
                delay: delay * i,
                easing: easing,

                onUpdate: (_, progress) => {
                    applyTransform(el, transform, progress);
                }
            });

            observer.unobserve(el);
        });
    });

    elements.forEach((el) => observer.observe(el));
}

export default reveal;