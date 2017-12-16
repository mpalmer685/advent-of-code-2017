const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const makeMove = {
    s(programs, count) {
        return [...programs.slice(-count), ...programs.slice(0, -count)]
    },
    x(programs, [first, second]) {
        [programs[first], programs[second]] = [programs[second], programs[first]]
        return programs
    },
    p(programs, [first, second]) {
        const args = [
            programs.indexOf(first),
            programs.indexOf(second)
        ]
        return this.x(programs, args)
    }
}

const parseInput = input =>
    input
        .split(',')
        .map(s => {
            const type = s.substring(0, 1)
            const move = { type }
            switch (type) {
                case 's':
                    move.args = parseInt(s.substring(1), 10)
                    break
                case 'x': {
                    const args = s.substring(1).split('/')
                    move.args = [
                        parseInt(args[0], 10),
                        parseInt(args[1], 10)
                    ]
                    break
                }
                case 'p':
                    move.args = s.substring(1).split('/')
                    break
                default:
                    throw new Error(`Unexpected move type ${move.type}`)
                    break
            }
            return move
        })

function findPermutations(programCount, moves) {
    const original = ALPHABET.substring(0, programCount);
    const permutations = []
    let programs = original.split("")

    do {
        permutations.push(programs.join(""))
        programs = moves.reduce((dancer, move) => makeMove[move.type](dancer, move.args), programs)
    } while (programs.join("") !== original)

    return permutations
}

function solve(input, programCount = 16, cycleCount = 1) {
    const moves = parseInput(input)
    const perms = findPermutations(programCount, moves)
    return perms[cycleCount % perms.length]
}

module.exports = {
    part1: solve,
    part2: (input, n = 16, defaultCycleCount = 1000000000) => solve(input, n, defaultCycleCount)
}
