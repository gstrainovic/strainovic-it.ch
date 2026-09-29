import type { Sprache } from '~/utils/sprache'

// Die Startseite erreicht man über das Logo, Open Source über den Footer.
const de = {
  seiten: [
    { pfad: '/plugins/', name: 'Plugins' },
    { pfad: '/referenzen/', name: 'Referenzen' },
    { pfad: '/profil/', name: 'Profil' },
    { pfad: '/kontakt/', name: 'Kontakt' }
  ],
  ort: 'Strainovic IT, 9323 Steinach, Schweiz',
  openSource: 'Open Source',
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
  sprachwahl: 'Sprache',
  dunkel: 'Dunkles Farbschema'
}

export default {
  de,
  fr: {
    seiten: [
      { pfad: '/plugins/', name: 'Plugins' },
      { pfad: '/referenzen/', name: 'Références' },
      { pfad: '/profil/', name: 'Profil' },
      { pfad: '/kontakt/', name: 'Contact' }
    ],
    ort: 'Strainovic IT, 9323 Steinach, Suisse',
    openSource: 'Open source',
    impressum: 'Mentions légales',
    datenschutz: 'Protection des données',
    sprachwahl: 'Langue',
    dunkel: 'Thème sombre'
  },
  it: {
    seiten: [
      { pfad: '/plugins/', name: 'Plugin' },
      { pfad: '/referenzen/', name: 'Referenze' },
      { pfad: '/profil/', name: 'Profilo' },
      { pfad: '/kontakt/', name: 'Contatto' }
    ],
    ort: 'Strainovic IT, 9323 Steinach, Svizzera',
    openSource: 'Open source',
    impressum: 'Note legali',
    datenschutz: 'Protezione dei dati',
    sprachwahl: 'Lingua',
    dunkel: 'Tema scuro'
  },
  en: {
    seiten: [
      { pfad: '/plugins/', name: 'Plugins' },
      { pfad: '/referenzen/', name: 'References' },
      { pfad: '/profil/', name: 'Profile' },
      { pfad: '/kontakt/', name: 'Contact' }
    ],
    ort: 'Strainovic IT, 9323 Steinach, Switzerland',
    openSource: 'Open source',
    impressum: 'Legal notice',
    datenschutz: 'Privacy',
    sprachwahl: 'Language',
    dunkel: 'Dark theme'
  }
} satisfies Record<Sprache, typeof de>
