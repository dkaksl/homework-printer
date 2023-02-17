import { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Difficulty } from '../../views/main'
import { Freetext } from '../freetext'

interface Props extends WithTranslation {
  lowercase: boolean
  difficulty: Difficulty
  rows: { leftColumn: string; rightColumn: string }[]
  bopomo?: boolean
  withFreetext?: boolean
}

class ABCSheet extends Component<Props> {
  getColumnPairCountByDifficulty(difficulty: Difficulty) {
    switch (difficulty) {
      case 'easy':
        return 1
      case 'medium':
        return 2
      case 'hard':
        return 3
      case 'advanced':
        return 4
      default:
        return 2
    }
  }

  getColspanByDifficulty(difficulty: Difficulty) {
    switch (difficulty) {
      case 'easy':
        return 12
      case 'medium':
        return 6
      case 'hard':
        return 4
      case 'advanced':
        return 3
      default:
        return 2
    }
  }

  getDataColumns(
    difficulty: Difficulty,
    row: { leftColumn: string; rightColumn: string },
    columnPairCount: number
  ) {
    const columnPairs = []
    const colSpan = this.getColspanByDifficulty(difficulty)
    for (let i = 0; i < columnPairCount; i++) {
      const lowercaseClass = this.props.lowercase ? 'lowercase' : ''
      const bopomoClass = this.props.bopomo ? 'bopomo' : ''
      const abcsRowClasS = `abcs-row ${lowercaseClass} ${bopomoClass}`
      columnPairs.push(
        <td className={abcsRowClasS} colSpan={colSpan}>
          {row.leftColumn}
        </td>
      )
      columnPairs.push(
        <td className={abcsRowClasS} colSpan={colSpan}>
          &nbsp;
        </td>
      )
      columnPairs.push(
        <td className={abcsRowClasS} colSpan={colSpan}>
          {row.rightColumn}
        </td>
      )
      columnPairs.push(
        <td className={abcsRowClasS} colSpan={colSpan}>
          &nbsp;
        </td>
      )
    }
    return columnPairs
  }

  getDataRows() {
    return this.props.rows.map((row) => (
      <tr>
        {this.getDataColumns(
          this.props.difficulty,
          row,
          this.getColumnPairCountByDifficulty(this.props.difficulty)
        )}
      </tr>
    ))
  }

  render() {
    return (
      <div className="page">
        <table>
          {this.getDataRows()}
          <tr>
            <td className="metadata-row" colSpan={12}>
              {this.props.t<string>('Name')}:
            </td>
            <td className="metadata-row" colSpan={36}></td>
          </tr>
          <tr>
            <td className="metadata-row" colSpan={12}>
              {this.props.t<string>('Date')}:
            </td>
            <td className="metadata-row" colSpan={36}></td>
          </tr>
        </table>
        {this.props.withFreetext && <Freetext label={this.props.t<string>('Notes')}></Freetext>}
      </div>
    )
  }
}

export default withTranslation()(ABCSheet)
