import { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { WordProblem } from '../../util/wordProblems'

interface Props extends WithTranslation {
  problems: WordProblem[]
}

const SHAPES = 6
const COLOURS = 6
const BORDERS = 3

class WordProblemSheet extends Component<Props> {
  render() {
    const { t, problems } = this.props
    return (
      <div className="page word-problem-sheet">
        <div className="wp-grid">
          {problems.map((problem, i) => (
            <div
              key={i}
              className={[
                'wp-card',
                `wp-s${i % SHAPES}`,
                `wp-c${(i + 2) % COLOURS}`,
                `wp-b${i % BORDERS}`
              ].join(' ')}
            >
              <div className="wp-card-top">
                <span className="wp-num">{i + 1}</span>
                <span className="wp-emoji" role="img" aria-hidden="true">
                  {problem.emoji}
                </span>
              </div>
              <p className="wp-text">{problem.text}</p>
              {problem.comparison ? (
                <div className="wp-cmp-answer">
                  <span className="wp-cmp-val">{problem.comparison.labelA}</span>
                  <span className="wp-cmp-box" />
                  <span className="wp-cmp-val">{problem.comparison.labelB}</span>
                </div>
              ) : (
                <>
                  <p className="wp-answer">
                    {problem.answerHint ?? t<string>('Answer')}: _______________
                  </p>
                  <div className="wp-work-area" />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="wp-meta">
          <span>{t<string>('Name')}: ________________________</span>
          <span>{t<string>('Date')}: ________________________</span>
        </div>
      </div>
    )
  }
}

export default withTranslation()(WordProblemSheet)
