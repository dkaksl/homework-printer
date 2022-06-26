import { Component } from 'react'
import Printable from './printable'
import ABCSheet from './abc-sheet'
import { Difficulty } from '../views/main'

import { withTranslation, WithTranslation } from 'react-i18next'
import { getRowString } from '../util'

interface Props extends WithTranslation {}

interface State {
  rows: { leftColumn: string; rightColumn: string }[]
  difficulty: Difficulty
}

const zhuyinColumns = {
  leftColumn: 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖ ',
  rightColumn: 'ㄗㄘㄙ⼀ㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ'
}

const getZhuyinString = () => {
  return getRowString(zhuyinColumns)
}

class Zhuyin extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const defaultDifficulty = 'medium'
    const defaultRows =
      getZhuyinString()
        .match(/.{2}/g)
        ?.map((row) => ({
          leftColumn: row[0],
          rightColumn: row[1]
        })) || []
    this.state = {
      rows: defaultRows,
      difficulty: defaultDifficulty
    }
    this.difficultyHandler = this.difficultyHandler.bind(this)
  }

  generateRows() {
    const rowString = getRowString({
      leftColumn: zhuyinColumns.leftColumn,
      rightColumn: zhuyinColumns.rightColumn
    })
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
          </form>
        </section>

        <Printable>
          <div>
            <div className="page-break" />
            <ABCSheet
              lowercase={false}
              difficulty={this.state.difficulty}
              rows={this.state.rows}
              bopomo={true}
            ></ABCSheet>
          </div>
        </Printable>
      </div>
    )
  }
}
export default withTranslation()(Zhuyin)
