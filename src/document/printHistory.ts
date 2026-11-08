import { isDocument } from './persistence'
import { WorksheetDocument } from './types'

export const PRINT_HISTORY_KEY = 'homework-printer.printed'
export const PRINT_HISTORY_DAYS = 30

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * A printout, kept so its answers can be shown later. Problems are generated
 * from each block's seed, so the document as it was at print time, in the
 * language it was printed in, reproduces exactly what was on paper.
 */
export interface PrintedSheet {
  number: number
  printedAt: string
  lang: string
  document: WorksheetDocument
}

export interface PrintHistory {
  /** Never reused, so a paper sheet's number can't later point at another entry. */
  nextNumber: number
  entries: PrintedSheet[]
}

type HistoryStorage = Pick<Storage, 'getItem' | 'setItem'>

const emptyHistory = (): PrintHistory => ({ nextNumber: 1, entries: [] })

const isEntry = (value: unknown): value is PrintedSheet => {
  const entry = value as PrintedSheet
  return (
    Number.isInteger(entry?.number) &&
    typeof entry.printedAt === 'string' &&
    !Number.isNaN(Date.parse(entry.printedAt)) &&
    typeof entry.lang === 'string' &&
    isDocument(entry.document)
  )
}

const withoutExpired = (history: PrintHistory, now: Date): PrintHistory => {
  const cutoff = now.getTime() - PRINT_HISTORY_DAYS * DAY_MS
  return { ...history, entries: history.entries.filter((e) => Date.parse(e.printedAt) >= cutoff) }
}

const save = (history: PrintHistory, storage: HistoryStorage) => {
  try {
    storage.setItem(PRINT_HISTORY_KEY, JSON.stringify(history))
  } catch {
    // Private mode or a full quota: printing still works, it just isn't remembered.
  }
}

/** Newest first, with entries past the retention period already purged. */
export const loadPrintHistory = (
  storage: HistoryStorage = localStorage,
  now: Date = new Date()
): PrintHistory => {
  let stored: PrintHistory
  try {
    const parsed: Partial<PrintHistory> | null = JSON.parse(storage.getItem(PRINT_HISTORY_KEY) ?? 'null')
    const entries = Array.isArray(parsed?.entries) ? parsed?.entries.filter(isEntry) ?? [] : []
    const highest = Math.max(0, ...entries.map((e) => e.number))
    const nextNumber = Number.isInteger(parsed?.nextNumber) ? Number(parsed?.nextNumber) : 1
    stored = { nextNumber: Math.max(nextNumber, highest + 1), entries }
  } catch {
    stored = emptyHistory()
  }
  const history = withoutExpired(stored, now)
  if (history.entries.length !== stored.entries.length) save(history, storage)
  return { ...history, entries: [...history.entries].sort((a, b) => b.number - a.number) }
}

export const recordPrint = (
  document: WorksheetDocument,
  lang: string,
  storage: HistoryStorage = localStorage,
  now: Date = new Date()
): PrintedSheet => {
  const history = loadPrintHistory(storage, now)
  const entry: PrintedSheet = {
    number: history.nextNumber,
    printedAt: now.toISOString(),
    lang,
    // A deep copy, so later edits to the live document can't reach the record.
    document: JSON.parse(JSON.stringify(document))
  }
  save({ nextNumber: entry.number + 1, entries: [entry, ...history.entries] }, storage)
  return entry
}

export const deletePrint = (number: number, storage: HistoryStorage = localStorage) => {
  const history = loadPrintHistory(storage)
  save({ ...history, entries: history.entries.filter((e) => e.number !== number) }, storage)
}

export const deleteAllPrints = (storage: HistoryStorage = localStorage) => {
  save({ ...loadPrintHistory(storage), entries: [] }, storage)
}

/** Local calendar date, e.g. 2026-11-08. */
export const printDate = (printedAt: string) => {
  const d = new Date(printedAt)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const printLabel = (entry: Pick<PrintedSheet, 'number' | 'printedAt'>) =>
  `#${entry.number} · ${printDate(entry.printedAt)}`
