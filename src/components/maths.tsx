import { Component } from "react";
import { Printable } from "./printable";
import { Sheet } from "./sheet";
import {
  generateRowData,
  getOperatorFromSelected,
  RowData,
} from "../util/index";
import { Difficulty } from "../views/main";

interface Props {
  selected: string;
  rowCount: number;
}

interface State {
  difficulty: Difficulty;
  rows: RowData[];
}

export class Maths extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const defaultDifficulty = "medium";
    this.state = {
      difficulty: defaultDifficulty,
      rows: generateRowData(
        this.props.rowCount,
        defaultDifficulty,
        getOperatorFromSelected("Subtraction")
      ),
    };
    this.difficultyHandler = this.difficultyHandler.bind(this);
  }

  difficultyHandler(event: any) {
    this.setState({ difficulty: event.target.value }, () => {
      this.refreshRowData(this.props.rowCount);
    });
  }

  refreshRowData(rowCount: number) {
    this.setState({
      rows: generateRowData(
        rowCount,
        this.state.difficulty,
        getOperatorFromSelected(this.props.selected)
      ),
    });
  }

  render() {
    return (
      <div>
        <label>
          Difficulty:
          <select
            value={this.state.difficulty}
            onChange={this.difficultyHandler}
          >
            {/* TODO: explain difficulties in tooltip */}
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
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
