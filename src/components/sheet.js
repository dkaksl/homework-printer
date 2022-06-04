import { Component } from "react";

export class Sheet extends Component {
  render() {
    return (
      <div>
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
            <td colSpan={2}>Name:</td>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={2}>Date:</td>
            <td colSpan={3}></td>
          </tr>
        </table>
      </div>
    );
  }
}
