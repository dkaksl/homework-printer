import i18n from 'i18next'
import { renderToStaticMarkup } from 'react-dom/server'
import { DIFFICULTIES } from '../difficulty'
import '../i18n/config'
import { FULL_PAGE_BODY_HEIGHT_MM } from '../layout/page'
import { createRng } from '../util/random'
import { BLOCKS } from './registry'
import { AnyBlockDefinition, Translate } from './types'

const LANGUAGES = ['en', 'se', 'cn']
const SEEDS = Array.from({ length: 15 }, (_, i) => i + 1)

const translatorFor = (lang: string): Translate => {
  const t = i18n.getFixedT(lang)
  return (key, options) => String(options ? t(key, options) : t(key))
}

const difficultiesOf = (definition: AnyBlockDefinition) =>
  definition.hasDifficulty ? DIFFICULTIES : (['medium'] as const)

const cases = BLOCKS.flatMap((definition) =>
  difficultiesOf(definition).flatMap((difficulty) =>
    definition.sampleConfigs().map((config, i) => [definition.type, difficulty, i, definition, config] as const)
  )
)

const layOut = (definition: AnyBlockDefinition, config: unknown, difficulty: typeof DIFFICULTIES[number], seed: number, lang: string) => {
  const t = translatorFor(lang)
  const data = definition.generate(config, { difficulty, rng: createRng(seed), t, lang })
  return { data, units: definition.layout(config, data, { sectionNumber: 1, firstProblemNumber: 1, t }) }
}

const fitsOnPage = (definition: AnyBlockDefinition, heightMm: number) => {
  switch (definition.kind) {
    case 'full-page':
      return heightMm === FULL_PAGE_BODY_HEIGHT_MM
    case 'page-break':
      return heightMm === 0
    case 'flow':
      return heightMm > 0 && heightMm <= FULL_PAGE_BODY_HEIGHT_MM
  }
}

/** A full-page block makes exactly one unit per page it's set to print. */
const expectedUnitCount = (definition: AnyBlockDefinition, config: unknown, actual: number) =>
  definition.kind === 'full-page' ? (config as { pageCount?: number }).pageCount ?? 1 : actual

describe('every block type fits on an A4 page', () => {
  test.each(cases)('%s at %s, sample settings #%i', (_type, difficulty, _i, definition, config) => {
    for (const lang of LANGUAGES) {
      for (const seed of SEEDS) {
        const { units } = layOut(definition, config, difficulty, seed, lang)
        const misfits = units.filter((unit) => !fitsOnPage(definition, unit.heightMm))
        expect(misfits.map((u) => `${u.key}: ${u.heightMm}mm`)).toEqual([])
        expect(units).toHaveLength(expectedUnitCount(definition, config, units.length))
      }
      const { units } = layOut(definition, config, difficulty, 1, lang)
      for (const unit of units) {
        expect(() =>
          renderToStaticMarkup(<>{unit.render({ showAnswers: true, mode: 'editor' })}</>)
        ).not.toThrow()
      }
    }
  })

  test.each(BLOCKS.map((b) => [b.type, b] as const))(
    '%s generates the same problems from the same seed',
    (_type, definition) => {
      const config = definition.sampleConfigs()[0]
      const first = layOut(definition, config, 'hard', 42, 'en').data
      const second = layOut(definition, config, 'hard', 42, 'en').data
      expect(second).toEqual(first)
    }
  )
})
