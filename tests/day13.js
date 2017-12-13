const { part1, part2 } = require('../puzzles/day13')
const testSolution = require('./testSolution')

const sampleInput = `
0: 3
1: 2
4: 4
6: 4
`

describe('Day 13', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [sampleInput],
            expectedOutputs: [24]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [sampleInput],
            expectedOutputs: [10]
        })
    })
})
