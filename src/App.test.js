import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const printButton = screen.getByText(/Print This Sheet/i);
  expect(printButton).toBeInTheDocument();
});
