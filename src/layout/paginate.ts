import {
  HeaderPlacement,
  LaidOutBlock,
  LayoutUnit,
  Page,
  pageCapacityMm,
  Pagination
} from './page'

const heightWithKeptUnits = (units: LayoutUnit[], index: number) => {
  let height = units[index].heightMm
  let i = index
  while (units[i].keepWithNext && i + 1 < units.length) {
    i++
    height += units[i].heightMm
  }
  return height
}

export const paginate = (
  blocks: LaidOutBlock[],
  headerPlacement: HeaderPlacement
): Pagination => {
  const pages: Page[] = []
  const used = new Map<Page, number>()
  const overflowing = new Set<string>()

  const openPage = () => {
    const header =
      headerPlacement === 'every-page' ||
      (headerPlacement === 'first-page' && pages.length === 0)
    const page: Page = { header, units: [] }
    pages.push(page)
    used.set(page, 0)
    return page
  }
  let page = openPage()
  const remaining = () => pageCapacityMm(page) - (used.get(page) ?? 0)
  const hasContent = () => page.units.some((u) => u.unit.heightMm > 0)
  const startNewPage = () => {
    if (hasContent()) page = openPage()
  }
  const place = (blockId: string, unit: LayoutUnit) => {
    if (unit.heightMm > remaining()) overflowing.add(blockId)
    page.units.push({ blockId, unit })
    used.set(page, (used.get(page) ?? 0) + unit.heightMm)
  }

  let breakPending = false
  for (const block of blocks) {
    if (block.kind === 'page-break') {
      block.units.forEach((marker) => place(block.blockId, marker))
      breakPending = true
      continue
    }
    if (block.kind === 'full-page') {
      for (const unit of block.units) {
        startNewPage()
        place(block.blockId, unit)
      }
      breakPending = true
      continue
    }
    for (let i = 0; i < block.units.length; i++) {
      if (breakPending || heightWithKeptUnits(block.units, i) > remaining()) {
        startNewPage()
        breakPending = false
      }
      place(block.blockId, block.units[i])
    }
  }

  return { pages, overflowingBlockIds: Array.from(overflowing) }
}
