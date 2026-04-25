
function trackMouseDown(el, state) {
    el.addEventListener('mousedown', (e) => {
        state.isDragging = true;
        state.offsetX = e.clientX - state.x;
        state.offsetY = e.clientY - state.y;
    })
}
function trackMouseMove(state) {
    document.addEventListener('mousemove', (e) => {
        if (!state.isDragging) return;
        state.targetX = e.clientX - state.offsetX;
        state.targetY = e.clientY - state.offsetY;
    })
}
function trackMouseRelease(state) {
    document.addEventListener('mouseup', (e) => {
        state.isDragging = false;
    })
}
function animate(el, state) {
    state.x += (state.targetX - state.x) * state.speed;
    state.y += (state.targetY - state.y) * state.speed;

    applyTransform(el, state);

}
function applyTransform(el, state) {
    const { x, y } = state;
    el.style.transform = `translate(${x}px,${y}px)`;

}
export { animate, trackMouseDown, trackMouseMove, trackMouseRelease };