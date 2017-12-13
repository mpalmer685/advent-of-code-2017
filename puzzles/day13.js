const parseInt = require('lodash/parseInt')
const trim = require('lodash/trim')

class Firewall {
    constructor(input) {
        this.scanners = input
            .trim()
            .split('\n')
            .map(trim)
            .map(line => line.split(': '))
            .map(match => ({ depth: parseInt(match[0]), range: parseInt(match[1]) }))
    }

    getSeverity(delay) {
        return this.scanners
            .filter(this.willGetCaught(delay))
            .reduce((total, scanner) => total + scanner.depth * scanner.range, 0)
    }

    isSafe(delay) {
        return !this.scanners.some(this.willGetCaught(delay))
    }

    willGetCaught(delay) {
        return scanner => (delay + scanner.depth) % (2 * (scanner.range - 1)) === 0
    }
}

const solve = getResult => input => getResult(new Firewall(input))

function findMinimumDelay(firewall) {
    let delay = 0
    while (!firewall.isSafe(delay)) {
        ++delay
    }
    return delay
}

module.exports = {
    part1: solve(firewall => firewall.getSeverity(0)),
    part2: solve(findMinimumDelay)
}
