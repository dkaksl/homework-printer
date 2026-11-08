import { useDraggable } from '@dnd-kit/core'
import { BLOCKS } from '../blocks/registry'
import { AnyBlockDefinition } from '../blocks/types'
import { useT } from '../i18n/useT'
import { PALETTE_PREFIX } from './drop'

const PaletteItem = ({
  definition,
  onAdd
}: {
  definition: AnyBlockDefinition
  onAdd: (type: string) => void
}) => {
  const { t } = useT()
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: `${PALETTE_PREFIX}${definition.type}`,
    data: { blockType: definition.type }
  })
  return (
    <button
      ref={setNodeRef}
      type="button"
      className="palette-item"
      onClick={() => onAdd(definition.type)}
      {...attributes}
      {...listeners}
    >
      <span className="palette-icon" aria-hidden="true">
        {definition.icon}
      </span>
      {t(definition.titleKey)}
    </button>
  )
}

export const Palette = ({ onAdd }: { onAdd: (type: string) => void }) => {
  const { t } = useT()
  const groups = [
    { titleKey: 'Sections', blocks: BLOCKS.filter((b) => b.kind !== 'full-page') },
    { titleKey: 'Full-page sheets', blocks: BLOCKS.filter((b) => b.kind === 'full-page') }
  ]
  return (
    <aside className="palette" aria-label={t('Problem types')}>
      <h2>{t('Problem types')}</h2>
      <p className="hint">{t('palette-hint')}</p>
      {groups.map((group) => (
        <section key={group.titleKey}>
          <h3>{t(group.titleKey)}</h3>
          {group.blocks.map((definition) => (
            <PaletteItem key={definition.type} definition={definition} onAdd={onAdd} />
          ))}
        </section>
      ))}
    </aside>
  )
}
