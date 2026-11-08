import { getBlockDefinition } from '../blocks/registry'
import { Translate } from '../blocks/types'
import { LaidOutBlock, Pagination } from '../layout/page'
import { paginate } from '../layout/paginate'
import { createRng } from '../util/random'
import { effectiveDifficulty, WorksheetDocument } from './types'

export const layoutBlocks = (
  document: WorksheetDocument,
  t: Translate,
  lang: string
): LaidOutBlock[] => {
  let sectionNumber = 1
  let firstProblemNumber = 1
  return document.blocks.flatMap((block) => {
    const definition = getBlockDefinition(block.type)
    if (!definition) return []
    const data = definition.generate(block.config, {
      difficulty: effectiveDifficulty(block, document.settings),
      rng: createRng(block.seed),
      t,
      lang
    })
    const units = definition.layout(block.config, data, { sectionNumber, firstProblemNumber, t })
    if (definition.kind === 'flow') {
      sectionNumber++
      firstProblemNumber += definition.problemCount(data)
    }
    return [{ blockId: block.id, kind: definition.kind, units }]
  })
}

export const layoutDocument = (
  document: WorksheetDocument,
  t: Translate,
  lang: string
): Pagination => paginate(layoutBlocks(document, t, lang), document.settings.header)
