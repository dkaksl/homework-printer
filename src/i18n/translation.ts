interface Resources {
  [key: string]: Language
}

interface Language {
  [key: string]: Dictionary
}

interface Dictionary {
  Maths: string
  ABCs: string
  difficulty: string
  Easy: string
  Medium: string
  Hard: string
  Advanced: string
  uppercase: string
  lowercase: string
  Pages: string
  'Included Operators': string
  'Included Declensions': string
  Name: string
  Date: string
  Randomize: string
  Print: string
  Zhuyin: string
  Words: string
  Nouns: string
  Verbs: string
}

export const resources: Resources = {
  en: {
    translation: {
      Maths: 'Maths',
      ABCs: 'ABCs',
      difficulty: 'Difficulty',
      Easy: 'Easy',
      Medium: 'Medium',
      Hard: 'Hard',
      Advanced: 'Advanced',
      uppercase: 'Uppercase',
      lowercase: 'Lowercase',
      Pages: 'Pages',
      'Included Operators': 'Included Operators',
      'Included Declensions': 'Included Declensions',
      Name: 'Name',
      Date: 'Date',
      Randomize: 'Randomize',
      Print: 'Print',
      Zhuyin: 'Bopomofo',
      Words: 'Words',
      Nouns: 'Nouns',
      Verbs: 'Verbs'
    }
  },
  se: {
    translation: {
      Maths: 'Matte',
      ABCs: 'Alfabetet',
      difficulty: 'Svårighetsgrad',
      Easy: 'Lätt',
      Medium: 'Mellan',
      Hard: 'Svår',
      Advanced: 'Avancerad',
      uppercase: 'Versaler',
      lowercase: 'Gemener',
      Pages: 'Sidor',
      'Included Operators': 'Inkluderade operatorer',
      'Included Declensions': 'Inkluderade böjningar',
      Name: 'Namn',
      Date: 'Datum',
      Randomize: 'Slumpa',
      Print: 'Skriv ut',
      Zhuyin: 'Bopomofo',
      Words: 'Ord',
      Nouns: 'Substantiv',
      Verbs: 'Verb'
    }
  },
  cn: {
    translation: {
      Maths: '數學',
      ABCs: '字母',
      difficulty: '難度',
      Easy: '簡單',
      Medium: '中級',
      Hard: '困難',
      Advanced: '硬核',
      uppercase: '大寫',
      lowercase: '小寫',
      Pages: '頁數',
      'Included Operators': '運算符號',
      'Included Declensions': '變格',
      Name: '名字',
      Date: '日期',
      Randomize: '隨機',
      Print: '列印',
      Zhuyin: '注音符號',
      Words: '字',
      Nouns: '名詞',
      Verbs: '動詞'
    }
  }
}
