import { Difficulty, Operator } from "../views/main";

const getMaxNumber = (difficulty?: string) => {
  switch (difficulty) {
    case "easy":
      return 10;
    case "medium":
      return 15;
    case "hard":
      return 20;
    case "advanced":
      return 20;
    default:
      return 15;
  }
};

export interface RowData {
  a: number;
  b: number;
  operator: Operator;
}

const generateRow = (
  maxNumber: number,
  difficulty: Difficulty,
  operator: Operator
) => {
  const a = Math.floor(Math.random() * maxNumber);
  const b = Math.floor(
    Math.random() * (difficulty === "advanced" ? maxNumber : a)
  );
  return { a, b, operator };
};

export const generateRowData = (
  rowCount: number,
  difficulty: Difficulty,
  operator: Operator
): RowData[] => {
  const maxNumber = getMaxNumber(difficulty);
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(generateRow(maxNumber, difficulty, operator));
  }
  return rows;
};

export const getOperatorFromSelected = (selected: string) => {
  switch (selected) {
    case "Addition":
      return "+";
    case "Subtraction":
      return "-";
    default:
      throw new Error("Unexpected state selected");
  }
};
