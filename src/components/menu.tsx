import { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {
  selected: string
  navigationHandler: Function
}

interface State {
  selected: string
}

class Menu extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { selected: this.props.selected }
    this.menuClickHandler = this.menuClickHandler.bind(this)
  }

  menuClickHandler(selected: string) {
    this.props.navigationHandler(selected)
    this.setState({ selected })
    return undefined
  }

  getSelectedClassName(selected: string) {
    return this.state.selected === selected ? 'active' : ''
  }

  render() {
    return (
      <div className="menu">
        <div className="language-selector">
          <div className="column-1">
            <button
              className="fib fi-gb"
              onClick={() => {
                this.props.i18n.changeLanguage('en')
                localStorage.setItem('i18nextLng', 'en')
              }}
            ></button>
            <button
              className="fib fi-se"
              onClick={() => {
                this.props.i18n.changeLanguage('se')
                localStorage.setItem('i18nextLng', 'se')
              }}
            ></button>
            <button
              className="fib fi-tw"
              onClick={() => {
                this.props.i18n.changeLanguage('cn')
                localStorage.setItem('i18nextLng', 'cn')
              }}
            ></button>
          </div>
        </div>
        <ul>
          <li>
            <a
              href="#/"
              className={this.getSelectedClassName('maths')}
              onClick={() => this.menuClickHandler('maths')}
            >
              {this.props.t<string>('Maths')}
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={this.getSelectedClassName('abcs')}
              onClick={() => this.menuClickHandler('abcs')}
            >
              {this.props.t<string>('ABCs')}
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={this.getSelectedClassName('zhuyin')}
              onClick={() => this.menuClickHandler('zhuyin')}
            >
              {this.props.t<string>('Zhuyin')}
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={this.getSelectedClassName('words')}
              onClick={() => this.menuClickHandler('words')}
            >
              {this.props.t<string>('Words')}
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default withTranslation()(Menu)
