import type { Sprache } from '~/utils/sprache'

const de = {
  titel: 'Kontakt — Goran Strainovic',
  beschreibung: 'Strainovic IT, Steinach. Kontakt per E-Mail an info@strainovic-it.ch.',
  ueberschrift: 'Kontakt',
  einleitung: 'Schreiben Sie mir, am besten mit ein paar Sätzen zum Vorhaben und zum eingesetzten Stack.',
  felder: { email: 'E-Mail', firma: 'Firma', adresse: 'Adresse', sprache: 'Sprache' },
  adresse: 'Bahnstrasse 9b, 9323 Steinach, Schweiz',
  sprachen: 'Deutsch, Englisch'
}

export default {
  de,
  fr: {
    titel: 'Contact — Goran Strainovic',
    beschreibung: 'Strainovic IT, Steinach. Contact par e-mail à info@strainovic-it.ch.',
    ueberschrift: 'Contact',
    einleitung: 'Écrivez-moi, idéalement avec quelques phrases sur le projet et la stack utilisée.',
    felder: { email: 'E-mail', firma: 'Entreprise', adresse: 'Adresse', sprache: 'Langue' },
    adresse: 'Bahnstrasse 9b, 9323 Steinach, Suisse',
    sprachen: 'Correspondance en allemand ou en anglais'
  },
  it: {
    titel: 'Contatto — Goran Strainovic',
    beschreibung: 'Strainovic IT, Steinach. Contatto via e-mail a info@strainovic-it.ch.',
    ueberschrift: 'Contatto',
    einleitung: 'Scrivetemi, possibilmente con qualche frase sul progetto e sulla stack utilizzata.',
    felder: { email: 'E-mail', firma: 'Ditta', adresse: 'Indirizzo', sprache: 'Lingua' },
    adresse: 'Bahnstrasse 9b, 9323 Steinach, Svizzera',
    sprachen: 'Corrispondenza in tedesco o in inglese'
  },
  en: {
    titel: 'Contact — Goran Strainovic',
    beschreibung: 'Strainovic IT, Steinach, Switzerland. Contact by email at info@strainovic-it.ch.',
    ueberschrift: 'Contact',
    einleitung: 'Write to me, ideally with a few sentences about the project and the stack in use.',
    felder: { email: 'Email', firma: 'Company', adresse: 'Address', sprache: 'Language' },
    adresse: 'Bahnstrasse 9b, 9323 Steinach, Switzerland',
    sprachen: 'German, English'
  }
} satisfies Record<Sprache, typeof de>
