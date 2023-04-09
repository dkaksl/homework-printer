import { ordbok } from './svenska'

describe('ordbok tests', () => {
  test('that there are no duplicate nouns', () => {
    const substantiv = ordbok.substantiv
    const substantivSet = new Set()
    for (const s of substantiv) {
      const grundord = s.singular.obestämd
      expect(substantivSet.has(grundord)).toBe(false)
      substantivSet.add(grundord)
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
