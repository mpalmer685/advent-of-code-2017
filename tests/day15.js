const { part1, part2 } = require('../puzzles/day15')
const testSolution = require('./testSolution')

describe.skip('Day 15', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: ['65,8921'],
            expectedOutputs: [1],
            extraArguments: [5]
        })

        testSolution({
            solution: part1,
            inputs: ['65,8921'],
            expectedOutputs: [588],
            timeout: 7000
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: ['65,8921'],
            expectedOutputs: [1],
            extraArguments: [1056]
        })

        testSolution({
            solution: part2,
            inputs: ['65,8921'],
            expectedOutputs: [309],
            timeout: 5000
        })
    })
})
