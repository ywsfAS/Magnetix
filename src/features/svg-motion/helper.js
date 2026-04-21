
function cubicBezier(t, p0, p1, p2, p3) {
    const value = 1 - t;
    return (Math.pow(value, 3) * p0 + 3 * Math.pow(value, 2) * t * p1 + 3 * value * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3);
}
export function getBezierPoint(t, path) {
    const { from, p1, p2, to } = path;
    const x = cubicBezier(t, from[0], p1[0], p2[0], to[0]);
    const y = cubicBezier(t, from[1], p1[1], p2[1], to[1]);
    return { x, y };
}
export function applyTransform(el, t, progress) {
    const x = t.x;
    const y = t.y;
    const scale = 1 + (t.scale.value - 1) * t.scale.easing(progress);
    const rotate = t.rotate.value * t.rotate.easing(progress);
    const opacity = t.opacity.value * t.opacity.easing(progress);

    el.style.transform =
        `translateY(${y}px) translateX(${x}px) rotate(${rotate}deg) scale(${scale})`;
    el.style.opacity = opacity;

    return { scale, x, y, rotate, opacity };
}