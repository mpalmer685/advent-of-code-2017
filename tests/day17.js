const { part1, part2 } = require('../puzzles/day17')
const testSolution = require('./testSolution')

describe('Day 17', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: ['3'],
            expectedOutputs: [638]
        })
    })
})
