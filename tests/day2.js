const solutions = require('../puzzles/day2')
const testSolution = require('./testSolution')

describe('Day 2', () => {
    describe('Part 1', () => {
        testSolution({
            solution: solutions.part1,
            inputs: [`
                5 1 9 5
                7 5 3
                2 4 6 8
            `, `
                15  18  25
                125 56  25
            `],
            expectedOutputs: [18, 110]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: solutions.part2,
            inputs: [`
                5 9 2 8
                9 4 7 3
                3 8 6 5
            `],
            expectedOutputs: [9]
        })
    })
})