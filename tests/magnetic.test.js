import { describe, test, expect, beforeEach, vi } from "vitest";
import { createMockElement } from "./helpers.js";
import magnetic from "../src/features/magnetic/magnetic.js";


function triggerMouseMove(x, y) {
    window.dispatchEvent(
        new MouseEvent("mousemove", {
            clientX: x,
            clientY: y
        })
    );
}

describe("magnetic()", () => {

    beforeEach(() => {
        document.body.innerHTML = "";
    });

    test("initializes and returns controller object", () => {
        const el = createMockElement();
        el.className = "btn";
        document.body.appendChild(el);

        const instance = magnetic(".btn");

        expect(instance).toBeTruthy();
        expect(instance.update).toBeTypeOf("function");
        expect(instance.kill).toBeTypeOf("function");
    });

    test("attaches mousemove listener", () => {
        const spy = vi.spyOn(window, "addEventListener");

        const el = createMockElement();
        el.className = "btn";
        document.body.appendChild(el);

        magnetic(".btn");

        expect(spy).toHaveBeenCalledWith(
            "mousemove",
            expect.any(Function)
        );
    });

    test("applies transform when inside maxDistance", () => {
        const el = createMockElement({
            left: 0,
            top: 0,
            width: 100,
            height: 100
        });
        el.className = "btn";
        document.body.appendChild(el);

        const instance = magnetic(".btn", {
            strength: 1,
            maxDistance: 500
        });

        triggerMouseMove(100, 100);

        instance.update(0);

        expect(el.style.transform).toContain("translate");
        expect(el.style.transform).not.toBe("translate(0px, 0px)");
    });

    test("resets transform when outside maxDistance", () => {
        const el = createMockElement({
            left: 0,
            top: 0,
            width: 100,
            height: 100
        });
        el.className = "btn";
        document.body.appendChild(el);

        const instance = magnetic(".btn", {
            maxDistance: 50
        });

        triggerMouseMove(1000, 1000);

        instance.update(0);

        expect(el.style.transform).toBe("translate(0px, 0px)");
    });

    test("computes correct force and translation", () => {
        const el = createMockElement({
            left: 0,
            top: 0,
            width: 100,
            height: 100
        });
        el.className = "btn";
        document.body.appendChild(el);

        const strength = 1;
        const maxDistance = 200;

        const instance = magnetic(".btn", { strength, maxDistance });

        triggerMouseMove(150, 50);

        instance.update(0);

        const dx = 100;
        const dy = 0;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const force = (1 - distance / maxDistance) * strength;

        const expectedX = dx * force;
        const expectedY = dy * force;

        expect(el.style.transform).toBe(
            `translate(${expectedX}px, ${expectedY}px)`
        );
    });

    test("handles zero distance (mouse at center)", () => {
        const el = createMockElement({
            left: 0,
            top: 0,
            width: 100,
            height: 100
        });
        el.className = "btn";
        document.body.appendChild(el);

        const instance = magnetic(".btn");

        triggerMouseMove(50, 50);

        instance.update(0);

        expect(el.style.transform).toBe("translate(0px, 0px)");
    });

    test("works with negative positions", () => {
        const el = createMockElement({
            left: -100,
            top: -100,
            width: 100,
            height: 100
        });
        el.className = "btn";
        document.body.appendChild(el);

        const instance = magnetic(".btn");

        triggerMouseMove(0, 0);

        expect(() => instance.update(0)).not.toThrow();
    });

    test("kill resets transform", () => {
        const el = createMockElement();
        el.className = "btn";
        document.body.appendChild(el);

        const instance = magnetic(".btn");

        triggerMouseMove(100, 100);
        instance.update(0);

        instance.kill();

        expect(el.style.transform).toBe("translate(0px, 0px)");
    });

    test("kill removes mousemove listener", () => {
        const spy = vi.spyOn(window, "removeEventListener");

        const el = createMockElement();
        el.className = "btn";
        document.body.appendChild(el);

        const instance = magnetic(".btn");

        instance.kill();

        expect(spy).toHaveBeenCalledWith(
            "mousemove",
            expect.any(Function)
        );
    });

});