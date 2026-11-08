import { ReactNode } from 'react'

export const PAGE_WIDTH_MM = 210
export const PAGE_HEIGHT_MM = 297
export const PAGE_MARGIN_MM = 15
export const CONTENT_WIDTH_MM = PAGE_WIDTH_MM - 2 * PAGE_MARGIN_MM
export const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - 2 * PAGE_MARGIN_MM
export const HEADER_HEIGHT_MM = 14
/** Full-page blocks use this height on every page, so they fit whether or not the page has a header. */
export const FULL_PAGE_BODY_HEIGHT_MM = CONTENT_HEIGHT_MM - HEADER_HEIGHT_MM

export const MM_PER_PX = 25.4 / 96

export type HeaderPlacement = 'first-page' | 'every-page' | 'none'

export interface RenderOptions {
  showAnswers: boolean
  /** Editor-only marks (page break markers, answers) never reach the printout. */
  mode: 'editor' | 'print'
}

/**
 * The smallest piece of a block the paginator places: a section heading, a
 * row of problems, one page of a full-page sheet, or a zero-height page break
 * marker. The DOM renders each unit at exactly heightMm, so pagination never
 * depends on measuring the browser.
 */
export interface LayoutUnit {
  key: string
  heightMm: number
  keepWithNext?: boolean
  render: (options: RenderOptions) => ReactNode
}

export type BlockKind = 'flow' | 'full-page' | 'page-break'

export interface LaidOutBlock {
  blockId: string
  kind: BlockKind
  units: LayoutUnit[]
}

export interface PlacedUnit {
  blockId: string
  unit: LayoutUnit
}

export interface Page {
  header: boolean
  units: PlacedUnit[]
}

export interface Pagination {
  pages: Page[]
  /** Blocks with a unit taller than the space a page has for it. */
  overflowingBlockIds: string[]
}

export const pageCapacityMm = (page: Pick<Page, 'header'>) =>
  CONTENT_HEIGHT_MM - (page.header ? HEADER_HEIGHT_MM : 0)
