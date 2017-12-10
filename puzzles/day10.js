const chunk = require('lodash/chunk')
const padStart = require('lodash/padStart')
const parseInt = require('lodash/parseInt')
const range = require('lodash/range')
const times = require('lodash/times')

const solve = (parseInput, cycleCount, calculateResult) => (input, listSize = 256) => {
    const list = range(listSize)
    const lengths = parseInput(input)
    performTwists(list, lengths, cycleCount)
    return calculateResult(list)
}

function performTwists(list, lengths, cycleCount) {
    let currentPosition = 0
    let skipSize = 0

    times(cycleCount, () => {
        lengths.forEach(length => {
            const sublist = [...list, ...list].slice(currentPosition, currentPosition + length)
            sublist.reverse().forEach((item, index) => {
                list[(currentPosition + index) % list.length] = item
            })
            currentPosition = (currentPosition + length + skipSize++) % list.length
        })
    })
}

module.exports = {
    part1: solve(parseInputAsCommaSeparatedList, 1, ([first, second]) => first * second),
    part2: solve(parseInputAsAsciiList, 64, calculateListHash)
}

function parseInputAsCommaSeparatedList(input) {
    return input.split(',').map(parseInt)
}

function parseInputAsAsciiList(input) {
    let lengths = []
    if (input) {
        lengths = input.split('').map(char => char.charCodeAt(0))
    }
    return lengths.concat([17, 31, 73, 47, 23])
}

function calculateListHash(list) {
    return chunk(list, 16)
        .map(block => block.reduce(xor))
        .map(toHexString)
        .join('')

    function xor(x, d) {
        return x ^ d
    }

    function toHexString(number) {
        return padStart(number.toString(16), 2, '0')
    }
}
