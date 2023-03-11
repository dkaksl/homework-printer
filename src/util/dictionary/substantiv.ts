export interface Substantiv {
  grundord: string
  artikel: 'en' | 'ett'
  singular: { obestämd: string; bestämd: string }
  plural: { obestämd: string; bestämd: string }
}

export const hus: Substantiv[] = [
  {
    grundord: 'hus',
    artikel: 'ett',
    singular: { obestämd: 'hus', bestämd: 'huset' },
    plural: { obestämd: 'hus', bestämd: 'husen' }
  },
  {
    grundord: 'kök',
    artikel: 'ett',
    singular: { obestämd: 'kök', bestämd: 'köket' },
    plural: { obestämd: 'kök', bestämd: 'köken' }
  },
  {
    grundord: 'rum',
    artikel: 'ett',
    singular: { obestämd: 'rum', bestämd: 'rummet' },
    plural: { obestämd: 'rum', bestämd: 'rummen' }
  },
  {
    grundord: 'badrum',
    artikel: 'ett',
    singular: { obestämd: 'badrum', bestämd: 'badrummet' },
    plural: { obestämd: 'badrum', bestämd: 'badrummen' }
  },
  {
    grundord: 'sovrum',
    artikel: 'ett',
    singular: { obestämd: 'sovrum', bestämd: 'sovrummet' },
    plural: { obestämd: 'sovrum', bestämd: 'sovrummen' }
  },
  {
    grundord: 'vardagsrum',
    artikel: 'ett',
    singular: { obestämd: 'vardagsrum', bestämd: 'vardagsrummet' },
    plural: { obestämd: 'vardagsrum', bestämd: 'vardagsrummen' }
  },
  {
    grundord: 'hall',
    artikel: 'en',
    singular: { obestämd: 'hall', bestämd: 'hallen' },
    plural: { obestämd: 'hallar', bestämd: 'hallarna' }
  },
  {
    grundord: 'toalett',
    artikel: 'en',
    singular: { obestämd: 'toalett', bestämd: 'toaletten' },
    plural: { obestämd: 'toaletter', bestämd: 'toaletterna' }
  },
  {
    grundord: 'gård',
    artikel: 'en',
    singular: { obestämd: 'gård', bestämd: 'gården' },
    plural: { obestämd: 'gårdar', bestämd: 'gårdarna' }
  },
  {
    grundord: 'källare',
    artikel: 'en',
    singular: { obestämd: 'källare', bestämd: 'källaren' },
    plural: { obestämd: 'källare', bestämd: 'källarna' }
  }
]

export const infrastruktur: Substantiv[] = [
  {
    grundord: 'gata',
    artikel: 'en',
    singular: { obestämd: 'gata', bestämd: 'gatan' },
    plural: { obestämd: 'gator', bestämd: 'gatorna' }
  },
  {
    grundord: 'väg',
    artikel: 'en',
    singular: { obestämd: 'väg', bestämd: 'vägen' },
    plural: { obestämd: 'vägar', bestämd: 'vägarna' }
  },
  {
    grundord: 'bilväg',
    artikel: 'en',
    singular: { obestämd: 'bilväg', bestämd: 'bilvägen' },
    plural: { obestämd: 'bilvägar', bestämd: 'bilvägarna' }
  },
  {
    grundord: 'cykelväg',
    artikel: 'en',
    singular: { obestämd: 'cykelväg', bestämd: 'cykelvägen' },
    plural: { obestämd: 'cykelvägar', bestämd: 'cykelvägarna' }
  },
  {
    grundord: 'tunnel',
    artikel: 'en',
    singular: { obestämd: 'tunnel', bestämd: 'tunneln' },
    plural: { obestämd: 'tunnlar', bestämd: 'tunnlarna' }
  }
]

export const fordon: Substantiv[] = [
  {
    grundord: 'tåg',
    artikel: 'ett',
    singular: { obestämd: 'tåg', bestämd: 'tåget' },
    plural: { obestämd: 'tåg', bestämd: 'tågen' }
  },
  {
    grundord: 'bil',
    artikel: 'en',
    singular: { obestämd: 'bil', bestämd: 'bilen' },
    plural: { obestämd: 'bilar', bestämd: 'bilarna' }
  }
]

export const möbler: Substantiv[] = [
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

export const redskap: Substantiv[] = [
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
  },
  {
    grundord: 'brev',
    artikel: 'ett',
    singular: { obestämd: 'brev', bestämd: 'brevet' },
    plural: { obestämd: 'brev', bestämd: 'breven' }
  }
]

export const dukning: Substantiv[] = [
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

export const leksaker: Substantiv[] = [
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

export const schack: Substantiv[] = [
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

export const djur: Substantiv[] = [
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

export const kläder: Substantiv[] = [
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
  },
  {
    grundord: 'armband',
    artikel: 'ett',
    singular: { obestämd: 'armband', bestämd: 'armbandet' },
    plural: { obestämd: 'armband', bestämd: 'armbanden' }
  },
  {
    grundord: 'halsband',
    artikel: 'ett',
    singular: { obestämd: 'halsband', bestämd: 'halsbandet' },
    plural: { obestämd: 'halsband', bestämd: 'halsbanden' }
  }
]

export const mat: Substantiv[] = [
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

export const kroppsdelar: Substantiv[] = [
  {
    grundord: 'öra',
    artikel: 'ett',
    singular: { obestämd: 'öra', bestämd: 'örat' },
    plural: { obestämd: 'öron', bestämd: 'öronen' }
  },
  {
    grundord: 'öga',
    artikel: 'ett',
    singular: { obestämd: 'öga', bestämd: 'ögat' },
    plural: { obestämd: 'ögon', bestämd: 'ögonen' }
  },
  {
    grundord: 'panna',
    artikel: 'en',
    singular: { obestämd: 'panna', bestämd: 'pannan' },
    plural: { obestämd: 'pannor', bestämd: 'pannorna' }
  },
  {
    grundord: 'kind',
    artikel: 'en',
    singular: { obestämd: 'kind', bestämd: 'kinden' },
    plural: { obestämd: 'kinder', bestämd: 'kinderna' }
  },
  {
    grundord: 'haka',
    artikel: 'en',
    singular: { obestämd: 'haka', bestämd: 'hakan' },
    plural: { obestämd: 'hakor', bestämd: 'hakorna' }
  },
  {
    grundord: 'mun',
    artikel: 'en',
    singular: { obestämd: 'mun', bestämd: 'munnen' },
    plural: { obestämd: 'munnar', bestämd: 'munnarna' }
  },
  {
    grundord: 'läpp',
    artikel: 'en',
    singular: { obestämd: 'läpp', bestämd: 'läppen' },
    plural: { obestämd: 'läppar', bestämd: 'läpparna' }
  },
  {
    grundord: 'hals',
    artikel: 'en',
    singular: { obestämd: 'hals', bestämd: 'halsen' },
    plural: { obestämd: 'halsar', bestämd: 'halsarna' }
  },
  {
    grundord: 'nacke',
    artikel: 'en',
    singular: { obestämd: 'nacke', bestämd: 'nacken' },
    plural: { obestämd: 'nackar', bestämd: 'nackarna' }
  }
]

export const substantiv = [
  ...hus,
  ...infrastruktur,
  ...fordon,
  ...möbler,
  ...redskap,
  ...dukning,
  ...kläder,
  ...mat,
  ...leksaker,
  ...schack,
  ...djur,
  ...kroppsdelar
]
