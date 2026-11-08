import { useT } from '../i18n/useT'
import { LayoutUnit } from '../layout/page'
import { generatePyramid, NumberPyramid } from '../problems/pyramid'
import { NumberField } from './controls'
import { sectionHeadingUnit } from './section'
import { defineBlock, SettingsProps } from './types'

export interface NumberPyramidConfig {
  count: number
}

export const MAX_PYRAMIDS = 4

const TOP_PADDING_MM = 3
const BOX_WIDTH_MM = 16
const BOX_HEIGHT_MM = 10
const BOTTOM_GAP_MM = 5

export const pyramidHeightMm = (pyramid: NumberPyramid) =>
  TOP_PADDING_MM + pyramid.values.length * BOX_HEIGHT_MM + BOTTOM_GAP_MM

const PyramidView = ({
  pyramid,
  number,
  showAnswers
}: {
  pyramid: NumberPyramid
  number: number
  showAnswers: boolean
}) => {
  const rows = pyramid.values.length
  return (
    <div className="np-problem" style={{ paddingTop: `${TOP_PADDING_MM}mm` }}>
      <span className="problem-number">{number})</span>
      <div
        className="np-pyramid"
        style={{ width: `${rows * BOX_WIDTH_MM}mm`, height: `${rows * BOX_HEIGHT_MM}mm` }}
      >
        {pyramid.values.map((row, r) =>
          row.map((value, c) => (
            <span
              key={`${r}-${c}`}
              className="np-box"
              style={{
                left: `${((rows - 1 - r) / 2 + c) * BOX_WIDTH_MM}mm`,
                top: `${r * BOX_HEIGHT_MM}mm`,
                width: `${BOX_WIDTH_MM}mm`,
                height: `${BOX_HEIGHT_MM}mm`
              }}
            >
              {pyramid.given[r][c] ? value : showAnswers && <span className="answer">{value}</span>}
            </span>
          ))
        )}
      </div>
      <div className="np-work-area" style={{ height: `${rows * BOX_HEIGHT_MM}mm` }} />
    </div>
  )
}

const Settings = ({ config, onChange }: SettingsProps<NumberPyramidConfig>) => {
  const { t } = useT()
  return (
    <NumberField
      label={t('Problems')}
      min={1}
      max={MAX_PYRAMIDS}
      value={config.count}
      onChange={(count) => onChange({ ...config, count })}
    />
  )
}

export const numberPyramidBlock = defineBlock<NumberPyramidConfig, NumberPyramid[]>({
  type: 'number-pyramid',
  kind: 'flow',
  titleKey: 'Number Pyramid',
  icon: '🔺',
  hasDifficulty: true,
  defaultConfig: () => ({ count: 2 }),
  sampleConfigs: () => [{ count: MAX_PYRAMIDS }, { count: 1 }],
  generate: (config, { rng, difficulty }) =>
    Array.from({ length: config.count }, () => generatePyramid(rng, difficulty)),
  problemCount: (pyramids) => pyramids.length,
  layout: (_config, pyramids, { sectionNumber, firstProblemNumber, t }) => {
    const heading = sectionHeadingUnit(
      'heading',
      `${sectionNumber}. ${t('Number Pyramid')}`,
      t('number-pyramid-instruction')
    )
    const units: LayoutUnit[] = pyramids.map((pyramid, i) => ({
      key: `pyramid-${i}`,
      heightMm: pyramidHeightMm(pyramid),
      render: ({ showAnswers }) => (
        <PyramidView pyramid={pyramid} number={firstProblemNumber + i} showAnswers={showAnswers} />
      )
    }))
    return [heading, ...units]
  },
  Settings
})
