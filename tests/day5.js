const { part1, part2 } = require('../puzzles/day5')
const testSolution = require('./testSolution')

describe('Day 5', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [`
                0
                3
                0
                1
                -3
            `, `
                0
                4
                0
                1
                -3
            `, `
                0
                3
                0
                1
                -2
            `],
            expectedOutputs: [5, 3, 9]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [`
                0
                3
                0
                1
                -3
            `],
            expectedOutputs: [10]
        })
    })
})
