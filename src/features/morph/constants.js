
const DEFAULT_FROM_SHAPE = [
    { x: 50, y: 50 },
    { x: 150, y: 50 },
    { x: 150, y: 150 },
    { x: 50, y: 150 }
]

const DEFAULT_TO_SHAPE = [
    { x: 100, y: 30 },
    { x: 170, y: 300 },
    { x: 0, y: 1070 },
    { x: 180, y: 100 }
]

const DEFAULT_MORPH_CONFIG = {
    attr: 'd',
    from: DEFAULT_FROM_SHAPE,
    to: DEFAULT_TO_SHAPE,
    duration: 1000,
    start: 0,
    end: 100,
    delay: 0,
}
export default DEFAULT_MORPH_CONFIG;