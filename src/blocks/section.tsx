import { LayoutUnit } from '../layout/page'

export const SECTION_HEADING_HEIGHT_MM = 16

export const sectionHeadingUnit = (
  key: string,
  title: string,
  instruction: string
): LayoutUnit => ({
  key,
  heightMm: SECTION_HEADING_HEIGHT_MM,
  keepWithNext: true,
  render: () => (
    <div className="section-heading">
      <h2>{title}</h2>
      <p>{instruction}</p>
    </div>
  )
})
