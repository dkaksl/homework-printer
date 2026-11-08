import { DIFFICULTIES } from '../difficulty'
import { createRng } from '../util/random'
import { buildPyramid, classifyPyramid, generatePyramid, NumberPyramid, solvePyramid } from './pyramid'

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1)

const binomial = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 ? 1 : (binomial(n - 1, k - 1) * n) / k)

/**
 * Independently of the generator's solver: every box is a fixed sum of the
 * bottom boxes, so the shown boxes pin down a single pyramid exactly when
 * those sums are linearly independent.
 */
const shownBoxesDetermineBottom = ({ values, given }: NumberPyramid) => {
  const rows = values.length
  const matrix = values.flatMap((row, r) =>
    row.flatMap((_, c) => (given[r][c] ? [Array.from({ length: rows }, (_, k) => binomial(rows - 1 - r, k - c))] : []))
  )
  let rank = 0
  for (let col = 0; col < rows && rank < matrix.length; col++) {
    let pivot = rank
    while (pivot < matrix.length && Math.abs(matrix[pivot][col]) < 1e-9) pivot++
    if (pivot === matrix.length) continue
    ;[matrix[rank], matrix[pivot]] = [matrix[pivot], matrix[rank]]
    const pivotRow = matrix[rank]
    for (let i = rank + 1; i < matrix.length; i++) {
      const factor = matrix[i][col] / pivotRow[col]
      matrix[i] = matrix[i].map((v, j) => v - factor * pivotRow[j])
    }
    rank++
  }
  return rank === rows
}

describe('number pyramid difficulty', () => {
  test.each(DIFFICULTIES)(
    '%s generates only pyramids of that level with exactly one whole-number solution',
    (difficulty) => {
      for (const seed of SEEDS) {
        const pyramid = generatePyramid(createRng(seed), difficulty)
        expect(classifyPyramid(pyramid)).toBe(difficulty)
        expect(shownBoxesDetermineBottom(pyramid)).toBe(true)
        expect(pyramid.values.flat().every((v) => Number.isInteger(v) && v >= 0)).toBe(true)
        pyramid.values.slice(0, -1).forEach((row, r) =>
          row.forEach((v, c) => expect(v).toBe(pyramid.values[r + 1][c] + pyramid.values[r + 1][c + 1]))
        )
      }
    }
  )

  test('levels add rows, bigger numbers and more boxes worked out downwards', () => {
    const downward = (difficulty: (typeof DIFFICULTIES)[number]) =>
      SEEDS.map((seed) => solvePyramid(generatePyramid(createRng(seed), difficulty))?.downward ?? -1)

    expect(downward('easy').every((d) => d === 0)).toBe(true)
    expect(downward('medium').every((d) => d >= 1)).toBe(true)
    expect(downward('hard').every((d) => d >= 3)).toBe(true)
    expect(downward('advanced').every((d) => d >= 6)).toBe(true)

    // The issue's example: 118 on top, 51 right on the second row, 37 left on
    // the third, and 16 and 12 at the ends of the bottom row.
    const values = buildPyramid([16, 21, 9, 12])
    const example: NumberPyramid = {
      values,
      given: [[true], [false, true], [true, false, false], [true, false, false, true]]
    }
    expect(values[0][0]).toBe(118)
    expect(values[1][1]).toBe(51)
    expect(values[2][0]).toBe(37)
    expect(classifyPyramid(example)).toBe('hard')
  })

  test('pyramids that are ambiguous or give away too much are rejected', () => {
    const values = buildPyramid([3, 4, 5])
    // The top follows from the two below it, so the bottom row has many fillings.
    const ambiguous: NumberPyramid = { values, given: [[true], [true, true], [false, false, false]] }
    expect(solvePyramid(ambiguous)).toBeUndefined()
    expect(shownBoxesDetermineBottom(ambiguous)).toBe(false)
    expect(classifyPyramid(ambiguous)).toBeUndefined()

    const tooMany: NumberPyramid = { values, given: [[true], [false, false], [true, true, true]] }
    expect(classifyPyramid(tooMany)).toBeUndefined()
  })
})
