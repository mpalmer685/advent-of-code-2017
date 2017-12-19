const solve = getResult => input => {
    const grid = parseInput(input)
    let location = findStart(grid)
    let direction = 'down'
    let markers = ''
    let distanceTraveled = 0
    while (direction) {
        let result
        if (direction === 'down' || direction === 'up') {
            result = traverseColumn(grid, location, direction === 'down')
            distanceTraveled += Math.abs(location[0] - result.location[0])
        } else {
            result = traverseRow(grid, location, direction === 'right')
            distanceTraveled += Math.abs(location[1] - result.location[1])
        }
        location = result.location
        markers += result.markers
        if (!location) {
            break
        }

        direction = findNextDirection(grid, location, direction)
    }
    return getResult({ markers, distanceTraveled })
}

const parseInput = input => {
    const grid = input
        .split('\n')
        .map(line => line.split(''))
        .filter(row => row.length > 0)
    const maxWidth = grid.reduce((max, row) => Math.max(max, row.length), 0)
    grid.forEach(row => {
        while (row.length < maxWidth + 1) {
            row.push(' ')
        }
    })
    return grid
}

function findStart(grid) {
    const col = grid[0].indexOf('|')
    return [-1, col]
}

const traverseColumn = axisTraversal(
    (grid, _, col) => grid.map(row => row[col]),
    row => row,
    (row, col, delta) => ([row + delta, col])
)

const traverseRow = axisTraversal(
    (grid, row) => grid[row],
    (_, col) => col,
    (row, col, delta) => ([row, col + delta])
)

function axisTraversal(getAxis, selectIndex, updateLocation) {
    return function traverseAxis(grid, location, positive) {
        const [row, col] = location
        const index = selectIndex(row, col)
        let axis = getAxis(grid, row, col)
        if (positive) {
            axis = axis.slice(index + 1)
        } else {
            axis = axis.slice(0, index)
            axis.reverse()
        }
        let endIndex = axis.indexOf(' ')
        if (endIndex === -1 && /[A-Z+]/.test(axis[axis.length - 1])) {
            endIndex = axis.length
        }
        const markers = axis
            .slice(0, endIndex)
            .filter(x => /[A-Z]/.test(x))
            .join('')
        return {
            markers,
            location: updateLocation(row, col, (positive ? 1 : -1) * endIndex)
        }
    }
}

function findNextDirection(grid, location, currentDirection) {
    const [row, col] = location
    if (isValidLocation(row + 1, col) && currentDirection !== 'up') {
        return 'down'
    }
    if (isValidLocation(row - 1, col) && currentDirection !== 'down') {
        return 'up'
    }
    if (isValidLocation(row, col + 1) && currentDirection !== 'left') {
        return 'right'
    }
    if (isValidLocation(row, col - 1) && currentDirection !== 'right') {
        return 'left'
    }

    function isValidLocation(row, col) {
        if (
            row < 0 ||
            row >= grid.length ||
            col < 0 ||
            col >= grid[0].length
        ) {
            return false
        }

        const val = grid[row][col]
        return /[A-Z|\-]/.test(val)
    }
}

module.exports = {
    part1: solve(r => r.markers),
    part2: solve(r => r.distanceTraveled)
}
