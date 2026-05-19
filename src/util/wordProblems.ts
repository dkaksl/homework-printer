import { Difficulty } from '../views/main'

type TFunc = (key: string, options?: Record<string, string | number>) => string

const SINGULAR_MAP: Record<string, Record<string, string>> = {
  en: {
    apples: 'apple', marbles: 'marble', coins: 'coin', shells: 'shell',
    stickers: 'sticker', feathers: 'feather', buttons: 'button', leaves: 'leaf',
    ribbons: 'ribbon', badges: 'badge', tokens: 'token', gems: 'gem',
    seeds: 'seed', acorns: 'acorn', crayons: 'crayon', flowers: 'flower',
    pebbles: 'pebble', stamps: 'stamp', beads: 'bead', pinecones: 'pinecone',
    cards: 'card', balloons: 'balloon', books: 'book', pencils: 'pencil',
    minutes: 'minute', dollars: 'dollar', metres: 'metre', litres: 'litre', points: 'point',
  },
  se: {
    äpplen: 'äpple', kulor: 'kula', snäckor: 'snäcka',
    klistermärken: 'klistermärke', fjädrar: 'fjäder', knappar: 'knapp',
    märken: 'märke', brickor: 'bricka', ädelstenar: 'ädelsten',
    frön: 'frö', kritor: 'krita', blommor: 'blomma', stenar: 'sten',
    frimärken: 'frimärke', pärlor: 'pärla', kottar: 'kotte',
    ballonger: 'ballong', böcker: 'bok', pennor: 'penna',
    minuter: 'minut', kronor: 'krona',
  },
}

function fixSingular(text: string, lang: string): string {
  const map = SINGULAR_MAP[lang]
  if (!map) return text
  return text.replace(/\b1 ([^\s]+)/g, (match, word) => {
    const singular = map[word]
    return singular != null ? `1 ${singular}` : match
  })
}
type Operator = '+' | '-'
type Computation =
  | 'add' | 'sub'
  | 'add3' | 'sub3' | 'mix3'
  | 'dec-add' | 'dec-sub'
  | 'compare'

export interface WordProblem {
  text: string
  answer: number | string   // string for comparison ('>' | '<' | '=')
  emoji: string
  answerHint?: string       // replaces "Answer:" label when set
  isStory?: boolean         // renders as a full-width card
  comparison?: { labelA: string; labelB: string }  // renders pre-filled "labelA □ labelB" answer row
}

// Index matches the 24 items in wp-items (same order across all languages)
const ITEM_EMOJIS = [
  '🍎', '🔮', '🪙', '🐚', '⭐', '🪶', '🔘', '🍃',
  '🎀', '🏅', '🎟️', '💎', '🌱', '🌰', '🖍️', '🌸',
  '🪨', '✉️', '📿', '🌲', '🃏', '🎈', '📚', '✏️'
]

// Per-template override emojis for decimal problems
const DEC_EMOJI: Record<string, string> = {
  'wp-dec-add-1': '⚖️',
  'wp-dec-add-2': '💧',
  'wp-dec-sub-1': '📏',
  'wp-dec-sub-2': '🎨'
}

interface Option {
  pool: string[]
  emojiFor: (key: string, itemEmoji: string) => string
  computation: Computation
  isStory?: boolean
  weight: number
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function weightedPick(opts: Option[]): Option {
  const total = opts.reduce((s, o) => s + o.weight, 0)
  let r = Math.random() * total
  for (const o of opts) {
    r -= o.weight
    if (r <= 0) return o
  }
  return opts[opts.length - 1]
}

function getMaxNumber(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 10
    case 'medium': return 20
    case 'hard': return 50
    case 'advanced': return 100
  }
}

function buildOptions(
  operator: Operator,
  difficulty: Difficulty,
  hasBoth: boolean
): Option[] {
  const opts: Option[] = []
  const isMedPlus = difficulty !== 'easy'
  const isHardPlus = difficulty === 'hard' || difficulty === 'advanced'

  // ── Item-based 2-number (always available) ────────────────────────────────
  opts.push({
    pool: operator === '+'
      ? ['wp-add-1','wp-add-2','wp-add-3','wp-add-4','wp-add-5','wp-add-6','wp-add-7','wp-add-8']
      : ['wp-sub-1','wp-sub-2','wp-sub-3','wp-sub-4','wp-sub-5','wp-sub-6','wp-sub-7','wp-sub-8'],
    emojiFor: (_, ie) => ie,
    computation: operator === '+' ? 'add' : 'sub',
    weight: 4
  })

  if (isMedPlus) {
    // Money
    opts.push({
      pool: operator === '+'
        ? ['wp-money-add-1','wp-money-add-2','wp-money-add-3']
        : ['wp-money-sub-1','wp-money-sub-2','wp-money-sub-3'],
      emojiFor: () => '💰',
      computation: operator === '+' ? 'add' : 'sub',
      weight: 1.5
    })
    // Time
    opts.push({
      pool: operator === '+'
        ? ['wp-time-add-1','wp-time-add-2']
        : ['wp-time-sub-1','wp-time-sub-2'],
      emojiFor: () => '⏰',
      computation: operator === '+' ? 'add' : 'sub',
      weight: 1.5
    })
    // Story problems (long paragraph, renders full-width)
    opts.push({
      pool: operator === '+'
        ? ['wp-story-add-1','wp-story-add-2','wp-story-add-3']
        : ['wp-story-sub-1','wp-story-sub-2','wp-story-sub-3'],
      emojiFor: () => '📖',
      computation: operator === '+' ? 'add' : 'sub',
      isStory: true,
      weight: 1.5
    })
    // Comparison — not tied to operator
    opts.push({
      pool: ['wp-cmp-1','wp-cmp-2','wp-cmp-3'],
      emojiFor: () => '⚖️',
      computation: 'compare',
      weight: 1
    })
  }

  if (isHardPlus) {
    // Measurement
    opts.push({
      pool: operator === '+'
        ? ['wp-meas-add-1','wp-meas-add-2']
        : ['wp-meas-sub-1','wp-meas-sub-2'],
      emojiFor: () => '📏',
      computation: operator === '+' ? 'add' : 'sub',
      weight: 1
    })
    // Decimals (per-template emoji via DEC_EMOJI)
    opts.push({
      pool: operator === '+'
        ? ['wp-dec-add-1','wp-dec-add-2']
        : ['wp-dec-sub-1','wp-dec-sub-2'],
      emojiFor: (key) => DEC_EMOJI[key] ?? '🔢',
      computation: operator === '+' ? 'dec-add' : 'dec-sub',
      weight: 1.5
    })
    // 3-number item problems
    if (operator === '+') {
      opts.push({
        pool: ['wp-add3-1','wp-add3-2','wp-add3-3'],
        emojiFor: (_, ie) => ie,
        computation: 'add3',
        weight: 2
      })
    } else {
      opts.push({
        pool: ['wp-sub3-1','wp-sub3-2','wp-sub3-3'],
        emojiFor: (_, ie) => ie,
        computation: 'sub3',
        weight: 2
      })
    }
    if (hasBoth) {
      opts.push({
        pool: ['wp-mix3-1','wp-mix3-2'],
        emojiFor: (_, ie) => ie,
        computation: 'mix3',
        weight: 1.5
      })
    }
  }

  return opts
}

function generateProblem(
  t: TFunc,
  lang: string,
  operator: Operator,
  difficulty: Difficulty,
  hasBoth: boolean
): WordProblem {
  const max = getMaxNumber(difficulty)
  const chosen = weightedPick(buildOptions(operator, difficulty, hasBoth))
  const templateKey = pickRandom(chosen.pool)

  // Names — pick up to 3 distinct
  const names = t('wp-names').split('|')
  const name1 = pickRandom(names)
  const pool2 = names.filter((n) => n !== name1)
  const name2 = pool2.length > 0 ? pickRandom(pool2) : names[0]
  const pool3 = pool2.filter((n) => n !== name2)
  const name3 = pool3.length > 0 ? pickRandom(pool3) : names[0]

  // Item + its emoji
  const itemPool = t('wp-items').split('|')
  const itemIdx = Math.floor(Math.random() * itemPool.length)
  const item = itemPool[itemIdx]
  const itemEmoji = ITEM_EMOJIS[itemIdx] ?? '📦'
  const emoji = chosen.emojiFor(templateKey, itemEmoji)

  let a = 0, b = 0, c = 0
  let answer: number | string = 0
  let answerHint: string | undefined
  let cmpLabelA = '', cmpLabelB = ''

  switch (chosen.computation) {
    case 'add':
      a = rand(1, max); b = rand(1, max)
      answer = a + b
      break

    case 'sub':
      a = rand(1, max); b = rand(1, max)
      if (a < b) [a, b] = [b, a]
      if (a === b && a > 1) b--
      answer = a - b
      break

    case 'add3':
      a = rand(1, max); b = rand(1, max); c = rand(1, max)
      answer = a + b + c
      break

    case 'sub3': {
      const minA = Math.max(3, Math.ceil(max * 0.25))
      a = rand(minA, max)
      b = rand(1, Math.floor((a - 1) / 2))
      c = rand(1, a - b - 1)
      answer = a - b - c
      break
    }

    case 'mix3': {
      a = rand(1, max); b = rand(1, max)
      const total = a + b
      c = rand(1, total - 1)
      answer = total - c
      break
    }

    case 'dec-add': {
      // Work in tenths to avoid floating-point surprises
      const decMax = Math.max(2, Math.floor(max / 5))
      const at = rand(11, decMax * 10)
      const bt = rand(11, decMax * 10)
      a = at / 10; b = bt / 10
      answer = (at + bt) / 10
      break
    }

    case 'dec-sub': {
      const decMax = Math.max(4, Math.floor(max / 5))
      const at = rand(31, decMax * 10)   // at least 3.1
      const bt = rand(11, at - 10)       // result always >= 1.0
      a = at / 10; b = bt / 10
      answer = (at - bt) / 10
      break
    }

    case 'compare': {
      a = rand(1, max); b = rand(1, max)
      if (a === b) b = b > 1 ? b - 1 : b + 1
      answer = a > b ? '>' : a < b ? '<' : '='
      // wp-cmp-2 pits coloured jars against each other; others compare named people
      cmpLabelA = templateKey === 'wp-cmp-2' ? t('wp-cmp-red') : name1
      cmpLabelB = templateKey === 'wp-cmp-2' ? t('wp-cmp-blue') : name2
      break
    }
  }

  const text = fixSingular(
    t(templateKey, { name1, name2, name3, a, b, c, item }),
    lang
  )
  const comparison =
    chosen.computation === 'compare'
      ? { labelA: cmpLabelA, labelB: cmpLabelB }
      : undefined
  return { text, answer, emoji, answerHint, isStory: chosen.isStory, comparison }
}

export function generateWordProblems(
  t: TFunc,
  lang: string,
  count: number,
  operators: Operator[],
  difficulty: Difficulty
): WordProblem[] {
  const hasBoth = operators.includes('+') && operators.includes('-')
  const problems: WordProblem[] = []
  for (let i = 0; i < count; i++) {
    const op = pickRandom(operators)
    problems.push(generateProblem(t, lang, op, difficulty, hasBoth))
  }
  return shuffle(problems)
}
