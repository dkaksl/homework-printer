import { ChangeEvent, Component } from 'react'
import Printable from './printable'
import WordProblemSheet from './sheets/word-problem-sheet'
import { generateWordProblems, WordProblem } from '../util/wordProblems'
import { Difficulty } from '../views/main'
import { Checkbox } from './checkbox'
import { withTranslation, WithTranslation } from 'react-i18next'

type Operator = '+' | '-'

type Props = WithTranslation

interface State {
  difficulty: Difficulty
  plus: boolean
  minus: boolean
  pageCount: number
  problemsPerPage: number
  pages: WordProblem[][]
}

class WordProblems extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const difficulty: Difficulty = 'easy'
    const pageCount = 1
    const problemsPerPage = 6
    this.state = {
      difficulty,
      plus: true,
      minus: false,
      pageCount,
      problemsPerPage,
      pages: this.buildPages(difficulty, ['+'], pageCount, problemsPerPage)
    }
    this.difficultyHandler = this.difficultyHandler.bind(this)
    this.pageCountHandler = this.pageCountHandler.bind(this)
    this.problemsPerPageHandler = this.problemsPerPageHandler.bind(this)
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.i18n.language !== this.props.i18n.language) {
      this.refresh()
    }
  }

  buildPages(
    difficulty: Difficulty,
    operators: Operator[],
    pageCount: number,
    problemsPerPage: number
  ): WordProblem[][] {
    const pages = []
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        generateWordProblems(this.props.t, problemsPerPage, operators, difficulty)
      )
    }
    return pages
  }

  getOperators(): Operator[] {
    const ops: Operator[] = []
    if (this.state.plus) ops.push('+')
    if (this.state.minus) ops.push('-')
    return ops.length > 0 ? ops : ['+']
  }

  refresh() {
    const { difficulty, pageCount, problemsPerPage } = this.state
    this.setState({
      pages: this.buildPages(
        difficulty,
        this.getOperators(),
        pageCount,
        problemsPerPage
      )
    })
  }

  difficultyHandler(event: ChangeEvent<HTMLSelectElement>) {
    this.setState(
      { difficulty: event.target.value as Difficulty },
      () => this.refresh()
    )
  }

  pageCountHandler(event: ChangeEvent<HTMLInputElement>) {
    this.setState(
      { pageCount: parseInt(event.target.value) },
      () => this.refresh()
    )
  }

  problemsPerPageHandler(event: ChangeEvent<HTMLInputElement>) {
    this.setState(
      { problemsPerPage: parseInt(event.target.value) },
      () => this.refresh()
    )
  }

  togglePlus = () => {
    this.setState({ plus: !this.state.plus }, () => this.refresh())
  }

  toggleMinus = () => {
    this.setState({ minus: !this.state.minus }, () => this.refresh())
  }

  render() {
    const { t } = this.props
    return (
      <div>
        <section className="form-parent">
          <form className="form">
            <label htmlFor="wp-difficulty">{t('difficulty')}</label>
            <select
              id="wp-difficulty"
              value={this.state.difficulty}
              onChange={this.difficultyHandler}
            >
              <option value="easy">{t('Easy')}</option>
              <option value="medium">{t('Medium')}</option>
              <option value="hard">{t('Hard')}</option>
              <option value="advanced">{t('Advanced')}</option>
            </select>

            <label htmlFor="wp-page-count">{t('Pages')}</label>
            <input
              id="wp-page-count"
              type="number"
              min="1"
              value={this.state.pageCount}
              onChange={this.pageCountHandler}
            />

            <label htmlFor="wp-problems-per-page">{t('Problems')}</label>
            <input
              id="wp-problems-per-page"
              type="number"
              min="2"
              max="12"
              value={this.state.problemsPerPage}
              onChange={this.problemsPerPageHandler}
            />

            <label htmlFor="wp-operators">{t('Included Operators')}</label>
            <div id="wp-operators">
              <Checkbox
                defaultChecked={true}
                name="wp-plus"
                label="+"
                toggle={this.togglePlus}
              />
              <Checkbox
                defaultChecked={false}
                name="wp-minus"
                label="-"
                toggle={this.toggleMinus}
              />
            </div>

            <button type="button" onClick={() => this.refresh()}>
              {t('Randomize')}
            </button>
          </form>
        </section>

        <Printable>
          {this.state.pages.map((page, idx) => (
            <div key={idx}>
              <div className="page-break" />
              <WordProblemSheet problems={page} />
            </div>
          ))}
        </Printable>
      </div>
    )
  }
}

export default withTranslation()(WordProblems)
