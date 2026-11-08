import { Difficulty } from '../difficulty'
import { HeaderPlacement } from '../layout/page'

export type BlockDifficulty = Difficulty | 'inherit'

export interface BlockInstance {
  id: string
  type: string
  config: unknown
  difficulty: BlockDifficulty
  seed: number
}

export interface DocumentSettings {
  difficulty: Difficulty
  header: HeaderPlacement
}

export interface WorksheetDocument {
  version: 1
  settings: DocumentSettings
  blocks: BlockInstance[]
}

export const emptyDocument = (): WorksheetDocument => ({
  version: 1,
  settings: { difficulty: 'medium', header: 'first-page' },
  blocks: []
})

export const effectiveDifficulty = (
  block: Pick<BlockInstance, 'difficulty'>,
  settings: DocumentSettings
): Difficulty => (block.difficulty === 'inherit' ? settings.difficulty : block.difficulty)
