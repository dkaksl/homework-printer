import { SetStateAction, useState } from 'react'

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

const getRandomQuestion = () => {
  const maxNumber = 10
  const a = Math.floor(Math.random() * maxNumber)
  const operator = Math.floor(Math.random() * 2) ? '+' : '-'
  const b = Math.floor(Math.random() * maxNumber)
  return {
    question: { a, operator: operator as Operator, b },
    questionString: `${a} ${operator} ${b}`,
    answer: solveQuestion({ a, operator, b })
  }
}

interface Guess {
  questionString: string
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

export default function Game({
  numberOfQuestions
}: {
  numberOfQuestions: number
}) {
  const randomQuestion = getRandomQuestion()
  const [guesses, setGuesses] = useState([] as Guess[])
  const [guessCount, setGuessCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [question, setQuestion] = useState(randomQuestion)
  const [guess, setGuess] = useState('')

  const resetQuestion = () => {
    const randomQuestion = getRandomQuestion()
    setQuestion(randomQuestion)
  }

  const handleAnswer = () => {
    const { questionString, answer } = question
    setGuesses([
      ...guesses,
      {
        questionString,
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
    content = (
      <div>
        <h2>Game Over</h2>
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
