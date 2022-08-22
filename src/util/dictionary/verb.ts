export interface Verb {
  grundord: string
  dåtid: {
    preteritum: string
  }
}

export const verb = [
  {
    grundord: 'skriva',
    dåtid: { preteritum: 'skrev' }
  },
  {
    grundord: 'läsa',
    dåtid: { preteritum: 'läste' }
  },
  {
    grundord: 'äta',
    dåtid: { preteritum: 'åt' }
  },
  {
    grundord: 'dricka',
    dåtid: { preteritum: 'drack' }
  }
]
