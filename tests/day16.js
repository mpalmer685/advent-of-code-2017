const { part1, part2 } = require('../puzzles/day16')
const testSolution = require('./testSolution')

describe('Day 16', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: ['s3', 'x0/4', 'pc/d', 's1,x3/4,pe/b'],
            expectedOutputs: ['cdeab', 'ebcda', 'abdce', 'baedc'],
            extraArguments: [5]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: ['s1,x3/4,pe/b'],
            expectedOutputs: ['ceadb'],
            extraArguments: [5, 2]
        })
    })
})
