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

export const ordbok: {
  substantiv: Substantiv[]
  verb: Verb[]
  egennamn: Egennamn[]
} = {
  substantiv,
  egennamn: [],
  verb
}

export const getRandomNoun = () => {
  const substantiv = ordbok.substantiv
  const randomSubstantiv =
    substantiv[Math.floor(Math.random() * substantiv.length)]
  const randomSubstantivCopy = JSON.parse(JSON.stringify(randomSubstantiv))
  const randomPluralNummer =
    pluralNummer[Math.floor(Math.random() * pluralNummer.length)]
  randomSubstantivCopy.plural.obestämd =
    randomPluralNummer + ' ' + randomSubstantiv.plural.obestämd
  randomSubstantivCopy.plural.bestämd =
    'de ' + randomPluralNummer + ' ' + randomSubstantiv.plural.bestämd
  return randomSubstantivCopy
}

export const getRandomVerb = () => {
  const verb = ordbok.verb
  return verb[Math.floor(Math.random() * verb.length)]
}
