import type { Sprache } from '~/utils/sprache'

const de = {
  titel: 'Profil — Goran Strainovic',
  beschreibung:
    'Werdegang und Technologien: seit 2016 selbstständig mit 45 Kundenprojekten, aktuell in der WebGIS-Entwicklung bei Wälli AG Ingenieure.',
  ueberschrift: 'Profil',
  werdegang: 'Werdegang',
  stationen: [
    {
      zeit: 'seit 11/2023',
      firma: 'Wälli AG Ingenieure, Arbon',
      rolle: 'Fullstack-Entwickler, WebGIS-Entwicklung',
      punkte: [
        'Weiter- und Neuentwicklung von WebGIS-Anwendungen, Migration bestehender Systeme',
        'Frontend mit Vue.js, Backend-Services mit Node.js',
        'Verantwortung für einzelne Applikationen im Entwicklerteam'
      ],
      stack: 'Vue, Quasar, Node.js, Express, MS SQL'
    },
    {
      zeit: '03/2023 – 10/2023',
      firma: 'Traffitec AG',
      rolle: 'Fullstack-Entwickler',
      punkte: ['Web-Kundenportal: neue Funktionen und Fehlerbehebung', 'Desktop-Applikation und API', 'Kundensupport'],
      stack: 'PHP, Yii, jQuery, MSSQL, C#, WPF, .NET'
    },
    {
      zeit: '09/2022 – 01/2023',
      firma: 'KBST GmbH',
      rolle: 'Selbstständiger Softwareentwickler',
      punkte: [
        'gRPC-Services in Go',
        'Aufsetzen eines Kubernetes-Clusters, Deployment der Services mit Knative',
        'Integration einer verteilten CockroachDB'
      ],
      stack: 'Go, Kubernetes, Knative, gRPC, CockroachDB'
    },
    {
      zeit: '12/2016 – 03/2023',
      firma: 'Strainovic IT, Steinach',
      rolle: 'Selbstständig, nebenberuflich',
      punkte: [
        '45 Kundenprojekte in der Schweiz, Deutschland und Österreich, von der Anforderungsaufnahme bis zur Übergabe',
        'Schwerpunkt Integration: Warenwirtschaft an CRM, Rechnungseingang an die Buchhaltung, Shop an das ERP, Belege an das Dokumentenmanagement',
        'Vier Projekte innerhalb eines Jahres mit serverlosen Diensten auf Azure für einen deutschen ERP-Hersteller, darunter ein mandantenfähiger',
        'Migration eines TypeScript-Monolithen auf Microservices in Go, betrieben auf Kubernetes',
        'Eigenständige Anwendungen in Rust, Python und Go, dazu Shop- und Portalentwicklung'
      ],
      stack: 'TypeScript, Go, Python, Rust, PHP, C#, Node.js, Azure, Kubernetes'
    }
  ],
  davor:
    'Davor bis 2022 in der Elektronikfertigung bei Variosystems in Steinach, zuletzt in Prüffeld und Arbeitsvorbereitung. Dort entstand die Automatisierung der Fehlerprotokollierung, die den Weg in die Softwareentwicklung geebnet hat.',
  technologienTitel: 'Technologien',
  technologien: [
    { gruppe: 'Sprachen', werte: 'TypeScript, JavaScript, Go, Python, C#, PHP, Rust' },
    { gruppe: 'Frontend', werte: 'Vue, Nuxt, Quasar, React, Tailwind' },
    { gruppe: 'Backend', werte: 'Node.js, Express, .NET, FastAPI, gRPC, REST, GraphQL' },
    { gruppe: 'Daten', werte: 'PostgreSQL, MS SQL, MySQL, MariaDB, CockroachDB, SQLite' },
    { gruppe: 'Betrieb', werte: 'Kubernetes, Docker, Azure, AWS, Google Cloud, Hetzner, Linux' },
    { gruppe: 'Integration', werte: 'ERP-Anbindungen, JTL-Wawi, Odoo, HubSpot, Shopware, Stripe, Mollie' }
  ]
}

export default {
  de,
  fr: {
    titel: 'Profil — Goran Strainovic',
    beschreibung:
      'Parcours et technologies : indépendant depuis 2016 avec 45 projets clients, actuellement dans le développement WebGIS chez Wälli AG Ingenieure.',
    ueberschrift: 'Profil',
    werdegang: 'Parcours',
    stationen: [
      {
        zeit: 'depuis 11/2023',
        firma: 'Wälli AG Ingenieure, Arbon',
        rolle: 'Développeur full-stack, développement WebGIS',
        punkte: [
          'Évolution et nouveau développement d’applications WebGIS, migration de systèmes existants',
          'Frontend en Vue.js, services backend en Node.js',
          'Responsable de certaines applications au sein de l’équipe de développement'
        ],
        stack: 'Vue, Quasar, Node.js, Express, MS SQL'
      },
      {
        zeit: '03/2023 – 10/2023',
        firma: 'Traffitec AG',
        rolle: 'Développeur full-stack',
        punkte: ['Portail client web : nouvelles fonctionnalités et corrections', 'Application de bureau et API', 'Support client'],
        stack: 'PHP, Yii, jQuery, MSSQL, C#, WPF, .NET'
      },
      {
        zeit: '09/2022 – 01/2023',
        firma: 'KBST GmbH',
        rolle: 'Développeur logiciel indépendant',
        punkte: [
          'Services gRPC en Go',
          'Mise en place d’un cluster Kubernetes, déploiement des services avec Knative',
          'Intégration d’une base CockroachDB distribuée'
        ],
        stack: 'Go, Kubernetes, Knative, gRPC, CockroachDB'
      },
      {
        zeit: '12/2016 – 03/2023',
        firma: 'Strainovic IT, Steinach',
        rolle: 'Indépendant, à titre accessoire',
        punkte: [
          '45 projets clients en Suisse, en Allemagne et en Autriche, du recueil des besoins jusqu’à la remise',
          'Axé sur l’intégration : gestion des stocks vers le CRM, factures fournisseurs vers la comptabilité, boutique vers l’ERP, justificatifs vers la gestion électronique des documents',
          'Quatre projets en un an avec des services serverless sur Azure pour un éditeur d’ERP allemand, dont un multi-mandant',
          'Migration d’un monolithe TypeScript vers des microservices en Go, exploités sur Kubernetes',
          'Applications autonomes en Rust, Python et Go, ainsi que développement de boutiques et de portails'
        ],
        stack: 'TypeScript, Go, Python, Rust, PHP, C#, Node.js, Azure, Kubernetes'
      }
    ],
    davor:
      'Auparavant, jusqu’en 2022, dans la production électronique chez Variosystems à Steinach, en dernier lieu au laboratoire de test et à la préparation du travail. C’est là qu’est née l’automatisation de la journalisation des défauts, qui m’a ouvert la voie vers le développement logiciel.',
    technologienTitel: 'Technologies',
    technologien: [
      { gruppe: 'Langages', werte: 'TypeScript, JavaScript, Go, Python, C#, PHP, Rust' },
      { gruppe: 'Frontend', werte: 'Vue, Nuxt, Quasar, React, Tailwind' },
      { gruppe: 'Backend', werte: 'Node.js, Express, .NET, FastAPI, gRPC, REST, GraphQL' },
      { gruppe: 'Données', werte: 'PostgreSQL, MS SQL, MySQL, MariaDB, CockroachDB, SQLite' },
      { gruppe: 'Exploitation', werte: 'Kubernetes, Docker, Azure, AWS, Google Cloud, Hetzner, Linux' },
      { gruppe: 'Intégration', werte: 'Connexions ERP, JTL-Wawi, Odoo, HubSpot, Shopware, Stripe, Mollie' }
    ]
  },
  it: {
    titel: 'Profilo — Goran Strainovic',
    beschreibung:
      'Percorso e tecnologie: indipendente dal 2016 con 45 progetti per clienti, attualmente nello sviluppo WebGIS presso Wälli AG Ingenieure.',
    ueberschrift: 'Profilo',
    werdegang: 'Percorso',
    stationen: [
      {
        zeit: 'dal 11/2023',
        firma: 'Wälli AG Ingenieure, Arbon',
        rolle: 'Sviluppatore full-stack, sviluppo WebGIS',
        punkte: [
          'Evoluzione e nuovo sviluppo di applicazioni WebGIS, migrazione di sistemi esistenti',
          'Frontend con Vue.js, servizi backend con Node.js',
          'Responsabile di singole applicazioni all’interno del team di sviluppo'
        ],
        stack: 'Vue, Quasar, Node.js, Express, MS SQL'
      },
      {
        zeit: '03/2023 – 10/2023',
        firma: 'Traffitec AG',
        rolle: 'Sviluppatore full-stack',
        punkte: ['Portale clienti web: nuove funzioni e correzione di errori', 'Applicazione desktop e API', 'Supporto clienti'],
        stack: 'PHP, Yii, jQuery, MSSQL, C#, WPF, .NET'
      },
      {
        zeit: '09/2022 – 01/2023',
        firma: 'KBST GmbH',
        rolle: 'Sviluppatore software indipendente',
        punkte: [
          'Servizi gRPC in Go',
          'Configurazione di un cluster Kubernetes, deployment dei servizi con Knative',
          'Integrazione di un database CockroachDB distribuito'
        ],
        stack: 'Go, Kubernetes, Knative, gRPC, CockroachDB'
      },
      {
        zeit: '12/2016 – 03/2023',
        firma: 'Strainovic IT, Steinach',
        rolle: 'Indipendente, come attività accessoria',
        punkte: [
          '45 progetti per clienti in Svizzera, Germania e Austria, dalla raccolta dei requisiti alla consegna',
          'Focus sull’integrazione: gestione merci verso il CRM, fatture in entrata verso la contabilità, negozio online verso l’ERP, documenti verso la gestione documentale',
          'Quattro progetti in un anno con servizi serverless su Azure per un produttore tedesco di ERP, di cui uno multi-tenant',
          'Migrazione di un monolite TypeScript verso microservizi in Go, in esercizio su Kubernetes',
          'Applicazioni autonome in Rust, Python e Go, oltre allo sviluppo di negozi online e portali'
        ],
        stack: 'TypeScript, Go, Python, Rust, PHP, C#, Node.js, Azure, Kubernetes'
      }
    ],
    davor:
      'In precedenza, fino al 2022, nella produzione elettronica presso Variosystems a Steinach, da ultimo nel reparto collaudo e nella preparazione del lavoro. Lì è nata l’automazione della registrazione degli errori, che mi ha aperto la strada verso lo sviluppo software.',
    technologienTitel: 'Tecnologie',
    technologien: [
      { gruppe: 'Linguaggi', werte: 'TypeScript, JavaScript, Go, Python, C#, PHP, Rust' },
      { gruppe: 'Frontend', werte: 'Vue, Nuxt, Quasar, React, Tailwind' },
      { gruppe: 'Backend', werte: 'Node.js, Express, .NET, FastAPI, gRPC, REST, GraphQL' },
      { gruppe: 'Dati', werte: 'PostgreSQL, MS SQL, MySQL, MariaDB, CockroachDB, SQLite' },
      { gruppe: 'Esercizio', werte: 'Kubernetes, Docker, Azure, AWS, Google Cloud, Hetzner, Linux' },
      { gruppe: 'Integrazione', werte: 'Connessioni ERP, JTL-Wawi, Odoo, HubSpot, Shopware, Stripe, Mollie' }
    ]
  },
  en: {
    titel: 'Profile — Goran Strainovic',
    beschreibung:
      'Career and technologies: self-employed since 2016 with 45 client projects, currently in WebGIS development at Wälli AG Ingenieure.',
    ueberschrift: 'Profile',
    werdegang: 'Career',
    stationen: [
      {
        zeit: 'since 11/2023',
        firma: 'Wälli AG Ingenieure, Arbon',
        rolle: 'Full-stack developer, WebGIS development',
        punkte: [
          'Further and new development of WebGIS applications, migration of existing systems',
          'Frontend with Vue.js, backend services with Node.js',
          'Responsible for individual applications within the development team'
        ],
        stack: 'Vue, Quasar, Node.js, Express, MS SQL'
      },
      {
        zeit: '03/2023 – 10/2023',
        firma: 'Traffitec AG',
        rolle: 'Full-stack developer',
        punkte: ['Web customer portal: new features and bug fixes', 'Desktop application and API', 'Customer support'],
        stack: 'PHP, Yii, jQuery, MSSQL, C#, WPF, .NET'
      },
      {
        zeit: '09/2022 – 01/2023',
        firma: 'KBST GmbH',
        rolle: 'Freelance software developer',
        punkte: [
          'gRPC services in Go',
          'Setting up a Kubernetes cluster, deploying the services with Knative',
          'Integration of a distributed CockroachDB'
        ],
        stack: 'Go, Kubernetes, Knative, gRPC, CockroachDB'
      },
      {
        zeit: '12/2016 – 03/2023',
        firma: 'Strainovic IT, Steinach',
        rolle: 'Self-employed, part-time',
        punkte: [
          '45 client projects in Switzerland, Germany and Austria, from requirements to handover',
          'Focus on integration: inventory management to CRM, incoming invoices to accounting, online shop to ERP, documents to document management',
          'Four projects within one year using serverless services on Azure for a German ERP vendor, one of them multi-tenant',
          'Migration of a TypeScript monolith to microservices in Go, running on Kubernetes',
          'Standalone applications in Rust, Python and Go, plus shop and portal development'
        ],
        stack: 'TypeScript, Go, Python, Rust, PHP, C#, Node.js, Azure, Kubernetes'
      }
    ],
    davor:
      'Before that, until 2022, in electronics manufacturing at Variosystems in Steinach, most recently in the test department and production planning. That is where I automated the defect logging, which paved the way into software development.',
    technologienTitel: 'Technologies',
    technologien: [
      { gruppe: 'Languages', werte: 'TypeScript, JavaScript, Go, Python, C#, PHP, Rust' },
      { gruppe: 'Frontend', werte: 'Vue, Nuxt, Quasar, React, Tailwind' },
      { gruppe: 'Backend', werte: 'Node.js, Express, .NET, FastAPI, gRPC, REST, GraphQL' },
      { gruppe: 'Data', werte: 'PostgreSQL, MS SQL, MySQL, MariaDB, CockroachDB, SQLite' },
      { gruppe: 'Operations', werte: 'Kubernetes, Docker, Azure, AWS, Google Cloud, Hetzner, Linux' },
      { gruppe: 'Integration', werte: 'ERP connections, JTL-Wawi, Odoo, HubSpot, Shopware, Stripe, Mollie' }
    ]
  }
} satisfies Record<Sprache, typeof de>
