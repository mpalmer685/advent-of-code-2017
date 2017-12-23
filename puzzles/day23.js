class Registers {
    constructor() {
        this.registers = {}
        this.mulCalls = 0
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

    getValue(val) {
        if (isNaN(parseInt(val, 10))) {
            return this.getRegister(val)
        }
        return parseInt(val, 10)
    }

    set(x, y) {
        this.setRegister(x, this.getValue(y))
    }

    sub(x, y) {
        const oldX = this.getRegister(x)
        this.setRegister(x, oldX - this.getValue(y))
    }

    mul(x, y) {
        const oldX = this.getRegister(x)
        this.setRegister(x, oldX * this.getValue(y))
        ++this.mulCalls
    }

    jnz(x, y) {
        if (this.getValue(x) !== 0) {
            return this.getValue(y)
        }
    }
}

const instructionPattern = /([a-z]{3}) ([a-z0-9](?: [a-z0-9\-]+)?)/
const parseInput = input =>
    input
        .trim()
        .split('\n')
        .map(line => {
            const match = instructionPattern.exec(line)
            if (!match) {
                console.error(line)
            }
            return match
        })
        .map(match => ({
            operation: match[1],
            args: match[2].split(' ')
        }))

function part1(input) {
    const instructions = parseInput(input)
    const registers = new Registers()

    let currentInstruction = 0
    while (currentInstruction >= 0 && currentInstruction < instructions.length) {
        const instruction = instructions[currentInstruction]
        const result = registers[instruction.operation](...instruction.args)
        if (instruction.operation === 'jnz' && result) {
            currentInstruction += result
        } else {
            ++currentInstruction
        }
    }
    return registers.mulCalls
}

function part2() {
    // After translating the assembly instructions into actual code and optimizing...
    const base = 79 * 100 + 100000
    let composites = 0

    for (let i = 0; i <= 1000; ++i) {
        const target = base + (17 * i)
        for (let d = 2; d < target; ++d) {
            if (target % d === 0) {
                ++composites
                break
            }
        }
    }

    return composites
}

module.exports = {
    part1,
    part2
}
