const { readFileSync } = require('fs')
const { part1, part2 } = require('../puzzles/day20')
const testSolution = require('./testSolution')

const puzzleInput = readFileSync('./input/day20', 'utf8')

describe('Day 20', () => {
    describe('Part 1', () => {
        const sampleInput = [
            'p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>',
            'p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>'
        ].join('\n')

        const sameAccelerationInput = [
            'p=< 3,0,0>, v=< 2,0,0>, a=<-2,0,0>',
            'p=< 4,0,0>, v=< 0,0,0>, a=<-1,0,0>',
            'p=< 4,0,0>, v=< 2,0,0>, a=<-1,0,0>'
        ].join('\n')

        testSolution.skip({
            solution: part1,
            inputs: [sampleInput, sameAccelerationInput],
            expectedOutputs: [0, 1]
        })
    })

    describe('Part 2', () => {
        const sampleInput = [
            'p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>',
            'p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>',
            'p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>',
            'p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>'
        ].join('\n')

        testSolution({
            solution: part2,
            inputs: [sampleInput, puzzleInput],
            expectedOutputs: [1, 461]
        })
    })
})
