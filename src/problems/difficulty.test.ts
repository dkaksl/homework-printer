import { DIFFICULTIES } from '../difficulty'
import { createRng } from '../util/random'
import {
  classifyColumn,
  COLUMN_OPERATORS,
  generateColumnProblem,
  generateColumnProblems
} from './column'
import { classifyHorizontal, generateHorizontalPage } from './horizontal'

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1)

describe('column arithmetic (uppställning) difficulty', () => {
  test.each(COLUMN_OPERATORS.flatMap((op) => DIFFICULTIES.map((d) => [op, d] as const)))(
    '%s at %s generates only problems of that level',
    (operator, difficulty) => {
      for (const seed of SEEDS) {
        const problem = generateColumnProblem(createRng(seed), operator, difficulty)
        expect(classifyColumn(problem)).toBe(difficulty)
      }
    }
  )

  test('levels follow carrying and borrowing, not just number size', () => {
    expect(classifyColumn({ operator: '+', operands: [23, 45] })).toBe('easy')
    expect(classifyColumn({ operator: '+', operands: [28, 45] })).toBe('medium')
    expect(classifyColumn({ operator: '+', operands: [368, 457] })).toBe('hard')
    expect(classifyColumn({ operator: '+', operands: [568, 247, 89] })).toBe('advanced')
    expect(classifyColumn({ operator: '+', operands: [739, 186, 258] })).toBe('advanced')

    expect(classifyColumn({ operator: '-', operands: [87, 45] })).toBe('easy')
    expect(classifyColumn({ operator: '-', operands: [82, 45] })).toBe('medium')
    expect(classifyColumn({ operator: '-', operands: [532, 187] })).toBe('hard')
    expect(classifyColumn({ operator: '-', operands: [1302, 785] })).toBe('advanced')
    expect(classifyColumn({ operator: '-', operands: [1504, 968] })).toBe('advanced')

    expect(classifyColumn({ operator: '×', operands: [23, 3] })).toBe('easy')
    expect(classifyColumn({ operator: '×', operands: [27, 3] })).toBe('medium')
    expect(classifyColumn({ operator: '×', operands: [478, 6] })).toBe('hard')
    expect(classifyColumn({ operator: '×', operands: [34, 12] })).toBe('advanced')

    expect(classifyColumn({ operator: '÷', operands: [84, 4] })).toBe('easy')
    expect(classifyColumn({ operator: '÷', operands: [72, 4] })).toBe('medium')
    expect(classifyColumn({ operator: '÷', operands: [457, 3] })).toBe('hard')
    expect(classifyColumn({ operator: '÷', operands: [4236, 6] })).toBe('advanced')
  })

  test('mixed operators are spread evenly and grouped by operator', () => {
    const problems = generateColumnProblems(createRng(1), 5, ['-', '+'], 'medium')
    expect(problems.map((p) => p.operator)).toEqual(['+', '+', '+', '-', '-'])
  })
})

describe('horizontal arithmetic difficulty', () => {
  test.each(DIFFICULTIES)('%s generates only problems of that level', (difficulty) => {
    for (const seed of SEEDS) {
      const page = generateHorizontalPage(createRng(seed), 20, difficulty, ['+', '-'])
      page.forEach((problem) => expect(classifyHorizontal(problem)).toBe(difficulty))
    }
  })

  test('subtracting a larger number from a smaller one is advanced', () => {
    expect(classifyHorizontal({ a: 4, b: 9, operator: '-' })).toBe('advanced')
    expect(classifyHorizontal({ a: 9, b: 4, operator: '-' })).toBe('easy')
    expect(classifyHorizontal({ a: 13, b: 7, operator: '-' })).toBe('hard')
    expect(classifyHorizontal({ a: 8, b: 7, operator: '+' })).toBe('hard')
    expect(classifyHorizontal({ a: 12, b: 5, operator: '+' })).toBe('medium')
  })

  test('a page has at most three zero operands', () => {
    for (const seed of SEEDS) {
      const page = generateHorizontalPage(createRng(seed), 200, 'easy', ['+'])
      const zeros = page.filter((p) => p.a === 0 || p.b === 0).length
      expect(zeros).toBeLessThanOrEqual(3)
    }
  })
})
