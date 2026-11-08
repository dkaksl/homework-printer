import { useT } from '../i18n/useT'
import { CONTENT_WIDTH_MM, LayoutUnit } from '../layout/page'
import {
  answerColumn,
  COLUMN_OPERATORS,
  ColumnOperator,
  ColumnProblem,
  digitCount,
  generateColumnProblems
} from '../problems/column'
import { CheckboxGroup, NumberField } from './controls'
import { sectionHeadingUnit } from './section'
import { defineBlock, SettingsProps, Translate } from './types'

export interface UppstallningConfig {
  operators: ColumnOperator[]
  count: number
}

export const CELL_MM = 7
const CARRY_ROW_MM = 4.5
const PROBLEM_PADDING_MM = 4
const ROW_GAP_MM = 4
const PER_ROW = 3
export const SLOT_WIDTH_MM = CONTENT_WIDTH_MM / PER_ROW
export const MAX_PROBLEMS = 12
export const NUMBER_GUTTER_MM = 14

type LineKind = 'carry' | 'number' | 'answer' | 'work'

interface Line {
  kind: LineKind
  cells: string[]
  answerCells?: string[]
  ruleAbove?: boolean
}

interface Shape {
  columns: number
  /** ÷ only: the divisor sits right of a vertical bar in this column. */
  divisorColumn?: number
  lines: Line[]
}

const rightAligned = (value: number | string, width: number) => {
  const text = String(value)
  return [...Array(Math.max(0, width - text.length)).fill(''), ...text.split('')]
}

const blank = (width: number) => Array(width).fill('')

/** Typographic minus, as on printed worksheets; the problem data keeps the ASCII operator. */
export const operatorSymbol = (operator: ColumnOperator) => (operator === '-' ? '−' : operator)

const lineHeight = (line: Line) => (line.kind === 'carry' ? CARRY_ROW_MM : CELL_MM)

/**
 * + − ×: a carry row, the numbers with the operator in the leftmost column,
 * then the answer under a rule (× by two digits gets a row per partial product).
 * ÷ uses "liggande stolen": the quotient above a rule over the dividend, the
 * divisor to the right of a bar, and two rows for working.
 */
export const problemShape = (problem: ColumnProblem): Shape => {
  const { operator, operands } = problem
  const answer = answerColumn(problem)

  if (operator === '÷') {
    const [dividend, divisor] = operands
    const width = digitCount(dividend)
    const remainder = answer.remainder > 0 ? `r${answer.remainder}` : ''
    return {
      columns: width + 1,
      divisorColumn: width,
      lines: [
        {
          kind: 'answer',
          cells: blank(width + 1),
          answerCells: [...rightAligned(answer.value, width), remainder]
        },
        { kind: 'number', cells: [...rightAligned(dividend, width), String(divisor)], ruleAbove: true },
        { kind: 'work', cells: blank(width + 1) },
        { kind: 'work', cells: blank(width + 1) }
      ]
    }
  }

  const [a, b] = operands
  const partials = operator === '×' && digitCount(b) > 1
    ? String(b).split('').reverse().map((d, i) => a * Number(d) * 10 ** i)
    : []
  const width = Math.max(...[...operands, answer.value, ...partials].map(digitCount))
  const columns = width + 1
  const numberLines: Line[] = operands.map((n, i) => ({
    kind: 'number',
    cells: [i === operands.length - 1 ? operatorSymbol(operator) : '', ...rightAligned(n, width)]
  }))
  const partialLines: Line[] = partials.map((p, i) => ({
    kind: 'answer',
    cells: blank(columns),
    answerCells: ['', ...rightAligned(p, width)],
    ruleAbove: i === 0
  }))
  return {
    columns,
    lines: [
      { kind: 'carry', cells: blank(columns) },
      ...numberLines,
      ...partialLines,
      {
        kind: 'answer',
        cells: blank(columns),
        answerCells: ['', ...rightAligned(answer.value, width)],
        ruleAbove: true
      }
    ]
  }
}

export const problemHeightMm = (problem: ColumnProblem) =>
  PROBLEM_PADDING_MM + problemShape(problem).lines.reduce((h, l) => h + lineHeight(l), 0)

export const problemWidthMm = (problem: ColumnProblem) => problemShape(problem).columns * CELL_MM

const ColumnProblemView = ({
  problem,
  number,
  showAnswers
}: {
  problem: ColumnProblem
  number: number
  showAnswers: boolean
}) => {
  const shape = problemShape(problem)
  return (
    <div
      className="column-problem"
      style={{ width: `${SLOT_WIDTH_MM}mm`, paddingLeft: `${NUMBER_GUTTER_MM}mm` }}
    >
      <span className="problem-number">{number})</span>
      <div
        className="column-grid"
        style={{ gridTemplateColumns: `repeat(${shape.columns}, ${CELL_MM}mm)` }}
      >
        {shape.lines.flatMap((line, row) =>
          line.cells.map((cell, col) => {
            const answer = showAnswers ? line.answerCells?.[col] : undefined
            const classes = [
              'cell',
              `cell-${line.kind}`,
              line.ruleAbove ? 'rule-above' : '',
              col === shape.divisorColumn && line.kind === 'number' ? 'divisor' : '',
              answer ? 'answer' : ''
            ]
            return (
              <span
                key={`${row}-${col}`}
                className={classes.filter(Boolean).join(' ')}
                style={{ height: `${lineHeight(line)}mm` }}
              >
                {answer || cell}
              </span>
            )
          })
        )}
      </div>
    </div>
  )
}

const chunk = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
    items.slice(i * size, i * size + size)
  )

const sectionTitle = (t: Translate, number: number, operators: ColumnOperator[]) => {
  const title = t('Column Arithmetic')
  return operators.length === 1
    ? `${number}. ${title} – ${t(`op-${operators[0]}`)}`
    : `${number}. ${title}`
}

const Settings = ({ config, onChange }: SettingsProps<UppstallningConfig>) => {
  const { t } = useT()
  return (
    <>
      <CheckboxGroup
        label={t('Included Operators')}
        options={COLUMN_OPERATORS.map((op) => ({ value: op, label: operatorSymbol(op) }))}
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

const selectedOperators = (config: UppstallningConfig): ColumnOperator[] =>
  config.operators.length > 0 ? config.operators : ['+']

export const uppstallningBlock = defineBlock<UppstallningConfig, ColumnProblem[]>({
  type: 'uppstallning',
  kind: 'flow',
  titleKey: 'Column Arithmetic',
  icon: '🧮',
  hasDifficulty: true,
  defaultConfig: () => ({ operators: ['+'], count: 6 }),
  sampleConfigs: () => [
    ...COLUMN_OPERATORS.map((op) => ({ operators: [op], count: MAX_PROBLEMS })),
    { operators: [...COLUMN_OPERATORS], count: MAX_PROBLEMS },
    { operators: ['+'], count: 1 }
  ],
  generate: (config, { rng, difficulty }) =>
    generateColumnProblems(rng, config.count, selectedOperators(config), difficulty),
  problemCount: (problems) => problems.length,
  layout: (config, problems, { sectionNumber, firstProblemNumber, t }) => {
    const heading = sectionHeadingUnit(
      'heading',
      sectionTitle(t, sectionNumber, selectedOperators(config)),
      t('column-instruction')
    )
    const rows: LayoutUnit[] = chunk(problems, PER_ROW).map((row, r) => ({
      key: `row-${r}`,
      heightMm: Math.max(...row.map(problemHeightMm)) + ROW_GAP_MM,
      render: ({ showAnswers }) => (
        <div className="column-row">
          {row.map((problem, i) => (
            <ColumnProblemView
              key={i}
              problem={problem}
              number={firstProblemNumber + r * PER_ROW + i}
              showAnswers={showAnswers}
            />
          ))}
        </div>
      )
    }))
    return [heading, ...rows]
  },
  Settings
})
