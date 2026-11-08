import { Difficulty } from '../difficulty'
import { randInt, Rng } from '../util/random'
import { generateMatching } from './generate'

export const COLUMN_OPERATORS = ['+', '-', '×', '÷'] as const
export type ColumnOperator = (typeof COLUMN_OPERATORS)[number]

export interface ColumnProblem {
  operator: ColumnOperator
  operands: number[]
}

export const digitCount = (n: number) => String(n).length

/** Digits, least significant first. */
const digitsOf = (n: number) => String(n).split('').reverse().map(Number)

/** Columns whose sum (including the carry in) reaches 10. */
export const additionCarries = (operands: number[]) => {
  const width = Math.max(...operands.map(digitCount))
  const columns = operands.map(digitsOf)
  let carry = 0
  let carries = 0
  for (let i = 0; i < width; i++) {
    const sum = carry + columns.reduce((s, d) => s + (d[i] ?? 0), 0)
    carry = Math.floor(sum / 10)
    if (carry > 0) carries++
  }
  return carries
}

export const subtractionBorrows = (a: number, b: number) => {
  const top = digitsOf(a)
  const bottom = digitsOf(b)
  let borrow = 0
  let borrows = 0
  let acrossZero = false
  for (let i = 0; i < top.length; i++) {
    const needsBorrow = top[i] - borrow < (bottom[i] ?? 0)
    if (needsBorrow) {
      borrows++
      if (top[i + 1] === 0) acrossZero = true
    }
    borrow = needsBorrow ? 1 : 0
  }
  return { borrows, acrossZero }
}

/** Columns of the multiplicand whose product (plus carry) reaches 10, per multiplier digit. */
export const multiplicationCarries = (a: number, b: number) =>
  digitsOf(b).reduce((total, m) => {
    let carry = 0
    let carries = 0
    for (const d of digitsOf(a)) {
      carry = Math.floor((d * m + carry) / 10)
      if (carry > 0) carries++
    }
    return total + carries
  }, 0)

export const shortDivision = (a: number, b: number) => {
  let remainder = 0
  let regrouping = false
  const quotientDigits: number[] = []
  const dividendDigits = String(a).split('').map(Number)
  dividendDigits.forEach((d, i) => {
    const current = remainder * 10 + d
    const q = Math.floor(current / b)
    remainder = current % b
    if (quotientDigits.length > 0 || q > 0) quotientDigits.push(q)
    if (remainder > 0 && i < dividendDigits.length - 1 && quotientDigits.length > 0) {
      regrouping = true
    }
  })
  return {
    quotient: Math.floor(a / b),
    remainder,
    regrouping,
    zeroInQuotient: quotientDigits.includes(0)
  }
}

/**
 * What makes each operator harder, per level:
 *
 * |          | +                                   | −                                     | ×                       | ÷ (by one digit)                 |
 * |----------|-------------------------------------|---------------------------------------|-------------------------|----------------------------------|
 * | easy     | two numbers, no carrying            | no borrowing                          | no carrying             | 2 digits, nothing carried over   |
 * | medium   | two numbers, one carry              | one borrow                            | 2 digits with carrying, | 3 digits, or 2 digits with a     |
 * |          |                                     |                                       | or 3 digits, one carry  | remainder carried to the next    |
 * | hard     | two numbers with several carries,   | borrowing in two or more columns      | 3+ digits, several      | a remainder                      |
 * |          | or three numbers                    |                                       | carries                 |                                  |
 * | advanced | 4 digits with several carries, or   | borrowing across a zero, or 4 digits  | two-digit multiplier    | 4 digits, or a zero in the       |
 * |          | three numbers of 3 digits carrying  | with several borrows                  |                         | quotient                         |
 * |          | in several columns                  |                                       |                         |                                  |
 */
export const classifyColumn = ({ operator, operands }: ColumnProblem): Difficulty => {
  const [a, b] = operands
  switch (operator) {
    case '+': {
      const carries = additionCarries(operands)
      const digits = Math.max(...operands.map(digitCount))
      if (operands.length >= 3) {
        return digits >= 3 && carries >= 2 ? 'advanced' : 'hard'
      }
      if (carries === 0) return 'easy'
      if (carries === 1) return 'medium'
      return digits >= 4 ? 'advanced' : 'hard'
    }
    case '-': {
      const { borrows, acrossZero } = subtractionBorrows(a, b)
      if (acrossZero) return 'advanced'
      if (digitCount(a) >= 4 && borrows >= 2) return 'advanced'
      if (borrows === 0) return 'easy'
      return borrows === 1 ? 'medium' : 'hard'
    }
    case '×': {
      if (digitCount(b) >= 2) return 'advanced'
      const carries = multiplicationCarries(a, b)
      if (carries === 0) return 'easy'
      if (digitCount(a) <= 2 || carries === 1) return 'medium'
      return 'hard'
    }
    case '÷': {
      const { remainder, regrouping, zeroInQuotient } = shortDivision(a, b)
      if (zeroInQuotient || digitCount(a) >= 4) return 'advanced'
      if (remainder > 0) return 'hard'
      if (digitCount(a) === 3 || regrouping) return 'medium'
      return 'easy'
    }
  }
}

export const answerColumn = ({ operator, operands }: ColumnProblem) => {
  const [a, b] = operands
  switch (operator) {
    case '+':
      return { value: operands.reduce((s, n) => s + n, 0), remainder: 0 }
    case '-':
      return { value: a - b, remainder: 0 }
    case '×':
      return { value: a * b, remainder: 0 }
    case '÷': {
      const { quotient, remainder } = shortDivision(a, b)
      return { value: quotient, remainder }
    }
  }
}

const between = (rng: Rng, min: number, max: number) => randInt(rng, min, max)
const withDigits = (rng: Rng, digits: number) =>
  between(rng, 10 ** (digits - 1), 10 ** digits - 1)

type Candidate = (rng: Rng) => number[]

const CANDIDATES: Record<ColumnOperator, Record<Difficulty, Candidate>> = {
  '+': {
    easy: (r) => [withDigits(r, 2), withDigits(r, 2)],
    medium: (r) => [withDigits(r, between(r, 2, 3)), withDigits(r, between(r, 2, 3))],
    hard: (r) =>
      r() < 0.5
        ? [withDigits(r, 3), withDigits(r, 3)]
        : [withDigits(r, 2), withDigits(r, 2), withDigits(r, 2)],
    advanced: (r) =>
      r() < 0.5
        ? [withDigits(r, 3), withDigits(r, 3), withDigits(r, 2)]
        : [withDigits(r, 4), withDigits(r, between(r, 3, 4))]
  },
  '-': {
    easy: (r) => twoNumbersDescending(r, 2, 2),
    medium: (r) => twoNumbersDescending(r, between(r, 2, 3), 2),
    hard: (r) => twoNumbersDescending(r, 3, between(r, 2, 3)),
    advanced: (r) => twoNumbersDescending(r, 4, 3)
  },
  '×': {
    easy: (r) => [withDigits(r, between(r, 2, 3)), between(r, 2, 9)],
    medium: (r) => [withDigits(r, between(r, 2, 3)), between(r, 2, 9)],
    hard: (r) => [withDigits(r, 3), between(r, 3, 9)],
    advanced: (r) => [withDigits(r, 2), withDigits(r, 2)]
  },
  '÷': {
    easy: (r) => exactDivision(r, 2),
    medium: (r) => exactDivision(r, between(r, 2, 3)),
    hard: (r) => [withDigits(r, 3), between(r, 2, 9)],
    advanced: (r) => (r() < 0.5 ? exactDivision(r, 4) : [withDigits(r, 4), between(r, 2, 9)])
  }
}

function twoNumbersDescending(rng: Rng, topDigits: number, bottomDigits: number) {
  const a = withDigits(rng, topDigits)
  const b = between(rng, 10 ** (bottomDigits - 1), Math.min(a, 10 ** bottomDigits - 1))
  return [a, b]
}

function exactDivision(rng: Rng, digits: number) {
  const divisor = between(rng, 2, 9)
  const min = Math.ceil(10 ** (digits - 1) / divisor)
  const max = Math.floor((10 ** digits - 1) / divisor)
  return [divisor * between(rng, min, max), divisor]
}

export const generateColumnProblem = (
  rng: Rng,
  operator: ColumnOperator,
  difficulty: Difficulty
): ColumnProblem =>
  generateMatching(
    rng,
    (r) => ({ operator, operands: CANDIDATES[operator][difficulty](r) }),
    (p) => classifyColumn(p) === difficulty
  )

/** Spreads operators evenly over the problems, grouped in the order given. */
export const generateColumnProblems = (
  rng: Rng,
  count: number,
  operators: ColumnOperator[],
  difficulty: Difficulty
): ColumnProblem[] => {
  const ordered = COLUMN_OPERATORS.filter((op) => operators.includes(op))
  const perOperator = ordered.map((_, i) =>
    Math.floor(count / ordered.length) + (i < count % ordered.length ? 1 : 0)
  )
  return ordered.flatMap((op, i) =>
    Array.from({ length: perOperator[i] }, () => generateColumnProblem(rng, op, difficulty))
  )
}
