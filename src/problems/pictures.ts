import { Difficulty, DIFFICULTIES } from '../difficulty'
import { pick, randInt, Rng, shuffle } from '../util/random'
import { BackwardsOperator, operatorsForLevel } from './backwards'
import { generateMatching } from './generate'

export type PuzzleOperator = BackwardsOperator

/**
 * Pictures (by index into the puzzle's values) joined by operators. An
 * equation is a sum (+ and −), a product (×) or a single quotient (÷), so it
 * reads left to right without precedence rules.
 */
export interface PuzzleEquation {
  pictures: number[]
  operators: PuzzleOperator[]
  result: number
}

export interface PicturePuzzle {
  values: number[]
  equations: PuzzleEquation[]
}

interface Level {
  pictures: number
  maxNumber: number
  /** Whether two equations have to be combined before anything can be solved. */
  combine: boolean
}

/**
 * More pictures, bigger numbers, × and ÷ from hard, and at advanced a pair of
 * equations that only give their pictures' values when combined.
 */
export const PUZZLE_LEVELS: Record<Difficulty, Level> = {
  easy: { pictures: 2, maxNumber: 20, combine: false },
  medium: { pictures: 3, maxNumber: 50, combine: false },
  hard: { pictures: 3, maxNumber: 100, combine: false },
  advanced: { pictures: 4, maxNumber: 100, combine: true }
}

const ADDITIVE: PuzzleOperator[] = ['+', '-']
const SCALING: PuzzleOperator[] = ['×', '÷']

type Kind = 'sum' | 'product' | 'quotient'

const kindOf = ({ operators }: PuzzleEquation): Kind | undefined => {
  if (operators.every((op) => ADDITIVE.includes(op))) return 'sum'
  if (operators.every((op) => op === '×')) return 'product'
  if (operators.length === 1 && operators[0] === '÷') return 'quotient'
  return undefined
}

/** The value after each operator, left to right, starting with the first picture's value. */
export const partialResults = ({ pictures, operators }: PuzzleEquation, values: number[]) =>
  operators.reduce(
    (partials, op, i) => {
      const value = partials[partials.length - 1]
      const next = values[pictures[i + 1]]
      switch (op) {
        case '+':
          return [...partials, value + next]
        case '-':
          return [...partials, value - next]
        case '×':
          return [...partials, value * next]
        case '÷':
          return [...partials, value / next]
      }
      return partials
    },
    [values[pictures[0]]]
  )

export const evaluate = (equation: PuzzleEquation, values: number[]) => {
  const partials = partialResults(equation, values)
  return partials[partials.length - 1]
}

const signOf = (equation: PuzzleEquation, i: number) => (i === 0 || equation.operators[i - 1] === '+' ? 1 : -1)

const roundNearInteger = (value: number) =>
  Math.abs(value - Math.round(value)) < 1e-9 ? Math.round(value) : value

type Known = (number | undefined)[]

/**
 * The value of the equation's one unknown picture. Each case has a single
 * whole-number answer: a sum is linear with a nonzero coefficient, x^k times
 * a positive number has one non-negative root, and a quotient's other side is
 * known and nonzero. An equation where the unknown cancels out gives nothing.
 */
const solveForOne = (equation: PuzzleEquation, known: Known): [number, number] | undefined => {
  const unknown = Array.from(new Set(equation.pictures.filter((p) => known[p] === undefined)))
  if (unknown.length !== 1) return undefined
  const [x] = unknown
  const { pictures, result } = equation
  switch (kindOf(equation)) {
    case 'sum': {
      let coefficient = 0
      let rest = 0
      pictures.forEach((p, i) => {
        if (p === x) coefficient += signOf(equation, i)
        else rest += signOf(equation, i) * (known[p] as number)
      })
      return coefficient === 0 ? undefined : [x, (result - rest) / coefficient]
    }
    case 'product': {
      const others = pictures.filter((p) => p !== x).reduce((product, p) => product * (known[p] as number), 1)
      if (others <= 0) return undefined
      const power = pictures.filter((p) => p === x).length
      return [x, roundNearInteger(Math.pow(result / others, 1 / power))]
    }
    case 'quotient': {
      const [dividend, divisor] = pictures
      if (dividend === divisor) return undefined
      if (dividend === x) return [x, result * (known[divisor] as number)]
      return result === 0 ? undefined : [x, (known[dividend] as number) / result]
    }
  }
  return undefined
}

/**
 * Solves the sums together (Gauss-Jordan elimination) and returns every
 * picture the system pins down on its own.
 */
const solveSumsTogether = (equations: PuzzleEquation[], known: Known): [number, number][] => {
  const sums = equations.filter((e) => kindOf(e) === 'sum' && e.pictures.some((p) => known[p] === undefined))
  const unknowns = Array.from(new Set(sums.flatMap((e) => e.pictures.filter((p) => known[p] === undefined))))
  const rows = sums.map((e) => {
    const row = unknowns.map(() => 0)
    let rhs = e.result
    e.pictures.forEach((p, i) => {
      const column = unknowns.indexOf(p)
      if (column >= 0) row[column] += signOf(e, i)
      else rhs -= signOf(e, i) * (known[p] as number)
    })
    return [...row, rhs]
  })
  let pivotRow = 0
  unknowns.forEach((_, column) => {
    const found = rows.findIndex((row, i) => i >= pivotRow && Math.abs(row[column]) > 1e-9)
    if (found < 0) return
    ;[rows[pivotRow], rows[found]] = [rows[found], rows[pivotRow]]
    const pivot = rows[pivotRow][column]
    rows[pivotRow] = rows[pivotRow].map((v) => v / pivot)
    rows.forEach((row, i) => {
      if (i === pivotRow) return
      const factor = row[column]
      rows[i] = row.map((v, j) => v - factor * rows[pivotRow][j])
    })
    pivotRow++
  })
  return rows.flatMap((row): [number, number][] => {
    const nonzero = unknowns.filter((_, column) => Math.abs(row[column]) > 1e-9)
    return nonzero.length === 1 ? [[nonzero[0], roundNearInteger(row[unknowns.length])]] : []
  })
}

export interface PuzzleSolution {
  values: number[]
  /** Whether some equations had to be combined, rather than solved one after another. */
  combined: boolean
}

/**
 * Solves the puzzle from its equations alone, the way a child would: one
 * picture at a time while some equation has a single unknown, otherwise by
 * combining the sums. Every step forces its picture's value, so a solution
 * found here is the only whole-number one.
 */
export const solvePuzzle = (equations: PuzzleEquation[], pictureCount: number): PuzzleSolution | undefined => {
  if (equations.some((e) => kindOf(e) === undefined)) return undefined
  const known: Known = Array.from({ length: pictureCount }, () => undefined)
  let combined = false
  while (known.some((v) => v === undefined)) {
    const single = equations.map((e) => solveForOne(e, known)).find((step) => step !== undefined)
    const steps = single ? [single] : solveSumsTogether(equations, known)
    if (steps.length === 0) return undefined
    if (!single) combined = true
    steps.forEach(([picture, value]) => (known[picture] = value))
  }
  const values = known as number[]
  if (!values.every((v) => Number.isInteger(v) && v >= 0)) return undefined
  if (!equations.every((e) => evaluate(e, values) === e.result)) return undefined
  return { values, combined }
}

/** Every number the child meets: the pictures' values and each step of every equation. */
export const numbersIn = ({ values, equations }: PicturePuzzle) => [
  ...values,
  ...equations.flatMap((e) => partialResults(e, values))
]

/** In a sum like ⭐ + 🌸 − ⭐ a picture cancels itself out, which only confuses. */
const hasCancellingPicture = (equation: PuzzleEquation) => {
  if (kindOf(equation) !== 'sum') return false
  const net = new Map<number, number>()
  equation.pictures.forEach((p, i) => net.set(p, (net.get(p) ?? 0) + signOf(equation, i)))
  return Array.from(net.values()).includes(0)
}

const isWellFormed = (puzzle: PicturePuzzle) => {
  const { values, equations } = puzzle
  return (
    values.every((v) => Number.isInteger(v) && v >= 1) &&
    equations.length === values.length &&
    equations.every((e) => e.pictures.length >= 2 && e.operators.length === e.pictures.length - 1) &&
    !equations.some(hasCancellingPicture) &&
    values.every((_, p) => equations.some((e) => e.pictures.includes(p))) &&
    numbersIn(puzzle).every((n) => Number.isInteger(n) && n >= 0) &&
    equations.every((e) => evaluate(e, values) === e.result)
  )
}

/**
 * The lowest level whose picture count, way of solving and number range the
 * puzzle has, or undefined when it matches none or its solution isn't the
 * only whole-number one.
 */
export const classifyPuzzle = (puzzle: PicturePuzzle): Difficulty | undefined => {
  if (!isWellFormed(puzzle)) return undefined
  const solution = solvePuzzle(puzzle.equations, puzzle.values.length)
  if (!solution || solution.values.some((v, i) => v !== puzzle.values[i])) return undefined
  const largest = Math.max(...numbersIn(puzzle))
  return DIFFICULTIES.find((d) => {
    const level = PUZZLE_LEVELS[d]
    return (
      level.pictures === puzzle.values.length && level.combine === solution.combined && largest <= level.maxNumber
    )
  })
}

/**
 * A puzzle has to start somewhere: the first equation (or, at advanced, the
 * combined pair) repeats or adds pictures, so it uses + or × even when only
 * − or ÷ is selected.
 */
const startingOperators = (allowed: PuzzleOperator[]): PuzzleOperator[] => {
  const usable = allowed.filter((op) => op === '+' || op === '×')
  return usable.length > 0 ? usable : ['+']
}

const sumOperators = (allowed: PuzzleOperator[]): PuzzleOperator[] => {
  const usable = allowed.filter((op) => ADDITIVE.includes(op))
  return usable.length > 0 ? usable : ['+']
}

const withResult = (pictures: number[], operators: PuzzleOperator[], values: number[]): PuzzleEquation => {
  const equation = { pictures, operators, result: 0 }
  return { ...equation, result: evaluate(equation, values) }
}

/** The first equation: one picture added to or multiplied by itself. */
const firstEquation = (rng: Rng, picture: number, allowed: PuzzleOperator[], values: number[]) => {
  const operator = pick(rng, startingOperators(allowed))
  const repeats = operator === '+' ? randInt(rng, 2, 3) : 2
  return withResult(Array(repeats).fill(picture), Array(repeats - 1).fill(operator), values)
}

/** An equation with the new picture and pictures the child already knows. */
const introducingEquation = (rng: Rng, picture: number, allowed: PuzzleOperator[], values: number[]) => {
  const earlier = Array.from({ length: picture }, (_, i) => i)
  const operator = pick(rng, allowed)
  if (operator === '÷') {
    const other = pick(rng, earlier)
    return withResult(rng() < 0.5 ? [picture, other] : [other, picture], ['÷'], values)
  }
  if (operator === '×') {
    return withResult(shuffle(rng, [picture, pick(rng, earlier)]), ['×'], values)
  }
  const others = Array.from({ length: randInt(rng, 1, 2) }, () => pick(rng, earlier))
  const pictures = shuffle(rng, [picture, ...others])
  const operators = pictures.slice(1).map(() => pick(rng, sumOperators(allowed)))
  return withResult(pictures, operators, values)
}

/** Two sums with both pictures in each, so neither can be solved alone. */
const combinedPair = (rng: Rng, allowed: PuzzleOperator[], values: number[]) =>
  [0, 1].map(() => {
    const extra = Array.from({ length: randInt(rng, 0, 1) }, () => pick(rng, [0, 1]))
    const pictures = shuffle(rng, [0, 1, ...extra])
    const operators = pictures.slice(1).map(() => pick(rng, sumOperators(allowed)))
    return withResult(pictures, operators, values)
  })

const candidate = (rng: Rng, difficulty: Difficulty, allowed: PuzzleOperator[]): PicturePuzzle => {
  const level = PUZZLE_LEVELS[difficulty]
  const largestValue = Math.floor(level.maxNumber / 2)
  const values = Array.from({ length: level.pictures }, () => randInt(rng, 1, largestValue))
  const opening = level.combine ? combinedPair(rng, allowed, values) : [firstEquation(rng, 0, allowed, values)]
  const rest = Array.from({ length: level.pictures - opening.length }, (_, i) =>
    introducingEquation(rng, opening.length + i, allowed, values)
  )
  return { values, equations: [...opening, ...rest] }
}

/** From hard, a puzzle uses × or ÷ whenever either is selected. */
const usesScalingWhenAllowed = (puzzle: PicturePuzzle, difficulty: Difficulty, allowed: PuzzleOperator[]) => {
  if (difficulty !== 'hard' && difficulty !== 'advanced') return true
  if (!allowed.some((op) => SCALING.includes(op))) return true
  return puzzle.equations.some((e) => e.operators.some((op) => SCALING.includes(op)))
}

export const generatePuzzle = (rng: Rng, difficulty: Difficulty, operators: PuzzleOperator[]): PicturePuzzle => {
  const allowed = operatorsForLevel(operators, difficulty)
  return generateMatching(
    rng,
    (r) => candidate(r, difficulty, allowed),
    (p) => classifyPuzzle(p) === difficulty && usesScalingWhenAllowed(p, difficulty, allowed)
  )
}
