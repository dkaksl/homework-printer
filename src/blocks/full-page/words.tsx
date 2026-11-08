import { useT } from '../../i18n/useT'
import {
  getRandomNounOutOfOptions,
  getRandomVerbOutOfOptions,
  SubstantivAlternativ,
  VerbAlternativ
} from '../../util/svenska'
import { Rng } from '../../util/random'
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

interface WordsConfig<Option extends string> extends NoteConfig {
  options: Option[]
  pageCount: number
}

const WordTable = ({ rows }: { rows: string[] }) => (
  <table className="sheet-table words-table">
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} style={rowStyle}>
          <td className="handwriting">{row}</td>
          <td />
        </tr>
      ))}
    </tbody>
  </table>
)

const defineWordsBlock = <Option extends string>({
  type,
  titleKey,
  icon,
  optionsLabelKey,
  allOptions,
  randomWord
}: {
  type: string
  titleKey: string
  icon: string
  optionsLabelKey: string
  allOptions: Option[]
  randomWord: (options: Option[], rng: Rng) => string
}) => {
  const Settings = ({ config, onChange }: SettingsProps<WordsConfig<Option>>) => {
    const { t } = useT()
    return (
      <>
        <PageCountField
          value={config.pageCount}
          onChange={(pageCount) => onChange({ ...config, pageCount })}
        />
        <CheckboxGroup
          label={t(optionsLabelKey)}
          options={allOptions.map((o) => ({ value: o, label: o.replaceAll('-', ' ') }))}
          selected={config.options}
          onChange={(options) => onChange({ ...config, options })}
        />
        <NoteFields config={config} onChange={onChange} />
      </>
    )
  }

  return defineBlock<WordsConfig<Option>, string[][]>({
    type,
    kind: 'full-page',
    titleKey,
    icon,
    hasDifficulty: false,
    defaultConfig: () => ({ options: [allOptions[0]], pageCount: 1, withNote: false, note: '' }),
    sampleConfigs: () => [
      { options: allOptions, pageCount: MAX_PAGES, withNote: true, note: 'x\n'.repeat(20) }
    ],
    generate: (config, { rng }) => {
      const options = config.options.length > 0 ? config.options : [allOptions[0]]
      return pagesOf(config.pageCount, () =>
        Array.from({ length: SHEET_ROWS }, () => randomWord(options, rng))
      )
    },
    problemCount: () => 0,
    layout: (config, pages) =>
      fullPageUnits(pages, (rows) => (
        <>
          <WordTable rows={rows} />
          <NoteBox config={config} />
        </>
      )),
    Settings
  })
}

export const nounsBlock = defineWordsBlock({
  type: 'nouns',
  titleKey: 'Nouns',
  icon: '🏠',
  optionsLabelKey: 'Included Declensions',
  allOptions: Object.values(SubstantivAlternativ),
  randomWord: getRandomNounOutOfOptions
})

export const verbsBlock = defineWordsBlock({
  type: 'verbs',
  titleKey: 'Verbs',
  icon: '🏃',
  optionsLabelKey: 'Tenses',
  allOptions: Object.values(VerbAlternativ),
  randomWord: getRandomVerbOutOfOptions
})
