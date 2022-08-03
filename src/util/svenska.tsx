interface Egennamn {}

export enum SubstantivAlternativ {
  SingularObestämd = 'singular-obestämd',
  SingularBestämd = 'singular-bestämd',
  SingularPossessiv = 'singular-possessiv',
  PluralObestämd = 'plural-obestämd',
  PluralBestämd = 'plural-bestämd'
}

const pluralNummer = ['två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio']

interface Substantiv {
  grundord: string
  artikel: 'en' | 'ett'
  singular: { obestämd: string; bestämd: string }
  plural: { obestämd: string; bestämd: string }
}

interface Verb {
  framtid: {
    futurum: string
  }
  dåtid: {
    preteritum: string
  }
}

const möbler: Substantiv[] = [
  {
    grundord: 'bord',
    artikel: 'ett',
    singular: { obestämd: 'bord', bestämd: 'bordet' },
    plural: { obestämd: 'bord', bestämd: 'borden' }
  },
  {
    grundord: 'bokhylla',
    artikel: 'en',
    singular: { obestämd: 'bokhylla', bestämd: 'bokhyllan' },
    plural: { obestämd: 'bokhyllor', bestämd: 'bokhyllorna' }
  },
  {
    grundord: 'soffa',
    artikel: 'en',
    singular: { obestämd: 'soffa', bestämd: 'soffan' },
    plural: { obestämd: 'soffor', bestämd: 'sofforna' }
  }
]

const redskap: Substantiv[] = [
  {
    grundord: 'penna',
    artikel: 'en',
    singular: { obestämd: 'penna', bestämd: 'pennan' },
    plural: { obestämd: 'pennor', bestämd: 'pennorna' }
  },
  {
    grundord: 'papper',
    artikel: 'ett',
    singular: { obestämd: 'papper', bestämd: 'pappret' },
    plural: { obestämd: 'papper', bestämd: 'pappren' }
  }
]

const kläder: Substantiv[] = [
  {
    grundord: 'sko',
    artikel: 'en',
    singular: { obestämd: 'sko', bestämd: 'skon' },
    plural: { obestämd: 'skor', bestämd: 'skorna' }
  },
  {
    grundord: 'strumpa',
    artikel: 'en',
    singular: { obestämd: 'strumpa', bestämd: 'strumpan' },
    plural: { obestämd: 'strumpor', bestämd: 'strumporna' }
  },
  {
    grundord: 'byxa',
    artikel: 'en',
    singular: { obestämd: 'byxa', bestämd: 'byxan' },
    plural: { obestämd: 'byxor', bestämd: 'byxorna' }
  },
  {
    grundord: 'tröja',
    artikel: 'en',
    singular: { obestämd: 'tröja', bestämd: 'tröjan' },
    plural: { obestämd: 'tröjor', bestämd: 'tröjorna' }
  },
  {
    grundord: 'jacka',
    artikel: 'en',
    singular: { obestämd: 'jacka', bestämd: 'jackan' },
    plural: { obestämd: 'jackor', bestämd: 'jackorna' }
  }
]

const mat: Substantiv[] = [
  {
    grundord: 'äpple',
    artikel: 'ett',
    singular: { obestämd: 'äpple', bestämd: 'äpplet' },
    plural: { obestämd: 'äpplen', bestämd: 'äpplena' }
  },
  {
    grundord: 'päron',
    artikel: 'ett',
    singular: { obestämd: 'päron', bestämd: 'päronet' },
    plural: { obestämd: 'päron', bestämd: 'päronen' }
  },
  {
    grundord: 'banan',
    artikel: 'en',
    singular: { obestämd: 'banan', bestämd: 'bananen' },
    plural: { obestämd: 'bananer', bestämd: 'bananerna' }
  }
]

export const ordbok: {
  substantiv: Substantiv[]
  verb: Verb[]
  egennamn: Egennamn[]
} = {
  substantiv: [...möbler, ...redskap, ...kläder, ...mat],
  egennamn: [],
  verb: [
    {
      dåtid: { preteritum: 'skrev' },
      framtid: { futurum: 'ska skriva' }
    }
  ]
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
