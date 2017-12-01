const { argv } = require('yargs')
const inputs = require('./inputs')

const puzzle = require(`./puzzles/day${argv.day}`)
const solve = puzzle[`part${argv.part}`]
const result = solve(inputs[argv.day])

console.log(result)
