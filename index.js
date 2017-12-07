const fs = require('fs')
const { argv } = require('yargs')

const puzzle = require(`./puzzles/day${argv.day}`)
const solve = puzzle[`part${argv.part}`]
const input = fs.readFileSync(`./input/day${argv.day}`, 'utf8')
const result = solve(input)

console.log(result)
