import { getRandomFromArray } from '.'
import { substantiv, Substantiv } from './dictionary/substantiv'
import { Verb, verb } from './dictionary/verb'

export enum SubstantivAlternativ {
  SingularObestämd = 'singular-obestämd',
  SingularBestämd = 'singular-bestämd',
  SingularPossessiv = 'singular-possessiv',
  PluralObestämd = 'plural-obestämd',
  PluralBestämd = 'plural-bestämd'
}

export enum VerbAlternativ {
  Nutid = 'nutid',
  Dåtid = 'dåtid',
  DåtidTidsuttryck = 'dåtid tidsuttryck'
}

const pluralNummer = ['två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio']

const pronomen = [
  'jag',
  'du',
  'han',
  'hon',
  'den',
  'vi',
  'ni',
  'de',
  'alla',
  'ingen',
  'någon'
]

const hjälpverb = {
  nutid: ['kan', 'vill', 'får', 'behöver'],
  framtid: ['kommer', 'ska']
}

const tidsuttryck = ['då', 'sen', 'först']

export const ordbok: {
  substantiv: Substantiv[]
  verb: Verb[]
} = {
  substantiv,
  verb
}

export const getRandomNoun = () => {
  const substantiv = ordbok.substantiv
  const randomSubstantiv = getRandomFromArray(substantiv)
  const randomSubstantivCopy = JSON.parse(JSON.stringify(randomSubstantiv))
  const randomPluralNummer = getRandomFromArray(pluralNummer)
  randomSubstantivCopy.plural.obestämd =
    randomPluralNummer + ' ' + randomSubstantiv.plural.obestämd
  randomSubstantivCopy.plural.bestämd =
    'de ' + randomPluralNummer + ' ' + randomSubstantiv.plural.bestämd
  return randomSubstantivCopy
}

export const getRandomVerb = () => {
  const verb = ordbok.verb
  const randomVerb = getRandomFromArray(verb)
  const randomVerbCopy = JSON.parse(JSON.stringify(randomVerb))
  const randomPronomen = getRandomFromArray(pronomen)
  const randomTidsuttryck = getRandomFromArray(tidsuttryck)
  const randomHjälpverb = {
    nutid: getRandomFromArray(hjälpverb.nutid),
    framtid: getRandomFromArray(hjälpverb.framtid)
  }
  randomVerbCopy.nutid = [
    randomPronomen,
    getRandomFromArray([randomHjälpverb.nutid, randomHjälpverb.framtid]),
    randomVerb.grundord
  ].join(' ')
  randomVerbCopy.dåtid = {
    grund: [randomPronomen, randomVerb.dåtid.preteritum].join(' '),
    tidsuttryck: [
      randomTidsuttryck,
      randomVerb.dåtid.preteritum,
      randomPronomen
    ].join(' ')
  }
  return randomVerbCopy
}
