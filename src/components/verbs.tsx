import { Component } from 'react'
import Printable from './printable'
import WordSheet from './sheets/word-sheet'
import { Checkbox } from './checkbox'
import { withTranslation, WithTranslation } from 'react-i18next'
import { getRandomVerb, VerbAlternativ } from '../util/svenska'
import { getRandomFromArray } from '../util'

const { Nutid, Dåtid, DåtidTidsuttryck } = VerbAlternativ

interface Props extends WithTranslation {
  rowCount: number
}

interface State {
  nutid: boolean
  dåtid: boolean
  dåtidTidsuttryck: boolean
  pageCount: number
  pages: string[][]
  withFreetext: boolean
}

class Verbs extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const defaultPageCount = 1
    this.state = {
      nutid: true,
      dåtid: false,
      dåtidTidsuttryck: false,
      pageCount: defaultPageCount,
      pages: this.generatePages(defaultPageCount, [Nutid]),
      withFreetext: false
    }
    this.toggleFreetext = this.toggleFreetext.bind(this)
  }

  generatePages(pageCount: number, includedOperators: VerbAlternativ[]) {
    const pages = []
    for (let i = 0; i < pageCount; i++) {
      pages.push(this.generateRows(includedOperators))
    }
    return pages
  }

  generateRows(includedOperators: VerbAlternativ[]) {
    const rows = []
    for (let i = 0; i < this.props.rowCount; i++) {
      const randomVerb = getRandomVerb()
      const verbAlternatives = []
      if (includedOperators.includes(Nutid)) {
        verbAlternatives.push(randomVerb.nutid)
      }
      if (includedOperators.includes(Dåtid)) {
        verbAlternatives.push(randomVerb.dåtid.grund)
      }
      if (includedOperators.includes(DåtidTidsuttryck)) {
        verbAlternatives.push(randomVerb.dåtid.tidsuttryck)
      }
      rows.push(getRandomFromArray(verbAlternatives))
    }
    return rows
  }

  refreshRowDataCallback = () => {
    this.refreshRowData()
  }

  setStateAndRefreshRows = (newState: any) => {
    this.setState(newState, this.refreshRowDataCallback)
  }

  toggleNutid = () => {
    this.setStateAndRefreshRows({
      nutid: !this.state.nutid
    })
  }

  toggleDåtid = () => {
    this.setStateAndRefreshRows({
      dåtid: !this.state.dåtid
    })
  }

  toggleDåtidTidsuttryck = () => {
    this.setStateAndRefreshRows({
      dåtidTidsuttryck: !this.state.dåtidTidsuttryck
    })
  }

  toggleFreetext() {
    this.setState({
      withFreetext: !this.state.withFreetext
    })
  }

  pageCountHandler = (event: any) => {
    this.setStateAndRefreshRows({ pageCount: event.target.value })
  }

  getSelectedOperators = () => {
    const defaultOperator = Nutid
    const operators: VerbAlternativ[] = []
    if (this.state.nutid) {
      operators.push(defaultOperator)
    }
    if (this.state.dåtid) {
      operators.push(Dåtid)
    }
    if (this.state.dåtidTidsuttryck) {
      operators.push(DåtidTidsuttryck)
    }
    if (operators.length < 1) {
      operators.push(defaultOperator)
    }
    return operators
  }

  refreshRowData = () => {
    this.setState({
      pages: this.generatePages(
        this.state.pageCount,
        this.getSelectedOperators()
      )
    })
  }

  getCheckboxes = () => {
    return [
      { name: Nutid, toggle: this.toggleNutid },
      { name: Dåtid, toggle: this.toggleDåtid },
      { name: DåtidTidsuttryck, toggle: this.toggleDåtidTidsuttryck }
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
              onChange={() => this.pageCountHandler}
            ></input>
            <label htmlFor="checkbox-group">
              {this.props.t<string>('Included Declensions')}
            </label>
            <div id="checkbox-group">{[...this.getCheckboxes(), <Checkbox
              defaultChecked={false}
              name="freetext"
              label="?"
              toggle={this.toggleFreetext}
            ></Checkbox>]}</div>
            <button type="button" onClick={() => this.refreshRowData()}>
              {this.props.t<string>('Randomize')}
            </button>
          </form>
        </section>

        <Printable>
          {this.state.pages.map((page) => (
            <div>
              <div className="page-break" />
              <WordSheet rows={page} withFreetext={this.state.withFreetext}></WordSheet>
            </div>
          ))}
        </Printable>
      </div>
    )
  }
}
export default withTranslation()(Verbs)
