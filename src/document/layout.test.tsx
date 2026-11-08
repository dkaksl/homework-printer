import i18n from 'i18next'
import { renderToStaticMarkup } from 'react-dom/server'
import '../i18n/config'
import { Translate } from '../blocks/types'
import { layoutDocument } from './layout'
import { documentReducer } from './store'
import { emptyDocument, WorksheetDocument } from './types'

const t: Translate = (key, options) => {
  const en = i18n.getFixedT('en')
  return String(options ? en(key, options) : en(key))
}

const build = (...steps: Parameters<typeof documentReducer>[1][]) =>
  steps.reduce(documentReducer, emptyDocument())

const textOf = (doc: WorksheetDocument) =>
  layoutDocument(doc, t, 'en').pages.map((page) =>
    page.units
      .map((u) => renderToStaticMarkup(<>{u.unit.render({ showAnswers: false, mode: 'print' })}</>))
      .join('|')
  )

describe('laying out a document', () => {
  // The two column sections of the reference worksheet (two additions, two
  // subtractions), then a page break, a full-page maths sheet and one more section.
  const reference = build(
    { type: 'set-difficulty', difficulty: 'advanced' },
    { type: 'add', blockType: 'uppstallning', id: 'add', seed: 1 },
    { type: 'configure', id: 'add', config: { operators: ['+'], count: 2 } },
    { type: 'add', blockType: 'uppstallning', id: 'sub', seed: 2 },
    { type: 'configure', id: 'sub', config: { operators: ['-'], count: 2 } },
    { type: 'add', blockType: 'page-break', id: 'break', seed: 3 },
    { type: 'add', blockType: 'maths', id: 'maths', seed: 4 },
    { type: 'add', blockType: 'uppstallning', id: 'mul', seed: 5 },
    { type: 'configure', id: 'mul', config: { operators: ['×'], count: 3 } }
  )

  test('places sections, page breaks and full-page sheets on the expected pages', () => {
    const { pages, overflowingBlockIds } = layoutDocument(reference, t, 'en')
    expect(pages.map((p) => ({ header: p.header, units: p.units.map((u) => `${u.blockId}:${u.unit.key}`) }))).toEqual([
      {
        header: true,
        units: ['add:heading', 'add:row-0', 'sub:heading', 'sub:row-0', 'break:marker']
      },
      { header: false, units: ['maths:page-0'] },
      { header: false, units: ['mul:heading', 'mul:row-0'] }
    ])
    expect(overflowingBlockIds).toEqual([])
  })

  test('numbers sections and problems across the whole document', () => {
    const [first, , last] = textOf(reference)
    expect(first).toContain('1. Column arithmetic – addition')
    expect(first).toContain('2. Column arithmetic – subtraction')
    expect(first).toMatch(/3\).*4\)/)
    expect(last).toContain('3. Column arithmetic – multiplication')
    expect(last).toMatch(/5\).*6\).*7\)/)
  })

  test('the page break marker and answers stay out of the printout', () => {
    const printed = textOf(reference).join('')
    expect(printed).not.toContain('Page break')
    expect(printed).not.toContain('class="answer')
  })

  test('a long section continues on the next page one row at a time', () => {
    const doc = build(
      { type: 'set-difficulty', difficulty: 'advanced' },
      ...Array.from({ length: 4 }, (_, i) => [
        { type: 'add' as const, blockType: 'uppstallning', id: `s${i}`, seed: i },
        { type: 'configure' as const, id: `s${i}`, config: { operators: ['×'], count: 12 } }
      ]).flat()
    )
    const { pages, overflowingBlockIds } = layoutDocument(doc, t, 'en')
    expect(pages.length).toBeGreaterThan(1)
    expect(overflowingBlockIds).toEqual([])
    pages.forEach((page) => {
      const last = page.units[page.units.length - 1]
      expect(last.unit.key).not.toBe('heading')
    })
  })
})
