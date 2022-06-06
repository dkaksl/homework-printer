import { Component } from "react";
import { Printable } from "./printable";
import { Sheet } from "./sheet";
import { generateRowData, RowData } from "../util/index";
import { Difficulty, Operator } from "../views/main";
import { Checkbox } from "./checkbox";

interface Props {
  rowCount: number;
}

interface State {
  difficulty: Difficulty;
  plus: boolean;
  minus: boolean;
  pageCount: number;
  rows: RowData[][];
}

export class Maths extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const defaultDifficulty = "medium";
    const defaultPageCount = 1;
    this.state = {
      difficulty: defaultDifficulty,
      plus: true,
      minus: false,
      pageCount: defaultPageCount,
      rows: generateRowData(
        this.props.rowCount,
        defaultDifficulty,
        ["+"],
        defaultPageCount
      ),
    };
    this.difficultyHandler = this.difficultyHandler.bind(this);
    this.togglePlus = this.togglePlus.bind(this);
    this.toggleMinus = this.toggleMinus.bind(this);
    this.pageCountHandler = this.pageCountHandler.bind(this);
  }

  togglePlus() {
    this.setState(
      {
        plus: !this.state.plus,
      },
      () => {
        this.refreshRowData(this.props.rowCount);
      }
    );
  }

  toggleMinus() {
    this.setState(
      {
        minus: !this.state.minus,
      },
      () => {
        this.refreshRowData(this.props.rowCount);
      }
    );
  }

  difficultyHandler(event: any) {
    this.setState({ difficulty: event.target.value }, () => {
      this.refreshRowData(this.props.rowCount);
    });
  }

  pageCountHandler(event: any) {
    this.setState({ pageCount: event.target.value }, () => {
      this.refreshRowData(this.props.rowCount);
    });
  }

  getSelectedOperators() {
    const operators: Operator[] = [];
    if (this.state.plus) {
      operators.push("+");
    }
    if (this.state.minus) {
      operators.push("-");
    }
    if (operators.length < 1) {
      operators.push("+");
    }
    return operators;
  }

  refreshRowData(rowCount: number) {
    this.setState({
      rows: generateRowData(
        rowCount,
        this.state.difficulty,
        this.getSelectedOperators(),
        this.state.pageCount
      ),
    });
  }

  render() {
    return (
      <div>
        <section className="form-parent">
          <form className="form">
            <label htmlFor="difficulty-selector">Difficulty</label>
            <select
              id="difficulty-selector"
              value={this.state.difficulty}
              onChange={this.difficultyHandler}
            >
              {/* TODO: explain difficulties in tooltip */}
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="advanced">Advanced</option>
            </select>

            <label htmlFor="pageCount">Pages</label>
            <input
              id="pageCount"
              type="number"
              min="1"
              value={this.state.pageCount}
              onChange={this.pageCountHandler}
            ></input>
            <label htmlFor="checkbox-group">Included Operators</label>
            <div id="checkbox-group">
              <Checkbox
                defaultChecked={true}
                name="plus"
                operator="+"
                toggle={this.togglePlus}
              ></Checkbox>
              <Checkbox
                defaultChecked={false}
                name="minus"
                operator="-"
                toggle={this.toggleMinus}
              ></Checkbox>
            </div>

            <button
              type="button"
              onClick={() => this.refreshRowData(this.props.rowCount)}
            >
              Randomize
            </button>
          </form>
        </section>

        <Printable>
          {this.state.rows.map((page) => (
            <div>
              <div className="page-break" />
              <Sheet rows={page}></Sheet>
            </div>
          ))}
        </Printable>
      </div>
    );
  }
}
