import Easings from "../../core/easing.js";
import createAnimation from "../../core/motion.js";
import { applyTransform, buildTransform } from "../common.js";
import { DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./constants.js";

function reveal(selector, config = {}) {
    const elements = document.querySelectorAll(selector);
    const list = [];
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            const { from, to, duration, delay, easing, transform: userTransform, repeat, yoyo } = { ...DEFAULT_CONFIG, ...config };
            const transform = buildTransform(userTransform, DEFAULT_TRANSFORM);

            const anim = createAnimation({
                from,
                to,
                duration,
                delay: delay * i,
                easing: easing,
                repeat,
                yoyo,
                onUpdate: (_, progress) => {
                    applyTransform(el, transform, progress);
                }
            });
            list.push(anim);
            observer.unobserve(el);
        });
    });

    elements.forEach((el) => observer.observe(el));
    return {
        pause() {
            list.forEach(anim => anim.pause());
        },
        play() {
            list.forEach(anim => anim.resume());
        },
        kill() {
            list.forEach(anim => anim.kill());
        },
        to(percent) {
            list.forEach(anim => anim.to(percent));
        },
        reverse() {
            list.forEach(anim => anim.reverse());
        }


    }
}

export default reveal;