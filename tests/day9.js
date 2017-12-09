const { part1, part2 } = require('../puzzles/day9')
const testSolution = require('./testSolution')

describe('Day 9', () => {
    describe('Part 1', () => {
        testSolution({
            solution: part1,
            inputs: [
                '{}',
                '{{{}}}',
                '{{},{}}',
                '{{{},{},{{}}}}',
                '{<a>,<a>,<a>,<a>}',
                '{{<ab>},{<ab>},{<ab>},{<ab>}}',
                '{{<!!>},{<!!>},{<!!>},{<!!>}}',
                '{<{},{},{{}}>}',
                '{<{}>,{<},{{>}<}>}',
                '{{<a!>},{<a!>},{<a!>},{<ab>}}'
            ],
            expectedOutputs: [1, 6, 5, 16, 1, 9, 9, 1, 3, 3]
        })
    })

    describe('Part 2', () => {
        testSolution({
            solution: part2,
            inputs: [
                '{<>}',
                '{<random characters>}',
                '{<<<<>}',
                '{<{!>}>}',
                '{<!!>}',
                '{<!!!>>}',
                '{<{o"i!a,<{i<a>}'
            ],
            expectedOutputs: [0, 17, 3, 2, 0, 0, 10]
        })
    })
})
