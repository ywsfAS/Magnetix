import Easings from "../../core/easing.js";
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
                x: config?.transform?.x ?? { value: 0, easing: Easings.linear },
                y: config?.transform?.y ?? { value: 0, easing: Easings.linear },
                rotate: config?.transform?.rotate ?? { value: 0, easing: Easings.linear },
                scale: config?.transform?.scale ?? { value: 1, easing: Easings.linear },

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

                    let easedScale = 1 + (transform.scale.value - 1) * transform.scale.easing(progress);
                    let easedX = transform.x.value * transform.x.easing(progress);
                    let easedRotate = transform.rotate.value * transform.rotate.easing(progress);
                    let easedY = transform.y.value * transform.y.easing(progress);
                    el.style.opacity = progress;
                    // apply transform properties
                    el.style.transform = `
                    translateX(${easedX}px)
                    translateY(${easedY}px)
                    rotate(${easedRotate}deg)
                    scale(${easedScale})
                    `;
                }
            });

            observer.unobserve(el);
        });
    });

    elements.forEach((el) => observer.observe(el));
}

export default reveal;