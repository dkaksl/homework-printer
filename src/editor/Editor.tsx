import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { getBlockDefinition } from '../blocks/registry'
import { layoutDocument } from '../document/layout'
import { loadDocument, saveDocument } from '../document/persistence'
import { documentReducer, newBlockId } from '../document/store'
import { useT } from '../i18n/useT'
import { Canvas } from './Canvas'
import {
  BLOCK_PREFIX,
  DropTarget,
  moveIndex,
  insertionIndex,
  PAGE_PREFIX,
  PALETTE_PREFIX,
  UNIT_PREFIX
} from './drop'
import { Inspector } from './Inspector'
import { Palette } from './Palette'
import { PrintPages } from './SheetPage'

const ZOOM_KEY = 'homework-printer.zoom'
const ZOOM_LEVELS = [0.5, 0.75, 1]

const PRINT_PAGE_STYLE = `
  @page { size: A4 portrait; margin: 0; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
`

const loadZoom = () => {
  try {
    const stored = Number(localStorage.getItem(ZOOM_KEY))
    return ZOOM_LEVELS.includes(stored) ? stored : 0.75
  } catch {
    return 0.75
  }
}

/** Units take precedence over the page around them, so the drop lands next to the hovered section. */
const collisionDetection: CollisionDetection = (args) => {
  const hits = pointerWithin(args)
  const unit = hits.find((h) => String(h.id).startsWith(UNIT_PREFIX))
  if (unit) return [unit]
  return hits.length > 0 ? hits : rectIntersection(args)
}

const pointerY = (event: DragMoveEvent) => {
  const start = event.activatorEvent as PointerEvent
  return start.clientY + event.delta.y
}

const dropTargetFor = (event: DragMoveEvent): DropTarget | null => {
  const { over } = event
  if (!over) return null
  const id = String(over.id)
  if (id.startsWith(UNIT_PREFIX)) {
    const { blockId, isFirst } = over.data.current as { blockId: string; isFirst: boolean }
    const upperHalf = pointerY(event) < over.rect.top + over.rect.height / 2
    return { blockId, position: isFirst && upperHalf ? 'before' : 'after' }
  }
  if (id.startsWith(PAGE_PREFIX)) {
    const { lastBlockId } = over.data.current as { lastBlockId?: string }
    return lastBlockId ? { blockId: lastBlockId, position: 'after' } : { position: 'end' }
  }
  return null
}

export const Editor = () => {
  const { t, lang } = useT()
  const [document, dispatch] = useReducer(documentReducer, undefined, () => loadDocument())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showAnswers, setShowAnswers] = useState(false)
  const [zoom, setZoom] = useState(loadZoom)
  const [dragLabel, setDragLabel] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => saveDocument(document), [document])
  useEffect(() => {
    try {
      localStorage.setItem(ZOOM_KEY, String(zoom))
    } catch {
      // Zoom is a convenience; nothing to do if storage is unavailable.
    }
  }, [zoom])

  // t changes identity on every render; the language is what the layout depends on.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pagination = useMemo(() => layoutDocument(document, t, lang), [document, lang])

  const print = useReactToPrint({
    content: () => printRef.current,
    documentTitle: t('Editor'),
    pageStyle: PRINT_PAGE_STYLE
  })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const blockIds = document.blocks.map((b) => b.id)

  const addBlock = (blockType: string, index?: number) => {
    const id = newBlockId()
    dispatch({ type: 'add', blockType, index, id })
    setSelectedId(id)
  }

  const onDragStart = ({ active }: DragStartEvent) => {
    const id = String(active.id)
    const type = id.startsWith(PALETTE_PREFIX)
      ? (active.data.current as { blockType: string }).blockType
      : document.blocks.find((b) => b.id === (active.data.current as { blockId: string }).blockId)?.type
    const definition = type ? getBlockDefinition(type) : undefined
    setDragLabel(definition ? `${definition.icon} ${t(definition.titleKey)}` : null)
  }

  const onDragEnd = ({ active }: DragEndEvent) => {
    const target = dropTarget
    setDropTarget(null)
    setDragLabel(null)
    if (!target) return
    const id = String(active.id)
    if (id.startsWith(PALETTE_PREFIX)) {
      const { blockType } = active.data.current as { blockType: string }
      addBlock(blockType, insertionIndex(blockIds, target))
    } else if (id.startsWith(BLOCK_PREFIX)) {
      const { blockId } = active.data.current as { blockId: string }
      const index = moveIndex(blockIds, blockId, target)
      if (index !== null) dispatch({ type: 'move', id: blockId, index })
      setSelectedId(blockId)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={onDragStart}
      onDragMove={(event) => setDropTarget(dropTargetFor(event))}
      onDragEnd={onDragEnd}
      onDragCancel={() => {
        setDropTarget(null)
        setDragLabel(null)
      }}
    >
      <div className="editor">
        <div className="toolbar">
          <button type="button" className="primary" onClick={print}>
            {t('Print')}
          </button>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showAnswers}
              onChange={(e) => setShowAnswers(e.target.checked)}
            />
            {t('Show answers')}
          </label>
          <label className="zoom">
            {t('Zoom')}
            <select value={zoom} onChange={(e) => setZoom(Number(e.target.value))}>
              {ZOOM_LEVELS.map((z) => (
                <option key={z} value={z}>
                  {Math.round(z * 100)}%
                </option>
              ))}
            </select>
          </label>
        </div>
        <Palette onAdd={(type) => addBlock(type)} />
        <Canvas
          pagination={pagination}
          showAnswers={showAnswers}
          zoom={zoom}
          selectedId={selectedId}
          dropTarget={dropTarget}
          isEmpty={document.blocks.length === 0}
          onSelect={setSelectedId}
        />
        <Inspector
          document={document}
          selectedId={selectedId}
          overflowingBlockIds={pagination.overflowingBlockIds}
          dispatch={dispatch}
        />
      </div>
      <div className="print-root" data-testid="printout" aria-hidden="true">
        <div ref={printRef}>
          <PrintPages pages={pagination.pages} />
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {dragLabel && <div className="drag-chip">{dragLabel}</div>}
      </DragOverlay>
    </DndContext>
  )
}
