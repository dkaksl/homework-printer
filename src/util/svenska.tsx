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

const dukning: Substantiv[] = [
  {
    grundord: 'tallrik',
    artikel: 'en',
    singular: { obestämd: 'tallrik', bestämd: 'tallriken' },
    plural: { obestämd: 'tallrikar', bestämd: 'tallrikarna' }
  },
  {
    grundord: 'skål',
    artikel: 'en',
    singular: { obestämd: 'skål', bestämd: 'skålen' },
    plural: { obestämd: 'skålar', bestämd: 'skålarna' }
  },
  {
    grundord: 'sked',
    artikel: 'en',
    singular: { obestämd: 'sked', bestämd: 'skeden' },
    plural: { obestämd: 'skedar', bestämd: 'skedarna' }
  },
  {
    grundord: 'kniv',
    artikel: 'en',
    singular: { obestämd: 'kniv', bestämd: 'kniven' },
    plural: { obestämd: 'knivar', bestämd: 'knivarna' }
  },
  {
    grundord: 'gaffel',
    artikel: 'en',
    singular: { obestämd: 'gaffel', bestämd: 'gaffeln' },
    plural: { obestämd: 'gafflar', bestämd: 'gafflarna' }
  },
  {
    grundord: 'glas',
    artikel: 'ett',
    singular: { obestämd: 'glas', bestämd: 'glaset' },
    plural: { obestämd: 'glas', bestämd: 'glasen' }
  },
  {
    grundord: 'mugg',
    artikel: 'en',
    singular: { obestämd: 'mugg', bestämd: 'muggen' },
    plural: { obestämd: 'muggar', bestämd: 'muggarna' }
  },
  {
    grundord: 'kopp',
    artikel: 'en',
    singular: { obestämd: 'kopp', bestämd: 'koppen' },
    plural: { obestämd: 'koppar', bestämd: 'kopparna' }
  },
  {
    grundord: 'sugrör',
    artikel: 'ett',
    singular: { obestämd: 'sugrör', bestämd: 'sugröret' },
    plural: { obestämd: 'sugrör', bestämd: 'sugrören' }
  }
]

const leksaker: Substantiv[] = [
  {
    grundord: 'leksak',
    artikel: 'en',
    singular: { obestämd: 'leksak', bestämd: 'leksaken' },
    plural: { obestämd: 'leksaker', bestämd: 'leksakerna' }
  },
  {
    grundord: 'boll',
    artikel: 'en',
    singular: { obestämd: 'boll', bestämd: 'bollen' },
    plural: { obestämd: 'bollar', bestämd: 'bollarna' }
  },
  {
    grundord: 'legobit',
    artikel: 'en',
    singular: { obestämd: 'legobit', bestämd: 'legobiten' },
    plural: { obestämd: 'legobitar', bestämd: 'legobitarna' }
  },
  {
    grundord: 'spel',
    artikel: 'ett',
    singular: { obestämd: 'spel', bestämd: 'spelet' },
    plural: { obestämd: 'spel', bestämd: 'spelen' }
  }
]

const schack: Substantiv[] = [
  {
    grundord: 'bräde',
    artikel: 'ett',
    singular: { obestämd: 'bräde', bestämd: 'brädet' },
    plural: { obestämd: 'bräden', bestämd: 'brädena' }
  },
  {
    grundord: 'pjäs',
    artikel: 'en',
    singular: { obestämd: 'pjäs', bestämd: 'pjäsen' },
    plural: { obestämd: 'pjäser', bestämd: 'pjäserna' }
  },
  {
    grundord: 'bonde',
    artikel: 'en',
    singular: { obestämd: 'bonde', bestämd: 'bonden' },
    plural: { obestämd: 'bönder', bestämd: 'bönderna' }
  },
  {
    grundord: 'torn',
    artikel: 'ett',
    singular: { obestämd: 'torn', bestämd: 'tornet' },
    plural: { obestämd: 'torn', bestämd: 'tornen' }
  },
  {
    grundord: 'springare',
    artikel: 'en',
    singular: { obestämd: 'springare', bestämd: 'springaren' },
    plural: { obestämd: 'springare', bestämd: 'springarna' }
  },
  {
    grundord: 'löpare',
    artikel: 'en',
    singular: { obestämd: 'löpare', bestämd: 'löparen' },
    plural: { obestämd: 'löpare', bestämd: 'löparna' }
  },
  {
    grundord: 'dam',
    artikel: 'en',
    singular: { obestämd: 'dam', bestämd: 'damen' },
    plural: { obestämd: 'damer', bestämd: 'damerna' }
  },
  {
    grundord: 'kung',
    artikel: 'en',
    singular: { obestämd: 'kung', bestämd: 'kungen' },
    plural: { obestämd: 'kungar', bestämd: 'kungarna' }
  }
]

const djur: Substantiv[] = [
  {
    grundord: 'djur',
    artikel: 'ett',
    singular: { obestämd: 'djur', bestämd: 'djuret' },
    plural: { obestämd: 'djur', bestämd: 'djuren' }
  },
  {
    grundord: 'hund',
    artikel: 'en',
    singular: { obestämd: 'hund', bestämd: 'hunden' },
    plural: { obestämd: 'hundar', bestämd: 'hundarna' }
  },
  {
    grundord: 'katt',
    artikel: 'en',
    singular: { obestämd: 'katt', bestämd: 'katten' },
    plural: { obestämd: 'katter', bestämd: 'katterna' }
  },
  {
    grundord: 'kanin',
    artikel: 'en',
    singular: { obestämd: 'kanin', bestämd: 'kaninen' },
    plural: { obestämd: 'kaniner', bestämd: 'kaninerna' }
  },
  {
    grundord: 'monster',
    artikel: 'ett',
    singular: { obestämd: 'monster', bestämd: 'monstret' },
    plural: { obestämd: 'monster', bestämd: 'monstrena' }
  },
  {
    grundord: 'häst',
    artikel: 'en',
    singular: { obestämd: 'häst', bestämd: 'hästen' },
    plural: { obestämd: 'hästar', bestämd: 'hästarna' }
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
  substantiv: [
    ...möbler,
    ...redskap,
    ...dukning,
    ...kläder,
    ...mat,
    ...leksaker,
    ...schack,
    ...djur
  ],
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
