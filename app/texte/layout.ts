import type { Sprache } from '~/utils/sprache'

const de = {
  seiten: [
    { pfad: '/', name: 'Start' },
    { pfad: '/profil/', name: 'Profil' },
    { pfad: '/referenzen/', name: 'Referenzen' },
    { pfad: '/open-source/', name: 'Open Source' },
    { pfad: '/kontakt/', name: 'Kontakt' }
  ],
  ort: 'Strainovic IT, 9323 Steinach, Schweiz',
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
  sprachwahl: 'Sprache',
  dunkel: 'Dunkles Farbschema'
}

export default {
  de,
  fr: {
    seiten: [
      { pfad: '/', name: 'Accueil' },
      { pfad: '/profil/', name: 'Profil' },
      { pfad: '/referenzen/', name: 'Références' },
      { pfad: '/open-source/', name: 'Open source' },
      { pfad: '/kontakt/', name: 'Contact' }
    ],
    ort: 'Strainovic IT, 9323 Steinach, Suisse',
    impressum: 'Mentions légales',
    datenschutz: 'Protection des données',
    sprachwahl: 'Langue',
    dunkel: 'Thème sombre'
  },
  it: {
    seiten: [
      { pfad: '/', name: 'Home' },
      { pfad: '/profil/', name: 'Profilo' },
      { pfad: '/referenzen/', name: 'Referenze' },
      { pfad: '/open-source/', name: 'Open source' },
      { pfad: '/kontakt/', name: 'Contatto' }
    ],
    ort: 'Strainovic IT, 9323 Steinach, Svizzera',
    impressum: 'Note legali',
    datenschutz: 'Protezione dei dati',
    sprachwahl: 'Lingua',
    dunkel: 'Tema scuro'
  },
  en: {
    seiten: [
      { pfad: '/', name: 'Home' },
      { pfad: '/profil/', name: 'Profile' },
      { pfad: '/referenzen/', name: 'References' },
      { pfad: '/open-source/', name: 'Open source' },
      { pfad: '/kontakt/', name: 'Contact' }
    ],
    ort: 'Strainovic IT, 9323 Steinach, Switzerland',
    impressum: 'Legal notice',
    datenschutz: 'Privacy',
    sprachwahl: 'Language',
    dunkel: 'Dark theme'
  }
} satisfies Record<Sprache, typeof de>
