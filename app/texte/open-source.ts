import type { Sprache } from '~/utils/sprache'

// Name, Sprache und Link gelten überall; übersetzt wird nur die Beschreibung.
export const eigene = [
  { name: 'zid', sprache: 'Zig' },
  { name: 'freshview', sprache: 'Rust' },
  { name: 'neoview', sprache: 'Rust' },
  { name: 'editor-framework', sprache: 'Rust' },
  { name: 'v-gui-editor', sprache: 'V' },
  { name: 'shai-hulud-detect-rust', sprache: 'Rust' },
  { name: 'agent-session-manager', sprache: 'Rust' },
  { name: 'wartungsheft', sprache: 'TypeScript' },
  { name: 'ai-proxy', sprache: 'TypeScript' },
  { name: 'dms', sprache: 'TypeScript' }
]

export const artikel = ['/open-source/editor-suche/', '/open-source/ki-testet-ohne-fenster/', '/open-source/rechnung-fotografieren/', '/open-source/dms-selbst-gebaut/']

const de = {
  titel: 'Open Source — Goran Strainovic',
  beschreibung:
    'Öffentliche eigene Projekte und Beiträge an fremden: ein Editor in Zig, Werkzeuge rund um KI-Modelle, und Änderungen an einem Prüfwerkzeug für Lieferkettenangriffe.',
  ueberschrift: 'Open Source',
  einleitung:
    'Was hier steht, lässt sich nachprüfen. Anders als die Kundenarbeit auf der Referenzseite ist der Quelltext offen und der Verlauf einsehbar.',
  aufgeschrieben: 'Aufgeschrieben',
  artikel: [
    {
      titel: 'Sieben Monate auf der Suche nach einem Editor',
      text: 'Von VS Code über Terminal-Editoren und gpui zu Zig. Elf Anläufe mit acht Oberflächen-Bibliotheken, und warum Werkzeuggrenzen für einen KI-Agenten in den Code gehören.'
    },
    {
      titel: 'Ein KI-Agent testet meinen Editor ohne Fenster',
      text: 'Testgetriebene Entwicklung an einer nativen Desktop-App: Headless-Modus, JSON-RPC als Fernbedienung und Screenshots, die der Agent selbst ansieht.'
    },
    {
      titel: 'Rechnung fotografieren, Daten prüfen',
      text: 'Werkstattrechnungen mit Mistral auslesen: OCR und Schema in zwei Stufen, Nachkontrolle im Code und ein Wächter gegen Erfolgsmeldungen ohne Tool-Aufruf.'
    },
    {
      titel: 'Drei Programme oder ein eigenes',
      text: 'Warum ich meine Dokumentenablage mit OCR, Tags und Chat selbst gebaut habe, statt drei Programme zu verbinden, und wann Paperless-ngx heute die bessere Wahl ist.'
    }
  ],
  beitraegeTitel: 'Beiträge an fremden Projekten',
  beitrag:
    'Sechs übernommene Änderungen an einem Prüfwerkzeug für die npm-Lieferkettenangriffe: Lauffähigkeit unter Git Bash und WSL, Windows-Zeilenenden, zwei Korrekturen an der Erkennung von Datenabfluss.',
  beleg: 'Beitragsverlauf ansehen',
  eigeneTitel: 'Eigene Projekte',
  eigene: [
    'Eigener Code-Editor mit eigener Oberfläche: wgpu, im Renderer auf das Vulkan-Backend festgelegt, Clay für das Layout, eigener Glyphen-Atlas und GPU-Text-Renderer über FreeType. Die Textspeicherung kommt von flow-core, die Syntaxhervorhebung von flow-syntax, das Terminal von Ghostty, PDF von mupdf. Dazu ein eingebauter Agent gegen ein lokales Sprachmodell.',
    'Der Terminal-Editor Fresh als Bibliothek in einer egui-Oberfläche, mit PDF- und Bildvorschau über mupdf in schwebenden Fenstern.',
    'Neovim eingebettet in eine Oberfläche aus gpui, dem Framework hinter Zed.',
    'Gerüst für einen Editor auf gpui, mit Lua für Plugins.',
    'Editor-Prototyp im GUI-Framework der Sprache V, mit Explorer, Tableiste und Statusleiste.',
    'Eigene Rust-Fassung des Prüfwerkzeugs, dessen Bash-Original ich mitgepflegt habe.',
    'Sitzungsverwalter für Claude Code im Terminal.',
    'Serviceheft für Autos als PWA mit Vue 3 und selbst gehostetem InstantDB. Werkstattrechnungen, Fahrzeugausweise und Servicehefte werden fotografiert und über Mistral ausgelesen.',
    'Hält einen Modellschlüssel serverseitig, zählt Nutzung und setzt Tarifgrenzen durch.',
    'Dokumentenablage mit Vue 3 und Supabase: Mistral OCR, Tags und Felder per Sprachmodell, hybride Suche mit pgvector und ein Chat mit Quellenangabe über alle Dokumente.'
  ]
}

export default {
  de,
  fr: {
    titel: 'Open source — Goran Strainovic',
    beschreibung:
      'Projets publics personnels et contributions à des projets tiers : un éditeur en Zig, des outils autour des modèles d’IA et des modifications d’un outil de détection des attaques de la chaîne d’approvisionnement.',
    ueberschrift: 'Open source',
    einleitung:
      'Tout ce qui figure ici est vérifiable. Contrairement au travail pour les clients présenté dans les références, le code source est ouvert et l’historique consultable.',
    aufgeschrieben: 'Articles',
    artikel: [
      {
        titel: 'Sept mois à la recherche d’un éditeur',
        text: 'De VS Code à Zig, en passant par les éditeurs en terminal et gpui. Onze tentatives avec huit bibliothèques d’interface, et pourquoi les limites des outils d’un agent IA doivent être inscrites dans le code.'
      },
      {
        titel: 'Un agent IA teste mon éditeur sans fenêtre',
        text: 'Développement piloté par les tests d’une application de bureau native : mode headless, JSON-RPC comme télécommande et captures d’écran que l’agent regarde lui-même.'
      },
      {
        titel: 'Photographier une facture, vérifier les données',
        text: 'Lire des factures de garage avec Mistral : OCR et schéma en deux étapes, contrôle dans le code et un garde-fou contre les messages de réussite sans appel d’outil.'
      },
      {
        titel: 'Trois programmes ou un programme maison',
        text: 'Pourquoi j’ai construit moi-même mon archivage de documents avec OCR, tags et chat, plutôt que de relier trois programmes, et quand Paperless-ngx est aujourd’hui le meilleur choix.'
      }
    ],
    beitraegeTitel: 'Contributions à des projets tiers',
    beitrag:
      'Six modifications acceptées dans un outil de détection des attaques de la chaîne d’approvisionnement npm : fonctionnement sous Git Bash et WSL, fins de ligne Windows, deux corrections de la détection d’exfiltration de données.',
    beleg: 'Voir l’historique des contributions',
    eigeneTitel: 'Projets personnels',
    eigene: [
      'Éditeur de code avec sa propre interface : wgpu, limité au backend Vulkan dans le moteur de rendu, Clay pour la mise en page, atlas de glyphes et rendu de texte GPU maison via FreeType. Le stockage du texte vient de flow-core, la coloration syntaxique de flow-syntax, le terminal de Ghostty, le PDF de mupdf. Avec un agent intégré qui s’appuie sur un modèle de langage local.',
      'L’éditeur en terminal Fresh utilisé comme bibliothèque dans une interface egui, avec aperçu PDF et images via mupdf dans des fenêtres flottantes.',
      'Neovim intégré dans une interface gpui, le framework derrière Zed.',
      'Base d’un éditeur sur gpui, avec Lua pour les plugins.',
      'Prototype d’éditeur dans le framework GUI du langage V, avec explorateur, barre d’onglets et barre d’état.',
      'Version Rust de l’outil de détection dont j’ai co-maintenu l’original en Bash.',
      'Gestionnaire de sessions pour Claude Code dans le terminal.',
      'Carnet d’entretien pour voitures en PWA avec Vue 3 et InstantDB auto-hébergé. Les factures de garage, permis de circulation et carnets d’entretien sont photographiés et lus via Mistral.',
      'Garde une clé de modèle côté serveur, compte l’utilisation et applique les limites des forfaits.',
      'Archivage de documents avec Vue 3 et Supabase : Mistral OCR, tags et champs par modèle de langage, recherche hybride avec pgvector et un chat citant ses sources sur tous les documents.'
    ]
  },
  it: {
    titel: 'Open source — Goran Strainovic',
    beschreibung:
      'Progetti pubblici propri e contributi a progetti altrui: un editor in Zig, strumenti attorno ai modelli di IA e modifiche a uno strumento di verifica contro gli attacchi alla supply chain.',
    ueberschrift: 'Open source',
    einleitung:
      'Quello che trovate qui è verificabile. A differenza del lavoro per i clienti nella pagina delle referenze, il codice sorgente è aperto e la cronologia consultabile.',
    aufgeschrieben: 'Articoli',
    artikel: [
      {
        titel: 'Sette mesi alla ricerca di un editor',
        text: 'Da VS Code agli editor da terminale e gpui, fino a Zig. Undici tentativi con otto librerie di interfaccia, e perché i limiti degli strumenti di un agente IA vanno scritti nel codice.'
      },
      {
        titel: 'Un agente IA testa il mio editor senza finestra',
        text: 'Sviluppo guidato dai test di un’applicazione desktop nativa: modalità headless, JSON-RPC come telecomando e screenshot che l’agente guarda da sé.'
      },
      {
        titel: 'Fotografare una fattura, verificare i dati',
        text: 'Leggere fatture d’officina con Mistral: OCR e schema in due fasi, controllo nel codice e una guardia contro messaggi di successo senza chiamata allo strumento.'
      },
      {
        titel: 'Tre programmi o uno proprio',
        text: 'Perché ho costruito da me il mio archivio di documenti con OCR, tag e chat, invece di collegare tre programmi, e quando oggi Paperless-ngx è la scelta migliore.'
      }
    ],
    beitraegeTitel: 'Contributi a progetti altrui',
    beitrag:
      'Sei modifiche accettate in uno strumento di verifica contro gli attacchi alla supply chain di npm: funzionamento con Git Bash e WSL, fine riga Windows, due correzioni al rilevamento dell’esfiltrazione di dati.',
    beleg: 'Vedi la cronologia dei contributi',
    eigeneTitel: 'Progetti propri',
    eigene: [
      'Editor di codice con interfaccia propria: wgpu, vincolato al backend Vulkan nel renderer, Clay per il layout, atlante di glifi e renderer di testo su GPU propri tramite FreeType. La gestione del testo viene da flow-core, l’evidenziazione della sintassi da flow-syntax, il terminale da Ghostty, il PDF da mupdf. In più un agente integrato che usa un modello linguistico locale.',
      'L’editor da terminale Fresh come libreria in un’interfaccia egui, con anteprima di PDF e immagini tramite mupdf in finestre fluttuanti.',
      'Neovim integrato in un’interfaccia gpui, il framework dietro Zed.',
      'Struttura di base per un editor su gpui, con Lua per i plugin.',
      'Prototipo di editor nel framework GUI del linguaggio V, con esplora risorse, barra delle schede e barra di stato.',
      'Versione Rust dello strumento di verifica di cui ho contribuito a mantenere l’originale in Bash.',
      'Gestore di sessioni per Claude Code nel terminale.',
      'Libretto di manutenzione per auto come PWA con Vue 3 e InstantDB in self-hosting. Fatture d’officina, licenze di circolazione e libretti di manutenzione vengono fotografati e letti con Mistral.',
      'Tiene lato server la chiave di un modello, conta l’utilizzo e applica i limiti delle tariffe.',
      'Archivio di documenti con Vue 3 e Supabase: Mistral OCR, tag e campi tramite modello linguistico, ricerca ibrida con pgvector e una chat con fonti su tutti i documenti.'
    ]
  },
  en: {
    titel: 'Open source — Goran Strainovic',
    beschreibung:
      'My own public projects and contributions to others: an editor in Zig, tools around AI models, and changes to a scanner for supply chain attacks.',
    ueberschrift: 'Open source',
    einleitung:
      'What is listed here can be checked. Unlike the client work on the references page, the source code is open and the history is visible.',
    aufgeschrieben: 'Articles',
    artikel: [
      {
        titel: 'Seven months searching for an editor',
        text: 'From VS Code via terminal editors and gpui to Zig. Eleven attempts with eight UI libraries, and why tool limits for an AI agent belong in the code.'
      },
      {
        titel: 'An AI agent tests my editor without a window',
        text: 'Test-driven development of a native desktop app: headless mode, JSON-RPC as a remote control and screenshots the agent looks at itself.'
      },
      {
        titel: 'Photograph the invoice, check the data',
        text: 'Reading garage invoices with Mistral: OCR and schema in two stages, checks in code and a guard against success messages without a tool call.'
      },
      {
        titel: 'Three programs or one of my own',
        text: 'Why I built my own document archive with OCR, tags and chat, instead of connecting three programs, and when Paperless-ngx is the better choice today.'
      }
    ],
    beitraegeTitel: 'Contributions to other projects',
    beitrag:
      'Six merged changes to a scanner for the npm supply chain attacks: running under Git Bash and WSL, Windows line endings, two fixes to the data exfiltration detection.',
    beleg: 'View contribution history',
    eigeneTitel: 'Own projects',
    eigene: [
      'A code editor with its own UI: wgpu, pinned to the Vulkan backend in the renderer, Clay for layout, a custom glyph atlas and GPU text renderer via FreeType. Text storage comes from flow-core, syntax highlighting from flow-syntax, the terminal from Ghostty, PDF from mupdf. Plus a built-in agent working against a local language model.',
      'The terminal editor Fresh as a library in an egui UI, with PDF and image preview via mupdf in floating windows.',
      'Neovim embedded in a UI built with gpui, the framework behind Zed.',
      'Scaffold for an editor on gpui, with Lua for plugins.',
      'Editor prototype in the GUI framework of the V language, with explorer, tab bar and status bar.',
      'My own Rust version of the scanner whose Bash original I helped maintain.',
      'Session manager for Claude Code in the terminal.',
      'Car service book as a PWA with Vue 3 and self-hosted InstantDB. Garage invoices, vehicle registrations and service books are photographed and read via Mistral.',
      'Keeps a model key on the server side, counts usage and enforces plan limits.',
      'Document archive with Vue 3 and Supabase: Mistral OCR, tags and fields via a language model, hybrid search with pgvector and a chat over all documents that cites its sources.'
    ]
  }
} satisfies Record<Sprache, typeof de>
