import { DIFFICULTIES } from '../difficulty'
import { createRng } from '../util/random'
import { BACKWARDS_OPERATORS } from './backwards'
import {
  classifyPuzzle,
  evaluate,
  generatePuzzle,
  PicturePuzzle,
  PUZZLE_LEVELS,
  PuzzleEquation,
  PuzzleOperator,
  solvePuzzle
} from './pictures'

const SEEDS = Array.from({ length: 150 }, (_, i) => i + 1)

const OPERATOR_SETS: PuzzleOperator[][] = [
  ...BACKWARDS_OPERATORS.map((op) => [op]),
  ['+', '-'],
  [...BACKWARDS_OPERATORS]
]

/**
 * Tries every whole number from 0 up to twice the level's largest number for
 * each picture, independently of the generator's solver, and returns every
 * assignment that satisfies all the equations.
 */
const bruteForceSolutions = ({ values, equations }: PicturePuzzle, bound: number) => {
  const solutions: number[][] = []
  const holds = (e: PuzzleEquation, assigned: number[]) => {
    if (e.operators.includes('÷') && assigned[e.pictures[1]] === 0) return false
    return evaluate(e, assigned) === e.result
  }
  const search = (assigned: number[]) => {
    const ready = equations.filter((e) => e.pictures.every((p) => p < assigned.length))
    if (!ready.every((e) => holds(e, assigned))) return
    if (assigned.length === values.length) {
      solutions.push(assigned)
      return
    }
    for (let v = 0; v <= bound; v++) search([...assigned, v])
  }
  search([])
  return solutions
}

const pictureEquation = (pictures: number[], operators: PuzzleOperator[], result: number): PuzzleEquation => ({
  pictures,
  operators,
  result
})

describe('picture puzzle difficulty', () => {
  test.each(DIFFICULTIES.flatMap((d) => OPERATOR_SETS.map((ops) => [d, ops.join(' ')] as const)))(
    '%s with %s generates only puzzles of that level with exactly one whole-number solution',
    (difficulty, operators) => {
      const selected = operators.split(' ') as PuzzleOperator[]
      for (const seed of SEEDS) {
        const puzzle = generatePuzzle(createRng(seed), difficulty, selected)
        expect(classifyPuzzle(puzzle)).toBe(difficulty)
      }
      // The brute force is slow, so it checks fewer seeds.
      for (const seed of SEEDS.slice(0, 20)) {
        const puzzle = generatePuzzle(createRng(seed), difficulty, selected)
        expect(bruteForceSolutions(puzzle, 2 * PUZZLE_LEVELS[difficulty].maxNumber)).toEqual([puzzle.values])
      }
    }
  )

  test('levels add pictures, bigger numbers, × and ÷, then equations that must be combined', () => {
    const generated = (difficulty: (typeof DIFFICULTIES)[number]) =>
      SEEDS.map((seed) => generatePuzzle(createRng(seed), difficulty, [...BACKWARDS_OPERATORS]))
    const operatorsOf = (puzzle: PicturePuzzle) => new Set(puzzle.equations.flatMap((e) => e.operators))
    const combined = (puzzle: PicturePuzzle) => solvePuzzle(puzzle.equations, puzzle.values.length)?.combined

    expect(generated('easy').every((p) => p.values.length === 2 && !combined(p))).toBe(true)
    expect(generated('medium').every((p) => !operatorsOf(p).has('×') && !operatorsOf(p).has('÷'))).toBe(true)
    expect(generated('hard').every((p) => operatorsOf(p).has('×') || operatorsOf(p).has('÷'))).toBe(true)
    expect(generated('advanced').every((p) => p.values.length === 4 && combined(p))).toBe(true)

    // The issue's example: solved one picture after another.
    const example: PicturePuzzle = {
      values: [6, 17, 13],
      equations: [
        pictureEquation([0, 0], ['+'], 12),
        pictureEquation([1, 0, 0], ['+', '+'], 29),
        pictureEquation([2, 1, 0], ['+', '+'], 36)
      ]
    }
    expect(classifyPuzzle(example)).toBe('medium')
  })

  test('ambiguous, unsolvable and self-cancelling puzzles are rejected', () => {
    // Both equations say the same thing, so any split of 10 works.
    const ambiguous: PicturePuzzle = {
      values: [4, 6],
      equations: [pictureEquation([0, 1], ['+'], 10), pictureEquation([1, 0], ['+'], 10)]
    }
    expect(solvePuzzle(ambiguous.equations, 2)).toBeUndefined()
    expect(classifyPuzzle(ambiguous)).toBeUndefined()

    // A picture divided by itself is 1 whatever its value.
    const selfDivided: PicturePuzzle = {
      values: [5, 3],
      equations: [pictureEquation([0, 0], ['÷'], 1), pictureEquation([0, 1], ['+'], 8)]
    }
    expect(classifyPuzzle(selfDivided)).toBeUndefined()

    // The star cancels itself out of the first equation.
    const cancelling: PicturePuzzle = {
      values: [7, 11],
      equations: [pictureEquation([0, 1, 0], ['+', '-'], 11), pictureEquation([0, 1], ['+'], 18)]
    }
    expect(classifyPuzzle(cancelling)).toBeUndefined()

    // Combined, these give 2.5 and 7.5: no whole-number answer.
    expect(solvePuzzle([pictureEquation([0, 1], ['+'], 10), pictureEquation([1, 0], ['-'], 5)], 2)).toBeUndefined()
  })
})
