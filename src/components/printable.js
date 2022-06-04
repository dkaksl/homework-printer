import { Component } from "react";
import ReactToPrint from "react-to-print";

export class Printable extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <button>Print This Sheet</button>;
          }}
          content={() => this.componentRef}
        ></ReactToPrint>
        <div className="printable" ref={(el) => (this.componentRef = el)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
