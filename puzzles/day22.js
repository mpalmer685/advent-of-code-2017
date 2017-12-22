const times = require('lodash/times')

const DIRECTIONS = [
    // North
    [-1, 0],

    // East
    [0, 1],

    // South
    [1, 0],

    // West
    [0, -1]
]

const TURN = { LEFT: -1, RIGHT: 1, REVERSE: 2 }

const NODE_STATE = {
    CLEAN: 'C',
    WEAK: 'W',
    INFECTED: 'I',
    FLAGGED: 'F'
}

class Virus {
    constructor() {
        this.direction = 0
        this.location = [0, 0]
    }

    changeDirection(turn) {
        this.direction = (this.direction + DIRECTIONS.length + turn) % DIRECTIONS.length
    }

    move() {
        const [currRow, currCol] = this.location
        const [dr, dc] = DIRECTIONS[this.direction]
        this.location = [currRow + dr, currCol + dc]
    }

    isOnInfectedNode(grid) {
        return !!grid.get(...this.location)
    }
}

class Grid {
    constructor(input) {
        this.grid = new Map()

        const infectedArea = input.split('\n').map(line => line.split(''))
        const origin = Math.floor(infectedArea.length / 2)

        infectedArea.forEach((row, rowIndex) => {
            row.forEach((state, colIndex) => {
                if (state === '#') {
                    this.set(rowIndex - origin, colIndex - origin, NODE_STATE.INFECTED)
                }
            })
        })
    }

    get(row, col) {
        return this.grid.get(`${row},${col}`)
    }

    set(row, col, state) {
        const location = [row, col].join(',')
        if (state === NODE_STATE.CLEAN) {
            this.grid.delete(location)
        } else {
            this.grid.set(location, state)
        }
    }
}

const solve = (cycleCount, cycleRunner) => input => {
    const grid = new Grid(input)
    const virus = new Virus()
    const runCycle = cycleRunner(grid, virus)

    let infectionCount = 0
    times(cycleCount, () => {
        infectionCount += runCycle()
    })
    return infectionCount
}

function part1(grid, virus) {
    return () => {
        const isInfected = virus.isOnInfectedNode(grid)
        virus.changeDirection(isInfected ? TURN.RIGHT : TURN.LEFT)
        grid.set(...virus.location, !isInfected)
        virus.move()
        return isInfected ? 0 : 1
    }
}

function part2(grid, virus) {
    return () => {
        let infectionCount = 0
        let nextState

        const state = grid.get(...virus.location)
        switch (state) {
        case NODE_STATE.WEAK:
            nextState = NODE_STATE.INFECTED
            infectionCount = 1
            break
        case NODE_STATE.INFECTED:
            virus.changeDirection(TURN.RIGHT)
            nextState = NODE_STATE.FLAGGED
            break
        case NODE_STATE.FLAGGED:
            virus.changeDirection(TURN.REVERSE)
            nextState = NODE_STATE.CLEAN
            break
        default:
            virus.changeDirection(TURN.LEFT)
            nextState = NODE_STATE.WEAK
        }

        grid.set(...virus.location, nextState)
        virus.move()
        return infectionCount
    }
}

module.exports = {
    part1: solve(10000, part1),
    part2: solve(10000000, part2)
}
