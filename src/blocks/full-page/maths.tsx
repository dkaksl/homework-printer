import { useT } from '../../i18n/useT'
import {
  answerHorizontal,
  generateHorizontalPage,
  HorizontalOperator,
  HorizontalProblem
} from '../../problems/horizontal'
import { CheckboxGroup, NoteConfig, NoteFields } from '../controls'
import { defineBlock, SettingsProps } from '../types'
import {
  fullPageUnits,
  MAX_PAGES,
  NoteBox,
  PageCountField,
  pagesOf,
  rowStyle,
  SHEET_ROWS
} from './common'

interface MathsConfig extends NoteConfig {
  operators: HorizontalOperator[]
  pageCount: number
}

const OPERATORS: HorizontalOperator[] = ['+', '-']

const Settings = ({ config, onChange }: SettingsProps<MathsConfig>) => {
  const { t } = useT()
  return (
    <>
      <PageCountField value={config.pageCount} onChange={(pageCount) => onChange({ ...config, pageCount })} />
      <CheckboxGroup
        label={t('Included Operators')}
        options={OPERATORS.map((op) => ({ value: op, label: op }))}
        selected={config.operators}
        onChange={(operators) => onChange({ ...config, operators })}
      />
      <NoteFields config={config} onChange={onChange} />
    </>
  )
}

export const mathsBlock = defineBlock<MathsConfig, HorizontalProblem[][]>({
  type: 'maths',
  kind: 'full-page',
  titleKey: 'Maths',
  icon: '➕',
  hasDifficulty: true,
  defaultConfig: () => ({ operators: ['+'], pageCount: 1, withNote: false, note: '' }),
  sampleConfigs: () => [
    { operators: ['+', '-'], pageCount: MAX_PAGES, withNote: true, note: 'x\n'.repeat(20) }
  ],
  generate: (config, { rng, difficulty }) =>
    pagesOf(config.pageCount, () =>
      generateHorizontalPage(
        rng,
        SHEET_ROWS,
        difficulty,
        config.operators.length > 0 ? config.operators : ['+']
      )
    ),
  problemCount: () => 0,
  layout: (config, pages) =>
    fullPageUnits(pages, (rows, { showAnswers }) => (
      <>
        <table className="sheet-table maths-table">
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={rowStyle}>
                <td>{row.a}</td>
                <td>{row.operator}</td>
                <td>{row.b}</td>
                <td>=</td>
                <td className={showAnswers ? 'answer' : ''}>
                  {showAnswers ? answerHorizontal(row) : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <NoteBox config={config} />
      </>
    )),
  Settings
})
