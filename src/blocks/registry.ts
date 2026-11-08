import { backwardsBlock } from './backwards'
import { abcsBlock, zhuyinBlock } from './full-page/letters'
import { mathsBlock } from './full-page/maths'
import { wordProblemsBlock } from './full-page/word-problems'
import { nounsBlock, verbsBlock } from './full-page/words'
import { pageBreakBlock } from './page-break'
import { AnyBlockDefinition } from './types'
import { uppstallningBlock } from './uppstallning'

/** Palette order. New block types only need to be added here to be covered by the layout contract tests. */
export const BLOCKS: AnyBlockDefinition[] = [
  uppstallningBlock,
  backwardsBlock,
  pageBreakBlock,
  mathsBlock,
  abcsBlock,
  zhuyinBlock,
  nounsBlock,
  verbsBlock,
  wordProblemsBlock
]

const BY_TYPE = new Map(BLOCKS.map((b) => [b.type, b]))

export const getBlockDefinition = (type: string): AnyBlockDefinition | undefined =>
  BY_TYPE.get(type)
