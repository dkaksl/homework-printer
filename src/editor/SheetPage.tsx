import { ReactNode } from 'react'
import { useT } from '../i18n/useT'
import { HEADER_HEIGHT_MM, Page, PlacedUnit, RenderOptions } from '../layout/page'

export const SheetHeader = () => {
  const { t } = useT()
  return (
    <div className="sheet-header" style={{ height: `${HEADER_HEIGHT_MM}mm` }}>
      <span>{t('Name')}: ______________________________</span>
      <span>{t('Date')}: ________________</span>
    </div>
  )
}

export const UnitBox = ({ placed, children }: { placed: PlacedUnit; children: ReactNode }) => (
  <div
    className="unit"
    data-unit={placed.unit.key}
    data-block={placed.blockId}
    data-height-mm={placed.unit.heightMm}
    style={{ height: `${placed.unit.heightMm}mm` }}
  >
    {children}
  </div>
)

export const SheetPage = ({
  page,
  options,
  wrapUnit = (placed, content) => <UnitBox placed={placed}>{content}</UnitBox>,
  children
}: {
  page: Page
  options: RenderOptions
  wrapUnit?: (placed: PlacedUnit, content: ReactNode) => ReactNode
  children?: ReactNode
}) => (
  <div className="sheet-page" data-page>
    {page.header && <SheetHeader />}
    {page.units.map((placed) => (
      <PageUnit key={`${placed.blockId}:${placed.unit.key}`} placed={placed} options={options} wrap={wrapUnit} />
    ))}
    {children}
  </div>
)

const PageUnit = ({
  placed,
  options,
  wrap
}: {
  placed: PlacedUnit
  options: RenderOptions
  wrap: (placed: PlacedUnit, content: ReactNode) => ReactNode
}) => <>{wrap(placed, placed.unit.render(options))}</>

export const PrintPages = ({ pages }: { pages: Page[] }) => (
  <div className="print-pages">
    {pages.map((page, i) => (
      <SheetPage key={i} page={page} options={{ showAnswers: false, mode: 'print' }} />
    ))}
  </div>
)
