import { Component } from "react";
import Printable from "./printable";
import Sheet from "./sheet";
import { generateRowData, RowData } from "../util/index";
import { Difficulty, Operator } from "../views/main";
import { Checkbox } from "./checkbox";
import { withTranslation, WithTranslation } from "react-i18next";

interface Props extends WithTranslation {
  rowCount: number;
}

interface State {
  difficulty: Difficulty;
  plus: boolean;
  minus: boolean;
  pageCount: number;
  rows: RowData[][];
}

class Maths extends Component<Props, State> {
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
            <label htmlFor="difficulty-selector">
              {this.props.t<string>("difficulty")}
            </label>
            <select
              id="difficulty-selector"
              value={this.state.difficulty}
              onChange={this.difficultyHandler}
            >
              {/* TODO: explain difficulties in tooltip */}
              <option value="easy">{this.props.t<string>("Easy")}</option>
              <option value="medium">{this.props.t<string>("Medium")}</option>
              <option value="hard">{this.props.t<string>("Hard")}</option>
              <option value="advanced">
                {this.props.t<string>("Advanced")}
              </option>
            </select>

            <label htmlFor="pageCount">{this.props.t<string>("Pages")}</label>
            <input
              id="pageCount"
              type="number"
              min="1"
              value={this.state.pageCount}
              onChange={this.pageCountHandler}
            ></input>
            <label htmlFor="checkbox-group">
              {this.props.t<string>("Included Operators")}
            </label>
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
              {this.props.t<string>("Randomize")}
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
export default withTranslation()(Maths);
