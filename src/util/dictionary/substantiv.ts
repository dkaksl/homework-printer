export interface Substantiv {
  artikel: 'en' | 'ett'
  singular: { obestämd: string; bestämd: string }
  plural: { obestämd: string; bestämd: string }
}

export const hus: Substantiv[] = [
  {
    artikel: 'ett',
    singular: { obestämd: 'hus', bestämd: 'huset' },
    plural: { obestämd: 'hus', bestämd: 'husen' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'kök', bestämd: 'köket' },
    plural: { obestämd: 'kök', bestämd: 'köken' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'rum', bestämd: 'rummet' },
    plural: { obestämd: 'rum', bestämd: 'rummen' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'badrum', bestämd: 'badrummet' },
    plural: { obestämd: 'badrum', bestämd: 'badrummen' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'sovrum', bestämd: 'sovrummet' },
    plural: { obestämd: 'sovrum', bestämd: 'sovrummen' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'vardagsrum', bestämd: 'vardagsrummet' },
    plural: { obestämd: 'vardagsrum', bestämd: 'vardagsrummen' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'hall', bestämd: 'hallen' },
    plural: { obestämd: 'hallar', bestämd: 'hallarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'toalett', bestämd: 'toaletten' },
    plural: { obestämd: 'toaletter', bestämd: 'toaletterna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'gård', bestämd: 'gården' },
    plural: { obestämd: 'gårdar', bestämd: 'gårdarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'källare', bestämd: 'källaren' },
    plural: { obestämd: 'källare', bestämd: 'källarna' }
  }
]

export const infrastruktur: Substantiv[] = [
  {
    artikel: 'en',
    singular: { obestämd: 'gata', bestämd: 'gatan' },
    plural: { obestämd: 'gator', bestämd: 'gatorna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'väg', bestämd: 'vägen' },
    plural: { obestämd: 'vägar', bestämd: 'vägarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'bilväg', bestämd: 'bilvägen' },
    plural: { obestämd: 'bilvägar', bestämd: 'bilvägarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'cykelväg', bestämd: 'cykelvägen' },
    plural: { obestämd: 'cykelvägar', bestämd: 'cykelvägarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'tunnel', bestämd: 'tunneln' },
    plural: { obestämd: 'tunnlar', bestämd: 'tunnlarna' }
  }
]

export const fordon: Substantiv[] = [
  {
    artikel: 'ett',
    singular: { obestämd: 'tåg', bestämd: 'tåget' },
    plural: { obestämd: 'tåg', bestämd: 'tågen' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'bil', bestämd: 'bilen' },
    plural: { obestämd: 'bilar', bestämd: 'bilarna' }
  }
]

export const möbler: Substantiv[] = [
  {
    artikel: 'ett',
    singular: { obestämd: 'bord', bestämd: 'bordet' },
    plural: { obestämd: 'bord', bestämd: 'borden' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'bokhylla', bestämd: 'bokhyllan' },
    plural: { obestämd: 'bokhyllor', bestämd: 'bokhyllorna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'soffa', bestämd: 'soffan' },
    plural: { obestämd: 'soffor', bestämd: 'sofforna' }
  }
]

export const redskap: Substantiv[] = [
  {
    artikel: 'en',
    singular: { obestämd: 'penna', bestämd: 'pennan' },
    plural: { obestämd: 'pennor', bestämd: 'pennorna' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'papper', bestämd: 'pappret' },
    plural: { obestämd: 'papper', bestämd: 'pappren' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'brev', bestämd: 'brevet' },
    plural: { obestämd: 'brev', bestämd: 'breven' }
  }
]

export const dukning: Substantiv[] = [
  {
    artikel: 'en',
    singular: { obestämd: 'tallrik', bestämd: 'tallriken' },
    plural: { obestämd: 'tallrikar', bestämd: 'tallrikarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'skål', bestämd: 'skålen' },
    plural: { obestämd: 'skålar', bestämd: 'skålarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'sked', bestämd: 'skeden' },
    plural: { obestämd: 'skedar', bestämd: 'skedarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'kniv', bestämd: 'kniven' },
    plural: { obestämd: 'knivar', bestämd: 'knivarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'gaffel', bestämd: 'gaffeln' },
    plural: { obestämd: 'gafflar', bestämd: 'gafflarna' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'glas', bestämd: 'glaset' },
    plural: { obestämd: 'glas', bestämd: 'glasen' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'mugg', bestämd: 'muggen' },
    plural: { obestämd: 'muggar', bestämd: 'muggarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'kopp', bestämd: 'koppen' },
    plural: { obestämd: 'koppar', bestämd: 'kopparna' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'sugrör', bestämd: 'sugröret' },
    plural: { obestämd: 'sugrör', bestämd: 'sugrören' }
  }
]

export const leksaker: Substantiv[] = [
  {
    artikel: 'en',
    singular: { obestämd: 'leksak', bestämd: 'leksaken' },
    plural: { obestämd: 'leksaker', bestämd: 'leksakerna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'boll', bestämd: 'bollen' },
    plural: { obestämd: 'bollar', bestämd: 'bollarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'legobit', bestämd: 'legobiten' },
    plural: { obestämd: 'legobitar', bestämd: 'legobitarna' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'spel', bestämd: 'spelet' },
    plural: { obestämd: 'spel', bestämd: 'spelen' }
  }
]

export const schack: Substantiv[] = [
  {
    artikel: 'ett',
    singular: { obestämd: 'bräde', bestämd: 'brädet' },
    plural: { obestämd: 'bräden', bestämd: 'brädena' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'pjäs', bestämd: 'pjäsen' },
    plural: { obestämd: 'pjäser', bestämd: 'pjäserna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'bonde', bestämd: 'bonden' },
    plural: { obestämd: 'bönder', bestämd: 'bönderna' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'torn', bestämd: 'tornet' },
    plural: { obestämd: 'torn', bestämd: 'tornen' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'springare', bestämd: 'springaren' },
    plural: { obestämd: 'springare', bestämd: 'springarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'löpare', bestämd: 'löparen' },
    plural: { obestämd: 'löpare', bestämd: 'löparna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'dam', bestämd: 'damen' },
    plural: { obestämd: 'damer', bestämd: 'damerna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'kung', bestämd: 'kungen' },
    plural: { obestämd: 'kungar', bestämd: 'kungarna' }
  }
]

export const djur: Substantiv[] = [
  {
    artikel: 'ett',
    singular: { obestämd: 'djur', bestämd: 'djuret' },
    plural: { obestämd: 'djur', bestämd: 'djuren' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'hund', bestämd: 'hunden' },
    plural: { obestämd: 'hundar', bestämd: 'hundarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'katt', bestämd: 'katten' },
    plural: { obestämd: 'katter', bestämd: 'katterna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'kanin', bestämd: 'kaninen' },
    plural: { obestämd: 'kaniner', bestämd: 'kaninerna' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'monster', bestämd: 'monstret' },
    plural: { obestämd: 'monster', bestämd: 'monstrena' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'häst', bestämd: 'hästen' },
    plural: { obestämd: 'hästar', bestämd: 'hästarna' }
  }
]

export const kläder: Substantiv[] = [
  {
    artikel: 'en',
    singular: { obestämd: 'sko', bestämd: 'skon' },
    plural: { obestämd: 'skor', bestämd: 'skorna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'strumpa', bestämd: 'strumpan' },
    plural: { obestämd: 'strumpor', bestämd: 'strumporna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'byxa', bestämd: 'byxan' },
    plural: { obestämd: 'byxor', bestämd: 'byxorna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'tröja', bestämd: 'tröjan' },
    plural: { obestämd: 'tröjor', bestämd: 'tröjorna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'jacka', bestämd: 'jackan' },
    plural: { obestämd: 'jackor', bestämd: 'jackorna' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'armband', bestämd: 'armbandet' },
    plural: { obestämd: 'armband', bestämd: 'armbanden' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'halsband', bestämd: 'halsbandet' },
    plural: { obestämd: 'halsband', bestämd: 'halsbanden' }
  }
]

export const mat: Substantiv[] = [
  {
    artikel: 'ett',
    singular: { obestämd: 'äpple', bestämd: 'äpplet' },
    plural: { obestämd: 'äpplen', bestämd: 'äpplena' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'päron', bestämd: 'päronet' },
    plural: { obestämd: 'päron', bestämd: 'päronen' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'banan', bestämd: 'bananen' },
    plural: { obestämd: 'bananer', bestämd: 'bananerna' }
  }
]

export const kroppsdelar: Substantiv[] = [
  {
    artikel: 'ett',
    singular: { obestämd: 'öra', bestämd: 'örat' },
    plural: { obestämd: 'öron', bestämd: 'öronen' }
  },
  {
    artikel: 'ett',
    singular: { obestämd: 'öga', bestämd: 'ögat' },
    plural: { obestämd: 'ögon', bestämd: 'ögonen' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'panna', bestämd: 'pannan' },
    plural: { obestämd: 'pannor', bestämd: 'pannorna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'kind', bestämd: 'kinden' },
    plural: { obestämd: 'kinder', bestämd: 'kinderna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'haka', bestämd: 'hakan' },
    plural: { obestämd: 'hakor', bestämd: 'hakorna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'mun', bestämd: 'munnen' },
    plural: { obestämd: 'munnar', bestämd: 'munnarna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'läpp', bestämd: 'läppen' },
    plural: { obestämd: 'läppar', bestämd: 'läpparna' }
  },
  {
    artikel: 'en',
    singular: { obestämd: 'hals', bestämd: 'halsen' },
    plural: { obestämd: 'halsar', bestämd: 'halsarna' }
  },
  {
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
