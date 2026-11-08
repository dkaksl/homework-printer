import {
  deleteAllPrints,
  deletePrint,
  loadPrintHistory,
  PRINT_HISTORY_KEY,
  printLabel,
  recordPrint
} from './printHistory'
import { documentReducer } from './store'
import { emptyDocument } from './types'

const storedHistory = (storage: { getItem: (key: string) => string | null }) =>
  JSON.parse(storage.getItem(PRINT_HISTORY_KEY) ?? 'null')

const memoryStorage = (initial: Record<string, string> = {}) => {
  const data = { ...initial }
  return {
    getItem: (key: string) => data[key] ?? null,
    setItem: (key: string, value: string) => {
      data[key] = value
    }
  }
}

const daysAfter = (start: Date, days: number) => new Date(start.getTime() + days * 24 * 60 * 60 * 1000)

const start = new Date(2026, 10, 8, 14, 30)

describe('print history', () => {
  test('each print is kept as it was printed, newest first, with its own number', () => {
    const storage = memoryStorage()
    let doc = documentReducer(emptyDocument(), { type: 'add', blockType: 'uppstallning', id: 'a', seed: 1 })
    const first = recordPrint(doc, 'se', storage, start)

    doc = documentReducer(doc, { type: 'randomize', id: 'a' })
    recordPrint(doc, 'en', storage, daysAfter(start, 1))

    const { entries } = loadPrintHistory(storage, daysAfter(start, 1))
    expect(entries.map((e) => e.number)).toEqual([2, 1])
    expect(entries[1]).toEqual(first)
    expect(entries[1].document.blocks[0].seed).toBe(1)
    expect(entries[1].lang).toBe('se')
    expect(printLabel(first)).toBe('#1 · 2026-11-08')
  })

  test(`entries older than the retention period are purged, and numbers are never reused`, () => {
    const storage = memoryStorage()
    const doc = emptyDocument()
    recordPrint(doc, 'en', storage, start)
    recordPrint(doc, 'en', storage, daysAfter(start, 10))

    const later = daysAfter(start, 31)
    expect(loadPrintHistory(storage, later).entries.map((e) => e.number)).toEqual([2])
    // The purge is saved, not just filtered on the way out.
    expect(storedHistory(storage).entries).toHaveLength(1)

    expect(recordPrint(doc, 'en', storage, later).number).toBe(3)
  })

  test('entries can be deleted one at a time or all at once', () => {
    const storage = memoryStorage()
    const now = new Date()
    ;[1, 2, 3].forEach(() => recordPrint(emptyDocument(), 'en', storage, now))

    deletePrint(2, storage)
    expect(loadPrintHistory(storage).entries.map((e) => e.number)).toEqual([3, 1])

    deleteAllPrints(storage)
    expect(loadPrintHistory(storage).entries).toEqual([])
    expect(recordPrint(emptyDocument(), 'en', storage).number).toBe(4)
  })

  test('unreadable storage starts an empty history and skips broken entries', () => {
    expect(loadPrintHistory(memoryStorage({ [PRINT_HISTORY_KEY]: '{not json' }))).toEqual({
      nextNumber: 1,
      entries: []
    })

    const storage = memoryStorage()
    const kept = recordPrint(emptyDocument(), 'en', storage)
    const stored = storedHistory(storage)
    stored.entries.push({ number: 7, printedAt: 'yesterday', lang: 'en', document: {} })
    storage.setItem(PRINT_HISTORY_KEY, JSON.stringify(stored))
    expect(loadPrintHistory(storage).entries).toEqual([kept])
  })
})
