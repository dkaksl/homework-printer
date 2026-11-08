import { Difficulty, DIFFICULTIES } from '../difficulty'
import { pick, randInt, Rng } from '../util/random'
import { generateMatching } from './generate'

/** + receives, − gives away, × multiplies what's there, ÷ keeps one of several equal piles. */
export const BACKWARDS_OPERATORS = ['+', '-', '×', '÷'] as const
export type BackwardsOperator = (typeof BACKWARDS_OPERATORS)[number]

export interface BackwardsStep {
  operator: BackwardsOperator
  amount: number
}

export interface BackwardsProblem {
  start: number
  steps: BackwardsStep[]
}

interface Level {
  steps: number
  maxValue: number
  maxFactor: number
}

/**
 * More steps and bigger numbers at each level. Easy keeps to one kind of
 * step; from medium the steps mix kinds, and × and ÷ come in from hard.
 */
export const BACKWARDS_LEVELS: Record<Difficulty, Level> = {
  easy: { steps: 2, maxValue: 20, maxFactor: 3 },
  medium: { steps: 3, maxValue: 50, maxFactor: 3 },
  hard: { steps: 4, maxValue: 100, maxFactor: 4 },
  advanced: { steps: 5, maxValue: 200, maxFactor: 5 }
}

const MIN_VALUE = 2
const SCALING: BackwardsOperator[] = ['×', '÷']

const applyStep = (value: number, { operator, amount }: BackwardsStep) => {
  switch (operator) {
    case '+':
      return value + amount
    case '-':
      return value - amount
    case '×':
      return value * amount
    case '÷':
      return value / amount
  }
}

/** The start, every amount in between, and the final amount. */
export const amountsOf = ({ start, steps }: BackwardsProblem) =>
  steps.reduce((values, step) => [...values, applyStep(values[values.length - 1], step)], [start])

export const finalAmount = (problem: BackwardsProblem) => {
  const values = amountsOf(problem)
  return values[values.length - 1]
}

const previousCap = (difficulty: Difficulty) => {
  const i = DIFFICULTIES.indexOf(difficulty)
  return i === 0 ? 0 : BACKWARDS_LEVELS[DIFFICULTIES[i - 1]].maxValue
}

const isWholeAndInRange = (value: number, max: number) =>
  Number.isInteger(value) && value >= MIN_VALUE && value <= max

/**
 * The level whose step count, number range and step kinds the problem has,
 * or undefined when it matches none. Every amount stays whole and within the
 * level's cap, and at least one goes past the cap of the level below.
 */
export const classifyBackwards = (problem: BackwardsProblem): Difficulty | undefined => {
  const difficulty = DIFFICULTIES.find((d) => BACKWARDS_LEVELS[d].steps === problem.steps.length)
  if (!difficulty) return undefined
  const { maxValue, maxFactor } = BACKWARDS_LEVELS[difficulty]
  const values = amountsOf(problem)
  if (!values.every((v) => isWholeAndInRange(v, maxValue))) return undefined
  if (Math.max(...values) <= previousCap(difficulty)) return undefined
  const amountsValid = problem.steps.every((s) =>
    SCALING.includes(s.operator) ? s.amount >= 2 && s.amount <= maxFactor : s.amount >= MIN_VALUE
  )
  if (!amountsValid) return undefined
  const kinds = new Set(problem.steps.map((s) => s.operator))
  if (difficulty === 'easy' && kinds.size > 1) return undefined
  return difficulty
}

/** × and ÷ only from hard, unless they're all the teacher selected. */
export const operatorsForLevel = (
  operators: BackwardsOperator[],
  difficulty: Difficulty
): BackwardsOperator[] => {
  const selected = operators.length > 0 ? operators : (['+', '-'] as BackwardsOperator[])
  if (difficulty === 'hard' || difficulty === 'advanced') return selected
  const additive = selected.filter((op) => !SCALING.includes(op))
  return additive.length > 0 ? additive : selected
}

const nextStep = (rng: Rng, value: number, operator: BackwardsOperator, level: Level): BackwardsStep | null => {
  const { maxValue, maxFactor } = level
  const factors = Array.from({ length: maxFactor - 1 }, (_, i) => i + 2)
  switch (operator) {
    case '+':
      return maxValue - value >= MIN_VALUE
        ? { operator, amount: randInt(rng, MIN_VALUE, maxValue - value) }
        : null
    case '-':
      return value - MIN_VALUE >= MIN_VALUE
        ? { operator, amount: randInt(rng, MIN_VALUE, value - MIN_VALUE) }
        : null
    case '×': {
      const fits = factors.filter((f) => value * f <= maxValue)
      return fits.length > 0 ? { operator, amount: pick(rng, fits) } : null
    }
    case '÷': {
      const divides = factors.filter((d) => value % d === 0 && value / d >= MIN_VALUE)
      return divides.length > 0 ? { operator, amount: pick(rng, divides) } : null
    }
  }
}

const candidate = (rng: Rng, difficulty: Difficulty, allowed: BackwardsOperator[]): BackwardsProblem => {
  const level = BACKWARDS_LEVELS[difficulty]
  const start = randInt(rng, MIN_VALUE, level.maxValue)
  const only = difficulty === 'easy' ? pick(rng, allowed) : undefined
  const steps: BackwardsStep[] = []
  let value = start
  for (let i = 0; i < level.steps; i++) {
    const step = nextStep(rng, value, only ?? pick(rng, allowed), level)
    // An impossible step leaves the problem short, so classifying rejects it.
    if (!step) break
    steps.push(step)
    value = applyStep(value, step)
  }
  return { start, steps }
}

const usesAllowedMix = (problem: BackwardsProblem, difficulty: Difficulty, allowed: BackwardsOperator[]) => {
  const used = new Set(problem.steps.map((s) => s.operator))
  if (difficulty !== 'easy' && allowed.length > 1 && used.size < 2) return false
  const scalingAllowed = allowed.some((op) => SCALING.includes(op))
  if (difficulty === 'advanced' && scalingAllowed && !SCALING.some((op) => used.has(op))) return false
  return true
}

export const generateBackwardsProblem = (
  rng: Rng,
  difficulty: Difficulty,
  operators: BackwardsOperator[]
): BackwardsProblem => {
  const allowed = operatorsForLevel(operators, difficulty)
  return generateMatching(
    rng,
    (r) => candidate(r, difficulty, allowed),
    (p) => classifyBackwards(p) === difficulty && usesAllowedMix(p, difficulty, allowed)
  )
}
