import { Dispatch } from 'react'
import { SelectField } from '../blocks/controls'
import { getBlockDefinition } from '../blocks/registry'
import { DIFFICULTIES, DIFFICULTY_LABEL_KEYS } from '../difficulty'
import { DocumentAction } from '../document/store'
import { BlockDifficulty, WorksheetDocument } from '../document/types'
import { useT } from '../i18n/useT'
import { HeaderPlacement } from '../layout/page'

interface InspectorProps {
  document: WorksheetDocument
  selectedId: string | null
  overflowingBlockIds: string[]
  dispatch: Dispatch<DocumentAction>
}

const DocumentSettingsPanel = ({
  document,
  dispatch
}: Pick<InspectorProps, 'document' | 'dispatch'>) => {
  const { t } = useT()
  const headerOptions: HeaderPlacement[] = ['first-page', 'every-page', 'none']
  return (
    <>
      <h2>{t('Document')}</h2>
      <SelectField
        label={t('difficulty')}
        options={DIFFICULTIES.map((d) => ({ value: d, label: t(DIFFICULTY_LABEL_KEYS[d]) }))}
        value={document.settings.difficulty}
        onChange={(difficulty) => dispatch({ type: 'set-difficulty', difficulty })}
      />
      <SelectField
        label={t('Header')}
        options={headerOptions.map((h) => ({ value: h, label: t(`header-${h}`) }))}
        value={document.settings.header}
        onChange={(header) => dispatch({ type: 'set-header', header })}
      />
      <div className="actions">
        <button type="button" onClick={() => dispatch({ type: 'randomize-all' })}>
          {t('Randomize all')}
        </button>
      </div>
    </>
  )
}

export const Inspector = ({ document, selectedId, overflowingBlockIds, dispatch }: InspectorProps) => {
  const { t } = useT()
  const index = document.blocks.findIndex((b) => b.id === selectedId)
  const block = document.blocks[index]
  const definition = block && getBlockDefinition(block.type)

  if (!block || !definition) {
    return (
      <aside className="inspector">
        <DocumentSettingsPanel document={document} dispatch={dispatch} />
      </aside>
    )
  }

  const { Settings } = definition
  const inheritLabel = t('inherit-difficulty', {
    difficulty: t(DIFFICULTY_LABEL_KEYS[document.settings.difficulty])
  })
  return (
    <aside className="inspector">
      <h2>
        <span aria-hidden="true">{definition.icon}</span> {t(definition.titleKey)}
      </h2>
      {overflowingBlockIds.includes(block.id) && <p className="warning">{t('does-not-fit')}</p>}
      {definition.hasDifficulty && (
        <SelectField<BlockDifficulty>
          label={t('difficulty')}
          options={[
            { value: 'inherit', label: inheritLabel },
            ...DIFFICULTIES.map((d) => ({ value: d, label: t(DIFFICULTY_LABEL_KEYS[d]) }))
          ]}
          value={block.difficulty}
          onChange={(difficulty) =>
            dispatch({ type: 'set-block-difficulty', id: block.id, difficulty })
          }
        />
      )}
      {Settings && (
        <Settings
          config={block.config}
          onChange={(config: unknown) => dispatch({ type: 'configure', id: block.id, config })}
        />
      )}
      <div className="actions">
        {definition.kind !== 'page-break' && (
          <button type="button" onClick={() => dispatch({ type: 'randomize', id: block.id })}>
            {t('Randomize')}
          </button>
        )}
        <button
          type="button"
          disabled={index === 0}
          onClick={() => dispatch({ type: 'move', id: block.id, index: index - 1 })}
        >
          {t('Move up')}
        </button>
        <button
          type="button"
          disabled={index === document.blocks.length - 1}
          onClick={() => dispatch({ type: 'move', id: block.id, index: index + 1 })}
        >
          {t('Move down')}
        </button>
        <button type="button" onClick={() => dispatch({ type: 'duplicate', id: block.id })}>
          {t('Duplicate')}
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => dispatch({ type: 'remove', id: block.id })}
        >
          {t('Delete')}
        </button>
      </div>
    </aside>
  )
}
