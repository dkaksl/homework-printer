interface Resources {
  en: Language;
  se: Language;
  cn: Language;
}

interface Language {
  translation: Dictionary;
}

interface Dictionary {
  Maths: string;
  ABCs: string;
  difficulty: string;
  Easy: string;
  Medium: string;
  Hard: string;
  Advanced: string;
  Pages: string;
  "Included Operators": string;
  Name: string;
  Date: string;
  Randomize: string;
  Print: string;
}

export const resources: Resources = {
  en: {
    translation: {
      Maths: "Maths",
      ABCs: "ABCs",
      difficulty: "Difficulty",
      Easy: "Easy",
      Medium: "Medium",
      Hard: "Hard",
      Advanced: "Advanced",
      Pages: "Pages",
      "Included Operators": "Included Operators",
      Name: "Name",
      Date: "Date",
      Randomize: "Randomize",
      Print: "Print",
    },
  },
  se: {
    translation: {
      Maths: "Matte",
      ABCs: "Alfabetet",
      difficulty: "Svårighetsgrad",
      Easy: "Lätt",
      Medium: "Mellan",
      Hard: "Svår",
      Advanced: "Avancerad",
      Pages: "Sidor",
      "Included Operators": "Inkluderade operatorer",
      Name: "Namn",
      Date: "Datum",
      Randomize: "Slumpa",
      Print: "Skriv ut",
    },
  },
  cn: {
    translation: {
      Maths: "數學",
      ABCs: "英文字母",
      difficulty: "難度",
      Easy: "簡單",
      Medium: "中級",
      Hard: "高級",
      Advanced: "困難",
      Pages: "頁數",
      "Included Operators": "運算符號",
      Name: "名字",
      Date: "日期",
      Randomize: "隨機",
      Print: "列印",
    },
  },
};
