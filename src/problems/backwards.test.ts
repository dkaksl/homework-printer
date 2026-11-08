import { DIFFICULTIES } from '../difficulty'
import { createRng } from '../util/random'
import {
  amountsOf,
  BACKWARDS_OPERATORS,
  BackwardsOperator,
  BackwardsProblem,
  classifyBackwards,
  finalAmount,
  generateBackwardsProblem
} from './backwards'

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1)

const OPERATOR_SETS: BackwardsOperator[][] = [
  ...BACKWARDS_OPERATORS.map((op) => [op]),
  ['+', '-'],
  [...BACKWARDS_OPERATORS]
]

/** What the child does: undo each step from the last one back. */
const UNDO: Record<BackwardsOperator, (value: number, amount: number) => number> = {
  '+': (value, amount) => value - amount,
  '-': (value, amount) => value + amount,
  '×': (value, amount) => value / amount,
  '÷': (value, amount) => value * amount
}

const workBackwards = (problem: BackwardsProblem) =>
  problem.steps.reduceRight((value, { operator, amount }) => UNDO[operator](value, amount), finalAmount(problem))

describe('work backwards word problem difficulty', () => {
  test.each(DIFFICULTIES.flatMap((d) => OPERATOR_SETS.map((ops) => [d, ops.join(' ')] as const)))(
    '%s with %s generates only problems of that level, solvable by working backwards',
    (difficulty, operators) => {
      for (const seed of SEEDS) {
        const problem = generateBackwardsProblem(createRng(seed), difficulty, operators.split(' ') as BackwardsOperator[])
        expect(classifyBackwards(problem)).toBe(difficulty)
        expect(workBackwards(problem)).toBe(problem.start)
      }
    }
  )

  test('levels add steps, bigger numbers, mixed steps, then × and ÷', () => {
    const kinds = (difficulty: (typeof DIFFICULTIES)[number]) =>
      SEEDS.map((seed) => new Set(generateBackwardsProblem(createRng(seed), difficulty, [...BACKWARDS_OPERATORS]).steps.map((s) => s.operator)))

    expect(kinds('easy').every((k) => k.size === 1 && !k.has('×') && !k.has('÷'))).toBe(true)
    expect(kinds('medium').every((k) => k.size > 1 && !k.has('×') && !k.has('÷'))).toBe(true)
    expect(kinds('advanced').every((k) => k.has('×') || k.has('÷'))).toBe(true)

    expect(classifyBackwards({ start: 12, steps: [{ operator: '-', amount: 5 }, { operator: '-', amount: 3 }] })).toBe('easy')
    expect(classifyBackwards({ start: 12, steps: [{ operator: '-', amount: 5 }, { operator: '+', amount: 3 }] })).toBe(undefined)
    expect(classifyBackwards({ start: 30, steps: [{ operator: '-', amount: 5 }, { operator: '+', amount: 3 }, { operator: '-', amount: 9 }] })).toBe('medium')
    // The issue's example: four mixed steps ending at 88.
    const example: BackwardsProblem = {
      start: 97,
      steps: [
        { operator: '-', amount: 29 },
        { operator: '+', amount: 23 },
        { operator: '-', amount: 17 },
        { operator: '+', amount: 14 }
      ]
    }
    expect(finalAmount(example)).toBe(88)
    expect(classifyBackwards(example)).toBe('hard')
  })

  test('every amount along the way is a whole number of at least 2', () => {
    for (const seed of SEEDS) {
      const problem = generateBackwardsProblem(createRng(seed), 'advanced', ['÷', '-'])
      amountsOf(problem).forEach((v) => {
        expect(Number.isInteger(v)).toBe(true)
        expect(v).toBeGreaterThanOrEqual(2)
      })
    }
  })
})
