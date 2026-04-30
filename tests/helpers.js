import { vi } from "vitest";

// create a fake dom element 
function createMockElement({
    left = 0,
    top = 0,
    width = 100,
    height = 100
} = {}) {
    const el = document.createElement("div");

    el.getBoundingClientRect = vi.fn(() => ({
        left,
        top,
        width,
        height
    }));

    return el;
}
export { createMockElement };