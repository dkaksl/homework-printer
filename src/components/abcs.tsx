import { Component } from 'react'
import Printable from './printable'
import ABCSheet from './abc-sheet'
import { Difficulty } from '../views/main'

import { withTranslation, WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {}

interface State {
  rows: { leftColumn: string; rightColumn: string }[]
  difficulty: Difficulty
  case: 'upper' | 'lower'
}

const capitalABCColumns = {
  leftColumn: 'ABCDEFGHIJKLMNOPQRST',
  rightColumn: 'UVWXYZÅÄÖ0123456789?'
}

const getRowString = (columns: { leftColumn: string; rightColumn: string }) => {
  const leftColumnChars = columns.leftColumn.split('')
  const rightColumnChars = columns.rightColumn.split('')
  const newStringArray = []
  for (let i = 0; i < leftColumnChars.length; i++) {
    newStringArray.push(leftColumnChars[i])
    newStringArray.push(rightColumnChars[i])
  }
  return newStringArray.join('')
}

const getCapitalABCRowString = () => {
  return getRowString(capitalABCColumns)
}

const getLowercaseABCRowString = () => {
  return getRowString({
    leftColumn: capitalABCColumns.leftColumn.toLocaleLowerCase(),
    rightColumn: capitalABCColumns.rightColumn.toLocaleLowerCase()
  })
}

class ABCs extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const defaultDifficulty = 'medium'
    const defaultCase = 'upper'
    const defaultRows =
      getCapitalABCRowString()
        .match(/.{2}/g)
        ?.map((row) => ({
          leftColumn: row[0],
          rightColumn: row[1]
        })) || []
    this.state = {
      rows: defaultRows,
      difficulty: defaultDifficulty,
      case: defaultCase
    }
    this.difficultyHandler = this.difficultyHandler.bind(this)
    this.caseHandler = this.caseHandler.bind(this)
  }

  generateRows() {
    const rowString =
      this.state.case === 'upper'
        ? getCapitalABCRowString()
        : getLowercaseABCRowString()
    return (
      rowString.match(/.{2}/g)?.map((row) => ({
        leftColumn: row[0],
        rightColumn: row[1]
      })) || []
    )
  }

  refreshRows() {
    this.setState({ rows: this.generateRows() })
  }

  difficultyHandler(event: any) {
    this.setState({ difficulty: event.target.value })
  }

  caseHandler(event: any) {
    this.setState({ case: event.target.value }, () => {
      this.refreshRows()
    })
  }

  render() {
    return (
      <div>
        <section className="form-parent">
          <form className="form">
            <label htmlFor="difficulty-selector">
              {this.props.t<string>('difficulty')}
            </label>
            <select
              id="difficulty-selector"
              value={this.state.difficulty}
              onChange={this.difficultyHandler}
            >
              <option value="easy">{this.props.t<string>('Easy')}</option>
              <option value="medium">{this.props.t<string>('Medium')}</option>
              <option value="hard">{this.props.t<string>('Hard')}</option>
              <option value="advanced">
                {this.props.t<string>('Advanced')}
              </option>
            </select>
            <label htmlFor="upper">{this.props.t<string>('uppercase')}</label>
            <input
              type="radio"
              id="upper"
              name="case"
              value="upper"
              onChange={this.caseHandler}
              checked={this.state.case === 'upper'}
            />
            <label htmlFor="upper">{this.props.t<string>('lowercase')}</label>
            <input
              type="radio"
              id="lower"
              name="case"
              value="lower"
              onChange={this.caseHandler}
              checked={this.state.case === 'lower'}
            />
          </form>
        </section>

        <Printable>
          <div>
            <div className="page-break" />
            <ABCSheet
              lowercase={this.state.case === 'lower'}
              difficulty={this.state.difficulty}
              rows={this.state.rows}
            ></ABCSheet>
          </div>
        </Printable>
      </div>
    )
  }
}
export default withTranslation()(ABCs)
