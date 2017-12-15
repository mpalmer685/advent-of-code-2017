const { part1, part2 } = require('../puzzles/day14')
const testSolution = require('./testSolution')

describe.skip('Day 14', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: ['flqrgnkx'],
            expectedOutputs: [8108],
            timeout: 5000
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: ['flqrgnkx'],
            expectedOutputs: [1242],
            timeout: 5000
        })
    })
})
