import { ChangeEvent, Component } from 'react'
import Printable from './printable'
import WordSheet from './sheets/word-sheet'
import { Checkbox } from './checkbox'
import { withTranslation, WithTranslation } from 'react-i18next'
import { getRandomVerbOutOfOptions, VerbAlternativ } from '../util/svenska'

export const { Nutid, Dåtid, DåtidTidsuttryck } = VerbAlternativ

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
      rows.push(getRandomVerbOutOfOptions(includedOperators))
    }
    return rows
  }

  refreshRowDataCallback = () => {
    this.refreshRowData()
  }

  toggleNutid = () => {
    this.setState(
      {
        nutid: !this.state.nutid
      },
      this.refreshRowDataCallback
    )
  }

  toggleDåtid = () => {
    this.setState(
      {
        dåtid: !this.state.dåtid
      },
      this.refreshRowDataCallback
    )
  }

  toggleDåtidTidsuttryck = () => {
    this.setState(
      {
        dåtidTidsuttryck: !this.state.dåtidTidsuttryck
      },
      this.refreshRowDataCallback
    )
  }

  toggleFreetext() {
    this.setState({
      withFreetext: !this.state.withFreetext
    })
  }

  pageCountHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { pageCount: parseInt(event.target.value) },
      this.refreshRowDataCallback
    )
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
export default withTranslation()(Verbs)
