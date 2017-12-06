const { part1, part2 } = require('../puzzles/day6')
const testSolution = require('./testSolution')

describe('Day 6', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: ['0 2 7 0'],
            expectedOutputs: [5]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: ['0 2 7 0'],
            expectedOutputs: [4]
        })
    })
})
