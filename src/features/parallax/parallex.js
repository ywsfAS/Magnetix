import engine from "../../core/engine.js";

let items = [];
let scrollY = 0;
let ticking = false;


function onScroll() {
    scrollY = window.scrollY;

    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener("scroll", onScroll);

const ParallaxSystem = {
    update() {
        for (const item of items) {
            const offset = scrollY * item.speed;
            item.el.style.transform = `
                translateY(${offset}px)
            `;
        }
    }
};
engine.add(ParallaxSystem);

function parallax(selector, config = {}) {
    const element = document.querySelector(selector);
    if (!element) return;

    items.push({
        el: element,
        speed: config.speed ?? 0.3
    });

    return {
        kill() {
            items = items.filter(i => i.el !== element);
        }
    };
}


function clearParallax() {
    items = [];
}

export {
    parallax,
    ParallaxSystem,
    clearParallax
};