import { applyTransform, buildTransform } from "../common.js";
import { DEFAULT_TRANSFORM } from "./constants.js";

let scrollY = 0;
window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

function parallax(selector, config = {}) {
    const { speed = 0.02, transform: userTransform, easing } = config;
    const elements = [...document.querySelectorAll(selector)];
    if (!elements.length) return null;

    const items = elements.map((el) => {
        const transform = buildTransform(DEFAULT_TRANSFORM, userTransform);
        console.log(transform)
        return { el, transform };
    });

    return {
        totalDuration: Infinity,
        update(_localTime) {
            items.forEach(({ el, transform }) => {
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2 + scrollY;

                const viewCenter = scrollY + window.innerHeight / 2;
                const offset = (viewCenter - elCenter) * speed;
                transform.y.value = offset;
                applyTransform(el, transform, 1);

            });
        },
        kill() {
            items.forEach(({ el, transform }) => {
                transform.y = 0;
                applyTransform(el, transform);
            });
        },
    };
}

function clearParallax() {
}

export { parallax, clearParallax };