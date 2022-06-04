import { Component } from "react";

import { Menu } from "../components/menu";
import { Subtraction } from "./subtraction";

export type Difficulty = "easy" | "medium" | "hard" | "advanced";
export type Operator = "-" | "+" | "*" | "÷";

interface Props {}

export class Main extends Component<
  Props,
  {
    selected: string;
    rowCount: number;
    difficulty: Difficulty;
  }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: "Subtraction",
      rowCount: 20,
      difficulty: "medium",
    };
    this.menuClickHandler = this.menuClickHandler.bind(this);
    this.difficultyHandler = this.difficultyHandler.bind(this);
  }

  menuClickHandler(value: string) {
    this.setState({ selected: value });
  }

  difficultyHandler(event: any) {
    this.setState({ difficulty: event.target.value });
  }

  getHomeworkView(selected: string, rowCount: number, difficulty: Difficulty) {
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
