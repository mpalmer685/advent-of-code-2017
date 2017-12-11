// https://www.redblobgames.com/grids/hexagons/
// [x, y, z]
const movements = {
    n: [0, 1, -1],
    ne: [1, 0, -1],
    se: [1, -1, 0],
    s: [0, -1, 1],
    sw: [-1, 0, 1],
    nw: [-1, 1, 0]
}
const ORIGIN = [0, 0, 0]

const solve = getResult => input => {
    const path = input.split(',').map(movement => movements[movement])
    return getResult(path)
}

function getEndDistance(path) {
    const endLocation = path.reduce(applyMovement, ORIGIN)
    return getDistance(endLocation)
}

function getMaxDistance(path) {
    return path.reduce(({ maxDistance, currentLocation }, movement) => {
        const newLocation = applyMovement(currentLocation, movement)
        return {
            maxDistance: Math.max(maxDistance, getDistance(newLocation)),
            currentLocation: newLocation
        }
    }, { maxDistance: 0, currentLocation: ORIGIN }).maxDistance
}

function applyMovement(currentLocation, movement) {
    const [currX, currY, currZ] = currentLocation
    const [dx, dy, dz] = movement
    return [currX + dx, currY + dy, currZ + dz]
}

function getDistance(location) {
    const [x, y, z] = location
    return (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2
}

module.exports = {
    part1: solve(getEndDistance),
    part2: solve(getMaxDistance)
}
