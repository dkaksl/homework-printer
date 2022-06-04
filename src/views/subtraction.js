import { Component } from "react";
import { Printable } from "../components/printable";
import { Sheet } from "../components/sheet";
import { generateRowData } from "../util/index";

export class Subtraction extends Component {
  constructor(props) {
    super(props);
    const rows = generateRowData(props.rowCount, props.difficulty, "-");
    this.state = { rows };
  }

  refreshRowData(rowCount) {
    this.setState({
      rows: generateRowData(rowCount, this.props.difficulty, "-"),
    });
  }

  render() {
    return (
      <div>
        {/* TODO: move randomize button to parent*/}
        <button onClick={() => this.refreshRowData(this.props.rowCount)}>
          Randomize
        </button>
        <Printable>
          <Sheet rows={this.state.rows}></Sheet>
        </Printable>
      </div>
    );
  }
}
