import { Component } from "react";
import { Printable } from "../components/printable";

export class Subtraction extends Component {
  constructor(props) {
    super(props);
    const rows = this.generateRowData(props.rowCount);
    this.state = { rows };
  }

  getMaxNumber() {
    switch (this.props.difficulty) {
      case "easy":
        return 10;
      case "medium":
        return 15;
      case "hard":
        return 20;
      case "advanced":
        return 20;
      default:
        return 15;
    }
  }

  generateRowData(rowCount) {
    const maxNumber = this.getMaxNumber();
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      const a = Math.floor(Math.random() * maxNumber);
      const b = Math.floor(
        Math.random() * (this.props.difficulty === "advanced" ? maxNumber : a)
      );
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
        {/* TODO: move randomize button to parent*/}
        <button onClick={() => this.refreshRowData(this.props.rowCount)}>
          Randomize
        </button>
        <Printable>
          <div>
            <table>
              {/* TODO: extract component */}
              {this.state.rows.map((row) => (
                <tr>
                  <td>{row.a}</td>
                  <td>-</td>
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
        </Printable>
      </div>
    );
  }
}
