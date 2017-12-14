const { expect } = require('chai')

module.exports = function testSolution({ solution, inputs, extraArguments = [], expectedOutputs, timeout }) {
    expect(inputs).to.have.lengthOf(expectedOutputs.length)

    inputs.forEach((input, index) => {
        it(`should output "${expectedOutputs[index]}" for input "${input}"`, function () {
            if (timeout) {
                this.timeout(timeout)
            }
            expect(solution(input, ...extraArguments)).to.equal(expectedOutputs[index])
        })
    })
}
