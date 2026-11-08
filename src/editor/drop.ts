export type DropTarget =
  | { position: 'before' | 'after'; blockId: string }
  | { position: 'end' }

export const insertionIndex = (blockIds: string[], target: DropTarget) => {
  if (target.position === 'end') return blockIds.length
  const index = blockIds.indexOf(target.blockId)
  if (index < 0) return blockIds.length
  return target.position === 'before' ? index : index + 1
}

/** Where a moved block lands once it's taken out of the list, or null if it wouldn't move. */
export const moveIndex = (blockIds: string[], movingId: string, target: DropTarget) => {
  const from = blockIds.indexOf(movingId)
  const to = insertionIndex(blockIds, target)
  const adjusted = from < to ? to - 1 : to
  return adjusted === from ? null : adjusted
}

export const PALETTE_PREFIX = 'palette:'
export const BLOCK_PREFIX = 'block:'
export const UNIT_PREFIX = 'unit:'
export const PAGE_PREFIX = 'page:'
