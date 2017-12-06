const includes = require('lodash/includes')
const indexOf = require('lodash/indexOf')
const max = require('lodash/max')
const parseInt = require('lodash/parseInt')

const solve = getResult => input => {
    const banks = input.split(/\s+/).map(parseInt)
    const visitedStates = []
    let currentState = serializeState(banks)

    while (!includes(visitedStates, currentState)) {
        visitedStates.push(currentState)
        distributeBlocks(banks, indexOfMax(banks))
        currentState = serializeState(banks)
    }

    return getResult(visitedStates, currentState)
}

function indexOfMax(banks) {
    const maxValue = max(banks)
    return indexOf(banks, maxValue)
}

function serializeState(banks) {
    return banks.join(' ')
}

function distributeBlocks(banks, index) {
    const blocksToDistribute = banks[index]
    banks[index] = 0
    for (let block = 1; block <= blocksToDistribute; ++block) {
        const bankNumber = (index + block) % banks.length
        banks[bankNumber] += 1
    }
}

exports.part1 = solve(visitedStates => visitedStates.length)
exports.part2 = solve((visitedStates, endState) => visitedStates.length - indexOf(visitedStates, endState))
