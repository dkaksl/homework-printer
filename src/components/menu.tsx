import { Component, createRef } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {
  selected: string
  navigationHandler: (selected: string) => void
}

interface State {
  selected: string
  langOpen: boolean
}

interface Link {
  menuId: string
  menuTranslationKey: string
}

const LANGUAGES = [
  { code: 'en', flagClass: 'fi-gb' },
  { code: 'se', flagClass: 'fi-se' },
  { code: 'cn', flagClass: 'fi-tw' },
]

class Menu extends Component<Props, State> {
  private langRef = createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)
    this.state = { selected: this.props.selected, langOpen: false }
  }

  links: Link[] = [
    { menuId: 'maths', menuTranslationKey: 'Maths' },
    { menuId: 'abcs', menuTranslationKey: 'ABCs' },
    { menuId: 'zhuyin', menuTranslationKey: 'Zhuyin' },
    { menuId: 'nouns', menuTranslationKey: 'Nouns' },
    { menuId: 'verbs', menuTranslationKey: 'Verbs' },
    { menuId: 'word-problems', menuTranslationKey: 'Word Problems' },
    { menuId: 'game', menuTranslationKey: 'Game' }
  ]

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (this.state.langOpen !== prevState.langOpen) {
      if (this.state.langOpen) {
        document.addEventListener('click', this.handleOutsideClick)
      } else {
        document.removeEventListener('click', this.handleOutsideClick)
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  }

  handleOutsideClick = (e: MouseEvent) => {
    if (this.langRef.current && !this.langRef.current.contains(e.target as Node)) {
      this.setState({ langOpen: false })
    }
  }

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

  changeLang = (code: string) => {
    this.props.i18n.changeLanguage(code)
    localStorage.setItem('i18nextLng', code)
    this.setState({ langOpen: false })
  }

  render() {
    const { langOpen } = this.state
    return (
      <div className="menu">
        <div className="language-selector" ref={this.langRef}>
          <button
            className="lang-toggle"
            onClick={() => this.setState({ langOpen: !langOpen })}
            aria-label="Select language"
            aria-expanded={langOpen}
          >
            🌐
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {LANGUAGES.map(({ code, flagClass }) => (
                <button
                  key={code}
                  className={`fib ${flagClass}`}
                  onClick={() => this.changeLang(code)}
                  aria-label={code}
                />
              ))}
            </div>
          )}
        </div>
        <ul>{this.getMenuLinks()}</ul>
      </div>
    )
  }
}

export default withTranslation()(Menu)
