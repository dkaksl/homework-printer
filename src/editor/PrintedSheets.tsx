import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getBlockDefinition } from '../blocks/registry'
import { Translate } from '../blocks/types'
import { layoutDocument } from '../document/layout'
import {
  deleteAllPrints,
  deletePrint,
  loadPrintHistory,
  PRINT_HISTORY_DAYS,
  printLabel,
  PrintedSheet
} from '../document/printHistory'
import { useT } from '../i18n/useT'
import { PrintPages } from './SheetPage'

const sectionSummary = (entry: PrintedSheet, t: Translate) =>
  entry.document.blocks
    .flatMap((b) => {
      const definition = getBlockDefinition(b.type)
      return definition && definition.kind !== 'page-break' ? [t(definition.titleKey)] : []
    })
    .join(', ')

/** Rebuilt in the language it was printed in, so word problems read exactly as they did on paper. */
const AnswerKey = ({ entry }: { entry: PrintedSheet }) => {
  const { i18n } = useTranslation()
  const pagination = useMemo(() => {
    const fixed = i18n.getFixedT(entry.lang)
    const t: Translate = (key, options) => String(options ? fixed(key, options) : fixed(key))
    return layoutDocument(entry.document, t, entry.lang)
  }, [entry, i18n])
  return (
    <div className="printed-pages" data-testid="answer-key">
      <PrintPages pages={pagination.pages} label={printLabel(entry)} showAnswers />
    </div>
  )
}

export const PrintedSheets = () => {
  const { t } = useT()
  const [entries, setEntries] = useState(() => loadPrintHistory().entries)
  const [openNumber, setOpenNumber] = useState<number | null>(entries[0]?.number ?? null)
  const open = entries.find((e) => e.number === openNumber)

  const remove = (number: number) => {
    deletePrint(number)
    setEntries(loadPrintHistory().entries)
  }

  const removeAll = () => {
    if (!window.confirm(t('delete-all-confirm'))) return
    deleteAllPrints()
    setEntries([])
  }

  return (
    <div className="printed-sheets">
      <aside className="printed-list">
        <h2>{t('Printed sheets')}</h2>
        <p className="hint">{t('printed-sheets-hint', { days: PRINT_HISTORY_DAYS })}</p>
        {entries.length === 0 ? (
          <p className="hint">{t('printed-sheets-empty')}</p>
        ) : (
          <>
            <ul>
              {entries.map((entry) => (
                <li
                  key={entry.number}
                  className={entry.number === openNumber ? 'selected' : ''}
                  aria-label={printLabel(entry)}
                >
                  <strong>{printLabel(entry)}</strong>
                  <span className="printed-summary">{sectionSummary(entry, t)}</span>
                  <div className="actions">
                    <button type="button" onClick={() => setOpenNumber(entry.number)}>
                      {t('Open')}
                    </button>
                    <button type="button" className="danger" onClick={() => remove(entry.number)}>
                      {t('Delete')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button type="button" className="danger" onClick={removeAll}>
              {t('Delete all')}
            </button>
          </>
        )}
      </aside>
      <section className="printed-preview" aria-label={t('Answer key')}>
        {open ? (
          <AnswerKey key={open.number} entry={open} />
        ) : (
          entries.length > 0 && <p className="empty-hint">{t('printed-sheets-pick')}</p>
        )}
      </section>
    </div>
  )
}
