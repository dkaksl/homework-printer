export interface Ord {
  ord: string
}

interface Egennamn extends Ord {}

export enum SubstantivAlternativ {
  SingularObestämd = 'singular-obestämd',
  SingularBestämd = 'singular-bestämd',
  PluralObestämd = 'plural-obestämd',
  PluralBestämd = 'plural-bestämd'
}

const pluralNummer = ['två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio']

interface Substantiv extends Ord {
  singular: { obestämd: string; bestämd: string }
  plural: { obestämd: string; bestämd: string }
}

interface Verb extends Ord {
  framtid: {
    futurum: string
  }
  dåtid: {
    preteritum: string
  }
}

const möbler: Substantiv[] = [
  {
    ord: 'bord',
    singular: { obestämd: 'ett bord', bestämd: 'det bordet' },
    plural: { obestämd: 'bord', bestämd: 'borden' }
  },
  {
    ord: 'bokhylla',
    singular: { obestämd: 'en bokhylla', bestämd: 'den bokhyllan' },
    plural: { obestämd: 'bokhyllor', bestämd: 'bokhyllorna' }
  },
  {
    ord: 'soffa',
    singular: { obestämd: 'en soffa', bestämd: 'den soffan' },
    plural: { obestämd: 'soffor', bestämd: 'sofforna' }
  }
]

const redskap: Substantiv[] = [
  {
    ord: 'penna',
    singular: { obestämd: 'en penna', bestämd: 'den pennan' },
    plural: { obestämd: 'pennor', bestämd: 'pennorna' }
  },
  {
    ord: 'papper',
    singular: { obestämd: 'ett papper', bestämd: 'det pappret' },
    plural: { obestämd: 'papper', bestämd: 'pappren' }
  }
]

const kläder: Substantiv[] = [
  {
    ord: 'sko',
    singular: { obestämd: 'en sko', bestämd: 'den skon' },
    plural: { obestämd: 'skor', bestämd: 'skorna' }
  },
  {
    ord: 'strumpa',
    singular: { obestämd: 'en strumpa', bestämd: 'den strumpan' },
    plural: { obestämd: 'strumpor', bestämd: 'strumporna' }
  },
  {
    ord: 'byxa',
    singular: { obestämd: 'en byxa', bestämd: 'den byxan' },
    plural: { obestämd: 'byxor', bestämd: 'byxorna' }
  },
  {
    ord: 'tröja',
    singular: { obestämd: 'en tröja', bestämd: 'den tröjan' },
    plural: { obestämd: 'tröjor', bestämd: 'tröjorna' }
  },
  {
    ord: 'jacka',
    singular: { obestämd: 'en jacka', bestämd: 'den jackan' },
    plural: { obestämd: 'jackor', bestämd: 'jackorna' }
  }
]

const mat: Substantiv[] = [
  {
    ord: 'äpple',
    singular: { obestämd: 'ett äpple', bestämd: 'det äpplet' },
    plural: { obestämd: 'äpplen', bestämd: 'äpplena' }
  },
  {
    ord: 'päron',
    singular: { obestämd: 'ett päron', bestämd: 'det päronet' },
    plural: { obestämd: 'päron', bestämd: 'päronen' }
  },
  {
    ord: 'banan',
    singular: { obestämd: 'en banan', bestämd: 'den bananen' },
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
      ord: 'skriva',
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
