const at = require('lodash/at')
const merge = require('lodash/merge')
const remove = require('lodash/remove')

function parseInput(input) {
    const particlePattern = /^p=<((?: ?-?\d+,?){3})>, v=<((?: ?-?\d+,?){3})>, a=<((?: ?-?\d+,?){3})>$/

    return input
        .split('\n')
        .map(s => s.trim())
        .map(parseParticle)

    function parseParticle(line, index) {
        const match = particlePattern.exec(line)
        return {
            index,
            position: getVectorComponents(match[1]),
            velocity: getVectorComponents(match[2]),
            acceleration: getVectorComponents(match[3])
        }
    }

    function getVectorComponents(vectorString) {
        const [x, y, z] = vectorString.split(',').map(s => parseInt(s, 10))
        return { x, y, z }
    }
}

function getMagnitudes(particles, property) {
    return particles
        .map(p => merge({ index: p.index }, p[property]))
        .map(({ index, x, y, z }) => ({ index, magnitude: Math.hypot(x, y, z) }))
}

function getMinimumMagnitudes(particles, property) {
    const magnitudes = getMagnitudes(particles, property)
    const minimumMagnitude = magnitudes
        .reduce((min, { magnitude }) => Math.min(min, magnitude), Number.MAX_SAFE_INTEGER)
    return magnitudes.filter(({ magnitude }) => magnitude === minimumMagnitude)
}

const solve = processParticles => input => {
    const particles = parseInput(input)
    return processParticles(particles)
}

function findParticleClosestToOrigin(particles) {
    const particlesWithMinimumAcceleration = getMinimumMagnitudes(particles, 'acceleration')
    if (particlesWithMinimumAcceleration.length === 1) {
        return particlesWithMinimumAcceleration[0].index
    }

    let candidateParticles = at(particles, particlesWithMinimumAcceleration.map(p => p.index))
    const particlesWithMinimumVelocity = getMinimumMagnitudes(candidateParticles, 'velocity')
    if (particlesWithMinimumVelocity.length === 1) {
        return particlesWithMinimumVelocity[0].index
    }

    candidateParticles = at(particles, particlesWithMinimumVelocity.map(p => p.index))
    const particlesWithMinimumDistance = getMinimumMagnitudes(candidateParticles, 'position')
    if (particlesWithMinimumDistance.length === 1) {
        return particlesWithMinimumDistance[0].index
    }

    return 'absolute tie between ' + particlesWithMinimumDistance.map(p => p.index)
}

function countParticlesAfterCollisions(particles) {
    const MAX_CYCLE_COUNT = 200
    let cycleCount = 0
    let lastParticleCount = particles.length
    while (++cycleCount < MAX_CYCLE_COUNT) {
        runCycle()
        markCollisions()
        remove(particles, { remove: true })
        if (particles.length !== lastParticleCount) {
            lastParticleCount = particles.length
            cycleCount = 0
        }
    }

    return particles.length

    function runCycle() {
        particles.forEach(particle => {
            particle.velocity.x += particle.acceleration.x
            particle.velocity.y += particle.acceleration.y
            particle.velocity.z += particle.acceleration.z

            particle.position.x += particle.velocity.x
            particle.position.y += particle.velocity.y
            particle.position.z += particle.velocity.z
        })
    }

    function markCollisions() {
        for (let i = 0; i < particles.length - 1; ++i) {
            const p1 = particles[i]
            for (let j = i + 1; j < particles.length; ++j) {
                const p2 = particles[j]
                if (
                    p1.position.x === p2.position.x &&
                    p1.position.y === p2.position.y &&
                    p1.position.z === p2.position.z
                ) {
                    p1.remove = true
                    p2.remove = true
                }
            }
        }
    }
}

module.exports = {
    part1: solve(findParticleClosestToOrigin),
    part2: solve(countParticlesAfterCollisions)
}
