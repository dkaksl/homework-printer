import { Difficulty, DIFFICULTIES } from '../difficulty'
import { randInt, Rng, shuffle } from '../util/random'
import { generateMatching } from './generate'

/**
 * Rows run from the top box down, so row r has r + 1 boxes and box (r, c)
 * sits on boxes (r + 1, c) and (r + 1, c + 1).
 */
export interface NumberPyramid {
  values: number[][]
  given: boolean[][]
}

interface Level {
  rows: number
  shown: number
  maxTop: number
  maxBottom: number
  /** How many boxes the child has to work out downwards, by subtracting. */
  minDownward: number
}

/**
 * More rows, bigger numbers and more boxes found by subtracting at each level.
 * Easy gives the whole bottom row, so it's adding all the way up.
 */
export const PYRAMID_LEVELS: Record<Difficulty, Level> = {
  easy: { rows: 3, shown: 3, maxTop: 20, maxBottom: 6, minDownward: 0 },
  medium: { rows: 3, shown: 3, maxTop: 50, maxBottom: 15, minDownward: 1 },
  hard: { rows: 4, shown: 5, maxTop: 200, maxBottom: 30, minDownward: 3 },
  advanced: { rows: 5, shown: 6, maxTop: 500, maxBottom: 40, minDownward: 6 }
}

type Shown = (number | undefined)[][]

const cells = (rows: number) =>
  Array.from({ length: rows }, (_, r) => Array.from({ length: r + 1 }, (_, c) => [r, c] as const)).flat()

export const buildPyramid = (bottom: number[]): number[][] => {
  const rows = [bottom]
  while (rows[0].length > 1) {
    const below = rows[0]
    rows.unshift(below.slice(1).map((right, c) => below[c] + right))
  }
  return rows
}

const fillAdditions = (shown: Shown) => {
  let changed = true
  while (changed) {
    changed = false
    for (const [r, c] of cells(shown.length - 1)) {
      const left = shown[r + 1][c]
      const right = shown[r + 1][c + 1]
      if (shown[r][c] === undefined && left !== undefined && right !== undefined) {
        shown[r][c] = left + right
        changed = true
      }
    }
  }
}

/** Every box that a known box above and its known neighbour below give away. */
const availableSubtractions = (shown: Shown) => {
  const found = new Map<string, { r: number; c: number; value: number }>()
  for (const [r, c] of cells(shown.length - 1)) {
    const top = shown[r][c]
    const left = shown[r + 1][c]
    const right = shown[r + 1][c + 1]
    if (top === undefined) continue
    if (left !== undefined && right === undefined) found.set(`${r + 1},${c + 1}`, { r: r + 1, c: c + 1, value: top - left })
    if (right !== undefined && left === undefined) found.set(`${r + 1},${c}`, { r: r + 1, c, value: top - right })
  }
  return Array.from(found.values())
}

/**
 * Solves the pyramid the way a child does, one box at a time from a box and
 * a neighbour, adding wherever possible before subtracting. Undefined when
 * the shown boxes don't lead to every other box.
 */
export const solvePyramid = (pyramid: NumberPyramid) => {
  const shown: Shown = pyramid.values.map((row, r) => row.map((v, c) => (pyramid.given[r][c] ? v : undefined)))
  let downward = 0
  for (;;) {
    fillAdditions(shown)
    if (shown.every((row) => row.every((v) => v !== undefined))) return { values: shown as number[][], downward }
    const subtractions = availableSubtractions(shown)
    if (subtractions.length === 0) return undefined
    subtractions.forEach(({ r, c, value }) => (shown[r][c] = value))
    downward += subtractions.length
  }
}

const previousTopCap = (difficulty: Difficulty) => {
  const i = DIFFICULTIES.indexOf(difficulty)
  return i === 0 ? 0 : PYRAMID_LEVELS[DIFFICULTIES[i - 1]].maxTop
}

const givenCount = (pyramid: NumberPyramid) => pyramid.given.flat().filter(Boolean).length

/**
 * The level whose rows, shown boxes, number range and amount of downward work
 * the pyramid has, or undefined when it matches none. The child must be able
 * to reach every hidden box from the shown ones.
 */
export const classifyPyramid = (pyramid: NumberPyramid): Difficulty | undefined => {
  const { values } = pyramid
  if (!values.flat().every((v) => Number.isInteger(v) && v >= 0)) return undefined
  const solved = solvePyramid(pyramid)
  if (!solved || JSON.stringify(solved.values) !== JSON.stringify(values)) return undefined
  const top = values[0][0]
  return DIFFICULTIES.find((d) => {
    const level = PYRAMID_LEVELS[d]
    const nextLevel = PYRAMID_LEVELS[DIFFICULTIES[DIFFICULTIES.indexOf(d) + 1]]
    const maxDownward = nextLevel?.rows === level.rows ? nextLevel.minDownward - 1 : Infinity
    return (
      level.rows === values.length &&
      level.shown === givenCount(pyramid) &&
      top > previousTopCap(d) &&
      top <= level.maxTop &&
      solved.downward >= level.minDownward &&
      solved.downward <= maxDownward
    )
  })
}

const candidate = (rng: Rng, difficulty: Difficulty): NumberPyramid => {
  const { rows, shown, maxBottom } = PYRAMID_LEVELS[difficulty]
  const values = buildPyramid(Array.from({ length: rows }, () => randInt(rng, 1, maxBottom)))
  const shownCells = new Set(
    shuffle(rng, cells(rows))
      .slice(0, shown)
      .map(([r, c]) => `${r},${c}`)
  )
  return { values, given: values.map((row, r) => row.map((_, c) => shownCells.has(`${r},${c}`))) }
}

export const generatePyramid = (rng: Rng, difficulty: Difficulty): NumberPyramid =>
  generateMatching(
    rng,
    (r) => candidate(r, difficulty),
    (p) => classifyPyramid(p) === difficulty
  )
