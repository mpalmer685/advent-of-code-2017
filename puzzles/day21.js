const filter = require('lodash/filter')
const range = require('lodash/range')
const times = require('lodash/times')

const INITIAL_STATE = ['.#.', '..#', '###']

function parseInput(input) {
    const transformations = input
        .trim()
        .split('\n')
        .reduce((all, line) => {
            const [key, value] = line.split(' => ')
            all[key] = value
            return all
        }, {})

    Object.keys(transformations).forEach(pattern => {
        const transform = transformations[pattern]
        for (let i = 0; i < 4; ++i) {
            transformations[flip(pattern)] = transform
            pattern = rotate(pattern)
            transformations[pattern] = transform
        }
    })

    return transformations

    function flip(pattern) {
        const block = pattern
            .split('/')
            .map(row => row.split('').reverse())
        return block.map(line => line.join('')).join('/')
    }

    function rotate(pattern) {
        const block = pattern.split('/').map(row => row.split('')).reverse()
        for (let i = 0; i < block.length; ++i) {
            for (let j = 0; j < i; ++j) {
                const temp = block[i][j]
                block[i][j] = block[j][i]
                block[j][i] = temp
            }
        }
        return block.map(line => line.join('')).join('/')
    }
}

function splitIntoChunks(grid, chunkSize) {
    const result = []
    for (let i = 0; i < grid.length; i += chunkSize) {
        for (let j = 0; j < grid.length; j += chunkSize) {
            const parts = range(chunkSize).reduce((parts, k) => {
                parts.push(grid[i + k].substring(j, j + chunkSize))
                return parts
            }, [])
            result.push(parts.join('/'))
        }
    }
    return result
}

function combineChunks(chunks) {
    const newGrid = []
    const chunkLength = chunks[0].match(/\//g).length + 1
    const chunksPerRow = Math.sqrt(chunks.length)
    for (let i = 0; i < chunks.length; i += chunksPerRow) {
        for (let j = 0; j < chunkLength; ++j) {
            newGrid.push(range(chunksPerRow).reduce((str, k) => str + chunks[i + k].split('/')[j], ''))
        }
    }
    return newGrid
}

function transform(grid, transformations) {
    const chunkSize = grid.length % 2 === 0 ? 2 : 3
    const blocks = splitIntoChunks(grid, chunkSize)
        .map(block => transformations[block])
    return combineChunks(blocks)
}

const solve = defaultCycleCount => (input, cycleCount = defaultCycleCount) => {
    const transformations = parseInput(input)
    let grid = INITIAL_STATE
    times(cycleCount, () => {
        grid = transform(grid, transformations)
    })

    return filter(grid.join(''), c => c === '#').length
}

module.exports = {
    part1: solve(5),
    part2: solve(18)
}
