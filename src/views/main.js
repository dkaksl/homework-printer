import { Component } from "react";

import { Menu } from "../components/menu";
import { Subtraction } from "./subtraction";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Subtraction",
      rowCount: 20,
      difficulty: "medium",
    };
    this.menuClickHandler = this.menuClickHandler.bind(this);
  }

  menuClickHandler(value) {
    this.setState({ selected: value });
  }

  difficultyHandler(difficulty) {
    this.setState({ difficulty });
  }

  getHomeworkView(selected, rowCount, difficulty) {
    if (selected === "Subtraction") {
      return (
        <Subtraction rowCount={rowCount} difficulty={difficulty}></Subtraction>
      );
    } else if (selected === "Addition") {
      return <div>TODO</div>;
    } else {
      return <div>Select an exercise and difficulty level</div>;
    }
  }

  render() {
    return (
      <div>
        <header>
          <Menu menuClickHandler={this.menuClickHandler} />
        </header>
        <div className="content">
          {this.getHomeworkView(
            this.state.selected,
            this.state.rowCount,
            this.props.difficulty
          )}
        </div>
      </div>
    );
  }
}
