
// split text helper 
export function splitText(element, type = "chars") {
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