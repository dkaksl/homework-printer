import { Fragment } from 'react'
import { useT } from '../i18n/useT'
import { LayoutUnit } from '../layout/page'
import { BACKWARDS_OPERATORS } from '../problems/backwards'
import { generatePuzzle, PicturePuzzle, PuzzleOperator } from '../problems/pictures'
import { Rng, shuffle } from '../util/random'
import { CheckboxGroup, NumberField } from './controls'
import { sectionHeadingUnit } from './section'
import { defineBlock, SettingsProps, Translate } from './types'
import { operatorSymbol } from './uppstallning'

export interface PicturePuzzleConfig {
  operators: PuzzleOperator[]
  count: number
}

export interface PicturePuzzleData {
  puzzle: PicturePuzzle
  /** The drawing for each of the puzzle's pictures, by picture index. */
  drawings: Drawing[]
}

export const MAX_PUZZLES = 3

const TOP_PADDING_MM = 3
const EQUATION_ROW_MM = 11
const ANSWER_GAP_MM = 3
const ANSWER_ROW_MM = 12
const BOTTOM_GAP_MM = 4
const PICTURE_MM = 8

export const puzzleHeightMm = ({ puzzle }: PicturePuzzleData) =>
  TOP_PADDING_MM + puzzle.equations.length * EQUATION_ROW_MM + ANSWER_GAP_MM + ANSWER_ROW_MM + BOTTOM_GAP_MM

/**
 * Black outlines on white with the odd solid detail, so every picture stays
 * clear on a black-and-white printer, where colour emoji turn into grey blobs.
 */
const DRAWINGS = {
  star: <polygon points="12,2 14.9,8.6 22,9.3 16.6,14 18.2,21 12,17.3 5.8,21 7.4,14 2,9.3 9.1,8.6" />,
  heart: (
    <path d="M12 21C5 15.5 2 12 2 8.2 2 5.3 4.3 3 7 3c2 0 3.9 1.1 5 3 1.1-1.9 3-3 5-3 2.7 0 5 2.3 5 5.2 0 3.8-3 7.3-10 12.8z" />
  ),
  moon: <path d="M15 2.5A9.8 9.8 0 1 0 21.5 17 8 8 0 0 1 15 2.5z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line key={angle} x1="12" y1="4.5" x2="12" y2="1.5" transform={`rotate(${angle} 12 12)`} />
      ))}
    </>
  ),
  flower: (
    <>
      {[0, 72, 144, 216, 288].map((angle) => (
        <circle key={angle} cx="12" cy="6.5" r="4" transform={`rotate(${angle} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2.8" fill="currentColor" />
    </>
  ),
  fish: (
    <>
      <polygon points="15,12 22.5,6.5 22.5,17.5" />
      <ellipse cx="10" cy="12" rx="8" ry="5.5" />
      <circle cx="6.5" cy="10.5" r="1.2" fill="currentColor" />
    </>
  ),
  drop: <path d="M12 2.5S5 10.8 5 15.3a7 7 0 0 0 14 0C19 10.8 12 2.5 12 2.5z" />
}

export type Drawing = keyof typeof DRAWINGS
const ALL_DRAWINGS = Object.keys(DRAWINGS) as Drawing[]

const drawingsFor = (rng: Rng, count: number) => shuffle(rng, ALL_DRAWINGS).slice(0, count)

const Picture = ({ drawing }: { drawing: Drawing }) => (
  <svg
    className="pp-picture"
    viewBox="0 0 24 24"
    width={`${PICTURE_MM}mm`}
    height={`${PICTURE_MM}mm`}
    fill="#fff"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
    strokeLinecap="round"
    aria-label={drawing}
    role="img"
  >
    {DRAWINGS[drawing]}
  </svg>
)

const PuzzleView = ({
  data,
  number,
  showAnswers
}: {
  data: PicturePuzzleData
  number: number
  showAnswers: boolean
}) => {
  const { puzzle, drawings } = data
  return (
    <div className="pp-puzzle" style={{ paddingTop: `${TOP_PADDING_MM}mm` }}>
      <span className="problem-number">{number})</span>
      {puzzle.equations.map((equation, i) => (
        <div key={i} className="pp-row" style={{ height: `${EQUATION_ROW_MM}mm` }}>
          {equation.pictures.map((picture, j) => (
            <Fragment key={j}>
              {j > 0 && <span className="pp-symbol">{operatorSymbol(equation.operators[j - 1])}</span>}
              <Picture drawing={drawings[picture]} />
            </Fragment>
          ))}
          <span className="pp-symbol">=</span>
          <span className="pp-result">{equation.result}</span>
        </div>
      ))}
      <div className="pp-row pp-answers" style={{ marginTop: `${ANSWER_GAP_MM}mm`, height: `${ANSWER_ROW_MM}mm` }}>
        {drawings.map((drawing, picture) => (
          <span key={drawing} className="pp-answer">
            <Picture drawing={drawing} />
            <span className="pp-symbol">=</span>
            <span className="pp-blank">
              {showAnswers && <span className="answer">{puzzle.values[picture]}</span>}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

const selectedOperators = (config: PicturePuzzleConfig): PuzzleOperator[] =>
  config.operators.length > 0 ? config.operators : ['+', '-']

const Settings = ({ config, onChange }: SettingsProps<PicturePuzzleConfig>) => {
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
        max={MAX_PUZZLES}
        value={config.count}
        onChange={(count) => onChange({ ...config, count })}
      />
    </>
  )
}

const headingUnit = (sectionNumber: number, t: Translate) =>
  sectionHeadingUnit('heading', `${sectionNumber}. ${t('Picture Puzzle')}`, t('picture-puzzle-instruction'))

export const picturePuzzleBlock = defineBlock<PicturePuzzleConfig, PicturePuzzleData[]>({
  type: 'picture-puzzle',
  kind: 'flow',
  titleKey: 'Picture Puzzle',
  icon: '🧩',
  hasDifficulty: true,
  defaultConfig: () => ({ operators: ['+', '-'], count: 1 }),
  sampleConfigs: () => [
    { operators: [...BACKWARDS_OPERATORS], count: MAX_PUZZLES },
    { operators: ['÷'], count: MAX_PUZZLES },
    { operators: ['-'], count: 1 }
  ],
  generate: (config, { rng, difficulty }) =>
    Array.from({ length: config.count }, () => {
      const puzzle = generatePuzzle(rng, difficulty, selectedOperators(config))
      return { puzzle, drawings: drawingsFor(rng, puzzle.values.length) }
    }),
  problemCount: (puzzles) => puzzles.length,
  layout: (_config, puzzles, { sectionNumber, firstProblemNumber, t }) => {
    const units: LayoutUnit[] = puzzles.map((data, i) => ({
      key: `puzzle-${i}`,
      heightMm: puzzleHeightMm(data),
      render: ({ showAnswers }) => (
        <PuzzleView data={data} number={firstProblemNumber + i} showAnswers={showAnswers} />
      )
    }))
    return [headingUnit(sectionNumber, t), ...units]
  },
  Settings
})
