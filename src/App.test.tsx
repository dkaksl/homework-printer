import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'

beforeEach(() => localStorage.clear())

const answerCount = (container: HTMLElement) =>
  // Answers are marked by styling only; there's no role or text to query them by.
  // eslint-disable-next-line testing-library/no-node-access
  container.querySelectorAll('.answer').length

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
