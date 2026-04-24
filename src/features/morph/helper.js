
// return path based on points
function pointsToPath(points) {
    const { x: x0, y: y0 } = points[0];
    let d = `M${x0} ${y0}`;
    for (let i = 0; i < points.length; i++) {
        let { x: xi, y: yi } = points[i];
        d += `L ${xi} ${yi}`;
    }
    return d;
}
// return list of points eased from -> to shapes
function interpolatePoints(from, to, t) {
    let result = [];
    for (let i = 0; i < from.length; i++) {
        let { x: to_xi, y: to_yi } = to[i];
        let { x: from_xi, y: from_yi } = from[i];

        result.push({
            x: from_xi + (to_xi - from_xi) * t,
            y: from_yi + (to_yi - from_yi) * t,

        })
    }
    return result;

}
export { interpolatePoints, pointsToPath };
