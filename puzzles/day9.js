const solve = calculateScore => input => {
    const tree = parseInput(input)
    return calculateScore(tree)
}

const GROUP_START = '{'
const GROUP_END = '}'
const GARBAGE_START = '<'
const GARBAGE_END = '>'
const GARBAGE_CANCEL = '!'

function parseInput(input, depth = 1) {
    if (input[0] !== GROUP_START) {
        throw new Error('Not at start of new group')
    }
    const children = []
    let index = 1
    let inGarbage = false
    let garbageCount = 0
    while (index < input.length && (input[index] !== GROUP_END || inGarbage)) {
        if (input[index] === GROUP_START && !inGarbage) {
            const child = parseInput(input.substring(index), depth + 1)
            children.push(child)
            index += child.offset
        } else if (input[index] === GARBAGE_START) {
            if (inGarbage) {
                ++garbageCount
            }
            inGarbage = true
        } else if (input[index] === GARBAGE_END) {
            inGarbage = false
        } else if (inGarbage && input[index] === GARBAGE_CANCEL) {
            ++index
        } else if (inGarbage) {
            ++garbageCount
        }
        ++index
    }
    return { depth, children, garbageCount, offset: index }
}

function getTotalScore(key) {
    function calculateScores(tree) {
        return tree[key] + tree.children.reduce((s, c) => s + calculateScores(c), 0)
    }
    return calculateScores
}

exports.part1 = solve(getTotalScore('depth'))
exports.part2 = solve(getTotalScore('garbageCount'))
