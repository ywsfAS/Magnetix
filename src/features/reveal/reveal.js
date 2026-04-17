import createAnimation from "../../core/motion.js";

function reveal(selector, config = {}) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target;

            // default values
            const from = config.from ?? 30;
            const to = config.to ?? 0;
            const duration = config.duration ?? 800;

            createAnimation({
                from,
                to,
                duration,
                easing: config.easing,

                onUpdate: (value, progress) => {
                    el.style.opacity = progress;
                    el.style.transform = `translateY(${value}px)`;
                }
            });

            observer.unobserve(el);
        });
    });

    elements.forEach((el) => observer.observe(el));
}

export default reveal;