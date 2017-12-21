const { part1 } = require('../puzzles/day21')
const testSolution = require('./testSolution')

describe('Day 21', () => {
    describe('Part 1', () => {
        const sampleInput = [
            '../.# => ##./#../...',
            '.#./..#/### => #..#/..../..../#..#'
        ].join('\n')

        testSolution({
            solution: part1,
            inputs: [sampleInput],
            expectedOutputs: [12],
            extraArguments: [2]
        })
    })
})
