import { Component } from 'react'
import Printable from './printable'
import WordSheet from './word-sheet'
import { Checkbox } from './checkbox'
import { withTranslation, WithTranslation } from 'react-i18next'
import { SubstantivAlternativ, getRandomNoun } from '../util/svenska'
const {
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
      pages: this.generatePages(defaultPageCount, [SingularObestämd])
    }
    this.toggleSingularObestämd = this.toggleSingularObestämd.bind(this)
    this.toggleSingularBestämd = this.toggleSingularBestämd.bind(this)
    this.toggleSingularPossessiv = this.toggleSingularPossessiv.bind(this)
    this.togglePluralObestämd = this.togglePluralObestämd.bind(this)
    this.togglePluralBestämd = this.togglePluralBestämd.bind(this)
    this.pageCountHandler = this.pageCountHandler.bind(this)
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
      const randomNoun = getRandomNoun()
      const nounAlternatives = []
      if (includedOperators.includes(SingularObestämd)) {
        nounAlternatives.push(
          [randomNoun.artikel, randomNoun.singular.obestämd].join(' ')
        )
      }
      if (includedOperators.includes(SingularBestämd)) {
        const denEllerDet = randomNoun.artikel === 'en' ? 'den' : 'det'
        nounAlternatives.push(
          [denEllerDet, randomNoun.singular.bestämd].join(' ')
        )
      }
      if (includedOperators.includes(SingularPossessiv)) {
        const pronomenPrefix = Math.round(Math.random()) ? 'mi' : 'di'
        nounAlternatives.push(
          [
            pronomenPrefix + (randomNoun.artikel === 'en' ? 'n' : 'tt'),
            randomNoun.grundord
          ].join(' ')
        )
      }
      if (includedOperators.includes(PluralObestämd)) {
        nounAlternatives.push(randomNoun.plural.obestämd)
      }
      if (includedOperators.includes(PluralBestämd)) {
        nounAlternatives.push(randomNoun.plural.bestämd)
      }
      rows.push(
        nounAlternatives[Math.floor(Math.random() * nounAlternatives.length)]
      )
    }
    return rows
  }

  refreshRowDataCallback = () => {
    this.refreshRowData()
  }

  toggleSingularObestämd() {
    this.setState(
      {
        singularObestämd: !this.state.singularObestämd
      },
      this.refreshRowDataCallback
    )
  }

  toggleSingularBestämd() {
    this.setState(
      {
        singularBestämd: !this.state.singularBestämd
      },
      this.refreshRowDataCallback
    )
  }

  toggleSingularPossessiv() {
    this.setState(
      {
        singularPossessiv: !this.state.singularPossessiv
      },
      this.refreshRowDataCallback
    )
  }

  togglePluralObestämd() {
    this.setState(
      {
        pluralObestämd: !this.state.pluralObestämd
      },
      this.refreshRowDataCallback
    )
  }

  togglePluralBestämd() {
    this.setState(
      {
        pluralBestämd: !this.state.pluralBestämd
      },
      this.refreshRowDataCallback
    )
  }

  pageCountHandler(event: any) {
    this.setState(
      { pageCount: event.target.value },
      this.refreshRowDataCallback
    )
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
              <Checkbox
                defaultChecked={true}
                name={SingularObestämd}
                label="singular obestämd"
                toggle={this.toggleSingularObestämd}
              ></Checkbox>
              <Checkbox
                defaultChecked={false}
                name={SingularBestämd}
                label="singular bestämd"
                toggle={this.toggleSingularBestämd}
              ></Checkbox>
              <Checkbox
                defaultChecked={false}
                name={SingularPossessiv}
                label="singular possessiv"
                toggle={this.toggleSingularPossessiv}
              ></Checkbox>
              <Checkbox
                defaultChecked={false}
                name={PluralObestämd}
                label="plural obestämd"
                toggle={this.togglePluralObestämd}
              ></Checkbox>
              <Checkbox
                defaultChecked={false}
                name={PluralBestämd}
                label="plural bestämd"
                toggle={this.togglePluralBestämd}
              ></Checkbox>
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
              <WordSheet rows={page}></WordSheet>
            </div>
          ))}
        </Printable>
      </div>
    )
  }
}
export default withTranslation()(Nouns)
