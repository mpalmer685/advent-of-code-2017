const find = require('lodash/find')
const includes = require('lodash/includes')
const trim = require('lodash/trim')

const solve = processPrograms => input => {
    const programs = parseInput(input)
    return processPrograms(programs)
}

const programPattern = /^(\d+) <-> ((?:\d+(?:, )?)+)$/
const matchIndex = {
    programNumber: 1,
    connectedPrograms: 2
}

const parseInput = input =>
    input
        .trim()
        .split('\n')
        .map(trim)
        .map(line => programPattern.exec(line))
        .reduce((programs, match) => {
            programs[match[matchIndex.programNumber]] = match[matchIndex.connectedPrograms].split(', ')
            return programs
        }, {})

function findConnectedPrograms(programs, programNumber, visitedPrograms) {
    if (includes(visitedPrograms, programNumber)) {
        return
    }

    visitedPrograms.push(programNumber)
    programs[programNumber].forEach(number => findConnectedPrograms(programs, number, visitedPrograms))
}

function findProgramsConnectedToGroup(programs, programNumber) {
    const connectedPrograms = []
    findConnectedPrograms(programs, programNumber, connectedPrograms)
    return connectedPrograms
}

function findAllDistinctGroups(programs) {
    const groups = []
    Object.keys(programs).forEach(programNumber => {
        if (find(groups, group => includes(group, programNumber))) {
            return
        }
        groups.push(findProgramsConnectedToGroup(programs, programNumber))
    })
    return groups.length
}

module.exports = {
    part1: solve(programs => findProgramsConnectedToGroup(programs, '0').length),
    part2: solve(findAllDistinctGroups)
}
