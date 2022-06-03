import { Component } from "react";

export class Printable extends Component {
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <button>Print This Sheet</button>
      </div>
    );
  }
}
