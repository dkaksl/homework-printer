import { Component } from "react";
import { Printable } from "../components/printable";

export class Subtraction extends Component {
  constructor(props) {
    super(props);
    const rows = this.generateRowData(props.rowCount);
    this.state = { rows };
  }

  generateRowData(rowCount) {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      const a = Math.floor(Math.random() * 20);
      const b = Math.floor(Math.random() * a);
      rows.push({ a, b });
    }
    return rows;
  }

  refreshRowData(rowCount) {
    this.setState({ rows: this.generateRowData(rowCount) });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.refreshRowData(this.props.rowCount)}>
          Randomize
        </button>
        <Printable>
          <div>
            <table>
              {this.state.rows.map((row) => (
                <tr>
                  <th>{row.a}</th>
                  <th>-</th>
                  <th>{row.b}</th>
                  <th>=</th>
                  <th>&nbsp;</th>
                </tr>
              ))}
            </table>
          </div>
        </Printable>
      </div>
    );
  }
}
