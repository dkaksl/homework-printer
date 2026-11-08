import { expect, Locator, Page, test } from '@playwright/test'

const blockTypes = (page: Page) =>
  page.evaluate(() =>
    (JSON.parse(localStorage.getItem('homework-printer.document') ?? '{"blocks":[]}').blocks as { type: string }[]).map(
      (b) => b.type
    )
  )

/** Drags from the source's centre to just inside the top edge of the target. */
const dragOnto = async (page: Page, source: Locator, target: Locator) => {
  await target.scrollIntoViewIfNeeded()
  const from = await source.boundingBox()
  const to = await target.boundingBox()
  if (!from || !to) throw new Error('drag source or target is not visible')
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2)
  await page.mouse.down()
  await page.mouse.move(from.x + from.width / 2 + 20, from.y + from.height / 2 + 20, { steps: 5 })
  await page.mouse.move(to.x + to.width / 2, to.y + 4, { steps: 10 })
  await page.mouse.up()
}

test('blocks dragged from the palette land where they are dropped, and sections can be reordered', async ({ page }) => {
  // Tall enough that both pages are on screen at the default zoom, so the mouse can reach them.
  await page.setViewportSize({ width: 1600, height: 2200 })
  await page.goto('/')
  const palette = page.locator('.palette')
  const preview = page.getByTestId('preview')
  const pages = preview.locator('[data-page]')

  await palette.getByRole('button', { name: /Column arithmetic/ }).click()
  await palette.getByRole('button', { name: /Column arithmetic/ }).click()
  expect(await blockTypes(page)).toEqual(['uppstallning', 'uppstallning'])
  await expect(pages).toHaveCount(1)

  const secondHeading = preview.locator('[data-unit="heading"]').nth(1)
  await dragOnto(page, palette.getByRole('button', { name: /Page break/ }), secondHeading)
  expect(await blockTypes(page)).toEqual(['uppstallning', 'page-break', 'uppstallning'])
  await expect(pages).toHaveCount(2)
  await expect(pages.nth(1)).toContainText('2. Column arithmetic – addition')

  const movedHeading = pages.nth(1).locator('[data-unit="heading"]')
  const firstHeading = pages.nth(0).locator('[data-unit="heading"]')
  await dragOnto(page, movedHeading, firstHeading)
  expect(await blockTypes(page)).toEqual(['uppstallning', 'uppstallning', 'page-break'])
  await expect(pages).toHaveCount(1)
})
