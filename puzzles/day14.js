const has = require('lodash/has')
const padStart = require('lodash/padStart')
const range = require('lodash/range')
const { part2: calculateHash } = require('./day10')

const knownBitCounts = {}
function getBitCount(digit) {
    if (has(knownBitCounts, digit)) {
        return knownBitCounts[digit]
    }

    const bitCount = countSetBits(parseInt(digit, 16))
    knownBitCounts[digit] = bitCount
    return bitCount

    function countSetBits(n) {
        let count = 0
        while (n) {
            n &= (n - 1)
            ++count
        }
        return count
    }
}

function countUsedSquares(input) {
    return range(128).reduce((total, row) => {
        const hash = calculateHash(`${input}-${row}`)
        const bitCount = hash.split('').reduce((total, digit) => total + getBitCount(digit), 0)
        return total + bitCount
    }, 0)
}

class Grid {
    constructor(input) {
        this.grid = range(128).map(row => {
            const hash = calculateHash(`${input}-${row}`)
            return hash
                .split('')
                .map(d => parseInt(d, 16))
                .map(n => n.toString(2))
                .map(s => padStart(s, 4, '0'))
                .join('')
                .split('')
                .map(d => parseInt(d, 10))
        })
    }

    getValue(x, y) {
        if ( x < 0 || y < 0 || x > 127 || y > 127) {
            return 0
        }
        return this.grid[x][y]
    }

    setValue(x, y, value) {
        this.grid[x][y] = value
    }

    removeGroup(x, y) {
        if (this.getValue(x, y) === 0) {
            return
        }

        this.setValue(x, y, 0)
        this.removeGroup(x + 1, y)
        this.removeGroup(x - 1, y)
        this.removeGroup(x, y + 1)
        this.removeGroup(x, y - 1)
    }
}

function countDistinctGroups(input) {
    const grid = new Grid(input)

    let groups = 0
    for (let x = 0; x < 128; ++x) {
        for (let y = 0; y < 128; ++y) {
            if (grid.getValue(x, y) === 1) {
                ++groups
                grid.removeGroup(x, y)
            }
        }
    }
    return groups
}

module.exports = {
    part1: countUsedSquares,
    part2: countDistinctGroups
}
