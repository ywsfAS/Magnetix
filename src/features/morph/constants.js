
const DEFAULT_FROM_SHAPE = [
    { x: 50, y: 50 },
    { x: 150, y: 50 },
    { x: 150, y: 150 },
    { x: 50, y: 150 }
]

const DEFAULT_TO_SHAPE = [
    { x: 100, y: 20 },
    { x: 120, y: 80 },
    { x: 180, y: 80 },
    { x: 130, y: 120 },
    { x: 150, y: 180 },
    { x: 100, y: 140 },
    { x: 50, y: 180 },
    { x: 70, y: 120 },
    { x: 20, y: 80 },
    { x: 80, y: 80 }
]

const DEFAULT_MORPH_CONFIG = {
    attr: 'd',
    from: DEFAULT_FROM_SHAPE,
    to: DEFAULT_TO_SHAPE,
    duration: 1000,
    start: 0,
    end: 100,
    delay: 0,
    pointsCount: 20,
}
export default DEFAULT_MORPH_CONFIG;