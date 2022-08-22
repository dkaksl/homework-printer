import { ordbok } from './svenska'

describe('ordbok tests', () => {
  test('that there are no duplicate nouns', () => {
    const substantiv = ordbok.substantiv
    const substantivSet = new Set()
    for (const s of substantiv) {
      expect(substantivSet.has(s.grundord)).toBe(false)
      substantivSet.add(s.grundord)
    }
    expect(substantiv.length).toEqual(substantivSet.size)
  })

  test('that there are no duplicate verbs', () => {
    const verb = ordbok.verb
    const verbSet = new Set()
    for (const v of verb) {
      expect(verbSet.has(v.grundord)).toBe(false)
      verbSet.add(v.grundord)
    }
    expect(verb.length).toEqual(verbSet.size)
  })
})
