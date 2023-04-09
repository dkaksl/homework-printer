import { Component, createRef } from 'react'
import ReactToPrint from 'react-to-print'
import { withTranslation, WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {
  // TODO #8
  // eslint-disable-next-line
  children: any
}

class Printable extends Component<Props> {
  // TODO #8
  // eslint-disable-next-line
  myRef: any
  constructor(props: Props) {
    super(props)
    this.myRef = createRef()
  }
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <button>{this.props.t<string>('Print')}</button>
          }}
          content={() => this.myRef}
        ></ReactToPrint>
        <div className="printable" ref={(el) => (this.myRef = el)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withTranslation()(Printable)
