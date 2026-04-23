let items = [];
let scrollY = 0;

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
});

function parallax(selector, config = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const item = { el, speed: config.speed ?? 0.3 };
    items.push(item);

    return {
        totalDuration: Infinity,          // scroll-driven, runs forever
        update(_localTime) {
            el.style.transform = `translateY(${scrollY * item.speed}px)`;
        },
        kill() {
            items = items.filter((i) => i.el !== el);
            el.style.transform = `translateY(0px)`;
        },
    };
}

function clearParallax() {
    items = [];
}

export { parallax, clearParallax };