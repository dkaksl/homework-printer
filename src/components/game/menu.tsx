import { ChangeEvent, Component } from 'react'

enum GAME_STATE {
  NEW = 'new',
  STARTED = 'started',
  OVER = 'over'
}

interface Props {
  startGame: () => void
  endGame: () => void
}
interface State {
  gameState: GAME_STATE
}

export class Menu extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      gameState: GAME_STATE.NEW // allow override with prop
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
  }

  handleStart() {
    console.log('hello start')
    this.setState({ gameState: GAME_STATE.STARTED })
    this.props.startGame()
  }

  handleRestart() {
    console.log('hello restart')
    this.setState({ gameState: GAME_STATE.NEW })
    this.props.endGame()
  }

  render() {
    let startButton
    if (this.state.gameState === GAME_STATE.NEW) {
      startButton = <button onClick={this.handleStart}>Start game</button>
    } else if (
      this.state.gameState === GAME_STATE.STARTED ||
      this.state.gameState === GAME_STATE.OVER
    ) {
      startButton = <button onClick={this.handleRestart}>Restart game</button>
    }

    return (
      <div>
        <div>{startButton}</div>
      </div>
    )
  }
}
