const { expect } = require('chai')

module.exports = function testSolution({ solution, inputs, extraArguments = [], expectedOutputs }) {
    expect(inputs).to.have.lengthOf(expectedOutputs.length)

    inputs.forEach((input, index) => {
        it(`should output "${expectedOutputs[index]}" for input "${input}"`, () => {
            expect(solution(input, ...extraArguments)).to.equal(expectedOutputs[index])
        })
    })
}
