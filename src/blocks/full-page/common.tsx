import { ReactNode } from 'react'
import { useT } from '../../i18n/useT'
import { FULL_PAGE_BODY_HEIGHT_MM, LayoutUnit, RenderOptions } from '../../layout/page'
import { NoteConfig, NumberField } from '../controls'

export const MAX_PAGES = 10
export const SHEET_ROW_MM = 11
export const SHEET_ROWS = 20
const NOTE_HEIGHT_MM = 28

export const fullPageUnits = <Page,>(
  pages: Page[],
  render: (page: Page, options: RenderOptions) => ReactNode
): LayoutUnit[] =>
  pages.map((page, i) => ({
    key: `page-${i}`,
    heightMm: FULL_PAGE_BODY_HEIGHT_MM,
    render: (options) => <div className="full-page-sheet">{render(page, options)}</div>
  }))

export const NoteBox = ({ config }: { config: NoteConfig }) =>
  config.withNote ? (
    <div className="note-box" style={{ height: `${NOTE_HEIGHT_MM}mm` }}>
      {config.note}
    </div>
  ) : null

export const rowStyle = { height: `${SHEET_ROW_MM}mm` }

export const PageCountField = ({
  value,
  onChange
}: {
  value: number
  onChange: (pageCount: number) => void
}) => {
  const { t } = useT()
  return <NumberField label={t('Pages')} min={1} max={MAX_PAGES} value={value} onChange={onChange} />
}

export const pagesOf = <T,>(pageCount: number, generatePage: () => T): T[] =>
  Array.from({ length: pageCount }, generatePage)
