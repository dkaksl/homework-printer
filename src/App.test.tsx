import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders print button", () => {
  render(<App />);
  const printButton = screen.getByText(/Print This Sheet/i);
  expect(printButton).toBeInTheDocument();
});
