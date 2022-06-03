import { Component } from "react";

import { Subtraction } from "./subtraction";

export class Main extends Component {
  render() {
    if (this.props.selected === "Subtraction") {
      return (
        <div>
          <Subtraction rowCount="15"></Subtraction>
        </div>
      );
    } else {
      return <div>Select a </div>;
    }
  }
}
