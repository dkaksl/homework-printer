import { useT } from '../i18n/useT'
import { LayoutUnit } from '../layout/page'
import {
  BACKWARDS_OPERATORS,
  BackwardsOperator,
  BackwardsProblem,
  finalAmount,
  generateBackwardsProblem
} from '../problems/backwards'
import { pick, Rng, shuffle } from '../util/random'
import { CheckboxGroup, NumberField } from './controls'
import { sectionHeadingUnit } from './section'
import { operatorSymbol } from './uppstallning'
import { defineBlock, SettingsProps, Translate } from './types'

export interface BackwardsConfig {
  operators: BackwardsOperator[]
  count: number
}

export interface BackwardsWordProblem {
  problem: BackwardsProblem
  text: string
}

export const MAX_PROBLEMS = 3

const TOP_PADDING_MM = 3
export const TEXT_LINE_MM = 6
const WORK_GAP_MM = 2
const ANSWER_ROW_MM = 9
const BOTTOM_GAP_MM = 4
/** Room to undo each step, plus a line for the answer sentence. */
const workAreaMm = (steps: number) => 8 + steps * 6

/**
 * The text column is about 170mm at 14px: roughly 90 Latin characters or 45
 * CJK characters a line. Counting CJK as two and allowing 76 per line leaves
 * room for word wrapping, so the declared height always holds the text.
 */
const UNITS_PER_LINE = 76
const isWide = (char: string) => (char.codePointAt(0) ?? 0) >= 0x2e80

export const textLines = (text: string) => {
  const units = Array.from(text).reduce((sum, char) => sum + (isWide(char) ? 2 : 1), 0)
  return Math.max(1, Math.ceil(units / UNITS_PER_LINE))
}

export const problemHeightMm = ({ problem, text }: BackwardsWordProblem) =>
  TOP_PADDING_MM +
  textLines(text) * TEXT_LINE_MM +
  WORK_GAP_MM +
  workAreaMm(problem.steps.length) +
  ANSWER_ROW_MM +
  BOTTOM_GAP_MM

/** Distinct names from the language's list, the main character first. */
const castOf = (rng: Rng, t: Translate, size: number) => {
  const names = shuffle(rng, t('wp-names').split('|'))
  return Array.from({ length: size }, (_, i) => names[i % names.length])
}

export const problemText = (problem: BackwardsProblem, rng: Rng, t: Translate, lang: string) => {
  const [name, ...others] = castOf(rng, t, problem.steps.length + 1)
  const item = pick(rng, t('wp-items').split('|'))
  const connectives = t('wb-then').split('|')
  const steps = problem.steps.map((step, i) =>
    t(`wb-step-${step.operator}`, {
      then: connectives[i % connectives.length],
      name,
      other: others[i],
      n: step.amount,
      item
    })
  )
  // Chinese sentences run on without spaces.
  const separator = lang === 'cn' ? '' : ' '
  return [
    t('wb-intro', { name, item }),
    ...steps,
    t('wb-end', { name, item, final: finalAmount(problem) })
  ].join(separator)
}

const ProblemView = ({
  data,
  number,
  showAnswers,
  t
}: {
  data: BackwardsWordProblem
  number: number
  showAnswers: boolean
  t: Translate
}) => (
  <div className="wb-problem" style={{ paddingTop: `${TOP_PADDING_MM}mm` }}>
    <span className="problem-number">{number})</span>
    <p
      className="wb-text"
      data-fit
      style={{ height: `${textLines(data.text) * TEXT_LINE_MM}mm`, lineHeight: `${TEXT_LINE_MM}mm` }}
    >
      {data.text}
    </p>
    <div
      className="wb-work-area"
      style={{ marginTop: `${WORK_GAP_MM}mm`, height: `${workAreaMm(data.problem.steps.length)}mm` }}
    />
    <p className="wb-answer" style={{ height: `${ANSWER_ROW_MM}mm` }}>
      {t('Answer')}: _______________{' '}
      {showAnswers && <span className="answer">{data.problem.start}</span>}
    </p>
  </div>
)

const selectedOperators = (config: BackwardsConfig): BackwardsOperator[] =>
  config.operators.length > 0 ? config.operators : ['+', '-']

const Settings = ({ config, onChange }: SettingsProps<BackwardsConfig>) => {
  const { t } = useT()
  return (
    <>
      <CheckboxGroup
        label={t('Included Operators')}
        options={BACKWARDS_OPERATORS.map((op) => ({ value: op, label: operatorSymbol(op) }))}
        selected={config.operators}
        onChange={(operators) => onChange({ ...config, operators })}
      />
      <NumberField
        label={t('Problems')}
        min={1}
        max={MAX_PROBLEMS}
        value={config.count}
        onChange={(count) => onChange({ ...config, count })}
      />
    </>
  )
}

export const backwardsBlock = defineBlock<BackwardsConfig, BackwardsWordProblem[]>({
  type: 'work-backwards',
  kind: 'flow',
  titleKey: 'Work Backwards',
  icon: '⏪',
  hasDifficulty: true,
  defaultConfig: () => ({ operators: ['+', '-'], count: 1 }),
  sampleConfigs: () => [
    { operators: [...BACKWARDS_OPERATORS], count: MAX_PROBLEMS },
    { operators: ['÷'], count: MAX_PROBLEMS },
    { operators: ['×'], count: 1 }
  ],
  generate: (config, { rng, difficulty, t, lang }) =>
    Array.from({ length: config.count }, () => {
      const problem = generateBackwardsProblem(rng, difficulty, selectedOperators(config))
      return { problem, text: problemText(problem, rng, t, lang) }
    }),
  problemCount: (problems) => problems.length,
  layout: (_config, problems, { sectionNumber, firstProblemNumber, t }) => {
    const heading = sectionHeadingUnit(
      'heading',
      `${sectionNumber}. ${t('Work Backwards')}`,
      t('backwards-instruction')
    )
    const units: LayoutUnit[] = problems.map((data, i) => ({
      key: `problem-${i}`,
      heightMm: problemHeightMm(data),
      render: ({ showAnswers }) => (
        <ProblemView data={data} number={firstProblemNumber + i} showAnswers={showAnswers} t={t} />
      )
    }))
    return [heading, ...units]
  },
  Settings
})
