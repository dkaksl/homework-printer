import { paginate } from './paginate'
import {
  CONTENT_HEIGHT_MM,
  FULL_PAGE_BODY_HEIGHT_MM,
  HEADER_HEIGHT_MM,
  LaidOutBlock,
  LayoutUnit
} from './page'

const unit = (key: string, heightMm: number, keepWithNext = false): LayoutUnit => ({
  key,
  heightMm,
  keepWithNext,
  render: () => null
})

const flow = (blockId: string, ...units: LayoutUnit[]): LaidOutBlock => ({
  blockId,
  kind: 'flow',
  units
})

const fullPage = (blockId: string, pages: number): LaidOutBlock => ({
  blockId,
  kind: 'full-page',
  units: Array.from({ length: pages }, (_, i) => unit(`${blockId}-p${i}`, FULL_PAGE_BODY_HEIGHT_MM))
})

const pageBreak = (blockId: string): LaidOutBlock => ({
  blockId,
  kind: 'page-break',
  units: [unit(blockId, 0)]
})

const keysPerPage = (blocks: LaidOutBlock[], header = 'first-page' as const) =>
  paginate(blocks, header).pages.map((p) => p.units.map((u) => u.unit.key))

const FIRST_PAGE = CONTENT_HEIGHT_MM - HEADER_HEIGHT_MM

describe('paginate', () => {
  test('an empty document is one page with the header', () => {
    const { pages } = paginate([], 'first-page')
    expect(pages).toEqual([{ header: true, units: [] }])
  })

  test('content continues on the next page when a page is full', () => {
    const blocks = [
      flow('a', unit('a1', FIRST_PAGE - 10), unit('a2', 20)),
      flow('b', unit('b1', 30))
    ]
    expect(keysPerPage(blocks)).toEqual([['a1'], ['a2', 'b1']])
  })

  test('the header only takes space on the first page by default', () => {
    const blocks = [flow('a', unit('a1', FIRST_PAGE), unit('a2', CONTENT_HEIGHT_MM))]
    const { pages, overflowingBlockIds } = paginate(blocks, 'first-page')
    expect(pages.map((p) => p.header)).toEqual([true, false])
    expect(overflowingBlockIds).toEqual([])
  })

  test('a heading is never left alone at the bottom of a page', () => {
    const blocks = [
      flow('a', unit('a1', FIRST_PAGE - 15)),
      flow('b', unit('b-heading', 10, true), unit('b1', 20))
    ]
    expect(keysPerPage(blocks)).toEqual([['a1'], ['b-heading', 'b1']])
  })

  test('a page break starts the next block on a new page, without blank pages', () => {
    const blocks = [
      pageBreak('leading'),
      flow('a', unit('a1', 10)),
      pageBreak('x'),
      pageBreak('y'),
      flow('b', unit('b1', 10)),
      pageBreak('trailing')
    ]
    expect(keysPerPage(blocks)).toEqual([
      ['leading', 'a1', 'x', 'y'],
      ['b1', 'trailing']
    ])
  })

  test('full-page blocks take whole pages and the next block starts on a fresh page', () => {
    const blocks = [flow('a', unit('a1', 10)), fullPage('sheet', 2), flow('b', unit('b1', 10))]
    expect(keysPerPage(blocks)).toEqual([['a1'], ['sheet-p0'], ['sheet-p1'], ['b1']])
  })

  test('a full-page block fits under the header on every page', () => {
    const { overflowingBlockIds } = paginate([fullPage('sheet', 3)], 'every-page')
    expect(overflowingBlockIds).toEqual([])
  })

  test('a unit taller than a page is reported instead of silently overflowing', () => {
    const blocks = [flow('ok', unit('ok1', 10)), flow('huge', unit('huge1', CONTENT_HEIGHT_MM + 1))]
    expect(paginate(blocks, 'none').overflowingBlockIds).toEqual(['huge'])
  })
})
