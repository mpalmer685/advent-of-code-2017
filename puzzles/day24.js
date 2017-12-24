const identity = require('lodash/identity')
const max = require('lodash/max')
const sum = require('lodash/sum')

function parseInput(input) {
    return input
        .trim()
        .split('\n')
        .map(line => line.split('/'))
        .map(parts => {
            const [left, right] = parts.map(part => parseInt(part, 10))
            return { left, right }
        })
}

function buildBridges(connectors) {
    const bridges = []
    buildBridge(0, [], connectors)
    return bridges

    function buildBridge(currentConnector, bridgeInProgress, availableConnectors) {
        bridges.push(bridgeInProgress)
        availableConnectors.forEach(({ left, right }, index) => {
            if (left === currentConnector || right === currentConnector) {
                buildBridge(
                    left === currentConnector ? right : left,
                    [...bridgeInProgress, left + right],
                    [...availableConnectors.slice(0, index), ...availableConnectors.slice(index + 1)]
                )
            }
        })
    }
}

const solve = pickCandidateBridges => input => {
    const connectors = parseInput(input)
    const bridges = buildBridges(connectors)
    const candidateBridges = pickCandidateBridges(bridges)
    return max(candidateBridges.map(sum))
}

module.exports = {
    part1: solve(identity),
    part2: solve(bridges => {
        const maxLength = bridges.reduce((max, bridge) => Math.max(max, bridge.length), 0)
        return bridges.filter(b => b.length === maxLength)
    })
}
