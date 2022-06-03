import { Component } from "react";

import { Addition } from "../views/addition";

export class Main extends Component {
  render() {
    if (this.props.selected === "Addition") {
      return (
        <div>
          <Addition rowCount="15"></Addition>
        </div>
      );
    } else {
      return <div>Select a </div>;
    }
  }
}
