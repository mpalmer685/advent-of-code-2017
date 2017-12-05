const constant = require('lodash/constant')
const identity = require('lodash/identity')
const parseInt = require('lodash/parseInt')
const trim = require('lodash/trim')

const solve = updateJump => input => {
    const jumps = getJumps(input)
    return traverseJumps(jumps, updateJump)
}

const getJumps = input =>
    input
        .trim()
        .split('\n')
        .map(trim)
        .map(parseInt)

function traverseJumps(jumps, updateJump) {
    let currentIndex = 0
    let numberOfJumps = 0
    while (currentIndex >= 0 && currentIndex < jumps.length) {
        const jumpAmount = jumps[currentIndex]
        jumps[currentIndex] = jumps[currentIndex] + updateJump(jumpAmount)
        currentIndex += jumpAmount
        ++numberOfJumps
    }
    return numberOfJumps
}

exports.part1 = solve(constant(1))
exports.part2 = solve(x => x < 3 ? 1 : -1)
