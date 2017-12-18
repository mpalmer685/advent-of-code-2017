const { readFileSync } = require('fs')
const { part1, part2 } = require('../puzzles/day18')
const testSolution = require('./testSolution')

const sampleInput = `
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
`

describe('Day 18', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [
                sampleInput,
                readFileSync('./input/day18', 'utf8')
            ],
            expectedOutputs: [4, 3188]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [
                `
                    snd 1
                    snd 2
                    snd p
                    rcv a
                    rcv b
                    rcv c
                    rcv d
                `,
                readFileSync('./input/day18', 'utf8')
            ],
            expectedOutputs: [3, 7112]
        })
    })
})
