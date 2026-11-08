import { Rng } from '../util/random'

const MAX_ATTEMPTS = 10000

/**
 * Draws candidates until one matches. Each level's candidate ranges are chosen
 * so a match is likely within a handful of draws; the difficulty tests run
 * thousands of seeds per level, so a range that rarely matches fails there
 * rather than in the browser.
 */
export const generateMatching = <T>(
  rng: Rng,
  candidate: (rng: Rng) => T,
  matches: (value: T) => boolean
): T => {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const value = candidate(rng)
    if (matches(value)) return value
  }
  throw new Error('No matching problem found')
}
