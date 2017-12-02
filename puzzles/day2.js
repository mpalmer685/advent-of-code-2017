const add = require('lodash/add')
const max = require('lodash/max')
const min = require('lodash/min')
const parseInt = require('lodash/parseInt')
const trim = require('lodash/trim')

exports.part1 = input => solve(input, differenceOfMaxAndMin)
exports.part2 = input => solve(input, quotientOfDivisibleValues)

const solve = (input, calculateRowValue) =>
    input
        .trim()
        .split('\n')
        .map(trim)
        .map(row => row.split(/\s+/).map(parseInt))
        .map(calculateRowValue)
        .reduce(add, 0)

function differenceOfMaxAndMin(digits) {
    return max(digits) - min(digits)
}

function quotientOfDivisibleValues(digits) {
    const values = findDivisibleValues()
    if (values) {
        const { numerator, denominator } = values
        return numerator / denominator
    }

    function findDivisibleValues() {
        for (let numerator of digits) {
            for (let denominator of digits) {
                if (numerator !== denominator && numerator % denominator === 0) {
                    return { numerator, denominator }
                }
            }
        }
    }
}
