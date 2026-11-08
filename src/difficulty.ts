export const DIFFICULTIES = ['easy', 'medium', 'hard', 'advanced'] as const

export type Difficulty = (typeof DIFFICULTIES)[number]

export const DIFFICULTY_LABEL_KEYS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  advanced: 'Advanced'
}
