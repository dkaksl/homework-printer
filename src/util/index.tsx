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

export const generateRowData = (
  rowCount: number,
  difficulty: Difficulty,
  operator: Operator
): RowData[] => {
  const maxNumber = getMaxNumber(difficulty);
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    const a = Math.floor(Math.random() * maxNumber);
    const b = Math.floor(
      Math.random() * (difficulty === "advanced" ? maxNumber : a)
    );
    rows.push({ a, b, operator });
  }
  return rows;
};
