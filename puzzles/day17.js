const times = require('lodash/times')

const solve = (cycleCount, onCycle) => input => {
    const skip = parseInt(input, 10)

    let value = null
    let currentPosition = 0
    times(cycleCount, n => {
        currentPosition = (currentPosition + skip) % (n + 1)
        value = onCycle(currentPosition, n)
        ++currentPosition
    })
    return value
}

function valueAfterLastInserted() {
    const ringBuffer = [0]
    return (currentPosition, cycle) => {
        ringBuffer.splice(currentPosition + 1, 0, cycle + 1)
        return ringBuffer[(currentPosition + 2) % (cycle + 1)]
    }
}

function valueAfterZero() {
    let value = 0
    return (currentPosition, cycle) => {
        if (currentPosition === 0) {
            value = cycle + 1
        }
        return value
    }
}

module.exports = {
    part1: solve(2017, valueAfterLastInserted()),
    part2: solve(50000000, valueAfterZero())
}
