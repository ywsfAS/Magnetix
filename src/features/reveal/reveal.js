import createAnimation from "../../core/motion.js";

function reveal(selector, config = {}) {
    const elements = document.querySelectorAll(selector);
    let index = 0;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target;

            // default values
            const from = config.from ?? 30;
            const to = config.to ?? 0;
            const duration = config.duration ?? 800;
            const delay = config.delay ?? 0;
            console.log(config);
            const transform = {
                x: config?.transform?.x ?? 0,
                y: config?.transform?.y ?? 0,
                rotate: config?.transform?.rotate ?? 0,
                scale: config?.transform?.scale ?? 1,

            }

            let animDelay = index * delay;
            index++;
            console.log(animDelay);
            createAnimation({
                from,
                to,
                duration,
                delay: animDelay ?? 0,
                easing: config.easing,

                onUpdate: (value, progress) => {
                    console.log(progress + "%");
                    let scale = 1 + (transform.scale - 1) * progress;
                    console.log("scale", scale);

                    el.style.opacity = progress;
                    // apply transform properties
                    el.style.transform = `
                    translateX(${transform.x * progress}px)
                    translateY(${transform.y * progress}px)
                    rotate(${transform.rotate * progress}deg)
                    scale(${scale})
                    `;
                }
            });

            observer.unobserve(el);
        });
    });

    elements.forEach((el) => observer.observe(el));
}

export default reveal;