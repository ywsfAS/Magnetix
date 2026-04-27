import createAnimation from "../../core/motion.js";
import { applyTransform, buildTransform } from "../common.js";
import { DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./constants.js";

function reveal(selector, config = {}) {
    const {
        from, to, duration, delay,
        easing, transform: userTransform,
        repeat, yoyo,
    } = { ...DEFAULT_CONFIG, ...config };

    const elements = [...document.querySelectorAll(selector)];

    const items = elements.map((el, i) => {
        const transform = buildTransform(userTransform, DEFAULT_TRANSFORM);
        const anim = createAnimation({
            from, to, duration,
            delay: delay * i,       // stagger baked into each animation
            easing, repeat, yoyo,
            onUpdate: (_, progress) => {
                applyTransform(el, transform, progress);
            },
        });
        return {
            anim,
            visible: false,
            elapsed: 0,
        };
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const idx = elements.indexOf(entry.target);
            if (idx === -1 || items[idx].visible) return;
            items[idx].visible = true;
            observer.unobserve(entry.target);
        });
    });

    elements.forEach((el) => observer.observe(el));

    let prevLocalTime = null;

    return {
        totalDuration: Infinity,

        update(localTime) {
            const dt = prevLocalTime === null ? 0 : localTime - prevLocalTime;
            prevLocalTime = localTime;
            items.forEach((item) => {
                if (!item.visible) return;

                item.elapsed += dt;
                item.anim.update(item.elapsed);
            });
        },
    };
}

export default reveal;