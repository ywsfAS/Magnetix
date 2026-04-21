import Easings from "../../core/easing.js";
import { DEFAULT_PROP } from "../common.js";

const DEFAULT_CONFIG = {
    from: 0,
    to: 200,
    delay: 0,
    duration: 2000, // 2s
    easing: Easings.easeInCubic,
    repeat: 0,
    yoyo: false,
}
const DEFAULT_PATH = {
    from: [0, 0],
    p1: [100, 100],
    p2: [200, 0],
    to: [300, 250]
}
const DEFAULT_TRANSFORM = {
    scale: DEFAULT_PROP(1),
    rotate: DEFAULT_PROP(0),
    opacity: DEFAULT_PROP(1),
}
export { DEFAULT_CONFIG, DEFAULT_PATH, DEFAULT_TRANSFORM };