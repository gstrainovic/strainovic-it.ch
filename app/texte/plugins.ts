import type { Sprache } from '~/utils/sprache'

// Wofür das Plugin läuft; Produktnamen, deshalb in allen Sprachen gleich.
export const plattformen: Record<string, string> = {
  '/uid-check/': 'WooCommerce · Contact Form 7 · bexio',
  '/bexio-formular-connector/': 'Contact Form 7 · WPForms · Gravity Forms · Elementor Forms · bexio',
  '/klara-shop-connector/': 'WooCommerce · Shopware 6 · KLARA',
  '/abaninja-shop-connector/': 'WooCommerce · AbaNinja',
  '/rappenrundung/': 'WooCommerce'
}

const de = {
  titel: 'Plugins für WooCommerce, Shopware und bexio — Strainovic IT',
  beschreibung:
    'Plugins für Schweizer KMU: UID-Prüfung, 5-Rappen-Rundung und die Anbindung von WooCommerce, Shopware und Website-Formularen an bexio, KLARA und AbaNinja.',
  ueberschrift: 'Plugins',
  einleitung:
    'Plugins für WooCommerce, Shopware und WordPress-Formulare, zugeschnitten auf Schweizer KMU: UID-Prüfung, 5-Rappen-Rundung und die Anbindung an bexio, KLARA und AbaNinja. Entwickelt und gepflegt von mir.',
  liste: [
    { titel: 'UID-Check', pfad: '/uid-check/', text: 'WordPress-Plugin: prüft die Schweizer UID im WooCommerce-Checkout beim UID-Register des Bundes. Version für bexio: Kontakt und Prüfnotiz in bexio, 30 Tage gratis, danach 79 CHF pro Jahr und Shop.' },
    { titel: 'bexio-Formular-Connector', pfad: '/bexio-formular-connector/', text: 'WordPress-Plugin: Website-Anfragen werden zu Kontakt und Offerte in bexio, ohne Abtippen. Einmalpreis, kein Abo.' },
    { titel: 'KLARA-Shop-Connector', pfad: '/klara-shop-connector/', text: 'Plugin für WooCommerce und Shopware: jede Bestellung als Kunde und Rechnung in KLARA, mit Schweizer MWST. 149 CHF pro Shop und Jahr.' },
    { titel: 'AbaNinja-Shop-Connector', pfad: '/abaninja-shop-connector/', text: 'WordPress-Plugin: jede WooCommerce-Bestellung als Adresse und Rechnung in AbaNinja, Total auf den Rappen genau. 149 CHF pro Shop und Jahr.' },
    { titel: 'Rappenrundung für WooCommerce', pfad: '/rappenrundung/', text: 'Gratis-Plugin: Total auf 5 Rappen gerundet, Differenz als eigene Position ohne MWST.' }
  ]
}

export default {
  de,
  fr: {
    titel: 'Plugins pour WooCommerce, Shopware et bexio — Strainovic IT',
    beschreibung:
      'Plugins pour les PME suisses : contrôle IDE, arrondi à 5 centimes et connexion de WooCommerce, Shopware et des formulaires du site à bexio, KLARA et AbaNinja.',
    ueberschrift: 'Plugins',
    einleitung:
      'Plugins pour WooCommerce, Shopware et les formulaires WordPress, conçus pour les PME suisses : contrôle IDE, arrondi à 5 centimes et connexion à bexio, KLARA et AbaNinja. Développés et maintenus par moi.',
    liste: [
      { titel: 'Contrôle IDE', pfad: '/uid-check/', text: 'Plugin WordPress : vérifie le numéro IDE suisse dans le checkout WooCommerce auprès du registre IDE de la Confédération. Version pour bexio : contact et note de vérification dans bexio, 30 jours gratuits, ensuite 79 CHF par an et par boutique.' },
      { titel: 'Connecteur de formulaires bexio', pfad: '/bexio-formular-connector/', text: 'Plugin WordPress : les demandes du site deviennent contact et offre dans bexio, sans ressaisie. Prix unique, pas d’abonnement.' },
      { titel: 'Connecteur de boutique KLARA', pfad: '/klara-shop-connector/', text: 'Plugin pour WooCommerce et Shopware : chaque commande devient client et facture dans KLARA, avec la TVA suisse. 149 CHF par boutique et par an.' },
      { titel: 'Connecteur de boutique AbaNinja', pfad: '/abaninja-shop-connector/', text: 'Plugin WordPress : chaque commande WooCommerce devient adresse et facture dans AbaNinja, total exact au centime. 149 CHF par boutique et par an.' },
      { titel: 'Arrondi à 5 centimes pour WooCommerce', pfad: '/rappenrundung/', text: 'Plugin gratuit : total arrondi à 5 centimes, différence sur une ligne séparée sans TVA.' }
    ]
  },
  it: {
    titel: 'Plugin per WooCommerce, Shopware e bexio — Strainovic IT',
    beschreibung:
      'Plugin per le PMI svizzere: controllo IDI, arrotondamento a 5 centesimi e collegamento di WooCommerce, Shopware e dei moduli del sito a bexio, KLARA e AbaNinja.',
    ueberschrift: 'Plugin',
    einleitung:
      'Plugin per WooCommerce, Shopware e i moduli WordPress, pensati per le PMI svizzere: controllo IDI, arrotondamento a 5 centesimi e collegamento a bexio, KLARA e AbaNinja. Sviluppati e mantenuti da me.',
    liste: [
      { titel: 'Controllo IDI', pfad: '/uid-check/', text: 'Plugin WordPress: verifica il numero IDI svizzero nel checkout WooCommerce presso il registro IDI della Confederazione. Versione per bexio: contatto e nota di verifica in bexio, 30 giorni gratis, poi 79 CHF all’anno per negozio.' },
      { titel: 'Connettore moduli bexio', pfad: '/bexio-formular-connector/', text: 'Plugin WordPress: le richieste dal sito diventano contatto e offerta in bexio, senza ribattere nulla. Prezzo unico, nessun abbonamento.' },
      { titel: 'Connettore negozio KLARA', pfad: '/klara-shop-connector/', text: 'Plugin per WooCommerce e Shopware: ogni ordine diventa cliente e fattura in KLARA, con l’IVA svizzera. 149 CHF per negozio all’anno.' },
      { titel: 'Connettore negozio AbaNinja', pfad: '/abaninja-shop-connector/', text: 'Plugin WordPress: ogni ordine WooCommerce diventa indirizzo e fattura in AbaNinja, totale esatto al centesimo. 149 CHF per negozio all’anno.' },
      { titel: 'Arrotondamento a 5 centesimi per WooCommerce', pfad: '/rappenrundung/', text: 'Plugin gratuito: totale arrotondato a 5 centesimi, differenza come voce separata senza IVA.' }
    ]
  },
  en: {
    titel: 'Plugins for WooCommerce, Shopware and bexio — Strainovic IT',
    beschreibung:
      'Plugins for Swiss SMEs: UID validation, 5-centime rounding and connecting WooCommerce, Shopware and website forms to bexio, KLARA and AbaNinja.',
    ueberschrift: 'Plugins',
    einleitung:
      'Plugins for WooCommerce, Shopware and WordPress forms, built for Swiss SMEs: UID validation, 5-centime rounding and connections to bexio, KLARA and AbaNinja. Developed and maintained by me.',
    liste: [
      { titel: 'UID check', pfad: '/uid-check/', text: 'WordPress plugin: validates the Swiss UID (company ID) in the WooCommerce checkout against the federal UID register. Version for bexio: contact and check note in bexio, free for 30 days, then CHF 79 per year and shop.' },
      { titel: 'bexio form connector', pfad: '/bexio-formular-connector/', text: 'WordPress plugin: website enquiries become contact and quote in bexio, no retyping. One-time price, no subscription.' },
      { titel: 'KLARA shop connector', pfad: '/klara-shop-connector/', text: 'Plugin for WooCommerce and Shopware: every order becomes customer and invoice in KLARA, with Swiss VAT. CHF 149 per shop and year.' },
      { titel: 'AbaNinja shop connector', pfad: '/abaninja-shop-connector/', text: 'WordPress plugin: every WooCommerce order becomes address and invoice in AbaNinja, total exact to the centime. CHF 149 per shop and year.' },
      { titel: '5-centime rounding for WooCommerce', pfad: '/rappenrundung/', text: 'Free plugin: total rounded to 5 centimes, difference as a separate line without VAT.' }
    ]
  }
} satisfies Record<Sprache, typeof de>
