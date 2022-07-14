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
    plural: { obestämd: 'bord', bestämd: 'de borden' }
  },
  {
    ord: 'bokhylla',
    singular: { obestämd: 'en bokhylla', bestämd: 'den bokhyllan' },
    plural: { obestämd: 'bokhyllor', bestämd: 'de bokhyllorna' }
  },
  {
    ord: 'soffa',
    singular: { obestämd: 'en soffa', bestämd: 'den soffan' },
    plural: { obestämd: 'soffor', bestämd: 'de sofforna' }
  }
]

const redskap: Substantiv[] = [
  {
    ord: 'penna',
    singular: { obestämd: 'en penna', bestämd: 'den pennan' },
    plural: { obestämd: 'pennor', bestämd: 'de pennorna' }
  },
  {
    ord: 'papper',
    singular: { obestämd: 'ett papper', bestämd: 'det pappret' },
    plural: { obestämd: 'papper', bestämd: 'de pappren' }
  }
]

const kläder: Substantiv[] = [
  {
    ord: 'sko',
    singular: { obestämd: 'en sko', bestämd: 'den skon' },
    plural: { obestämd: 'skor', bestämd: 'de skorna' }
  },
  {
    ord: 'strumpa',
    singular: { obestämd: 'en strumpa', bestämd: 'den strumpan' },
    plural: { obestämd: 'strumpor', bestämd: 'de strumporna' }
  },
  {
    ord: 'byxa',
    singular: { obestämd: 'en byxa', bestämd: 'den byxan' },
    plural: { obestämd: 'byxor', bestämd: 'de byxorna' }
  },
  {
    ord: 'tröja',
    singular: { obestämd: 'en tröja', bestämd: 'den tröjan' },
    plural: { obestämd: 'tröjor', bestämd: 'de tröjorna' }
  },
  {
    ord: 'jacka',
    singular: { obestämd: 'en jacka', bestämd: 'den jackan' },
    plural: { obestämd: 'jackor', bestämd: 'de jackorna' }
  }
]

const mat: Substantiv[] = [
  {
    ord: 'äpple',
    singular: { obestämd: 'ett äpple', bestämd: 'det äpplet' },
    plural: { obestämd: 'äpplen', bestämd: 'de äpplena' }
  },
  {
    ord: 'päron',
    singular: { obestämd: 'ett päron', bestämd: 'det päronet' },
    plural: { obestämd: 'päron', bestämd: 'de päronen' }
  },
  {
    ord: 'banan',
    singular: { obestämd: 'en banan', bestämd: 'den bananen' },
    plural: { obestämd: 'bananer', bestämd: 'de bananerna' }
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
  return substantiv[Math.floor(Math.random() * substantiv.length)]
}

export const getRandomVerb = () => {
  const verb = ordbok.verb
  return verb[Math.floor(Math.random() * verb.length)]
}
