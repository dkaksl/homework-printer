import { ChangeEvent, useState } from 'react'
import Game from './game'

type GameState = 'not-started' | 'started'
type Difficulty = 'easy' | 'medium' | 'hard'

export default function Menu() {
  const [gameState, setGameState] = useState<GameState>('not-started')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)

  const handleReturnToMenu = () => {
    setGameState('not-started')
  }

  const handleDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Difficulty
    setDifficulty(value)
    if (value === 'medium') {
      setNumberOfQuestions(20)
    }
    if (value === 'hard') {
      setNumberOfQuestions(30)
    }
    setNumberOfQuestions(10)
  }

  let content
  if (gameState === 'not-started') {
    content = (
      <div>
        <select value={difficulty} onChange={handleDifficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={() => setGameState('started')}>Start Game</button>
      </div>
    )
  } else if (gameState === 'started') {
    content = (
      <div>
        <Game
          numberOfQuestions={numberOfQuestions}
          handleReturnToMenu={handleReturnToMenu}
        ></Game>
      </div>
    )
  }

  return <div>{content}</div>
}
