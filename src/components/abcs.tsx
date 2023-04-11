import { Component } from 'react'
import Printable from './printable'
import ABCSheet from './sheets/abc-sheet'
import { Case, Difficulty } from '../views/main'

import { withTranslation, WithTranslation } from 'react-i18next'
import { getRowString } from '../util'
import { Checkbox } from './checkbox'
import { ChangeEvent } from 'react'

type Props = WithTranslation

interface State {
  rows: { leftColumn: string; rightColumn: string }[]
  difficulty: Difficulty
  case: Case
  withFreetext: boolean
}

const capitalABCColumns = {
  leftColumn: 'ABCDEFGHIJKLMNOPQRST',
  rightColumn: 'UVWXYZÅÄÖ0123456789?'
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
      case: defaultCase,
      withFreetext: false
    }
    this.difficultyHandler = this.difficultyHandler.bind(this)
    this.caseHandler = this.caseHandler.bind(this)
    this.toggleFreetext = this.toggleFreetext.bind(this)
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

  difficultyHandler(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ difficulty: event.target.value as Difficulty })
  }

  caseHandler(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ case: event.target.value as Case }, () => {
      this.refreshRows()
    })
  }

  toggleFreetext() {
    this.setState({
      withFreetext: !this.state.withFreetext
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
          <Checkbox
            defaultChecked={false}
            name="freetext"
            label="?"
            toggle={this.toggleFreetext}
          ></Checkbox>
        </section>

        <Printable>
          <div>
            <div className="page-break" />
            <ABCSheet
              lowercase={this.state.case === 'lower'}
              difficulty={this.state.difficulty}
              rows={this.state.rows}
              withFreetext={this.state.withFreetext}
            ></ABCSheet>
          </div>
        </Printable>
      </div>
    )
  }
}
export default withTranslation()(ABCs)
