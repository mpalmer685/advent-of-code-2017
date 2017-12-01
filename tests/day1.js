const solutions = require('../puzzles/day1')
const testSolution = require('./testSolution')

describe('Day 1', () => {
    describe('Part 1', () => {
        testSolution({
            solution: solutions.part1,
            inputs: ['1122', '1111', '1234', '91212129'],
            expectedOutputs: [3, 4, 0, 9]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: solutions.part2,
            inputs: ['1212', '1221', '123425', '123123', '12131415'],
            expectedOutputs: [6, 0, 4, 12, 4]
        })
    })
})
