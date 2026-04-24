
function trackMousePos(state) {
    document.addEventListener("mousemove", (e) => {
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
    })
}
function animate(el, state) {
    const { mouseX, mouseY, speed } = state;
    state.currentX += (mouseX - state.currentX) * speed;
    state.currentY += (mouseY - state.currentY) * speed;
    applyTransform(el, state.currentX, state.currentY);

}
function applyTransform(cursor, currentX, currentY) {
    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";
}
export { trackMousePos, animate };