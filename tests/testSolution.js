const { expect } = require('chai')

module.exports = function testSolution({ solution, inputs, expectedOutputs }) {
    expect(inputs).to.have.lengthOf(expectedOutputs.length)

    inputs.forEach((input, index) => {
        it(`should output "${expectedOutputs[index]}" for input "${input}"`, () => {
            expect(solution(input)).to.equal(expectedOutputs[index])
        })
    })
}
