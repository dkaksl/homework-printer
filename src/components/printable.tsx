import { Component, createRef } from "react";
import ReactToPrint from "react-to-print";

interface Props {
  children: any;
}

export class Printable extends Component<Props> {
  myRef: any;
  constructor(props: Props) {
    super(props);
    this.myRef = createRef();
  }
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <button>Print This Sheet</button>;
          }}
          content={() => this.myRef}
        ></ReactToPrint>
        <div className="printable" ref={(el) => (this.myRef = el)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
