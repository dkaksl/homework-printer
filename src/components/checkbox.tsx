import { Component } from 'react'

interface Props {
  defaultChecked: boolean
  name: string
  label: string
  toggle: Function
}
interface State {
  operator: string
}

export class Checkbox extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { operator: 'checked' }
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  toggleCheckbox() {
    this.setState({ operator: this.state.operator ? '' : 'checked' })
    this.props.toggle()
  }

  render() {
    const id = `operator-${this.props.name}`
    return (
      <div>
        <label>
          {this.props.label}
          <input
            defaultChecked={this.props.defaultChecked}
            type="checkbox"
            id={id}
            name={id}
            value={this.state.operator}
            onChange={this.toggleCheckbox}
          ></input>
        </label>
      </div>
    )
  }
}
