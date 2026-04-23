import createAnimation from "../../core/motion.js";
import { applyTransform, buildTransform } from "../common.js";
import { DEFAULT_CONFIG, DEFAULT_TRANSFORM } from "./constants.js";

function reveal(selector, config = {}) {
    const { from, to, duration, delay, easing, transform: userTransform, repeat, yoyo } =
        { ...DEFAULT_CONFIG, ...config };

    const elements = [...document.querySelectorAll(selector)];
    let currentLocalTime = 0;

    const items = elements.map((el, i) => {
        const transform = buildTransform(userTransform, DEFAULT_TRANSFORM);
        const anim = createAnimation({
            from, to, duration,
            delay: delay * i,   // stagger per element
            easing, repeat, yoyo,
            onUpdate: (_, progress) => {
                applyTransform(el, transform, progress);
            },
        });
        return { anim, visibleAt: null };
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const idx = elements.indexOf(entry.target);
            if (idx === -1 || items[idx].visibleAt !== null) return;
            items[idx].visibleAt = currentLocalTime;
            observer.unobserve(entry.target);
        });
    });

    elements.forEach((el) => observer.observe(el));

    const totalDuration = delay * (elements.length - 1) + duration;

    return {
        totalDuration,
        update(localTime) {
            currentLocalTime = localTime;
            items.forEach(({ anim, visibleAt }) => {
                if (visibleAt === null) return;
                anim.update(localTime - visibleAt);
            });
        },
    };
}

export default reveal;