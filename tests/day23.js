const { part1 } = require('../puzzles/day23')
const testSolution = require('./testSolution')

describe('Day 23', () => {
    describe('Part 1', () => {
        const zero = makeInput([
            'set a 10',
            'sub a 5'
        ])
        const one = makeInput([
            'set a 10',
            'mul a 2'
        ])
        const five = makeInput([
            'set a 5',
            'sub a 1',
            'mul b 10',
            'jnz a -2'
        ])

        testSolution({
            solution: part1,
            inputs: [zero, one, five],
            expectedOutputs: [0, 1, 5]
        })
    })
})

function makeInput(lines) {
    return lines.join('\n')
}
