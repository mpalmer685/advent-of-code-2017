const { part1, part2 } = require('../puzzles/day8')
const testSolution = require('./testSolution')

const sampleInput = `
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`

describe('Day 8', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [sampleInput],
            expectedOutputs: [1]
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
