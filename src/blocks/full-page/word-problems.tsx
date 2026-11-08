import { useT } from '../../i18n/useT'
import { FULL_PAGE_BODY_HEIGHT_MM } from '../../layout/page'
import { generateWordProblems, Operator, WordProblem } from '../../util/wordProblems'
import { CheckboxGroup, NumberField } from '../controls'
import { defineBlock, SettingsProps, Translate } from '../types'
import { fullPageUnits, MAX_PAGES, PageCountField, pagesOf } from './common'

interface WordProblemsConfig {
  operators: Operator[]
  pageCount: number
  problemsPerPage: number
}

const OPERATORS: Operator[] = ['+', '-']
const MIN_PER_PAGE = 2
export const MAX_PER_PAGE = 8
const CARD_GAP_MM = 3
const SHAPES = 6
const COLOURS = 6
const BORDERS = 3

/** Stories span both columns, so they're capped to keep the page's row count within what fits. */
const maxStories = (problemsPerPage: number) => Math.floor(problemsPerPage / 2)

export const gridRows = (problems: WordProblem[]) => {
  const stories = problems.filter((p) => p.isStory).length
  return stories + Math.ceil((problems.length - stories) / 2)
}

const Card = ({
  problem,
  index,
  showAnswers,
  t
}: {
  problem: WordProblem
  index: number
  showAnswers: boolean
  t: Translate
}) => {
  const classes = [
    'wp-card',
    problem.isStory ? 'wp-card-wide' : '',
    `wp-s${index % SHAPES}`,
    `wp-c${(index + 2) % COLOURS}`,
    `wp-b${index % BORDERS}`
  ]
  return (
    <div className={classes.filter(Boolean).join(' ')} data-fit>
      <p className="wp-text">
        <span className="wp-num">{index + 1}</span>
        <span className="wp-emoji" aria-hidden="true">
          {problem.emoji}
        </span>
        {problem.text}
      </p>
      {problem.comparison ? (
        <div className="wp-cmp-answer">
          <span className="wp-cmp-val">{problem.comparison.labelA}</span>
          <span className={`wp-cmp-box ${showAnswers ? 'answer' : ''}`}>
            {showAnswers ? problem.answer : ''}
          </span>
          <span className="wp-cmp-val">{problem.comparison.labelB}</span>
        </div>
      ) : (
        <>
          <p className="wp-answer">
            {problem.answerHint ?? t('Answer')}: _______________{' '}
            {showAnswers && <span className="answer">{problem.answer}</span>}
          </p>
          <div className="wp-work-area" />
        </>
      )}
    </div>
  )
}

const Settings = ({ config, onChange }: SettingsProps<WordProblemsConfig>) => {
  const { t } = useT()
  return (
    <>
      <PageCountField value={config.pageCount} onChange={(pageCount) => onChange({ ...config, pageCount })} />
      <NumberField
        label={t('Problems per page')}
        min={MIN_PER_PAGE}
        max={MAX_PER_PAGE}
        value={config.problemsPerPage}
        onChange={(problemsPerPage) => onChange({ ...config, problemsPerPage })}
      />
      <CheckboxGroup
        label={t('Included Operators')}
        options={OPERATORS.map((op) => ({ value: op, label: op }))}
        selected={config.operators}
        onChange={(operators) => onChange({ ...config, operators })}
      />
    </>
  )
}

export const wordProblemsBlock = defineBlock<WordProblemsConfig, WordProblem[][]>({
  type: 'word-problems',
  kind: 'full-page',
  titleKey: 'Word Problems',
  icon: '📖',
  hasDifficulty: true,
  defaultConfig: () => ({ operators: ['+'], pageCount: 1, problemsPerPage: 6 }),
  sampleConfigs: () => [
    { operators: ['+', '-'], pageCount: MAX_PAGES, problemsPerPage: MAX_PER_PAGE },
    { operators: ['+', '-'], pageCount: 1, problemsPerPage: MAX_PER_PAGE - 1 },
    { operators: ['-'], pageCount: 1, problemsPerPage: MIN_PER_PAGE }
  ],
  generate: (config, { rng, t, lang, difficulty }) =>
    pagesOf(config.pageCount, () =>
      generateWordProblems(rng, t, lang, {
        count: config.problemsPerPage,
        operators: config.operators.length > 0 ? config.operators : ['+'],
        difficulty,
        maxStories: maxStories(config.problemsPerPage)
      })
    ),
  problemCount: () => 0,
  layout: (_config, pages, { t }) =>
    fullPageUnits(pages, (problems, { showAnswers }) => {
      const rows = gridRows(problems)
      return (
        <div
          className={`wp-grid ${rows >= 5 ? 'wp-dense' : ''}`}
          style={{
            height: `${FULL_PAGE_BODY_HEIGHT_MM}mm`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${CARD_GAP_MM}mm`
          }}
        >
          {problems.map((problem, i) => (
            <Card key={i} problem={problem} index={i} showAnswers={showAnswers} t={t} />
          ))}
        </div>
      )
    }),
  Settings
})
