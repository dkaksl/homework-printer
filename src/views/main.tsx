import { Component } from "react";

import { Menu } from "../components/menu";
import { Maths } from "../components/maths";

export type Difficulty = "easy" | "medium" | "hard" | "advanced";
export type Operator = "-" | "+" | "×" | "÷";

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
  }

  menuClickHandler(value: string) {
    this.setState({ selected: value });
  }

  render() {
    return (
      <div>
        <header>
          <Menu menuClickHandler={this.menuClickHandler} />
        </header>
        <div className="content">
          <Maths
            selected={this.state.selected}
            rowCount={this.state.rowCount}
          ></Maths>
        </div>
      </div>
    );
  }
}
