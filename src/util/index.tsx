import { Rng } from './random'

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

export const getRandomFromArray = <Type,>(
  array: Type[],
  rng: Rng = Math.random
) => {
  return array[Math.floor(rng() * array.length)]
}
