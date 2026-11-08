import { getBlockDefinition } from '../blocks/registry'
import { DIFFICULTIES } from '../difficulty'
import { emptyDocument, WorksheetDocument } from './types'

export const STORAGE_KEY = 'homework-printer.document'

const HEADER_PLACEMENTS = ['first-page', 'every-page', 'none']

export const isDocument = (value: unknown): value is WorksheetDocument => {
  const doc = value as WorksheetDocument
  return (
    doc?.version === 1 &&
    Array.isArray(doc.blocks) &&
    DIFFICULTIES.includes(doc.settings?.difficulty) &&
    HEADER_PLACEMENTS.includes(doc.settings?.header)
  )
}

/** Falls back to an empty document on anything unreadable, and drops block types this version doesn't know. */
export const loadDocument = (storage: Pick<Storage, 'getItem'> = localStorage): WorksheetDocument => {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? 'null')
    if (!isDocument(parsed)) return emptyDocument()
    return {
      ...parsed,
      blocks: parsed.blocks.filter((b) => getBlockDefinition(b.type) !== undefined)
    }
  } catch {
    return emptyDocument()
  }
}

export const saveDocument = (
  document: WorksheetDocument,
  storage: Pick<Storage, 'setItem'> = localStorage
) => {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(document))
  } catch {
    // Private mode or a full quota: the editor keeps working without saving.
  }
}
