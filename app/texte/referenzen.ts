import type { Sprache } from '~/utils/sprache'

// Zeit, Stack und Beleg gelten in jeder Sprache; übersetzt werden nur die
// Texte. Die Reihenfolge der Texte folgt der Reihenfolge hier.
export const projekte = [
  { zeit: '2025', stack: 'Bash', beleg: 'https://github.com/Cobenian/shai-hulud-detect/commits?author=gstrainovic' },
  { zeit: '2022 – 2023', stack: 'Go, Kubernetes, gRPC, PostgreSQL, CockroachDB' },
  { zeit: '2022', stack: 'Gatsby, React, Tailwind, Python, Strawberry, FastAPI, Mollie, HubSpot' },
  { zeit: '2021', stack: 'TypeScript, Node.js, Express, Prisma, Azure' },
  { zeit: '2022', stack: 'Azure Functions, TypeScript, Node.js, Prisma' },
  { zeit: '2022', stack: 'Go, Azure Functions, TypeScript, Node.js' },
  { zeit: '2020 – 2021', stack: 'JTL-Wawi, HubSpot, Laravel, PHP, TypeScript, Node.js' },
  { zeit: '2022', stack: 'Rust, Strapi, Metabase' },
  { zeit: '2019 – 2020', stack: 'Odoo, Python' },
  { zeit: '2023', stack: 'Go, Python, Oracle' },
  { zeit: '2017', stack: 'Java, Jira' }
]

export const weitere = [
  { zeit: '2023', stack: 'Shopware 6, PHP, Symfony' },
  { zeit: '2023', stack: 'C#, ASP.NET Minimal API, FastEndpoints, MongoDB, Angular' },
  { zeit: '2023', stack: 'Laravel, Twig, Alpine.js' },
  { zeit: '2022 – 2023', stack: 'ModX, PHP, Alpine.js' },
  { zeit: '2022', stack: 'ModX, PHP, Alpine.js' },
  { zeit: '2022', stack: 'Next.js, React, Hygraph, GraphQL' },
  { zeit: '2022', stack: 'Python' },
  { zeit: '2022', stack: 'Azure Functions, TypeScript, Node.js' },
  { zeit: '2022', stack: 'Shopware 5' },
  { zeit: '2021 – 2022', stack: 'WooCommerce, PHP' },
  { zeit: '2021', stack: 'HubSpot, JTL, TypeScript, Node.js, Laravel' },
  { zeit: '2020 – 2021', stack: 'Laravel, PHP, JTL, CS-Cart' },
  { zeit: '2020', stack: 'WooCommerce' },
  { zeit: '2020', stack: 'WooCommerce, JavaScript, SVG' },
  { zeit: '2016', stack: 'AutoIt' },
  { zeit: '2016', stack: 'R' }
]

const erpAgentur = 'Deutscher ERP-Hersteller über eine Automatisierungs-Agentur'

const de = {
  titel: 'Referenzen — Goran Strainovic',
  beschreibung:
    'Ausgewählte Entwicklungsprojekte seit 2016: Microservices in Go, Azure-Integrationen für ERP-Systeme, Warenwirtschaft an CRM, Odoo und Rust.',
  ueberschrift: 'Referenzen',
  einleitung:
    'Ausgewählt aus 45 Kundenprojekten seit 2016. Kundennamen nenne ich nur mit Freigabe, deshalb steht hier die Branche. Bildschirmfotos gibt es keine, die meisten Anwendungen laufen intern.',
  beleg: 'Beitragsverlauf ansehen',
  weitereTitel: 'Weitere Projekte',
  projekte: [
    {
      titel: 'Beiträge an einem Prüfwerkzeug für Lieferkettenangriffe',
      ziel: 'Sechs übernommene Änderungen an shai-hulud-detect, einem Werkzeug, das Projekte auf Spuren der npm-Lieferkettenangriffe prüft: Lauffähigkeit unter Git Bash und WSL, Behandlung von Windows-Zeilenenden, dazu zwei Korrekturen an der Erkennung von Datenabfluss, wo Kommentare zu falschen Ergebnissen führten. Ein Prüfwerkzeug, das nur auf dem Rechner seines Autors läuft, wird nicht ausgeführt.',
      kunde: 'Offenes Projekt, Beiträge öffentlich nachvollziehbar'
    },
    {
      titel: 'Monolith in Microservices zerlegt',
      ziel: 'Eine TypeScript-Anwendung wurde in einzeln betreibbare Dienste in Go überführt. Sie läuft seither in jeder Cloud und ebenso auf dem Server beim Kunden.',
      kunde: 'Deutsches Start-up für Self-Scanning mit Gewichtskontrolle'
    },
    {
      titel: 'Plattform für Bestattungen',
      ziel: 'Zuerst ein MVP mit Appsmith und FastAPI, danach das Frontend nach Figma-Vorlage und ein eigenes Backend. Besucher suchen über die Postleitzahl nach Anbietern in ihrer Nähe, schliessen eine Mitgliedschaft ab und werden im CRM angelegt.',
      kunde: 'Deutscher Anbieter für natürliche Beerdigungen'
    },
    {
      titel: 'Eingangsrechnungen automatisch verbuchen',
      ziel: 'Ein ERP streamt Rechnungs-PDFs an einen Azure-Dienst, der sie ausliest und strukturiert als JSON zurückgibt. Die Anwender können dem System relevante Rechnungen anlernen.',
      kunde: erpAgentur
    },
    {
      titel: 'Mandantenfähige Produktanreicherung',
      ziel: 'Eine Azure Function nimmt Produktdaten als JSON entgegen, reichert sie je Mandant aus der Datenbank an und gibt sie zurück.',
      kunde: erpAgentur
    },
    {
      titel: 'Belege vom Ordner ins Dokumentensystem',
      ziel: 'Ein Programm in Go schickt PDFs aus einem überwachten Ordner an eine Azure Function. Dort wird der Barcode ausgelesen, ein Token beantragt und der Beleg an das Dokumentenmanagement übergeben.',
      kunde: erpAgentur
    },
    {
      titel: 'Warenwirtschaft an CRM angebunden',
      ziel: 'JTL-Wawi und HubSpot wurden nach Kundenvorgaben verbunden und laufend synchron gehalten.',
      kunde: 'Deutscher Hersteller von Kühl- und Wärmeboxen'
    },
    {
      titel: 'Barcode-Verwaltung für die Qualitätssicherung',
      ziel: 'Ein nativer Desktop-Client zur Erfassung, dazu Serversoftware für Bearbeitung und Auswertung.',
      kunde: 'Deutscher Dienstleister für Gravuren'
    },
    {
      titel: 'CRM mit Projekterfassung',
      ziel: 'Odoo als CRM eingerichtet und erweitert, mit Projekterfassung, Datenablage und Planung.',
      kunde: 'Schweizer Immobilien-Agentur'
    },
    {
      titel: 'Datenexport von Python nach Go portiert',
      ziel: 'Ein bestehendes Skript liest über Parameter eine Oracle-Datenbank aus, schreibt CSV, protokolliert und liefert die Datei per SFTP. Neu geschrieben in Go, dadurch ohne Laufzeitumgebung auslieferbar.',
      kunde: 'Österreichisches Unternehmen'
    },
    {
      titel: 'Ticket-Plugin für Jira',
      ziel: 'Erweiterung der Projektmanagement-Software um einen eigenen Ticket-Ablauf.',
      kunde: 'Österreichischer Hardwarehersteller'
    }
  ],
  weitere: [
    'Plug-in zur Automatisierung digitaler Produkte',
    'Nachbau einer Publikationsplattform, offener Quellcode',
    'Figma-Vorlage in Templates überführt, Fehler behoben, Funktionen ergänzt',
    'Immobilienportal: passende Angebote per E-Mail an Investoren',
    'Immobilienportal: Fehlerbehebung und neue Funktionen',
    'Rekrutierungsseite an ein Bewerber-CRM angebunden',
    'Dokumentation aus Power-Apps-Quellcode erzeugen, als Markdown, HTML und PDF',
    'ERP-Daten von JSON nach XML wandeln',
    'Deutschen Shop für den Schweizer Markt aufgesetzt',
    'Buchungs-Plugin um schnellere Bearbeitung erweitert',
    'CRM und Warenwirtschaft verbunden',
    'Connector zwischen Warenwirtschaft und Shopsystem',
    'Gutschein-Plugin angepasst, Sendungsverfolgung eingerichtet',
    'Wohnungsverfügbarkeit als Tabelle und farbige 3D-Grafik',
    'Bildschirmsperre für ein Internetcafé nach Kundenvorgaben',
    'Branchenverzeichnis für den DACH-Raum'
  ]
}

const erpAgenturFr = 'Éditeur d’ERP allemand, via une agence d’automatisation'
const erpAgenturIt = 'Produttore tedesco di ERP, tramite un’agenzia di automazione'
const erpAgenturEn = 'German ERP vendor, via an automation agency'

export default {
  de,
  fr: {
    titel: 'Références — Goran Strainovic',
    beschreibung:
      'Projets de développement choisis depuis 2016 : microservices en Go, intégrations Azure pour des ERP, gestion des stocks reliée au CRM, Odoo et Rust.',
    ueberschrift: 'Références',
    einleitung:
      'Une sélection parmi 45 projets clients depuis 2016. Je ne cite le nom d’un client qu’avec son accord, c’est pourquoi seul le secteur figure ici. Pas de captures d’écran : la plupart des applications tournent en interne.',
    beleg: 'Voir l’historique des contributions',
    weitereTitel: 'Autres projets',
    projekte: [
      {
        titel: 'Contributions à un outil de détection des attaques de la chaîne d’approvisionnement',
        ziel: 'Six modifications acceptées dans shai-hulud-detect, un outil qui recherche dans les projets les traces des attaques de la chaîne d’approvisionnement npm : fonctionnement sous Git Bash et WSL, gestion des fins de ligne Windows, plus deux corrections de la détection d’exfiltration de données, où des commentaires faussaient les résultats. Un outil de contrôle qui ne tourne que sur la machine de son auteur n’est pas utilisé.',
        kunde: 'Projet ouvert, contributions consultables publiquement'
      },
      {
        titel: 'Monolithe découpé en microservices',
        ziel: 'Une application TypeScript a été transformée en services Go exploitables séparément. Elle tourne depuis dans n’importe quel cloud comme sur le serveur du client.',
        kunde: 'Start-up allemande de self-scanning avec contrôle du poids'
      },
      {
        titel: 'Plateforme pour les obsèques',
        ziel: 'D’abord un MVP avec Appsmith et FastAPI, puis le frontend d’après une maquette Figma et un backend propre. Les visiteurs cherchent des prestataires proches par code postal, souscrivent une adhésion et sont enregistrés dans le CRM.',
        kunde: 'Prestataire allemand d’inhumations naturelles'
      },
      {
        titel: 'Comptabiliser automatiquement les factures fournisseurs',
        ziel: 'Un ERP envoie en flux les factures PDF à un service Azure qui les lit et les renvoie structurées en JSON. Les utilisateurs peuvent apprendre au système à reconnaître les factures pertinentes.',
        kunde: erpAgenturFr
      },
      {
        titel: 'Enrichissement de produits multi-mandant',
        ziel: 'Une Azure Function reçoit des données produit en JSON, les enrichit par mandant depuis la base de données et les renvoie.',
        kunde: erpAgenturFr
      },
      {
        titel: 'Justificatifs du dossier vers la GED',
        ziel: 'Un programme en Go envoie les PDF d’un dossier surveillé à une Azure Function. Celle-ci lit le code-barres, demande un jeton et transmet le justificatif à la gestion électronique des documents.',
        kunde: erpAgenturFr
      },
      {
        titel: 'Gestion des stocks reliée au CRM',
        ziel: 'JTL-Wawi et HubSpot ont été connectés selon les exigences du client et maintenus synchronisés en continu.',
        kunde: 'Fabricant allemand de glacières et de boîtes chauffantes'
      },
      {
        titel: 'Gestion de codes-barres pour l’assurance qualité',
        ziel: 'Un client de bureau natif pour la saisie, plus un logiciel serveur pour le traitement et l’analyse.',
        kunde: 'Prestataire allemand de gravure'
      },
      {
        titel: 'CRM avec suivi de projets',
        ziel: 'Odoo mis en place et étendu comme CRM, avec suivi de projets, stockage de données et planification.',
        kunde: 'Agence immobilière suisse'
      },
      {
        titel: 'Export de données porté de Python vers Go',
        ziel: 'Un script existant lit une base Oracle selon des paramètres, écrit un CSV, journalise et livre le fichier par SFTP. Réécrit en Go, il se livre désormais sans environnement d’exécution.',
        kunde: 'Entreprise autrichienne'
      },
      {
        titel: 'Plugin de tickets pour Jira',
        ziel: 'Extension du logiciel de gestion de projet par un flux de tickets propre.',
        kunde: 'Fabricant de matériel autrichien'
      }
    ],
    weitere: [
      'Plugin pour automatiser des produits numériques',
      'Reproduction d’une plateforme de publication, code source ouvert',
      'Maquette Figma transposée en templates, erreurs corrigées, fonctions ajoutées',
      'Portail immobilier : offres adaptées envoyées par e-mail aux investisseurs',
      'Portail immobilier : corrections et nouvelles fonctions',
      'Site de recrutement relié à un CRM de candidats',
      'Générer la documentation à partir du code source Power Apps, en Markdown, HTML et PDF',
      'Convertir des données ERP de JSON en XML',
      'Boutique allemande adaptée au marché suisse',
      'Plugin de réservation étendu pour un traitement plus rapide',
      'CRM et gestion des stocks connectés',
      'Connecteur entre gestion des stocks et boutique en ligne',
      'Plugin de bons d’achat adapté, suivi des envois mis en place',
      'Disponibilité des logements sous forme de tableau et de graphique 3D en couleur',
      'Verrouillage d’écran pour un cybercafé selon les exigences du client',
      'Annuaire professionnel pour l’Allemagne, l’Autriche et la Suisse'
    ]
  },
  it: {
    titel: 'Referenze — Goran Strainovic',
    beschreibung:
      'Progetti di sviluppo selezionati dal 2016: microservizi in Go, integrazioni Azure per sistemi ERP, gestione merci collegata al CRM, Odoo e Rust.',
    ueberschrift: 'Referenze',
    einleitung:
      'Una selezione tra 45 progetti per clienti dal 2016. Cito i nomi dei clienti solo con il loro consenso, per questo qui compare il settore. Niente schermate: la maggior parte delle applicazioni gira internamente.',
    beleg: 'Vedi la cronologia dei contributi',
    weitereTitel: 'Altri progetti',
    projekte: [
      {
        titel: 'Contributi a uno strumento di verifica contro gli attacchi alla supply chain',
        ziel: 'Sei modifiche accettate in shai-hulud-detect, uno strumento che cerca nei progetti le tracce degli attacchi alla supply chain di npm: funzionamento con Git Bash e WSL, gestione dei fine riga Windows, più due correzioni al rilevamento dell’esfiltrazione di dati, dove i commenti portavano a risultati errati. Uno strumento di verifica che funziona solo sul computer del suo autore non viene usato.',
        kunde: 'Progetto aperto, contributi verificabili pubblicamente'
      },
      {
        titel: 'Monolite scomposto in microservizi',
        ziel: 'Un’applicazione TypeScript è stata trasformata in servizi Go gestibili singolarmente. Da allora gira in qualsiasi cloud e anche sul server del cliente.',
        kunde: 'Start-up tedesca di self-scanning con controllo del peso'
      },
      {
        titel: 'Piattaforma per servizi funebri',
        ziel: 'Prima un MVP con Appsmith e FastAPI, poi il frontend secondo un modello Figma e un backend proprio. I visitatori cercano fornitori vicini tramite il codice postale, sottoscrivono un’adesione e vengono registrati nel CRM.',
        kunde: 'Fornitore tedesco di sepolture naturali'
      },
      {
        titel: 'Registrare automaticamente le fatture in entrata',
        ziel: 'Un ERP invia in streaming i PDF delle fatture a un servizio Azure, che li legge e li restituisce strutturati in JSON. Gli utenti possono insegnare al sistema a riconoscere le fatture rilevanti.',
        kunde: erpAgenturIt
      },
      {
        titel: 'Arricchimento prodotti multi-tenant',
        ziel: 'Una Azure Function riceve dati di prodotto in JSON, li arricchisce per ogni tenant dal database e li restituisce.',
        kunde: erpAgenturIt
      },
      {
        titel: 'Documenti dalla cartella al sistema documentale',
        ziel: 'Un programma in Go invia i PDF di una cartella monitorata a una Azure Function. Lì viene letto il codice a barre, richiesto un token e il documento viene passato alla gestione documentale.',
        kunde: erpAgenturIt
      },
      {
        titel: 'Gestione merci collegata al CRM',
        ziel: 'JTL-Wawi e HubSpot sono stati collegati secondo le specifiche del cliente e mantenuti costantemente sincronizzati.',
        kunde: 'Produttore tedesco di borse frigo e contenitori termici'
      },
      {
        titel: 'Gestione codici a barre per il controllo qualità',
        ziel: 'Un client desktop nativo per l’acquisizione, più un software server per l’elaborazione e l’analisi.',
        kunde: 'Fornitore tedesco di servizi di incisione'
      },
      {
        titel: 'CRM con gestione dei progetti',
        ziel: 'Odoo configurato ed esteso come CRM, con gestione dei progetti, archiviazione dei dati e pianificazione.',
        kunde: 'Agenzia immobiliare svizzera'
      },
      {
        titel: 'Esportazione dati portata da Python a Go',
        ziel: 'Uno script esistente legge un database Oracle tramite parametri, scrive un CSV, registra un log e consegna il file via SFTP. Riscritto in Go, ora si distribuisce senza ambiente di runtime.',
        kunde: 'Azienda austriaca'
      },
      {
        titel: 'Plugin di ticketing per Jira',
        ziel: 'Estensione del software di gestione progetti con un flusso di ticket proprio.',
        kunde: 'Produttore austriaco di hardware'
      }
    ],
    weitere: [
      'Plugin per automatizzare prodotti digitali',
      'Riproduzione di una piattaforma di pubblicazione, codice sorgente aperto',
      'Modello Figma trasformato in template, errori corretti, funzioni aggiunte',
      'Portale immobiliare: offerte adatte inviate via e-mail agli investitori',
      'Portale immobiliare: correzioni e nuove funzioni',
      'Sito di reclutamento collegato a un CRM per candidati',
      'Generare documentazione dal codice sorgente di Power Apps, in Markdown, HTML e PDF',
      'Convertire dati ERP da JSON a XML',
      'Negozio tedesco adattato al mercato svizzero',
      'Plugin di prenotazione esteso per un’elaborazione più rapida',
      'CRM e gestione merci collegati',
      'Connettore tra gestione merci e negozio online',
      'Plugin per buoni adattato, tracciamento delle spedizioni configurato',
      'Disponibilità degli appartamenti come tabella e grafico 3D a colori',
      'Blocco schermo per un internet café secondo le specifiche del cliente',
      'Elenco aziende per Germania, Austria e Svizzera'
    ]
  },
  en: {
    titel: 'References — Goran Strainovic',
    beschreibung:
      'Selected development projects since 2016: microservices in Go, Azure integrations for ERP systems, inventory management linked to CRM, Odoo and Rust.',
    ueberschrift: 'References',
    einleitung:
      'A selection from 45 client projects since 2016. I only name clients with their approval, so the industry is given here instead. There are no screenshots, most of the applications run internally.',
    beleg: 'View contribution history',
    weitereTitel: 'Further projects',
    projekte: [
      {
        titel: 'Contributions to a supply chain attack scanner',
        ziel: 'Six merged changes to shai-hulud-detect, a tool that checks projects for traces of the npm supply chain attacks: running under Git Bash and WSL, handling Windows line endings, plus two fixes to the data exfiltration detection, where comments led to false results. A scanner that only runs on its author’s machine does not get run.',
        kunde: 'Open project, contributions publicly traceable'
      },
      {
        titel: 'Monolith split into microservices',
        ziel: 'A TypeScript application was turned into Go services that can be run on their own. Since then it runs in any cloud as well as on the client’s own server.',
        kunde: 'German self-scanning start-up with weight control'
      },
      {
        titel: 'Platform for funeral services',
        ziel: 'First an MVP with Appsmith and FastAPI, then the frontend from a Figma design and a custom backend. Visitors search for providers near them by postcode, take out a membership and are created in the CRM.',
        kunde: 'German provider of natural burials'
      },
      {
        titel: 'Booking incoming invoices automatically',
        ziel: 'An ERP streams invoice PDFs to an Azure service that reads them and returns them as structured JSON. Users can train the system on the invoices that matter.',
        kunde: erpAgenturEn
      },
      {
        titel: 'Multi-tenant product enrichment',
        ziel: 'An Azure Function receives product data as JSON, enriches it per tenant from the database and returns it.',
        kunde: erpAgenturEn
      },
      {
        titel: 'Documents from a folder into document management',
        ziel: 'A Go program sends PDFs from a watched folder to an Azure Function. There the barcode is read, a token requested and the document handed over to the document management system.',
        kunde: erpAgenturEn
      },
      {
        titel: 'Inventory management linked to CRM',
        ziel: 'JTL-Wawi and HubSpot were connected to the client’s specifications and kept in sync continuously.',
        kunde: 'German manufacturer of cool and warming boxes'
      },
      {
        titel: 'Barcode management for quality assurance',
        ziel: 'A native desktop client for data capture, plus server software for processing and analysis.',
        kunde: 'German engraving service provider'
      },
      {
        titel: 'CRM with project tracking',
        ziel: 'Odoo set up and extended as a CRM, with project tracking, data storage and planning.',
        kunde: 'Swiss real estate agency'
      },
      {
        titel: 'Data export ported from Python to Go',
        ziel: 'An existing script reads an Oracle database based on parameters, writes CSV, logs and delivers the file via SFTP. Rewritten in Go, it now ships without a runtime.',
        kunde: 'Austrian company'
      },
      {
        titel: 'Ticket plugin for Jira',
        ziel: 'Extending the project management software with a custom ticket workflow.',
        kunde: 'Austrian hardware manufacturer'
      }
    ],
    weitere: [
      'Plugin for automating digital products',
      'Rebuild of a publishing platform, open source',
      'Figma design turned into templates, bugs fixed, features added',
      'Real estate portal: matching offers emailed to investors',
      'Real estate portal: bug fixes and new features',
      'Recruiting site connected to an applicant CRM',
      'Generating documentation from Power Apps source code, as Markdown, HTML and PDF',
      'Converting ERP data from JSON to XML',
      'German shop set up for the Swiss market',
      'Booking plugin extended for faster processing',
      'CRM and inventory management connected',
      'Connector between inventory management and shop system',
      'Voucher plugin adapted, shipment tracking set up',
      'Apartment availability as a table and colored 3D graphic',
      'Screen lock for an internet café to the client’s specifications',
      'Business directory for Germany, Austria and Switzerland'
    ]
  }
} satisfies Record<Sprache, typeof de>
