import { Component } from "react";

import { Subtraction } from "./subtraction";

export class Main extends Component {
  render() {
    if (this.props.selected === "Subtraction") {
      return (
        <div className="content">
          <Subtraction
            rowCount="20"
            difficulty={this.props.difficulty}
          ></Subtraction>
        </div>
      );
    } else {
      return <div>Select an exercise and difficulty level</div>;
    }
  }
}
