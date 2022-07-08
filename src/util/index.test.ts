import { generateRowData } from './index'

describe('generate row data tests', () => {
  test('expected number of pages and rows are generated', () => {
    const rowData = generateRowData(10, 'easy', ['+'], 2)
    expect(rowData).toHaveLength(2)
    expect(rowData[0]).toHaveLength(10)
    expect(rowData[1]).toHaveLength(10)
  })

  test('no more than 3 zeros per page is generated (easy)', () => {
    const rowData = generateRowData(1000, 'easy', ['+'], 1)
    let zeroCount = 0
    rowData[0].forEach((row) => {
      if (row.a === 0) {
        zeroCount++
      }
      if (row.b === 0) {
        zeroCount++
      }
    })
    expect(zeroCount).toBeLessThanOrEqual(4)
  })

  test('no more than 3 zeros per page is generated (advanced)', () => {
    const rowData = generateRowData(1000, 'advanced', ['+'], 1)
    let zeroCount = 0
    rowData[0].forEach((row) => {
      if (row.a === 0) {
        zeroCount++
      }
      if (row.b === 0) {
        zeroCount++
      }
    })
    expect(zeroCount).toBeLessThanOrEqual(4)
  })
})
