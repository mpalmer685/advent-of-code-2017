const solutions = require('../puzzles/day4')
const testSolution = require('./testSolution')

describe('Day 4', () => {
    describe('Part 1', () => {
        testSolution({
            solution: solutions.part1,
            inputs: [`
                aa bb cc dd ee
                aa bb cc dd aa
                aa bb cc dd aaa
            `, `
                abc ab bc cd de
                abc ab abcd abc
                ab bc cd de efg
                abcdefg abcdefg
            `],
            expectedOutputs: [2, 2]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: solutions.part2,
            inputs: [`
                abcde fghij
                abcde xyz ecdab
                a ab abc abd abf abj
                iiii oiii ooii oooi oooo
                oiii ioii iioi iiio
            `],
            expectedOutputs: [3]
        })
    })
})