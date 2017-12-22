const { part1, part2 } = require('../puzzles/day22')
const testSolution = require('./testSolution')

const sampleInput = [
    '..#',
    '#..',
    '...'
].join('\n')

describe('Day 22', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [sampleInput],
            expectedOutputs: [5587]
        })
    })

    describe('Part 2', () => {
        testSolution.skip({
            solution: part2,
            inputs: [sampleInput],
            expectedOutputs: [2511944],
            timeout: 26000
        })
    })
})
