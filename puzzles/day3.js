/*

Hoo boy, let's unpack this.
For any layer n (starting from n = 1), each side of that layer has 2n - 1 squares. The highest
numbered square in that layer is (2n - 1)^2. We can use that to determine which layer any number
square is in.

From there, we need to determine the distance from the target square to one of the "axis" squares
(one of the squares vertically or horizontally aligned with the center). There are a few ways to
do it, but I chose a binary search to narrow it down to one side. Then, the distance to the center
is
    Math.abs(target number - value of closest axis) + (n - 1)

If the binary search finds that the target square is a corner square, the search stops early and
the distance in that case is 2 * (n - 1).

17 16 15 14 13
18  5  4  3 12
19  6  1  2 11
20  7  8  9 10
21 22 23 24 25

For part 2, use OEIS: https://oeis.org/A141481

 */

exports.part1 = solve

function solve(squareNumber) {
    const layerNumber = getLayerNumber(squareNumber)
    return findDistance(squareNumber, layerNumber)
}

function getLayerNumber(squareNumber) {
    const rootN = Math.sqrt(squareNumber)
    const ceilRootN = Math.ceil(rootN)

    if (rootN % 1 === 0 && ceilRootN % 2 === 1) {
        return (rootN + 1) / 2
    } else if (ceilRootN % 2 === 0) {
        return (ceilRootN + 2) / 2
    } else {
        return (ceilRootN + 1) / 2
    }
}

function findDistance(squareNumber, layer) {
    const maxSearchAttempts = 2
    let min = getMaxLayerValue(layer - 1)
    let max = getMaxLayerValue(layer)
    let searchResult = (min + max) / 2
    let searchAttempt = 0
    while (searchResult !== squareNumber && searchAttempt < maxSearchAttempts) {
        if (searchResult > squareNumber) {
            max = searchResult
        } else {
            min = searchResult
        }
        searchResult = (min + max) / 2
        ++searchAttempt
    }

    if (searchAttempt === 0 || searchAttempt === 1) {
        return getMaxLayerDistance(layer)
    } else if (searchResult === squareNumber) {
        return layer - 1
    } else {
        return layer - 1 + Math.abs(searchResult - squareNumber)
    }
}

function getLayerSideLength(layer) {
    return (2 * layer) - 1
}

function getMaxLayerValue(layer) {
    return getLayerSideLength(layer) * getLayerSideLength(layer)
}

function getMaxLayerDistance(layer) {
    return 2 * (layer - 1)
}
