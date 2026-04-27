import { DEFAULT_PROP } from "../common.js";

export const DEFAULT_TRANSFORM = {
    x: DEFAULT_PROP(0, 'px'),
    y: DEFAULT_PROP(0, 'px'),
    rotate: DEFAULT_PROP(0, 'deg'),
    scale: DEFAULT_PROP(1),
    opacity: DEFAULT_PROP(1),
};
export const DEFAULT_CONFIG = {
    from: 0,
    to: 100,
    duration: 600,
    delay: 50,
    repeat: 0,
    yoyo: false,

};
