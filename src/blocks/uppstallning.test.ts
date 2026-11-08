import { DIFFICULTIES } from '../difficulty'
import { COLUMN_OPERATORS, generateColumnProblems } from '../problems/column'
import { createRng } from '../util/random'
import { NUMBER_GUTTER_MM, problemWidthMm, SLOT_WIDTH_MM } from './uppstallning'

test('every column problem fits within its slot, with room for the problem number', () => {
  for (const difficulty of DIFFICULTIES) {
    for (let seed = 1; seed <= 200; seed++) {
      const problems = generateColumnProblems(createRng(seed), 8, [...COLUMN_OPERATORS], difficulty)
      for (const problem of problems) {
        expect(problemWidthMm(problem) + NUMBER_GUTTER_MM).toBeLessThanOrEqual(SLOT_WIDTH_MM)
      }
    }
  }
})
