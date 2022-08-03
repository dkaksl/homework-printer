import { ordbok } from './svenska'

describe('ordbok tests', () => {
  test('that there are no duplicate nouns', () => {
    const substantiv = ordbok.substantiv
    const substantivSet = new Set()
    for (const s of substantiv) {
      substantivSet.add(s.grundord)
    }
    expect(substantiv.length).toEqual(substantivSet.size)
  })
})
