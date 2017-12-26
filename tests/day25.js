const { part1 } = require('../puzzles/day25')
const testSolution = require('./testSolution')

const sampleInput = `
Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
`

describe('Day 25', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [sampleInput],
            expectedOutputs: [3]
        })
    })
})
