import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'

// jsdom can't print; calling the hook's setup is enough to record the printout.
jest.mock('react-to-print', () => ({
  useReactToPrint:
    ({ onBeforeGetContent }: { onBeforeGetContent?: () => void }) =>
    () =>
      onBeforeGetContent?.()
}))

beforeEach(() => localStorage.clear())

const answerCount = (container: HTMLElement) =>
  // Answers are marked by styling only; there's no role or text to query them by.
  // eslint-disable-next-line testing-library/no-node-access
  container.querySelectorAll('.answer').length

const answerText = (container: HTMLElement) =>
  // eslint-disable-next-line testing-library/no-node-access
  Array.from(container.querySelectorAll('.answer'), (a) => a.textContent).join('|')

test('adding a section shows it on the page, with answers only in the preview, and keeps it after a reload', () => {
  const { unmount } = render(<App />)

  fireEvent.click(screen.getByRole('button', { name: /Column arithmetic/ }))

  const preview = screen.getByTestId('preview')
  const printout = screen.getByTestId('printout')
  expect(within(preview).getByText('1. Column arithmetic – addition')).toBeInTheDocument()
  expect(within(printout).getByText('1. Column arithmetic – addition')).toBeInTheDocument()

  fireEvent.click(screen.getByLabelText('Show answers'))
  expect(answerCount(preview)).toBeGreaterThan(0)
  expect(answerCount(printout)).toBe(0)

  unmount()
  render(<App />)
  expect(within(screen.getByTestId('preview')).getByText('1. Column arithmetic – addition')).toBeInTheDocument()
})

test('a printout keeps its answers in the printed sheets history after the document is randomized', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /Column arithmetic/ }))
  fireEvent.click(screen.getByLabelText('Show answers'))
  const preview = screen.getByTestId('preview')
  const printedAnswers = answerText(preview)

  fireEvent.click(screen.getByRole('button', { name: 'Print' }))
  const label = within(screen.getByTestId('printout')).getAllByText(/^#1 · \d{4}-\d{2}-\d{2}$/)[0].textContent ?? ''

  fireEvent.click(screen.getByRole('button', { name: 'Randomize' }))
  expect(answerText(preview)).not.toEqual(printedAnswers)

  fireEvent.click(screen.getByRole('link', { name: 'Printed sheets' }))
  const entry = screen.getByRole('listitem', { name: label })
  expect(within(entry).getByText('Column arithmetic')).toBeInTheDocument()

  const answerKey = screen.getByTestId('answer-key')
  expect(within(answerKey).getAllByText(label).length).toBeGreaterThan(0)
  expect(answerText(answerKey)).toEqual(printedAnswers)

  fireEvent.click(within(entry).getByRole('button', { name: 'Delete' }))
  expect(screen.getByText('Nothing has been printed yet.')).toBeInTheDocument()
})
