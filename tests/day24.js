const { part1, part2 } = require('../puzzles/day24')
const testSolution = require('./testSolution')

const sampleInput = [
    '0/2',
    '2/2',
    '2/3',
    '3/4',
    '3/5',
    '0/1',
    '10/1',
    '9/10',
].join('\n')

describe('Day 24', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [sampleInput],
            expectedOutputs: [31]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [sampleInput],
            expectedOutputs: [19]
        })
    })
})
