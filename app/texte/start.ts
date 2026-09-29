import type { Sprache } from '~/utils/sprache'

const de = {
  titel: 'Goran Strainovic — Fullstack-Entwickler',
  beschreibung:
    'Fullstack-Entwickler aus Steinach. Schwerpunkt API- und ERP-Integration, Vue und Node im Web, Go und Kubernetes im Betrieb.',
  beruf: 'Fullstack-Entwickler',
  einleitung:
    'Ich baue Software, die im Betrieb steht: Webanwendungen, Schnittstellen zwischen Systemen und die Dienste dahinter.',
  kenndaten: [
    { feld: 'Tätigkeit', wert: 'Fullstack-Entwicklung, Schwerpunkt API- und ERP-Integration' },
    { feld: 'Standort', wert: 'Steinach, Kanton St. Gallen, Schweiz' },
    { feld: 'Erfahrung', wert: 'Seit 2016, 45 Kundenprojekte in der Schweiz, Deutschland und Österreich' },
    { feld: 'Sprachen', wert: 'Deutsch als Muttersprache, Englisch in Wort und Schrift' }
  ],
  schwerpunkteTitel: 'Schwerpunkte',
  schwerpunkte: [
    {
      titel: 'API- und ERP-Integration',
      text: 'Systeme, die vorher nichts voneinander wussten, tauschen Daten aus. Warenwirtschaft an CRM, Rechnungseingang an die Buchhaltung, Shop an das ERP.',
      technik: 'Azure Functions, REST, GraphQL, gRPC, Prisma'
    },
    {
      titel: 'Web-Anwendungen',
      text: 'Fachanwendungen vom Formular über die Kartenansicht bis zum Bericht. Aktuell WebGIS für die generelle Entwässerungsplanung und die Wasserversorgung.',
      technik: 'Vue, Nuxt, Quasar, Node.js, TypeScript'
    },
    {
      titel: 'Dienste und Betrieb',
      text: 'Gewachsene Monolithen in einzeln betreibbare Teile zerlegen und diese in Containern betreiben, in der Cloud wie beim Kunden.',
      technik: 'Go, Kubernetes, Docker, PostgreSQL'
    }
  ],
  pluginsTitel: 'Plugins',
  allePlugins: 'Alle Plugins im Überblick',
  schemaTitel: 'Wie eine Anbindung aussieht'
}

export default {
  de,
  fr: {
    titel: 'Goran Strainovic — développeur full-stack',
    beschreibung:
      'Développeur full-stack à Steinach (SG). Spécialisé dans l’intégration d’API et d’ERP, Vue et Node pour le web, Go et Kubernetes en exploitation.',
    beruf: 'Développeur full-stack',
    einleitung:
      'Je développe des logiciels qui tournent en production : applications web, interfaces entre systèmes et les services qui les font fonctionner.',
    kenndaten: [
      { feld: 'Activité', wert: 'Développement full-stack, spécialisé dans l’intégration d’API et d’ERP' },
      { feld: 'Lieu', wert: 'Steinach, canton de Saint-Gall, Suisse' },
      { feld: 'Expérience', wert: 'Depuis 2016, 45 projets clients en Suisse, en Allemagne et en Autriche' },
      { feld: 'Langues', wert: 'Allemand langue maternelle, anglais à l’oral et à l’écrit' }
    ],
    schwerpunkteTitel: 'Domaines',
    schwerpunkte: [
      {
        titel: 'Intégration d’API et d’ERP',
        text: 'Des systèmes qui s’ignoraient échangent leurs données. Gestion des stocks vers le CRM, factures fournisseurs vers la comptabilité, boutique vers l’ERP.',
        technik: 'Azure Functions, REST, GraphQL, gRPC, Prisma'
      },
      {
        titel: 'Applications web',
        text: 'Applications métier, du formulaire au rapport en passant par la carte. Actuellement du WebGIS pour la planification générale de l’évacuation des eaux et l’approvisionnement en eau.',
        technik: 'Vue, Nuxt, Quasar, Node.js, TypeScript'
      },
      {
        titel: 'Services et exploitation',
        text: 'Découper des monolithes historiques en parties exploitables séparément et les faire tourner en conteneurs, dans le cloud comme chez le client.',
        technik: 'Go, Kubernetes, Docker, PostgreSQL'
      }
    ],
    pluginsTitel: 'Plugins',
    allePlugins: 'Tous les plugins en un coup d’œil',
    schemaTitel: 'À quoi ressemble une intégration'
  },
  it: {
    titel: 'Goran Strainovic — sviluppatore full-stack',
    beschreibung:
      'Sviluppatore full-stack a Steinach (SG). Specializzato nell’integrazione di API ed ERP, Vue e Node per il web, Go e Kubernetes in esercizio.',
    beruf: 'Sviluppatore full-stack',
    einleitung:
      'Sviluppo software che lavora in produzione: applicazioni web, interfacce tra sistemi e i servizi che ci stanno dietro.',
    kenndaten: [
      { feld: 'Attività', wert: 'Sviluppo full-stack, specializzato nell’integrazione di API ed ERP' },
      { feld: 'Sede', wert: 'Steinach, Canton San Gallo, Svizzera' },
      { feld: 'Esperienza', wert: 'Dal 2016, 45 progetti per clienti in Svizzera, Germania e Austria' },
      { feld: 'Lingue', wert: 'Tedesco madrelingua, inglese parlato e scritto' }
    ],
    schwerpunkteTitel: 'Ambiti',
    schwerpunkte: [
      {
        titel: 'Integrazione di API ed ERP',
        text: 'Sistemi che prima non sapevano nulla l’uno dell’altro si scambiano dati. Gestione merci verso il CRM, fatture in entrata verso la contabilità, negozio online verso l’ERP.',
        technik: 'Azure Functions, REST, GraphQL, gRPC, Prisma'
      },
      {
        titel: 'Applicazioni web',
        text: 'Applicazioni gestionali, dal modulo alla mappa fino al rapporto. Attualmente WebGIS per la pianificazione generale dello smaltimento delle acque e l’approvvigionamento idrico.',
        technik: 'Vue, Nuxt, Quasar, Node.js, TypeScript'
      },
      {
        titel: 'Servizi ed esercizio',
        text: 'Scomporre monoliti cresciuti nel tempo in parti gestibili singolarmente e farle girare in container, nel cloud come presso il cliente.',
        technik: 'Go, Kubernetes, Docker, PostgreSQL'
      }
    ],
    pluginsTitel: 'Plugin',
    allePlugins: 'Tutti i plugin in sintesi',
    schemaTitel: 'Come si presenta un’integrazione'
  },
  en: {
    titel: 'Goran Strainovic — Full-stack developer',
    beschreibung:
      'Full-stack developer based in Steinach, Switzerland. Focus on API and ERP integration, Vue and Node on the web, Go and Kubernetes in operations.',
    beruf: 'Full-stack developer',
    einleitung:
      'I build software that runs in production: web applications, interfaces between systems and the services behind them.',
    kenndaten: [
      { feld: 'Work', wert: 'Full-stack development, focus on API and ERP integration' },
      { feld: 'Location', wert: 'Steinach, Canton of St. Gallen, Switzerland' },
      { feld: 'Experience', wert: 'Since 2016, 45 client projects in Switzerland, Germany and Austria' },
      { feld: 'Languages', wert: 'German native, English spoken and written' }
    ],
    schwerpunkteTitel: 'Focus areas',
    schwerpunkte: [
      {
        titel: 'API and ERP integration',
        text: 'Systems that knew nothing about each other exchange data. Inventory management to CRM, incoming invoices to accounting, online shop to ERP.',
        technik: 'Azure Functions, REST, GraphQL, gRPC, Prisma'
      },
      {
        titel: 'Web applications',
        text: 'Business applications from the form through the map view to the report. Currently WebGIS for general drainage planning and water supply.',
        technik: 'Vue, Nuxt, Quasar, Node.js, TypeScript'
      },
      {
        titel: 'Services and operations',
        text: 'Breaking grown monoliths into parts that can be run on their own, and running them in containers, in the cloud as well as on the client’s servers.',
        technik: 'Go, Kubernetes, Docker, PostgreSQL'
      }
    ],
    pluginsTitel: 'Plugins',
    allePlugins: 'All plugins at a glance',
    schemaTitel: 'What an integration looks like'
  }
} satisfies Record<Sprache, typeof de>
