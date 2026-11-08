import { getBlockDefinition } from '../blocks/registry'
import { Difficulty } from '../difficulty'
import { HeaderPlacement } from '../layout/page'
import { randomSeed } from '../util/random'
import { BlockDifficulty, BlockInstance, WorksheetDocument } from './types'

export type DocumentAction =
  | { type: 'add'; blockType: string; index?: number; id?: string; seed?: number }
  | { type: 'move'; id: string; index: number }
  | { type: 'remove'; id: string }
  | { type: 'duplicate'; id: string; newId?: string }
  | { type: 'configure'; id: string; config: unknown }
  | { type: 'set-block-difficulty'; id: string; difficulty: BlockDifficulty }
  | { type: 'set-difficulty'; difficulty: Difficulty }
  | { type: 'set-header'; header: HeaderPlacement }
  | { type: 'randomize'; id: string }
  | { type: 'randomize-all' }

let idCounter = 0
export const newBlockId = () => `b${Date.now().toString(36)}${(idCounter++).toString(36)}`

const insertAt = <T>(items: T[], index: number | undefined, item: T) => {
  const at = index === undefined ? items.length : Math.max(0, Math.min(items.length, index))
  return [...items.slice(0, at), item, ...items.slice(at)]
}

const updateBlock = (
  document: WorksheetDocument,
  id: string,
  update: (block: BlockInstance) => BlockInstance
): WorksheetDocument => ({
  ...document,
  blocks: document.blocks.map((b) => (b.id === id ? update(b) : b))
})

export const documentReducer = (
  document: WorksheetDocument,
  action: DocumentAction
): WorksheetDocument => {
  switch (action.type) {
    case 'add': {
      const definition = getBlockDefinition(action.blockType)
      if (!definition) return document
      const block: BlockInstance = {
        id: action.id ?? newBlockId(),
        type: definition.type,
        config: definition.defaultConfig(),
        difficulty: 'inherit',
        seed: action.seed ?? randomSeed()
      }
      return { ...document, blocks: insertAt(document.blocks, action.index, block) }
    }
    case 'move': {
      const block = document.blocks.find((b) => b.id === action.id)
      if (!block) return document
      const rest = document.blocks.filter((b) => b.id !== action.id)
      return { ...document, blocks: insertAt(rest, action.index, block) }
    }
    case 'remove':
      return { ...document, blocks: document.blocks.filter((b) => b.id !== action.id) }
    case 'duplicate': {
      const index = document.blocks.findIndex((b) => b.id === action.id)
      if (index < 0) return document
      const copy = { ...document.blocks[index], id: action.newId ?? newBlockId() }
      return { ...document, blocks: insertAt(document.blocks, index + 1, copy) }
    }
    case 'configure':
      return updateBlock(document, action.id, (b) => ({ ...b, config: action.config }))
    case 'set-block-difficulty':
      return updateBlock(document, action.id, (b) => ({ ...b, difficulty: action.difficulty }))
    case 'set-difficulty':
      return { ...document, settings: { ...document.settings, difficulty: action.difficulty } }
    case 'set-header':
      return { ...document, settings: { ...document.settings, header: action.header } }
    case 'randomize':
      return updateBlock(document, action.id, (b) => ({ ...b, seed: randomSeed() }))
    case 'randomize-all':
      return { ...document, blocks: document.blocks.map((b) => ({ ...b, seed: randomSeed() })) }
  }
}
