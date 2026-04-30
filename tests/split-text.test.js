import { describe, test, expect, beforeEach, vi } from "vitest";

vi.mock("../src/features/split-text/helper.js", () => ({
    splitText: vi.fn()
}));

vi.mock("../src/features/common.js", () => ({
    buildTransform: vi.fn(() => ({
        scale: { value: 1 }
    })),
    computeSpacing: vi.fn(() => 0.5),
    applyTransform: vi.fn(() => ({
        scale: 1.5
    }))
}));

vi.mock("../src/core/motion.js", () => ({
    default: vi.fn((config) => ({
        update: vi.fn((t) => {
            config.onUpdate?.(t, 0.5);
        })
    }))
}));

vi.mock("../src/features/split-text/constants.js", () => ({
    DEFAULT_CONFIG: {
        from: 0,
        to: 1,
        delay: 0.1,
        duration: 1,
        easing: "linear",
        yoyo: false,
        repeat: 0
    },
    DEFAULT_TRANSFORM: {
        scale: { value: 1 }
    }
}));
import SplitText from "../src/features/split-text/split-text.js";
import { splitText } from "../src/features/split-text/helper.js";
import { applyTransform, computeSpacing, buildTransform } from "../src/features/common.js";
import createAnimation from "../src/core/motion.js";
// helpers
function createLetters(count = 3) {
    return Array.from({ length: count }, () => {
        const el = document.createElement("span");
        el.style = {};
        return el;
    });
}
// tests section 
describe("SplitText()", () => {

    beforeEach(() => {
        document.body.innerHTML = "";
        vi.clearAllMocks();
    });

    test("initializes and splits text into letters", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        splitText.mockReturnValue(createLetters(4));

        const instance = SplitText(".text");

        expect(instance).toBeTruthy();
        expect(splitText).toHaveBeenCalledWith(root, "chars");
    });

    test("creates one animation per letter", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        splitText.mockReturnValue(createLetters(5));

        SplitText(".text");

        expect(createAnimation).toHaveBeenCalledTimes(5);
    });

    test("computes correct totalDuration", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        splitText.mockReturnValue(createLetters(4));

        const instance = SplitText(".text", "chars", {
            delay: 0.2,
            duration: 2
        });

        expect(instance.totalDuration).toBeCloseTo(2.6);
    });

    test("update calls all animations", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        const letters = createLetters(3);
        splitText.mockReturnValue(letters);

        const instance = SplitText(".text");

        instance.update(1);

        const anims = createAnimation.mock.results.map(r => r.value);
        anims.forEach(anim => {
            expect(anim.update).toHaveBeenCalledWith(1);
        });
    });

    test("applies transform and spacing on update", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        const letters = createLetters(2);
        splitText.mockReturnValue(letters);

        const instance = SplitText(".text");

        instance.update(0);

        expect(applyTransform).toHaveBeenCalled();
        expect(computeSpacing).toHaveBeenCalled();

        letters.forEach(el => {
            expect(el.style.marginRight).toBeDefined();
        });
    });

    test("passes correct factor to computeSpacing", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        const letters = createLetters(1);
        splitText.mockReturnValue(letters);

        SplitText(".text", "chars", {
            transform: {
                scale: { value: 2 },
                factor: 3
            }
        });

        const anim = createAnimation.mock.results[0].value;
        anim.update(0);

        expect(computeSpacing).toHaveBeenCalledWith(
            expect.any(Number),
            3
        );
    });

    test("handles empty text (no letters)", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        splitText.mockReturnValue([]);

        const instance = SplitText(".text");
        expect(instance).toBeNull();

    });

    test("handles missing transform config", () => {
        const root = document.createElement("div");
        root.className = "text";
        document.body.appendChild(root);

        splitText.mockReturnValue(createLetters(2));

        const instance = SplitText(".text");

        expect(buildTransform).toHaveBeenCalled();
        expect(() => instance.update(0)).not.toThrow();
    });

});