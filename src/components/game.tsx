import { ChangeEvent, Component } from 'react'
import { Difficulty } from '../views/main'
import { withTranslation, WithTranslation } from 'react-i18next'

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
    this.difficultyHandler = this.difficultyHandler.bind(this)
  }

  difficultyHandler(event: ChangeEvent<HTMLSelectElement>) {
    console.log('hello')
  }

  render() {
    return (
      <div>
        <p>hello</p>
      </div>
    )
  }
}
export default withTranslation()(Game)
