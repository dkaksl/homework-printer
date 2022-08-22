import { substantiv, Substantiv } from './dictionary/substantiv'
import { Verb, verb } from './dictionary/verb'

interface Egennamn {}

export enum SubstantivAlternativ {
  SingularObestämd = 'singular-obestämd',
  SingularBestämd = 'singular-bestämd',
  SingularPossessiv = 'singular-possessiv',
  PluralObestämd = 'plural-obestämd',
  PluralBestämd = 'plural-bestämd'
}

const pluralNummer = ['två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio']

const pronomen = [
  'jag',
  'du',
  'han',
  'hon',
  'den',
  'det',
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
  egennamn: Egennamn[]
} = {
  substantiv,
  egennamn: [],
  verb
}

const getRandomFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
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
  const randomVerb = verb[Math.floor(Math.random() * verb.length)]
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
    grund: [randomPronomen, randomVerb.dåtid].join(' '),
    tidsuttryck: [randomTidsuttryck, randomVerb.dåtid, randomPronomen].join(' ')
  }
}
