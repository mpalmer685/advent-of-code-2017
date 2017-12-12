const { part1, part2 } = require('../puzzles/day12')
const testSolution = require('./testSolution')

const sampleInput = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`

describe('Day 12', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [sampleInput],
            expectedOutputs: [6]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [sampleInput],
            expectedOutputs: [2]
        })
    })
})
