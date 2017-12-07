const find = require('lodash/find')
const findKey = require('lodash/findKey')
const includes = require('lodash/includes')
const partition = require('lodash/partition')
const trim = require('lodash/trim')

const solve = getResult => input => {
    const programs = parseInput(input)
    const root = findRoot(programs)
    return getResult(root, programs)
}

const lineRegex = /(\w+) \((\d+)\)(?: -> ((?:\w+(?:, )?)+))*/
const matchIndex = {
    programName: 1,
    weight: 2,
    children: 3
}

function parseInput(input) {
    return input
        .trim()
        .split('\n')
        .map(trim)
        .map(line => lineRegex.exec(line))
        .map(match => ({
            name: match[matchIndex.programName],
            weight: parseInt(match[matchIndex.weight], 10),
            children: match[matchIndex.children] ? match[matchIndex.children].split(', ') : false
        }))
}

function findRoot(programs) {
    const [nodes] = partition(programs, 'children')
    return find(nodes, node => !find(nodes, n => n !== node && includes(n.children, node.name)))
}

function buildTree(root, programs) {
    const allPrograms = programs.reduce((all, p) => {
        all[p.name] = p
        return all
    }, {})

    return populateChildren(root)

    function populateChildren(program) {
        let totalWeight = program.weight
        const node = { weight: program.weight }
        if (program.children) {
            const childStats = program.children.map(name => populateChildren(allPrograms[name]))
            node.children = childStats.map(n => n.node)
            totalWeight += childStats.reduce((w, n) => w + n.totalWeight, 0)
        } else {
            node.children = []
        }
        node.totalWeight = totalWeight
        return { node, totalWeight }
    }
}

function findBalanceAdjustment(node) {
    let weights = {}
    node.children.forEach(c => {
        if (!weights[c.totalWeight]) {
            weights[c.totalWeight] = 1
        } else {
            weights[c.totalWeight] += 1
        }
    })

    if (hasUnbalancedWeight()) {
        const unbalancedNode = find(node.children, c => weights[c.totalWeight] === 1)
        const adjustment = findBalanceAdjustment(unbalancedNode)
        if (!adjustment) {
            // The children of this node are balanced, so it's this node we need to adjust
            const targetWeight = findKey(weights, w => w > 1)
            const adjustment = targetWeight - unbalancedNode.totalWeight
            return unbalancedNode.weight + adjustment
        }
        return adjustment
    } else {
        return false
    }

    function hasUnbalancedWeight() {
        return !!find(weights, w => w === 1) && !!find(weights, w => w > 1)
    }
}

exports.part1 = solve(r => r.name)
exports.part2 = solve((root, programs) => {
    const tree = buildTree(root, programs)
    return findBalanceAdjustment(tree.node)
})
