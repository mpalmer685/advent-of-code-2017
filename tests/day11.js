const { part1, part2 } = require('../puzzles/day11')
const testSolution = require('./testSolution')

describe('Day 11', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [
                'ne,ne,ne',
                'ne,ne,sw,sw',
                'ne,ne,s,s',
                'se,sw,se,sw,sw'
            ],
            expectedOutputs: [3, 0, 2, 3]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [
                'ne,ne,ne',
                'ne,ne,sw,sw',
                'ne,ne,s,s',
                'se,sw,se,sw,sw'
            ],
            expectedOutputs: [3, 2, 2, 3]
        })
    })
})
