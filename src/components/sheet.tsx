import { Component } from "react";
import { Operator } from "../views/main";

export class Sheet extends Component<{
  rows: { a: number; b: number; operator: Operator }[];
}> {
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
              Name:
            </td>
            <td className="metadata-row" colSpan={3}></td>
          </tr>
          <tr>
            <td className="metadata-row" colSpan={2}>
              Date:
            </td>
            <td className="metadata-row" colSpan={3}></td>
          </tr>
        </table>
      </div>
    );
  }
}
