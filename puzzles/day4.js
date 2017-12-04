const includes = require('lodash/includes')
const trim = require('lodash/trim')

const solve = (input, isValidPassphrase) =>
    input
        .trim()
        .split('\n')
        .map(trim)
        .map(line => line.split(/\s+/))
        .filter(isValidPassphrase)
        .length

function containsNoRepeats(words) {
    for (let index = 0; index < words.length - 1; ++index) {
        const word = words[index]
        if (includes(words, word, index + 1)) {
            return false
        }
    }

    return true
}

function containsNoAnagrams(words) {
    const sortedWords = words.map(word => word.split('').sort().join(''))
    return containsNoRepeats(sortedWords)
}

exports.part1 = input => solve(input, containsNoRepeats)
exports.part2 = input => solve(input, containsNoAnagrams)
