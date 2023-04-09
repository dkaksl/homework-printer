import { Difficulty, Operator } from '../views/main'

const getMaxNumber = (difficulty?: string) => {
  switch (difficulty) {
    case 'easy':
      return 10
    case 'medium':
      return 15
    case 'hard':
      return 20
    case 'advanced':
      return 20
    default:
      return 15
  }
}

export interface RowData {
  a: number
  b: number
  operator: Operator
}

/**
 * Recursive function that will re-roll if the number generated is zero and includeZero is false
 */
const getRandomNumber = (maxNumber: number, includeZero: boolean): number => {
  if (maxNumber <= 1) {
    if (!includeZero) {
      return 1
    }
    return Math.floor(Math.random() * 2) // flip between 0 and 1
  }
  const n = Math.floor(Math.random() * maxNumber) // random number including zero
  if (n === 0 && !includeZero) {
    return getRandomNumber(maxNumber, includeZero)
  }
  return n
}

const generateRow = (
  maxNumber: number,
  difficulty: Difficulty,
  operator: Operator,
  includeZero: boolean
) => {
  const a = getRandomNumber(maxNumber, includeZero)
  const b = getRandomNumber(
    difficulty === 'advanced' ? maxNumber : a,
    includeZero
  )
  return { a, b, operator }
}

const generatePage = (
  rowCount: number,
  difficulty: Difficulty,
  operators: Operator[]
) => {
  const maxNumber = getMaxNumber(difficulty)
  const rows = []
  let numberOfZeros = 0
  for (let i = 0; i < rowCount; i++) {
    const row = generateRow(
      maxNumber,
      difficulty,
      getRandomFromArray(operators),
      numberOfZeros >= 3 ? false : true
    )
    if (row.a === 0) {
      numberOfZeros++
    } else if (row.b === 0) {
      numberOfZeros++
    }
    rows.push(row)
  }
  return rows
}

export const generateRowData = (
  rowCount: number,
  difficulty: Difficulty,
  operators: Operator[],
  pageCount: number
): RowData[][] => {
  const pages = []
  for (let i = 0; i < pageCount; i++) {
    pages.push(generatePage(rowCount, difficulty, operators))
  }
  return pages
}

export const getOperatorFromSelected = (selected: string) => {
  switch (selected) {
    case 'Addition':
      return '+'
    case 'Subtraction':
      return '-'
    default:
      throw new Error('Unexpected state selected')
  }
}

export const getRowString = (columns: {
  leftColumn: string
  rightColumn: string
}) => {
  const leftColumnChars = columns.leftColumn.split('')
  const rightColumnChars = columns.rightColumn.split('')
  const newStringArray = []
  for (let i = 0; i < leftColumnChars.length; i++) {
    newStringArray.push(leftColumnChars[i])
    newStringArray.push(rightColumnChars[i])
  }
  return newStringArray.join('')
}

// TODO #8
// eslint-disable-next-line
export const getRandomFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}
