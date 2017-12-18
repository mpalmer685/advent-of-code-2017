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

    getValue(val) {
        if (isNaN(parseInt(val, 10))) {
            return this.getRegister(val)
        }
        return parseInt(val, 10)
    }

    set(x, y) {
        this.registers[x] = this.getValue(y)
    }

    add(x, y) {
        const oldX = this.getRegister(x)
        this.registers[x] = oldX + this.getValue(y)
    }

    mul(x, y) {
        const oldX = this.getRegister(x)
        this.registers[x] = oldX * this.getValue(y)
    }

    mod(x, y) {
        const oldX = this.getRegister(x)
        this.registers[x] = oldX % this.getValue(y)
    }

    jgz(x, y) {
        if (this.getValue(x) > 0) {
            return this.getValue(y)
        }
    }
}

class SingleProgramRegisters extends Registers {
    constructor() {
        super()
        this.lastFrequencyPlayed = 0
    }

    snd(x) {
        this.lastFrequencyPlayed = this.getValue(x)
    }

    rcv(x) {
        if (this.getRegister(x) !== 0) {
            return this.lastFrequencyPlayed
        }
        return 0
    }
}

class MultiProgramRegisters extends Registers {
    constructor(programNumber, sendQueue, receiveQueue) {
        super()
        this.sendCount = 0
        this.sendQueue = sendQueue
        this.receiveQueue = receiveQueue
        this.setRegister('p', programNumber)
    }

    snd(x) {
        this.sendQueue.push(this.getValue(x))
        this.sendCount++
    }

    rcv(x) {
        if (this.receiveQueue.length === 0) {
            return false
        }
        this.setRegister(x, this.receiveQueue.shift())
        return true
    }
}

class Program {
    constructor(instructions, registers) {
        this.instructions = instructions
        this.registers = registers
        this.currentInstruction = 0
        this.isIdle = false
    }

    step() {
        if (this.currentInstruction >= this.instructions.length || this.currentInstruction < 0) {
            return
        }

        const instruction = this.instructions[this.currentInstruction]
        const result = this.registers[instruction.operation](...instruction.args)
        if (instruction.operation === 'jgz' && result) {
            this.currentInstruction += result
        } else if (instruction.operation === 'rcv' && result === false) {
            this.isIdle = true
        } else {
            this.isIdle = false
            ++this.currentInstruction
        }
    }
}

const solve = runProgram => input => {
    const instructions = parseInput(input)
    return runProgram(instructions)
}

const instructionPattern = /([a-z]{3}) ([a-z0-9](?: [a-z0-9\-]+)?)/
const parseInput = input =>
    input
        .trim()
        .split('\n')
        .map(line => {
            const match = instructionPattern.exec(line)
            if (!match) {
                console.log(line)
            }
            return match
        })
        .map(match => ({
            operation: match[1],
            args: match[2].split(' ')
        }))

function runSingleProgram(instructions) {
    const registers = new SingleProgramRegisters()

    let currentInstruction = 0
    while (currentInstruction >= 0 && currentInstruction < instructions.length) {
        const instruction = instructions[currentInstruction]
        const result = registers[instruction.operation](...instruction.args)
        if (instruction.operation === 'jgz' && result) {
            currentInstruction += result
        } else if (instruction.operation === 'rcv' && result) {
            return result
        } else {
            ++currentInstruction
        }
    }
}

function runDoubleProgram(instructions) {
    const queue0 = []
    const queue1 = []
    const program0 = new Program(instructions, new MultiProgramRegisters(0, queue1, queue0))
    const program1 = new Program(instructions, new MultiProgramRegisters(1, queue0, queue1))

    while (!(program0.isIdle && program1.isIdle)) {
        program0.step()
        program1.step()
    }

    return program1.registers.sendCount
}

module.exports = {
    part1: solve(runSingleProgram),
    part2: solve(runDoubleProgram)
}
