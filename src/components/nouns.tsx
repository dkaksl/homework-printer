import { ChangeEvent, Component } from 'react'
import Printable from './printable'
import WordSheet from './sheets/word-sheet'
import { Checkbox } from './checkbox'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
  SubstantivAlternativ,
  getRandomNounOutOfOptions
} from '../util/svenska'
export const {
  SingularObestämd,
  SingularBestämd,
  SingularPossessiv,
  PluralObestämd,
  PluralBestämd
} = SubstantivAlternativ

interface Props extends WithTranslation {
  rowCount: number
}

interface State {
  singularObestämd: boolean
  singularBestämd: boolean
  singularPossessiv: boolean
  pluralObestämd: boolean
  pluralBestämd: boolean
  pageCount: number
  pages: string[][]
  withFreetext: boolean
}

class Nouns extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const defaultPageCount = 1
    this.state = {
      singularObestämd: true,
      singularBestämd: false,
      singularPossessiv: false,
      pluralObestämd: false,
      pluralBestämd: false,
      pageCount: defaultPageCount,
      pages: this.generatePages(defaultPageCount, [SingularObestämd]),
      withFreetext: false
    }
    this.toggleFreetext = this.toggleFreetext.bind(this)
  }

  generatePages(pageCount: number, includedOperators: SubstantivAlternativ[]) {
    const pages = []
    for (let i = 0; i < pageCount; i++) {
      pages.push(this.generateRows(includedOperators))
    }
    return pages
  }

  generateRows(includedOperators: SubstantivAlternativ[]) {
    const rows = []
    for (let i = 0; i < this.props.rowCount; i++) {
      rows.push(getRandomNounOutOfOptions(includedOperators))
    }
    return rows
  }

  refreshRowDataCallback = () => {
    this.refreshRowData()
  }

  // TODO #8
  // eslint-disable-next-line
  setStateAndRefreshRows = (newState: any) => {
    this.setState(newState, this.refreshRowDataCallback)
  }

  toggleSingularObestämd = () => {
    this.setStateAndRefreshRows({
      singularObestämd: !this.state.singularObestämd
    })
  }

  toggleSingularBestämd = () => {
    this.setStateAndRefreshRows({
      singularBestämd: !this.state.singularBestämd
    })
  }

  toggleSingularPossessiv = () => {
    this.setStateAndRefreshRows({
      singularPossessiv: !this.state.singularPossessiv
    })
  }

  togglePluralObestämd = () => {
    this.setStateAndRefreshRows({
      pluralObestämd: !this.state.pluralObestämd
    })
  }

  togglePluralBestämd = () => {
    this.setStateAndRefreshRows({
      pluralBestämd: !this.state.pluralBestämd
    })
  }

  toggleFreetext() {
    this.setState({
      withFreetext: !this.state.withFreetext
    })
  }

  pageCountHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setStateAndRefreshRows({ pageCount: event.target.value })
  }

  getSelectedOperators() {
    const defaultOperator = SingularObestämd
    const operators: SubstantivAlternativ[] = []
    if (this.state.singularObestämd) {
      operators.push(defaultOperator)
    }
    if (this.state.singularBestämd) {
      operators.push(SingularBestämd)
    }
    if (this.state.singularPossessiv) {
      operators.push(SingularPossessiv)
    }
    if (this.state.pluralObestämd) {
      operators.push(PluralObestämd)
    }
    if (this.state.pluralBestämd) {
      operators.push(PluralBestämd)
    }
    if (operators.length < 1) {
      operators.push(defaultOperator)
    }
    return operators
  }

  refreshRowData() {
    this.setState({
      pages: this.generatePages(
        this.state.pageCount,
        this.getSelectedOperators()
      )
    })
  }

  getCheckboxes = () => {
    return [
      { name: SingularObestämd, toggle: this.toggleSingularObestämd },
      { name: SingularBestämd, toggle: this.toggleSingularBestämd },
      { name: SingularPossessiv, toggle: this.toggleSingularPossessiv },
      { name: PluralObestämd, toggle: this.togglePluralObestämd },
      { name: PluralBestämd, toggle: this.togglePluralBestämd }
    ].map((entry, index) => (
      <Checkbox
        defaultChecked={index === 0}
        name={entry.name}
        label={entry.name.replaceAll('-', ' ')}
        toggle={entry.toggle}
      ></Checkbox>
    ))
  }

  render() {
    return (
      <div>
        <section className="form-parent">
          <form className="form">
            <label htmlFor="pageCount">{this.props.t<string>('Pages')}</label>
            <input
              id="pageCount"
              type="number"
              min="1"
              value={this.state.pageCount}
              onChange={this.pageCountHandler}
            ></input>
            <label htmlFor="checkbox-group">
              {this.props.t<string>('Included Declensions')}
            </label>
            <div id="checkbox-group">
              {[
                ...this.getCheckboxes(),
                <Checkbox
                  defaultChecked={false}
                  name="freetext"
                  label="?"
                  toggle={this.toggleFreetext}
                ></Checkbox>
              ]}
            </div>
            <button type="button" onClick={() => this.refreshRowData()}>
              {this.props.t<string>('Randomize')}
            </button>
          </form>
        </section>

        <Printable>
          {this.state.pages.map((page) => (
            <div>
              <div className="page-break" />
              <WordSheet
                rows={page}
                withFreetext={this.state.withFreetext}
              ></WordSheet>
            </div>
          ))}
        </Printable>
      </div>
    )
  }
}
export default withTranslation()(Nouns)
