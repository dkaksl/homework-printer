import { useT } from '../../i18n/useT'
import { Difficulty } from '../../difficulty'
import { getRowString } from '../../util'
import { NoteConfig, NoteFields, SelectField } from '../controls'
import { defineBlock, SettingsProps } from '../types'
import { fullPageUnits, NoteBox, rowStyle } from './common'

interface Columns {
  leftColumn: string
  rightColumn: string
}

const ABC_COLUMNS: Columns = {
  leftColumn: 'ABCDEFGHIJKLMNOPQRST',
  rightColumn: 'UVWXYZÅÄÖ0123456789?'
}

const ZHUYIN_COLUMNS: Columns = {
  leftColumn: 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖ ',
  rightColumn: 'ㄗㄘㄙ⼀ㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ'
}

/** Harder levels repeat each letter pair more times per row. */
const PAIRS_PER_ROW: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3, advanced: 4 }

interface LetterRow {
  left: string
  right: string
}

const letterRows = (columns: Columns): LetterRow[] =>
  (getRowString(columns).match(/.{2}/gu) ?? []).map((pair) => {
    const [left, right] = Array.from(pair)
    return { left, right }
  })

interface LetterSheet {
  rows: LetterRow[]
  pairs: number
}

const LetterTable = ({ sheet, className }: { sheet: LetterSheet; className: string }) => (
  <table className={`sheet-table letters-table ${className}`}>
    <tbody>
      {sheet.rows.map((row, i) => (
        <tr key={i} style={rowStyle}>
          {Array.from({ length: sheet.pairs }).flatMap((_, p) => [
            <td key={`${p}-l`}>{row.left}</td>,
            <td key={`${p}-lb`} />,
            <td key={`${p}-r`}>{row.right}</td>,
            <td key={`${p}-rb`} />
          ])}
        </tr>
      ))}
    </tbody>
  </table>
)

interface AbcConfig extends NoteConfig {
  case: 'upper' | 'lower'
}

const AbcSettings = ({ config, onChange }: SettingsProps<AbcConfig>) => {
  const { t } = useT()
  return (
    <>
      <SelectField
        label={t('uppercase') + ' / ' + t('lowercase')}
        options={[
          { value: 'upper', label: t('uppercase') },
          { value: 'lower', label: t('lowercase') }
        ]}
        value={config.case}
        onChange={(value) => onChange({ ...config, case: value })}
      />
      <NoteFields config={config} onChange={onChange} />
    </>
  )
}

const lowercase = (columns: Columns): Columns => ({
  leftColumn: columns.leftColumn.toLocaleLowerCase(),
  rightColumn: columns.rightColumn.toLocaleLowerCase()
})

export const abcsBlock = defineBlock<AbcConfig, LetterSheet>({
  type: 'abcs',
  kind: 'full-page',
  titleKey: 'ABCs',
  icon: '🔤',
  hasDifficulty: true,
  defaultConfig: () => ({ case: 'upper', withNote: false, note: '' }),
  sampleConfigs: () => [{ case: 'lower', withNote: true, note: 'x\n'.repeat(20) }],
  generate: (config, { difficulty }) => ({
    rows: letterRows(config.case === 'upper' ? ABC_COLUMNS : lowercase(ABC_COLUMNS)),
    pairs: PAIRS_PER_ROW[difficulty]
  }),
  problemCount: () => 0,
  layout: (config, sheet) =>
    fullPageUnits([sheet], (s) => (
      <>
        <LetterTable sheet={s} className={config.case === 'lower' ? 'handwriting' : ''} />
        <NoteBox config={config} />
      </>
    )),
  Settings: AbcSettings
})

const ZhuyinSettings = ({ config, onChange }: SettingsProps<NoteConfig>) => (
  <NoteFields config={config} onChange={onChange} />
)

export const zhuyinBlock = defineBlock<NoteConfig, LetterSheet>({
  type: 'zhuyin',
  kind: 'full-page',
  titleKey: 'Zhuyin',
  icon: 'ㄅ',
  hasDifficulty: true,
  defaultConfig: () => ({ withNote: false, note: '' }),
  sampleConfigs: () => [{ withNote: true, note: 'x\n'.repeat(20) }],
  generate: (_config, { difficulty }) => ({
    rows: letterRows(ZHUYIN_COLUMNS),
    pairs: PAIRS_PER_ROW[difficulty]
  }),
  problemCount: () => 0,
  layout: (config, sheet) =>
    fullPageUnits([sheet], (s) => (
      <>
        <LetterTable sheet={s} className="bopomo" />
        <NoteBox config={config} />
      </>
    )),
  Settings: ZhuyinSettings
})
