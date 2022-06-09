import { Component } from "react";

interface Props {
  selected: string;
  navigationHandler: Function;
}

interface State {
  selected: string;
}
export class Menu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { selected: this.props.selected };
    this.menuClickHandler = this.menuClickHandler.bind(this);
  }

  menuClickHandler(selected: string) {
    this.props.navigationHandler(selected);
    this.setState({ selected });
    return undefined;
  }

  render() {
    return (
      <div className="menu">
        <ul>
          <li>
            <a
              href="#/"
              className={this.state.selected === "maths" ? "active" : ""}
              onClick={() => this.menuClickHandler("maths")}
            >
              Maths
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={this.state.selected === "abcs" ? "active" : ""}
              onClick={() => this.menuClickHandler("abcs")}
            >
              ABCs
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
