import { Component } from 'react'

import Menu from '../components/menu'
import Maths from '../components/maths'
import ABCs from '../components/abcs'
import Zhuyin from '../components/zhuyin'
import Words from '../components/words'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'advanced'
export type Operator = '-' | '+' | '×' | '÷'

interface Props {}
interface State {
  rowCount: number
  selected: string
}

export class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      rowCount: 20,
      selected: 'maths'
    }
    this.navigateMenu = this.navigateMenu.bind(this)
  }

  getSubject(selected: string, rowCount: number) {
    if (selected === 'maths') {
      return <Maths rowCount={rowCount}></Maths>
    } else if (selected === 'abcs') {
      return <ABCs></ABCs>
    } else if (selected === 'zhuyin') {
      return <Zhuyin></Zhuyin>
    } else if (selected === 'words') {
      return <Words rowCount={rowCount}></Words>
    }
  }

  navigateMenu(selected: string) {
    this.setState({ selected })
  }

  render() {
    return (
      <div>
        <header>
          <Menu selected="maths" navigationHandler={this.navigateMenu} />
        </header>
        <div className="content">
          {this.getSubject(this.state.selected, this.state.rowCount)}
        </div>
      </div>
    )
  }
}
