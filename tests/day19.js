const { readFileSync } = require('fs')
const { part1, part2 } = require('../puzzles/day19')
const testSolution = require('./testSolution')

const sampleInput = `
     |
     |  +--+
     A  |  C
 F---|----E|--+
     |  |  |  D
     +B-+  +--+
`

const sampleInput2 = `
           |
           |
    +--L---+   +--O   +--+
    M          |      |  |
    |          +------|--+
    |                 |
    +----N------------+
`

const puzzleInput = readFileSync('./input/day19', 'utf8')

describe('Day 19', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [sampleInput, sampleInput2, puzzleInput],
            expectedOutputs: ['ABCDEF', 'LMNO', 'LOHMDQATP']
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [sampleInput, sampleInput2, puzzleInput],
            expectedOutputs: [38, 56, 16492]
        })
    })
})
