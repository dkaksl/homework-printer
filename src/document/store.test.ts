import { insertionIndex, moveIndex } from '../editor/drop'
import { loadDocument, saveDocument, STORAGE_KEY } from './persistence'
import { documentReducer } from './store'
import { effectiveDifficulty, emptyDocument } from './types'

const memoryStorage = (initial: Record<string, string> = {}) => {
  const data = { ...initial }
  return {
    getItem: (key: string) => data[key] ?? null,
    setItem: (key: string, value: string) => {
      data[key] = value
    }
  }
}

describe('document difficulty', () => {
  test('new blocks follow the document difficulty until they are overridden', () => {
    let doc = documentReducer(emptyDocument(), { type: 'add', blockType: 'uppstallning', id: 'a' })
    doc = documentReducer(doc, { type: 'add', blockType: 'uppstallning', id: 'b' })
    doc = documentReducer(doc, { type: 'set-block-difficulty', id: 'b', difficulty: 'easy' })
    doc = documentReducer(doc, { type: 'set-difficulty', difficulty: 'advanced' })

    const [a, b] = doc.blocks
    expect(effectiveDifficulty(a, doc.settings)).toBe('advanced')
    expect(effectiveDifficulty(b, doc.settings)).toBe('easy')
  })
})

describe('saving the document', () => {
  test('the document survives a reload', () => {
    const storage = memoryStorage()
    const doc = documentReducer(emptyDocument(), { type: 'add', blockType: 'maths', id: 'm' })
    saveDocument(doc, storage)
    expect(loadDocument(storage)).toEqual(doc)
  })

  test('unreadable storage starts an empty document, and unknown block types are dropped', () => {
    expect(loadDocument(memoryStorage({ [STORAGE_KEY]: '{not json' }))).toEqual(emptyDocument())

    const doc = documentReducer(emptyDocument(), { type: 'add', blockType: 'maths', id: 'm' })
    const withUnknown = { ...doc, blocks: [...doc.blocks, { ...doc.blocks[0], id: 'x', type: 'removed-type' }] }
    const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify(withUnknown) })
    expect(loadDocument(storage).blocks.map((b) => b.id)).toEqual(['m'])
  })
})

describe('dropping blocks', () => {
  const ids = ['a', 'b', 'c']

  test('a new block lands before or after the section it is dropped on', () => {
    expect(insertionIndex(ids, { position: 'before', blockId: 'b' })).toBe(1)
    expect(insertionIndex(ids, { position: 'after', blockId: 'b' })).toBe(2)
    expect(insertionIndex(ids, { position: 'end' })).toBe(3)
  })

  test('moving a block accounts for its own old position', () => {
    expect(moveIndex(ids, 'a', { position: 'after', blockId: 'c' })).toBe(2)
    expect(moveIndex(ids, 'c', { position: 'before', blockId: 'a' })).toBe(0)
    expect(moveIndex(ids, 'b', { position: 'after', blockId: 'a' })).toBeNull()
  })
})
