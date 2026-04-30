import Easings from "./core/easing.js";

import magnetic from "./features/magnetic/magnetic.js";
import { parallax } from "./features/parallax/parallax.js";
import reveal from "./features/reveal/reveal.js";
import splitText from "./features/split-text/split-text.js";
import createAnimation from "./core/motion.js";
import svgMotion from "./features/svg-motion/svg-motion.js";
import Timeline from "./core/timeline.js";
import morph from "./features/morph/morph.js";
import cursor from "./features/cursor-follow/cursor.js";
import drag from "./features/dragging/drag.js";

export {
    Easings,
    magnetic,
    parallax,
    reveal,
    splitText,
    createAnimation,
    svgMotion,
    Timeline,
    morph,
    cursor,
    drag
};

const Magnetix = {
    Easings,
    magnetic,
    parallax,
    reveal,
    splitText,
    createAnimation,
    svgMotion,
    Timeline,
    morph,
    cursor,
    drag
};

export default Magnetix;