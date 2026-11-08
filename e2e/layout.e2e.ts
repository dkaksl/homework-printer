import { expect, Page, test } from '@playwright/test'

const STORAGE_KEY = 'homework-printer.document'
const LANGUAGES = ['en', 'se', 'cn']
const DIFFICULTIES = ['medium', 'advanced']
const SEEDS = [1, 2, 3]
const MM_TO_PX = 96 / 25.4
const TOLERANCE_MM = 0.5

/** Every block type with the settings that take the most space. */
const fullestDocument = (difficulty: string, seed: number) => {
  const block = (type: string, config: unknown, i: number) => ({
    id: `${type}-${i}`,
    type,
    config,
    difficulty: 'inherit',
    seed: seed * 100 + i
  })
  const note = { withNote: true, note: 'Lorem ipsum dolor sit amet\n'.repeat(12) }
  return {
    version: 1,
    settings: { difficulty, header: 'every-page' },
    blocks: [
      block('uppstallning', { operators: ['+', '-', '×', '÷'], count: 12 }, 0),
      block('uppstallning', { operators: ['×'], count: 12 }, 1),
      block('page-break', {}, 2),
      block('uppstallning', { operators: ['÷'], count: 5 }, 3),
      block('work-backwards', { operators: ['+', '-', '×', '÷'], count: 3 }, 12),
      block('work-backwards', { operators: ['÷'], count: 3 }, 13),
      block('maths', { operators: ['+', '-'], pageCount: 1, ...note }, 4),
      block('abcs', { case: 'lower', ...note }, 5),
      block('zhuyin', note, 6),
      block('nouns', { options: ['singular-obestämd', 'singular-bestämd', 'singular-possessiv', 'plural-obestämd', 'plural-bestämd'], pageCount: 2, ...note }, 7),
      block('verbs', { options: ['nutid', 'dåtid', 'dåtid tidsuttryck'], pageCount: 2, ...note }, 8),
      block('word-problems', { operators: ['+', '-'], pageCount: 4, problemsPerPage: 8 }, 9),
      block('word-problems', { operators: ['+', '-'], pageCount: 2, problemsPerPage: 7 }, 10),
      block('word-problems', { operators: ['-'], pageCount: 1, problemsPerPage: 2 }, 11)
    ]
  }
}

const openDocument = async (page: Page, document: unknown, lang: string) => {
  await page.addInitScript(
    ([key, value]) => {
      window.localStorage.setItem(key, value)
      window.localStorage.setItem('homework-printer.zoom', '1')
    },
    [STORAGE_KEY, JSON.stringify(document)]
  )
  await page.goto('/')
  if (lang !== 'en') {
    await page.getByRole('button', { name: 'Select language' }).click()
    await page.getByRole('button', { name: lang, exact: true }).click()
  }
  await page.locator('[data-testid="preview"] [data-page]').first().waitFor()
}

/** Finds everything on the preview pages whose rendering doesn't match the layout model. */
const layoutProblems = (page: Page) =>
  page.evaluate(
    ({ mmToPx, toleranceMm }) => {
      const problems: string[] = []
      const preview = document.querySelector('[data-testid="preview"]')
      if (!preview) return ['no preview']
      const describe = (el: Element) =>
        `${el.closest('[data-block]')?.getAttribute('data-block') ?? '?'}:${el.closest('[data-unit]')?.getAttribute('data-unit') ?? el.className}`

      preview.querySelectorAll<HTMLElement>('[data-page]').forEach((pageEl, p) => {
        const pageRect = pageEl.getBoundingClientRect()
        if (Math.abs(pageRect.height - 297 * mmToPx) > toleranceMm * mmToPx) {
          problems.push(`page ${p + 1} is ${pageRect.height / mmToPx}mm tall`)
        }
        const contentBottom = pageRect.bottom - 15 * mmToPx
        pageEl.querySelectorAll<HTMLElement>('[data-unit]').forEach((unitEl) => {
          const declared = Number(unitEl.dataset.heightMm)
          const rect = unitEl.getBoundingClientRect()
          if (Math.abs(rect.height / mmToPx - declared) > toleranceMm) {
            problems.push(`${describe(unitEl)} renders ${(rect.height / mmToPx).toFixed(1)}mm, declares ${declared}mm`)
          }
          if (rect.bottom > contentBottom + toleranceMm * mmToPx) {
            problems.push(`${describe(unitEl)} runs into the bottom margin of page ${p + 1}`)
          }
        })
      })

      const clipped = preview.querySelectorAll<HTMLElement>(
        '[data-unit]:not([data-height-mm="0"]), [data-fit], .section-heading h2, .section-heading p, .sheet-table td'
      )
      clipped.forEach((el) => {
        if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) {
          problems.push(`${describe(el)} clips its content (${el.className || el.tagName}: "${el.textContent?.slice(0, 40)}")`)
        }
      })
      return problems
    },
    { mmToPx: MM_TO_PX, toleranceMm: TOLERANCE_MM }
  )

for (const lang of LANGUAGES) {
  for (const difficulty of DIFFICULTIES) {
    for (const seed of SEEDS) {
      test(`the preview matches the layout model (${lang}, ${difficulty}, seed ${seed})`, async ({ page }) => {
        await openDocument(page, fullestDocument(difficulty, seed), lang)
        expect(await layoutProblems(page)).toEqual([])
      })
    }
  }
}
