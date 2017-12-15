const SEED = 2147483647

function constant(value) {
    return () => value
}

function createGenerator(initialValue, factor) {
    let value = initialValue
    return function generateValue() {
        value = (value * factor) % SEED
        return value
    }
}

function compareValues(a, b) {
    return (a & 0xffff) === (b & 0xffff)
}

const solve = (acceptA, acceptB, defaultNumValues) => (input, numValues = defaultNumValues) => {
    const [initialA, initialB] = input.split(',')
    const generatorA = createGenerator(initialA, 16807)
    const generatorB = createGenerator(initialB, 48271)

    let matches = 0
    for (let i = 0; i < numValues; ++i) {
        let a, b
        do {
            a = generatorA()
        } while (!acceptA(a))
        do {
            b = generatorB()
        } while (!acceptB(b))

        if (compareValues(a, b)) {
            ++matches
        }
    }
    return matches
}

module.exports = {
    part1: solve(constant(true), constant(true), 40000000),
    part2: solve(
        a => !(a & 3),
        b => !(b & 7),
        5000000
    )
}
