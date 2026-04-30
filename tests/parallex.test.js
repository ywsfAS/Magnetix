import { vi, describe, test, expect, beforeEach } from "vitest";
import { createMockElement } from "./helpers.js";
vi.mock("../src/features/common.js", () => ({
    applyTransform: vi.fn(),
    buildTransform: vi.fn(() => ({
        y: { value: 0 }
    })),
}));

vi.mock("../src/features/parallax/constants.js", () => ({
    DEFAULT_TRANSFORM: { y: { value: 0 } }
}));

import { parallax } from "../src/features/parallax/parallex.js";
import { applyTransform, buildTransform } from "../src/features/common.js";

function setWindowProps({ scrollY = 0, innerHeight = 1000 } = {}) {
    Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
        configurable: true
    });

    Object.defineProperty(window, "innerHeight", {
        value: innerHeight,
        writable: true,
        configurable: true
    });
}

describe("parallax()", () => {

    beforeEach(() => {
        document.body.innerHTML = "";
        vi.clearAllMocks();

        setWindowProps({
            scrollY: 200,
            innerHeight: 1000
        });
    });

    test("returns null when no elements found", () => {
        const instance = parallax(".missing");
        expect(instance).toBeNull();
    });

    test("initializes with elements", () => {
        const el = createMockElement();
        el.className = "item";
        document.body.appendChild(el);

        const instance = parallax(".item");

        expect(instance).not.toBeNull();
        expect(buildTransform).toHaveBeenCalledTimes(1);
    });

    test("update applies correct offset", () => {
        const el = createMockElement({ top: 100, height: 200 });
        el.className = "item";
        document.body.appendChild(el);

        const instance = parallax(".item", { speed: 0.1 });

        instance.update(0);

        expect(applyTransform).toHaveBeenCalledTimes(1);

        const [, transform] = applyTransform.mock.calls[0];

        const scrollY = window.scrollY;
        const viewCenter = scrollY + window.innerHeight / 2;
        const elCenter = 100 + 200 / 2 + scrollY;

        const expectedOffset = (viewCenter - elCenter) * 0.1;

        expect(transform.y.value).toBeCloseTo(expectedOffset);
    });

    test("update works with multiple elements", () => {
        const el1 = createMockElement({ top: 0, height: 100 });
        const el2 = createMockElement({ top: 300, height: 100 });

        el1.className = "item";
        el2.className = "item";

        document.body.append(el1, el2);

        const instance = parallax(".item");

        instance.update(0);

        expect(applyTransform).toHaveBeenCalledTimes(2);
    });

    test("passes user transform to buildTransform", () => {
        const el = createMockElement();
        el.className = "item";
        document.body.appendChild(el);

        const userTransform = { y: { value: 999 } };

        parallax(".item", { transform: userTransform });

        expect(buildTransform).toHaveBeenCalledWith(
            expect.any(Object),
            userTransform
        );
    });

    test("kill calls applyTransform", () => {
        const el = createMockElement();
        el.className = "item";
        document.body.appendChild(el);

        const instance = parallax(".item");

        instance.kill();

        expect(applyTransform).toHaveBeenCalled();
    });

    test("kill resets transform.y.value to 0", () => {
        const el = createMockElement();
        el.className = "item";
        document.body.appendChild(el);

        const instance = parallax(".item");

        instance.update(0);
        instance.kill();

        const [, transform] = applyTransform.mock.calls.at(-1);

        expect(transform.y.value).toBe(0);
    });

    test("handles zero height", () => {
        const el = createMockElement({ top: 100, height: 0 });
        el.className = "item";
        document.body.appendChild(el);

        const instance = parallax(".item");

        expect(() => instance.update(0)).not.toThrow();
    });

    test("handles negative positions", () => {
        const el = createMockElement({ top: -200, height: 100 });
        el.className = "item";
        document.body.appendChild(el);

        const instance = parallax(".item");

        expect(() => instance.update(0)).not.toThrow();
    });

    test("respects speed differences", () => {
        const el = createMockElement({ top: 100, height: 100 });
        el.className = "item";
        document.body.appendChild(el);

        const fast = parallax(".item", { speed: 1 });
        const slow = parallax(".item", { speed: 0.01 });

        fast.update(0);
        const fastVal = applyTransform.mock.calls.at(-1)[1].y.value;

        vi.clearAllMocks();

        slow.update(0);
        const slowVal = applyTransform.mock.calls.at(-1)[1].y.value;

        expect(Math.abs(fastVal)).toBeGreaterThan(Math.abs(slowVal));
    });

});