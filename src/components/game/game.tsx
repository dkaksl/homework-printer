import { ChangeEvent, Component } from 'react'
import { Difficulty } from '../../views/main'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Menu } from './menu'

type Props = WithTranslation

interface State {
  difficulty: Difficulty
}

class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const defaultDifficulty = 'medium'
    this.state = {
      difficulty: defaultDifficulty
    }
  }

  render() {
    return (
      <div>
        <h2>title</h2>
        <Menu
          startGame={() => {
            console.log('start in parent')
          }}
          endGame={() => {
            console.log('end in parent')
          }}
        />
      </div>
    )
  }
}
export default withTranslation()(Game)
