import { SetStateAction, useEffect, useRef, useState } from 'react'

export function QNA({
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
  const [animate, setAnimate] = useState(false)
  const prevQuestion = useRef(questionString)

  useEffect(() => {
    if (prevQuestion.current !== questionString) {
      setAnimate(true)
      prevQuestion.current = questionString
      const timeout = setTimeout(() => setAnimate(false), 400)
      return () => clearTimeout(timeout)
    }
  }, [questionString])

  return (
    <div>
      <div className={`question${animate ? ' animate' : ''}`}>
        <label>{questionString} =</label>
      </div>
      <div>
        <label>
          <input
            className="answer"
            value={guess}
            type="number"
            inputMode="numeric"
            onChange={(e) => setGuess(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleAnswer()
              }
            }}
          />
        </label>
      </div>
    </div>
  )
}
