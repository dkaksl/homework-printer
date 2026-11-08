import { useDraggable, useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'
import { useT } from '../i18n/useT'
import { Page, Pagination, PlacedUnit } from '../layout/page'
import { BLOCK_PREFIX, DropTarget, PAGE_PREFIX, UNIT_PREFIX } from './drop'
import { SheetPage, UnitBox } from './SheetPage'

interface CanvasProps {
  pagination: Pagination
  showAnswers: boolean
  zoom: number
  selectedId: string | null
  dropTarget: DropTarget | null
  isEmpty: boolean
  onSelect: (id: string | null) => void
}

interface BlockEdges {
  first: Map<string, string>
  last: Map<string, string>
}

const blockEdges = (pages: Page[]): BlockEdges => {
  const first = new Map<string, string>()
  const last = new Map<string, string>()
  pages.forEach((page) =>
    page.units.forEach(({ blockId, unit }) => {
      if (!first.has(blockId)) first.set(blockId, unit.key)
      last.set(blockId, unit.key)
    })
  )
  return { first, last }
}

const EditorUnit = ({
  placed,
  isFirst,
  dropClass,
  selected,
  overflowing,
  onSelect,
  children
}: {
  placed: PlacedUnit
  isFirst: boolean
  dropClass: string
  selected: boolean
  overflowing: boolean
  onSelect: (id: string) => void
  children: ReactNode
}) => {
  const { setNodeRef } = useDroppable({
    id: `${UNIT_PREFIX}${placed.blockId}:${placed.unit.key}`,
    data: { blockId: placed.blockId, isFirst }
  })
  const drag = useDraggable({
    id: `${BLOCK_PREFIX}${placed.blockId}:${placed.unit.key}`,
    data: { blockId: placed.blockId }
  })
  const classes = [
    'editor-unit',
    selected ? 'selected' : '',
    overflowing ? 'overflowing' : '',
    drag.isDragging ? 'dragging' : '',
    dropClass
  ]
  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        drag.setNodeRef(node)
      }}
      className={classes.filter(Boolean).join(' ')}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(placed.blockId)
      }}
      {...drag.attributes}
      {...drag.listeners}
      role="button"
      tabIndex={0}
    >
      <UnitBox placed={placed}>{children}</UnitBox>
    </div>
  )
}

const EditorPage = ({
  page,
  index,
  lastBlockId,
  children
}: {
  page: Page
  index: number
  lastBlockId: string | undefined
  children: ReactNode
}) => {
  const { setNodeRef } = useDroppable({
    id: `${PAGE_PREFIX}${index}`,
    data: { lastBlockId }
  })
  return (
    <div ref={setNodeRef} className="editor-page" data-header={page.header}>
      {children}
    </div>
  )
}

export const Canvas = ({
  pagination,
  showAnswers,
  zoom,
  selectedId,
  dropTarget,
  isEmpty,
  onSelect
}: CanvasProps) => {
  const { t } = useT()
  const edges = blockEdges(pagination.pages)
  const overflowing = new Set(pagination.overflowingBlockIds)
  const dropClassFor = ({ blockId, unit }: PlacedUnit) => {
    if (!dropTarget || dropTarget.position === 'end' || dropTarget.blockId !== blockId) return ''
    if (dropTarget.position === 'before' && edges.first.get(blockId) === unit.key) return 'drop-before'
    if (dropTarget.position === 'after' && edges.last.get(blockId) === unit.key) return 'drop-after'
    return ''
  }

  return (
    <div className="canvas" data-testid="preview" onClick={() => onSelect(null)}>
      <div className="canvas-pages" style={{ zoom }}>
        {pagination.pages.map((page, i) => (
          <EditorPage
            key={i}
            page={page}
            index={i}
            lastBlockId={page.units[page.units.length - 1]?.blockId}
          >
            <SheetPage
              page={page}
              options={{ showAnswers, mode: 'editor' }}
              wrapUnit={(placed, content) => (
                <EditorUnit
                  placed={placed}
                  isFirst={edges.first.get(placed.blockId) === placed.unit.key}
                  dropClass={dropClassFor(placed)}
                  selected={placed.blockId === selectedId}
                  overflowing={overflowing.has(placed.blockId)}
                  onSelect={onSelect}
                >
                  {content}
                </EditorUnit>
              )}
            >
              {isEmpty && i === 0 && <p className="empty-hint">{t('palette-hint')}</p>}
              {dropTarget?.position === 'end' && i === pagination.pages.length - 1 && (
                <div className="drop-end" />
              )}
            </SheetPage>
          </EditorPage>
        ))}
      </div>
    </div>
  )
}
