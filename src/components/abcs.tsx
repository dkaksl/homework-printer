import { Component } from "react";
import Printable from "./printable";
import ABCSheet from "./abc-sheet";
import { Difficulty } from "../views/main";

import { withTranslation, WithTranslation } from "react-i18next";

interface Props extends WithTranslation {}

interface State {
  difficulty: Difficulty;
}

const capitalABCColumns = {
  leftColumn: "ABCDEFGHIJKLMNOPQRST",
  rightColumn: "UVWXYZÅÄÖ0123456789?",
};

const getCapitalABCRowString = () => {
  const leftColumnChars = capitalABCColumns.leftColumn.split("");
  const rightColumnChars = capitalABCColumns.rightColumn.split("");
  const newStringArray = [];
  for (let i = 0; i < leftColumnChars.length; i++) {
    newStringArray.push(leftColumnChars[i]);
    newStringArray.push(rightColumnChars[i]);
  }
  return newStringArray.join("");
};

class ABCs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const defaultDifficulty = "medium";
    this.state = {
      difficulty: defaultDifficulty,
    };
    this.difficultyHandler = this.difficultyHandler.bind(this);
  }

  difficultyHandler(event: any) {
    this.setState({ difficulty: event.target.value });
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
              <option value="easy">{this.props.t<string>("Easy")}</option>
              <option value="medium">{this.props.t<string>("Medium")}</option>
              <option value="hard">{this.props.t<string>("Hard")}</option>
              <option value="advanced">
                {this.props.t<string>("Advanced")}
              </option>
            </select>
          </form>
        </section>

        <Printable>
          <div>
            <div className="page-break" />
            <ABCSheet
              difficulty={this.state.difficulty}
              rows={
                getCapitalABCRowString()
                  .match(/.{2}/g)
                  ?.map((row) => ({
                    leftColumn: row[0],
                    rightColumn: row[1],
                  })) || []
              }
            ></ABCSheet>
          </div>
        </Printable>
      </div>
    );
  }
}
export default withTranslation()(ABCs);
