import { Component } from "react";

interface Props {
  menuClickHandler: Function;
}

export class Menu extends Component<Props, { selected: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { selected: "Subtraction" };
  }

  isActive(selected: string) {
    return this.state.selected === selected ? "active" : "";
  }

  handleClick(selected: string) {
    this.props.menuClickHandler(selected);
    this.setState({ selected });
  }

  getMenuItem(name: string) {
    return (
      <a
        className={this.isActive(name)}
        href="#/"
        onClick={() => this.handleClick(name)}
      >
        {name}
      </a>
    );
  }

  render() {
    return (
      <div className="menu navigation-menu">
        <ul>
          <li>{this.getMenuItem("Subtraction")}</li>
          <li>{this.getMenuItem("Addition")}</li>
        </ul>
      </div>
    );
  }
}
