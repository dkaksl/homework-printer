import { Component } from "react";

import { Menu } from "../components/menu";
import { Maths } from "../components/maths";

export type Difficulty = "easy" | "medium" | "hard" | "advanced";
export type Operator = "-" | "+" | "×" | "÷";

interface Props {}
interface State {
  rowCount: number;
}

export class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rowCount: 20,
    };
  }

  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <div className="content">
          <Maths rowCount={this.state.rowCount}></Maths>
        </div>
      </div>
    );
  }
}
