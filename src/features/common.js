import Easings from "../core/easing.js";
export const DEFAULT_PROP = (value) => ({ value, easing: Easings.linear });
// merge userTransform with default one 
export function buildTransform(userTransform = {}, defaultTransform = {}) {
    return {
        x: { ...defaultTransform.x, ...userTransform.x },
        y: { ...defaultTransform.y, ...userTransform.y },
        scale: { ...defaultTransform.scale, ...userTransform.scale },
        rotate: { ...defaultTransform.rotate, ...userTransform.rotate },
        opacity: { ...defaultTransform.opacity, ...userTransform.opacity },
    }
}
// apply eased values to a DOM element
export function applyTransform(el, t, progress) {
    const scale = 1 + (t.scale.value - 1) * t.scale.easing(progress);
    const y = t.y.value * t.y.easing(progress);
    const x = t.x.value * t.x.easing(progress);
    const rotate = t.rotate.value * t.rotate.easing(progress);
    const opacity = t.opacity.value * t.opacity.easing(progress);

    el.style.transform =
        `translateY(${y}px) translateX(${x}px) rotate(${rotate}deg) scale(${scale})`;
    el.style.opacity = opacity;

    return { scale, x, y, rotate, opacity };
}
// compensate letter-spacing for scale
export function computeSpacing(scale, factor, baseGap = 0.1) {
    return baseGap + (scale - 1) * factor;
}