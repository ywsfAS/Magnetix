import Easings from "../../core/easing.js";
import engine from "../../core/engine.js";
import createAnimation from "../../core/motion.js";

// split text helper 
function splitText(element, type = "chars") {
    const text = element.textContent;
    element.textContent = "";
    let parts = [];
    if (type === "chars") {
        parts = text.split("");
    } else if (type === "words") {
        parts = text.split(" ");
    }
    const elements = parts.map((part, i) => {
        const span = document.createElement("span");

        // preserve spaces
        if (type === "words" && i !== parts.length - 1) {
            span.textContent = part + " ";
        } else {
            span.textContent = part === " " ? "\u00A0" : part;
        }

        span.style.display = "inline-block";

        element.appendChild(span);

        return span;
    });

    return elements;
}
export default function SplitTextAnimation(selector, type = "chars", config = {}) {
    const element = document.querySelector(selector);
    const letters = splitText(element, type);
    // config
    const from = config.from ?? 0;
    const to = config.to ?? 50;
    const duration = config.duration ?? 600;
    const delay = config.delay ?? 50;
    const transform = {
        rotate: config?.transform?.rotate ?? 0,
        scale: config?.transform?.scale ?? 1,
    }

    const baseGap = 0.1;
    const factor = config?.transform?.factor ?? transform.scale - 1;
    letters.forEach((el, i) => {
        createAnimation({
            from,
            to,
            duration,
            delay: i * delay,
            easing: config.easing,
            onUpdate: (value, progress) => {
                let scale = 1 + (transform.scale - 1) * progress;
                el.style.transform = `translateY(${value}px)
                rotate(${transform.rotate * progress}deg)
                scale(${scale})
                `;

                const spacing = baseGap + (scale - 1) * factor;
                el.style.marginRight = `${spacing}em`;
            }
        })
    });
}