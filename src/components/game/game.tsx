import { SetStateAction, useState } from 'react'
import { Difficulty } from '../../views/main'

interface Question {
  a: number
  operator: '+' | '-'
  b: number
}

const solveQuestion = (q: Question) => {
  const { a, operator, b } = q
  if (operator === '+') {
    return a + b
  }
  return a - b
}

type Operator = '+' | '-'

const getRandomQuestion = (difficulty: Difficulty) => {
  let maxNumber
  let minNumber
  switch (difficulty) {
    case 'medium':
      minNumber = 5
      maxNumber = 10
      break
    case 'hard':
      minNumber = 10
      maxNumber = 15
      break
    case 'advanced':
      minNumber = 15
      maxNumber = 15
      break
    case 'easy':
    default:
      minNumber = 0
      maxNumber = 10
      break
  }
  const a = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
  const operator = Math.floor(Math.random() * 2) ? '+' : '-'
  const b = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
  return {
    question: { a, operator: operator as Operator, b },
    questionString: `${a} ${operator} ${b}`,
    answer: solveQuestion({ a, operator, b })
  }
}

const getEmojiFromaccuracyPercentage = (percentage: number) => {
  if (percentage < 30) {
    return '😭'
  }
  if (percentage < 50) {
    return '😰'
  }
  if (percentage < 60) {
    return '😐'
  }
  if (percentage < 75) {
    return '🙂'
  }
  if (percentage < 85) {
    return '😃'
  }
  return '✌️🥳'
}

interface Guess {
  questionString: string
  operator: Operator
  answer: number
  guess: string
  correct: boolean
}

function QNA({
  questionString,
  guess,
  handleAnswer,
  setGuess
}: {
  questionString: string
  guess: string
  handleAnswer: () => void
  setGuess: (value: SetStateAction<string>) => void
}) {
  return (
    <div>
      <div>
        <label>Question: {questionString}</label>
      </div>
      <div>
        <label>
          Answer:
          <input
            value={guess}
            type="number"
            onChange={(e) => setGuess(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleAnswer()
              }
            }}
          ></input>
        </label>
      </div>
      <button
        type="button"
        onClick={() => {
          handleAnswer()
        }}
      >
        Answer
      </button>
    </div>
  )
}

interface Props {
  numberOfQuestions: number
  difficulty: Difficulty
  handleReturnToMenu: () => void
}

export default function Game({
  numberOfQuestions,
  handleReturnToMenu,
  difficulty
}: Props) {
  const randomQuestion = getRandomQuestion(difficulty)
  const [guesses, setGuesses] = useState([] as Guess[])
  const [guessCount, setGuessCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [question, setQuestion] = useState(randomQuestion)
  const [guess, setGuess] = useState('')

  const resetGame = () => {
    setGuesses([])
    setGuessCount(0)
    setGameOver(false)
    resetQuestion()
    setGuess('')
  }

  const resetQuestion = () => {
    const randomQuestion = getRandomQuestion(difficulty)
    setQuestion(randomQuestion)
  }

  const handleAnswer = () => {
    const { questionString, answer } = question

    setGuesses([
      ...guesses,
      {
        questionString,
        operator: question.question.operator,
        answer,
        guess,
        correct: Number(guess) === answer
      }
    ])
    const newGuessCount = guessCount + 1
    if (newGuessCount > numberOfQuestions) {
      setGameOver(true)
    }
    setGuessCount(newGuessCount)
    resetQuestion()
    setGuess('')
  }

  let content
  if (gameOver) {
    const analysis = guesses.reduce(
      (acc, curr) => {
        const { correct, operator } = curr
        acc.count++
        if (operator === '+') {
          acc.plusCount++
          if (correct) {
            acc.correctCount++
            acc.plusCorrectCount++
          }
        } else if (operator === '-') {
          acc.minusCount++
          if (correct) {
            acc.correctCount++
            acc.minusCorrectCount++
          }
        }
        return acc
      },
      {
        count: 0,
        correctCount: 0,
        plusCount: 0,
        plusCorrectCount: 0,
        minusCount: 0,
        minusCorrectCount: 0
      }
    )
    const plusAccuracy = Math.floor(
      (analysis.plusCorrectCount / analysis.plusCount) * 100
    )
    const minusAccuracy = Math.floor(
      (analysis.minusCorrectCount / analysis.minusCount) * 100
    )
    const overallAccuracy = Math.floor(
      (analysis.correctCount / analysis.count) * 100
    )
    content = (
      <div>
        <h2>Game Over</h2>
        <p>Play again?</p>
        <button onClick={resetGame}>Restart</button>
        <button onClick={handleReturnToMenu}>Return to Menu</button>
        <p>
          <table>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Correct</th>
            </tr>
            {guesses.map((g) => (
              <tr>
                <td>{g.questionString}</td>
                <td>{g.guess}</td>
                <td>{g.correct ? 'YES' : 'NO'}</td>
              </tr>
            ))}
          </table>
          <p>
            Overall accuracy: {overallAccuracy}%
            {getEmojiFromaccuracyPercentage(overallAccuracy)}
          </p>
          <p>Accuracy for operator +: {plusAccuracy}%</p>
          <p>Accuracy for operator -: {minusAccuracy}%</p>
        </p>
      </div>
    )
  } else {
    content = (
      <QNA
        questionString={question.questionString}
        guess={guess}
        handleAnswer={handleAnswer}
        setGuess={setGuess}
      ></QNA>
    )
  }

  return <>{content}</>
}
