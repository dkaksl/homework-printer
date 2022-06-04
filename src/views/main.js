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
    this.difficultyHandler = this.difficultyHandler.bind(this);
  }

  menuClickHandler(value) {
    this.setState({ selected: value });
  }

  difficultyHandler(event) {
    this.setState({ difficulty: event.target.value });
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
          {this.getHomeworkView(
            this.state.selected,
            this.state.rowCount,
            this.state.difficulty
          )}
        </div>
      </div>
    );
  }
}
