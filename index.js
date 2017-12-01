const { argv } = require('yargs')

const puzzle = require(`./puzzles/day${argv.day}`)
const solve = puzzle[`part${argv.part}`]
const result = solve(argv.input)

console.log(result)
