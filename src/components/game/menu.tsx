import { ChangeEvent, useState } from 'react'
import Game from './game'
import { Difficulty } from '../../views/main'

type GameState = 'not-started' | 'started'

export default function Menu() {
  const [gameState, setGameState] = useState<GameState>('not-started')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)

  const resetGame = () => {
    setGameState('not-started')
  }

  const handleDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Difficulty
    setDifficulty(value)
    if (value === 'medium') {
      setNumberOfQuestions(15)
    } else if (value === 'hard' || value === 'advanced') {
      setNumberOfQuestions(20)
    } else {
      setNumberOfQuestions(10)
    }
  }

  let content
  if (gameState === 'not-started') {
    content = (
      <div>
        <select value={difficulty} onChange={handleDifficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="advanced">Advanced</option>
        </select>
        <button onClick={() => setGameState('started')}>Start Game</button>
      </div>
    )
  } else if (gameState === 'started') {
    content = (
      <div>
        <button onClick={resetGame}>Exit Game</button>
        <Game
          numberOfQuestions={numberOfQuestions}
          difficulty={difficulty}
          handleReturnToMenu={resetGame}
        ></Game>
      </div>
    )
  }

  return <div>{content}</div>
}
