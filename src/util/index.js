const getMaxNumber = (difficulty) => {
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

export const generateRowData = (rowCount, difficulty, operator) => {
  const maxNumber = getMaxNumber();
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
