import { Component } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

import { Operator } from "../views/main";

interface Props extends WithTranslation {
  rows: { a: number; b: number; operator: Operator }[];
}

class Sheet extends Component<Props> {
  render() {
    return (
      <div className="page">
        <table>
          {this.props.rows.map((row) => (
            <tr>
              <td>{row.a}</td>
              <td>{row.operator}</td>
              <td>{row.b}</td>
              <td>=</td>
              <td>&nbsp;</td>
            </tr>
          ))}
          <tr>
            <td className="metadata-row" colSpan={2}>
              {this.props.t<string>("Name")}:
            </td>
            <td className="metadata-row" colSpan={3}></td>
          </tr>
          <tr>
            <td className="metadata-row" colSpan={2}>
              {this.props.t<string>("Date")}:
            </td>
            <td className="metadata-row" colSpan={3}></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default withTranslation()(Sheet);
