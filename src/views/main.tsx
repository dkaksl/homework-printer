import { Component } from "react";

import { Menu } from "../components/menu";
import { Maths } from "../components/maths";

export type Difficulty = "easy" | "medium" | "hard" | "advanced";
export type Operator = "-" | "+" | "×" | "÷";

interface Props {}
interface State {
  rowCount: number;
  selected: string;
}

const getSubject = (selected: string, rowCount: number) => {
  if (selected === "maths") {
    return <Maths rowCount={rowCount}></Maths>;
  } else if (selected === "abcs") {
    return <div>wip</div>;
  }
};

export class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rowCount: 20,
      selected: "maths",
    };
    this.navigateMenu = this.navigateMenu.bind(this);
  }

  navigateMenu(selected: string) {
    this.setState({ selected });
  }

  render() {
    return (
      <div>
        <header>
          <Menu selected="maths" navigationHandler={this.navigateMenu} />
        </header>
        <div className="content">
          {getSubject(this.state.selected, this.state.rowCount)}
        </div>
      </div>
    );
  }
}
