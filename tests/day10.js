const { readFileSync } = require('fs')
const { part1, part2 } = require('../puzzles/day10')
const testSolution = require('./testSolution')

describe('Day 10', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: ['3,4,1,5'],
            extraArguments: [5],
            expectedOutputs: [12]
        })

        /*
        [0] 1 2 3 4 5 6 7 8 9   s = 0
        5 4 3 2 1 0 [6] 7 8 9   s = 1
        5 4 3 2 1 0 6 [7] 8 9   s = 2
        5 4 [3] 2 1 0 6 9 8 7   s = 3
        5 4 2 3 1 0 6 [9] 8 7   s = 4
        4 5 7 8 9 0 6 1 3 [2]
         */

        testSolution({
            solution: part1,
            inputs: ['6,0,3,2,8'],
            extraArguments: [10],
            expectedOutputs: [20]
        })

        testSolution({
            solution: part1,
            inputs: [readFileSync('./input/day10', 'utf8')],
            expectedOutputs: [3770]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [
                '',
                'AoC 2017',
                '1,2,3',
                '1,2,4'
            ],
            expectedOutputs: [
                'a2582a3a0e66e6e86e3812dcb672a272',
                '33efeb34ea91902bb2f59c9920caa6cd',
                '3efbe78a8d82f29979031a4aa0b16a9d',
                '63960835bcdc130f0b66d7ff4f6a5a8e'
            ]
        })
    })
})
