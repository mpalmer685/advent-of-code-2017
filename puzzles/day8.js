const max = require('lodash/max')
const trim = require('lodash/trim')
const values = require('lodash/values')

class Registers {
    constructor() {
        this.registers = {}
    }

    getRegister(name) {
        let register = this.registers[name]
        if (!register) {
            register = this.setRegister(name, 0)
        }
        return register
    }

    setRegister(name, value) {
        this.registers[name] = value
        return value
    }
}

const solve = getMax => input => {
    const instructions = parseInput(input)
    const result = processInstructions(instructions)
    return getMax(result)
}

const instructionRegex = /(\w+) (inc|dec) (-?\d+) if (\w+) (>|<|<=|>=|==|!=) (-?\d+)/
const matchIndex = {
    register: 1,
    incOrDec: 2,
    amount: 3,
    checkRegister: 4,
    compare: 5,
    checkAmount: 6
}

const comparators = {
    '<': (a, b) => a < b,
    '>': (a, b) => a > b,
    '<=': (a, b) => a <= b,
    '>=': (a, b) => a >= b,
    '==': (a, b) => a === b,
    '!=': (a, b) => a!== b
}

const parseInput = input =>
    input
        .trim()
        .split('\n')
        .map(trim)
        .map(line => instructionRegex.exec(line))
        .map(match => ({
            register: match[matchIndex.register],
            multiplier: match[matchIndex.incOrDec] === 'inc' ? 1 : -1,
            amount: parseInt(match[matchIndex.amount]),
            condition: {
                register: match[matchIndex.checkRegister],
                compare: comparators[match[matchIndex.compare]],
                amount: parseInt(match[matchIndex.checkAmount])
            }
        }))

function processInstructions(instructions) {
    let lifetimeMax = 0
    const finalRegisters = instructions.reduce((registers, instruction) => {
        const registerToCheck = registers.getRegister(instruction.condition.register)
        if (instruction.condition.compare(registerToCheck, instruction.condition.amount)) {
            const register = registers.getRegister(instruction.register)
            const { multiplier, amount } = instruction
            const newAmount = register + (multiplier * amount)
            lifetimeMax = Math.max(lifetimeMax, newAmount)
            registers.setRegister(instruction.register, newAmount)
        }
        return registers
    }, new Registers())

    const finalMax = max(values(finalRegisters.registers))
    return { lifetimeMax, finalMax }
}

exports.part1 = solve(r => r.finalMax)
exports.part2 = solve(r => r.lifetimeMax)
