const solutions = require('../puzzles/day3')
const testSolution = require('./testSolution')

describe('Day 3', () => {
    describe('Part 1', () => {
        testSolution({
            solution: solutions.part1,
            inputs: [1, 12, 16, 23, 36, 48, 1024],
            expectedOutputs: [0, 3, 3, 2, 5, 5, 31]
        })
    })
})
