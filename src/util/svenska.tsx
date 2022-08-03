interface Egennamn {}

export enum SubstantivAlternativ {
  SingularObestämd = 'singular-obestämd',
  SingularBestämd = 'singular-bestämd',
  PluralObestämd = 'plural-obestämd',
  PluralBestämd = 'plural-bestämd'
}

const pluralNummer = ['två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio']

interface Substantiv {
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
    singular: { obestämd: 'ett bord', bestämd: 'det bordet' },
    plural: { obestämd: 'bord', bestämd: 'borden' }
  },
  {
    singular: { obestämd: 'en bokhylla', bestämd: 'den bokhyllan' },
    plural: { obestämd: 'bokhyllor', bestämd: 'bokhyllorna' }
  },
  {
    singular: { obestämd: 'en soffa', bestämd: 'den soffan' },
    plural: { obestämd: 'soffor', bestämd: 'sofforna' }
  }
]

const redskap: Substantiv[] = [
  {
    singular: { obestämd: 'en penna', bestämd: 'den pennan' },
    plural: { obestämd: 'pennor', bestämd: 'pennorna' }
  },
  {
    singular: { obestämd: 'ett papper', bestämd: 'det pappret' },
    plural: { obestämd: 'papper', bestämd: 'pappren' }
  }
]

const kläder: Substantiv[] = [
  {
    singular: { obestämd: 'en sko', bestämd: 'den skon' },
    plural: { obestämd: 'skor', bestämd: 'skorna' }
  },
  {
    singular: { obestämd: 'en strumpa', bestämd: 'den strumpan' },
    plural: { obestämd: 'strumpor', bestämd: 'strumporna' }
  },
  {
    singular: { obestämd: 'en byxa', bestämd: 'den byxan' },
    plural: { obestämd: 'byxor', bestämd: 'byxorna' }
  },
  {
    singular: { obestämd: 'en tröja', bestämd: 'den tröjan' },
    plural: { obestämd: 'tröjor', bestämd: 'tröjorna' }
  },
  {
    singular: { obestämd: 'en jacka', bestämd: 'den jackan' },
    plural: { obestämd: 'jackor', bestämd: 'jackorna' }
  }
]

const mat: Substantiv[] = [
  {
    singular: { obestämd: 'ett äpple', bestämd: 'det äpplet' },
    plural: { obestämd: 'äpplen', bestämd: 'äpplena' }
  },
  {
    singular: { obestämd: 'ett päron', bestämd: 'det päronet' },
    plural: { obestämd: 'päron', bestämd: 'päronen' }
  },
  {
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
