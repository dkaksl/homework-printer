import { Difficulty } from '../difficulty'
import { pick, randInt, Rng } from '../util/random'
import { generateMatching } from './generate'

export type HorizontalOperator = '+' | '-'

export interface HorizontalProblem {
  a: number
  b: number
  operator: HorizontalOperator
}

const crossesTen = (a: number, b: number) => (a % 10) + (b % 10) >= 10
const borrowsTen = (a: number, b: number) => a % 10 < b % 10

/**
 * Addition: within 10 → easy, past 10 without crossing ten → medium,
 * crossing ten within 20 (8 + 7) → hard, sums past 20 → advanced.
 * Subtraction: from at most 10 → easy, from at most 20 without borrowing a
 * ten → medium, borrowing a ten (13 − 7) → hard, negative results → advanced.
 */
export const classifyHorizontal = ({ a, b, operator }: HorizontalProblem): Difficulty => {
  if (operator === '+') {
    const sum = a + b
    if (sum > 20) return 'advanced'
    if (sum <= 10) return 'easy'
    return crossesTen(a, b) ? 'hard' : 'medium'
  }
  if (b > a) return 'advanced'
  if (a <= 10) return 'easy'
  if (a > 20) return 'advanced'
  return borrowsTen(a, b) ? 'hard' : 'medium'
}

export const answerHorizontal = ({ a, b, operator }: HorizontalProblem) =>
  operator === '+' ? a + b : a - b

const MAX_OPERAND = 20
const MAX_ZERO_OPERANDS_PER_PAGE = 3

export const generateHorizontalPage = (
  rng: Rng,
  count: number,
  difficulty: Difficulty,
  operators: HorizontalOperator[]
): HorizontalProblem[] => {
  const problems: HorizontalProblem[] = []
  let zeroOperands = 0
  for (let i = 0; i < count; i++) {
    const operator = pick(rng, operators)
    const allowZero = zeroOperands < MAX_ZERO_OPERANDS_PER_PAGE
    const problem = generateMatching(
      rng,
      (r) => ({
        a: randInt(r, allowZero ? 0 : 1, MAX_OPERAND),
        b: randInt(r, allowZero ? 0 : 1, MAX_OPERAND),
        operator
      }),
      (p) => classifyHorizontal(p) === difficulty
    )
    if (problem.a === 0 || problem.b === 0) zeroOperands++
    problems.push(problem)
  }
  return problems
}
