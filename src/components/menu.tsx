import { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {
  selected: string
  navigationHandler: (selected: string) => void
}

interface State {
  selected: string
}

interface Link {
  menuId: string
  menuTranslationKey: string
}

class Menu extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { selected: this.props.selected }
  }

  links: Link[] = [
    { menuId: 'maths', menuTranslationKey: 'Maths' },
    { menuId: 'abcs', menuTranslationKey: 'ABCs' },
    { menuId: 'zhuyin', menuTranslationKey: 'Zhuyin' },
    { menuId: 'nouns', menuTranslationKey: 'Nouns' },
    { menuId: 'verbs', menuTranslationKey: 'Verbs' },
    { menuId: 'game', menuTranslationKey: 'Game' }
  ]

  getMenuLinks = () => {
    return this.links.map((link) => (
      <li key={link.menuId}>
        <a
          href="#/"
          className={this.getSelectedClassName(link.menuId)}
          onClick={() => this.menuClickHandler(link.menuId)}
        >
          {this.props.t<string>(link.menuTranslationKey)}
        </a>
      </li>
    ))
  }

  menuClickHandler = (selected: string) => {
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
        <ul>{this.getMenuLinks()}</ul>
      </div>
    )
  }
}

export default withTranslation()(Menu)
