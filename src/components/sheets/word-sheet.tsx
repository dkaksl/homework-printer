import { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Freetext } from '../freetext'

interface Props extends WithTranslation {
  rows: string[],
  withFreetext?: boolean
}

class WordSheet extends Component<Props> {
  render() {
    return (
      <div className="page words">
        <table>
          {this.props.rows.map((row) => (
            <tr>
              <td className="abcs-row words" colSpan={2}>
                <span>{row}</span>
              </td>
              <td colSpan={3}>&nbsp;</td>
            </tr>
          ))}
          <tr>
            <td className="metadata-row" colSpan={2}>
              {this.props.t<string>('Name')}:
            </td>
            <td className="metadata-row" colSpan={3}></td>
          </tr>
          <tr>
            <td className="metadata-row" colSpan={2}>
              {this.props.t<string>('Date')}:
            </td>
            <td className="metadata-row" colSpan={3}></td>
          </tr>
        </table>
        {this.props.withFreetext && <Freetext label={this.props.t<string>('Notes')}></Freetext>}
      </div>
    )
  }
}

export default withTranslation()(WordSheet)
