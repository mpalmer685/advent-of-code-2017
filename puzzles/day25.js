const times = require('lodash/times')

function parseInput(input) {
    const beginPattern = /Begin in state (\w)\./
    const stepCountPattern = /Perform a diagnostic checksum after (\d+) steps\./
    const indentPattern = /^(\s*)/

    const [beginLine, countLine,, ...instructionLines] = input.trim().split('\n')

    const beginState = beginPattern.exec(beginLine)[1]

    const stepCount = parseInt(stepCountPattern.exec(countLine)[1], 10)

    const states = {}
    let currentState,
        currentValue
    instructionLines.forEach(line => {
        if (line.length === 0) {
            currentState = currentValue = null
        } else {
            const indent = indentPattern.exec(line)[1]
            switch (indent.length) {
                case 0:
                    currentState = line.substr(-2, 1)
                    states[currentState] = {}
                    break
                case 2:
                    currentValue = line.substr(-2, 1)
                    states[currentState][currentValue] = {}
                    break
                case 4:
                    const instruction = states[currentState][currentValue]
                    const words = line.trim().split(' ')
                    const command = words[1].toLowerCase()
                    const value = words[words.length - 1].slice(0, -1)
                    instruction[command] = value
                    break
            }
        }
    })

    return { beginState, stepCount, states }
}

const solve = input => {
    const { beginState, stepCount, states } = parseInput(input)
    const tape = {}

    let cursor = 0
    let currentState = beginState

    times(stepCount, () => {
        const value = tape[cursor] || 0
        const instruction = states[currentState][value]

        tape[cursor] = instruction.write
        cursor += instruction.move === 'left' ? -1 : 1
        currentState = instruction.continue
    })

    return Object.values(tape).reduce((total, val) => total + Number(val), 0)
}

module.exports = {
    part1: solve,
    part2: solve
}
