import { vi, describe, it, expect } from "vitest";
import reveal from "../src/features/reveal/reveal.js";
import createAnimation from "../src/core/motion.js";

vi.mock("../src/core/motion.js", () => ({ default: vi.fn() })); // mock createAnimation dependency
describe("reveal()", () => {
    it("triggers animation when element becomes visible", () => {
        document.body.innerHTML = `<div class="box"></div>`;
        const box = document.querySelector(".box");
        let fn;
        global.IntersectionObserver = class {
            constructor(cb) {
                fn = cb;
            }
            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
        };
        reveal(".box");

        fn([
            { isIntersecting: true, target: box }
        ]);
        expect(createAnimation).callCount(1);

    })
})
