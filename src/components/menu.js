import { Component } from "react";

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: "Subtraction" };
  }

  isActive(selected) {
    return this.state.selected === selected ? "active" : "";
  }

  handleClick(selected) {
    this.props.menuClickHandler(selected);
    this.setState({ selected });
  }

  getMenuItem(name) {
    return (
      <a
        className={this.isActive(name)}
        href="#"
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
