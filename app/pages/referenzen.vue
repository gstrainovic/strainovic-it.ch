<script setup lang="ts">
useSeoMeta({
  title: 'Referenzen — Goran Strainovic',
  description:
    'Ausgewählte Entwicklungsprojekte seit 2016: Microservices in Go, Azure-Integrationen für ERP-Systeme, Warenwirtschaft an CRM, Odoo und Rust.'
})

const ausfuehrlich = [
  {
    zeit: '2025',
    titel: 'Beiträge an einem Prüfwerkzeug für Lieferkettenangriffe',
    ziel: 'Sechs übernommene Änderungen an shai-hulud-detect, einem Werkzeug, das Projekte auf Spuren der npm-Lieferkettenangriffe prüft: Lauffähigkeit unter Git Bash und WSL, Behandlung von Windows-Zeilenenden, dazu zwei Korrekturen an der Erkennung von Datenabfluss, wo Kommentare zu falschen Ergebnissen führten. Ein Prüfwerkzeug, das nur auf dem Rechner seines Autors läuft, wird nicht ausgeführt.',
    stack: 'Bash',
    kunde: 'Offenes Projekt, Beiträge öffentlich nachvollziehbar',
    beleg: 'https://github.com/Cobenian/shai-hulud-detect/commits?author=gstrainovic'
  },
  {
    zeit: '2022 – 2023',
    titel: 'Monolith in Microservices zerlegt',
    ziel: 'Eine TypeScript-Anwendung wurde in einzeln betreibbare Dienste in Go überführt. Sie läuft seither in jeder Cloud und ebenso auf dem Server beim Kunden.',
    stack: 'Go, Kubernetes, gRPC, PostgreSQL, CockroachDB',
    kunde: 'Deutsches Start-up für Self-Scanning mit Gewichtskontrolle'
  },
  {
    zeit: '2022',
    titel: 'Plattform für Bestattungen',
    ziel: 'Zuerst ein MVP mit Appsmith und FastAPI, danach das Frontend nach Figma-Vorlage und ein eigenes Backend. Besucher suchen über die Postleitzahl nach Anbietern in ihrer Nähe, schliessen eine Mitgliedschaft ab und werden im CRM angelegt.',
    stack: 'Gatsby, React, Tailwind, Python, Strawberry, FastAPI, Mollie, HubSpot',
    kunde: 'Deutscher Anbieter für natürliche Beerdigungen'
  },
  {
    zeit: '2021',
    titel: 'Eingangsrechnungen automatisch verbuchen',
    ziel: 'Ein ERP streamt Rechnungs-PDFs an einen Azure-Dienst, der sie ausliest und strukturiert als JSON zurückgibt. Die Anwender können dem System relevante Rechnungen anlernen.',
    stack: 'TypeScript, Node.js, Express, Prisma, Azure',
    kunde: 'Deutscher ERP-Hersteller über eine Automatisierungs-Agentur'
  },
  {
    zeit: '2022',
    titel: 'Mandantenfähige Produktanreicherung',
    ziel: 'Eine Azure Function nimmt Produktdaten als JSON entgegen, reichert sie je Mandant aus der Datenbank an und gibt sie zurück.',
    stack: 'Azure Functions, TypeScript, Node.js, Prisma',
    kunde: 'Deutscher ERP-Hersteller über eine Automatisierungs-Agentur'
  },
  {
    zeit: '2022',
    titel: 'Belege vom Ordner ins Dokumentensystem',
    ziel: 'Ein Programm in Go schickt PDFs aus einem überwachten Ordner an eine Azure Function. Dort wird der Barcode ausgelesen, ein Token beantragt und der Beleg an das Dokumentenmanagement übergeben.',
    stack: 'Go, Azure Functions, TypeScript, Node.js',
    kunde: 'Deutscher ERP-Hersteller über eine Automatisierungs-Agentur'
  },
  {
    zeit: '2020 – 2021',
    titel: 'Warenwirtschaft an CRM angebunden',
    ziel: 'JTL-Wawi und HubSpot wurden nach Kundenvorgaben verbunden und laufend synchron gehalten.',
    stack: 'JTL-Wawi, HubSpot, Laravel, PHP, TypeScript, Node.js',
    kunde: 'Deutscher Hersteller von Kühl- und Wärmeboxen'
  },
  {
    zeit: '2022',
    titel: 'Barcode-Verwaltung für die Qualitätssicherung',
    ziel: 'Ein nativer Desktop-Client zur Erfassung, dazu Serversoftware für Bearbeitung und Auswertung.',
    stack: 'Rust, Strapi, Metabase',
    kunde: 'Deutscher Dienstleister für Gravuren'
  },
  {
    zeit: '2019 – 2020',
    titel: 'CRM mit Projekterfassung',
    ziel: 'Odoo als CRM eingerichtet und erweitert, mit Projekterfassung, Datenablage und Planung.',
    stack: 'Odoo, Python',
    kunde: 'Schweizer Immobilien-Agentur'
  },
  {
    zeit: '2023',
    titel: 'Datenexport von Python nach Go portiert',
    ziel: 'Ein bestehendes Skript liest über Parameter eine Oracle-Datenbank aus, schreibt CSV, protokolliert und liefert die Datei per SFTP. Neu geschrieben in Go, dadurch ohne Laufzeitumgebung auslieferbar.',
    stack: 'Go, Python, Oracle',
    kunde: 'Österreichisches Unternehmen'
  },
  {
    zeit: '2017',
    titel: 'Ticket-Plugin für Jira',
    ziel: 'Erweiterung der Projektmanagement-Software um einen eigenen Ticket-Ablauf.',
    stack: 'Java, Jira',
    kunde: 'Österreichischer Hardwarehersteller'
  }
]

const weitere = [
  { zeit: '2023', was: 'Plug-in zur Automatisierung digitaler Produkte', stack: 'Shopware 6, PHP, Symfony' },
  { zeit: '2023', was: 'Nachbau einer Publikationsplattform, offener Quellcode', stack: 'C#, ASP.NET Minimal API, FastEndpoints, MongoDB, Angular' },
  { zeit: '2023', was: 'Figma-Vorlage in Templates überführt, Fehler behoben, Funktionen ergänzt', stack: 'Laravel, Twig, Alpine.js' },
  { zeit: '2022 – 2023', was: 'Immobilienportal: passende Angebote per E-Mail an Investoren', stack: 'ModX, PHP, Alpine.js' },
  { zeit: '2022', was: 'Immobilienportal: Fehlerbehebung und neue Funktionen', stack: 'ModX, PHP, Alpine.js' },
  { zeit: '2022', was: 'Rekrutierungsseite an ein Bewerber-CRM angebunden', stack: 'Next.js, React, Hygraph, GraphQL' },
  { zeit: '2022', was: 'Dokumentation aus Power-Apps-Quellcode erzeugen, als Markdown, HTML und PDF', stack: 'Python' },
  { zeit: '2022', was: 'ERP-Daten von JSON nach XML wandeln', stack: 'Azure Functions, TypeScript, Node.js' },
  { zeit: '2022', was: 'Deutschen Shop für den Schweizer Markt aufgesetzt', stack: 'Shopware 5' },
  { zeit: '2021 – 2022', was: 'Buchungs-Plugin um schnellere Bearbeitung erweitert', stack: 'WooCommerce, PHP' },
  { zeit: '2021', was: 'CRM und Warenwirtschaft verbunden', stack: 'HubSpot, JTL, TypeScript, Node.js, Laravel' },
  { zeit: '2020 – 2021', was: 'Connector zwischen Warenwirtschaft und Shopsystem', stack: 'Laravel, PHP, JTL, CS-Cart' },
  { zeit: '2020', was: 'Gutschein-Plugin angepasst, Sendungsverfolgung eingerichtet', stack: 'WooCommerce' },
  { zeit: '2020', was: 'Wohnungsverfügbarkeit als Tabelle und farbige 3D-Grafik', stack: 'WooCommerce, JavaScript, SVG' },
  { zeit: '2016', was: 'Bildschirmsperre für ein Internetcafé nach Kundenvorgaben', stack: 'AutoIt' },
  { zeit: '2016', was: 'Branchenverzeichnis für den DACH-Raum', stack: 'R' }
]
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">Referenzen</h1>
      <p class="mt-3 max-w-prose text-gedaempft">
        Ausgewählt aus 45 Kundenprojekten seit 2016. Kundennamen nenne
        ich nur mit Freigabe, deshalb steht hier die Branche. Bildschirmfotos
        gibt es keine, die meisten Anwendungen laufen intern.
      </p>
    </header>

    <ol class="mt-5">
      <li
        v-for="p in ausfuehrlich"
        :key="p.titel"
        class="grid gap-x-6 gap-y-2 border-t border-linie py-7 sm:grid-cols-[8.5rem_1fr]"
      >
        <p class="zahlen pt-1 font-mono text-xs text-akzent">{{ p.zeit }}</p>
        <div>
          <h2 class="font-semibold">{{ p.titel }}</h2>
          <p class="mt-2 max-w-prose leading-relaxed">{{ p.ziel }}</p>
          <p class="mt-3 font-mono text-xs leading-relaxed text-gedaempft">{{ p.stack }}</p>
          <p class="mt-1 text-sm text-gedaempft">{{ p.kunde }}</p>
          <p v-if="p.beleg" class="mt-2 text-sm">
            <a
              :href="p.beleg"
              class="text-akzent underline underline-offset-4"
              rel="noopener"
            >Beitragsverlauf ansehen</a>
          </p>
        </div>
      </li>
    </ol>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">Weitere Projekte</h2>
    <ol class="mt-5">
      <li
        v-for="w in weitere"
        :key="w.was"
        class="grid gap-x-6 gap-y-1 border-t border-linie py-4 sm:grid-cols-[8.5rem_1fr]"
      >
        <p class="zahlen font-mono text-xs text-gedaempft">{{ w.zeit }}</p>
        <div>
          <p class="max-w-prose leading-relaxed">{{ w.was }}</p>
          <p class="mt-1 font-mono text-xs text-gedaempft">{{ w.stack }}</p>
        </div>
      </li>
    </ol>
  </article>
</template>
