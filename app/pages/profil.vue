<script setup lang="ts">
useSeoMeta({
  title: 'Profil — Goran Strainovic',
  description:
    'Werdegang und Technologien: seit 2016 selbstständig mit 27 Entwicklungsprojekten, aktuell in der WebGIS-Entwicklung bei Wälli AG Ingenieure.'
})

const stationen = [
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
    punkte: [
      'Web-Kundenportal: neue Funktionen und Fehlerbehebung',
      'Desktop-Applikation und API',
      'Kundensupport'
    ],
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
      '27 Entwicklungsprojekte für Auftraggeber in der Schweiz, Deutschland und Österreich, von der Anforderungsaufnahme bis zur Übergabe',
      'Schwerpunkt Integration: Warenwirtschaft an CRM, Rechnungseingang an die Buchhaltung, Shop an das ERP, Belege an das Dokumentenmanagement',
      'Vier Projekte innerhalb eines Jahres mit serverlosen Diensten auf Azure für einen deutschen ERP-Hersteller, darunter ein mandantenfähiger',
      'Migration eines TypeScript-Monolithen auf Microservices in Go, betrieben auf Kubernetes',
      'Eigenständige Anwendungen in Rust, Python und Go, dazu Shop- und Portalentwicklung'
    ],
    stack: 'TypeScript, Go, Python, Rust, PHP, C#, Node.js, Azure, Kubernetes'
  }
]

const technologien = [
  { gruppe: 'Sprachen', werte: 'TypeScript, JavaScript, Go, Python, C#, PHP, Rust' },
  { gruppe: 'Frontend', werte: 'Vue, Nuxt, Quasar, React, Tailwind' },
  { gruppe: 'Backend', werte: 'Node.js, Express, .NET, FastAPI, gRPC, REST, GraphQL' },
  { gruppe: 'Daten', werte: 'PostgreSQL, MS SQL, MySQL, MariaDB, CockroachDB, SQLite' },
  { gruppe: 'Betrieb', werte: 'Kubernetes, Docker, Azure, AWS, Google Cloud, Hetzner, Linux' },
  { gruppe: 'Integration', werte: 'ERP-Anbindungen, JTL-Wawi, Odoo, HubSpot, Shopware, Stripe, Mollie' }
]
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">Profil</h1>
    </header>

    <h2 class="mt-12 font-mono text-xs text-gedaempft">Werdegang</h2>
    <ol class="mt-5">
      <li
        v-for="s in stationen"
        :key="s.firma"
        class="grid gap-x-6 gap-y-2 border-t border-linie py-7 sm:grid-cols-[8.5rem_1fr]"
      >
        <p class="zahlen pt-1 font-mono text-xs text-akzent">{{ s.zeit }}</p>
        <div>
          <h3 class="font-semibold">{{ s.firma }}</h3>
          <p class="text-gedaempft">{{ s.rolle }}</p>
          <ul class="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li v-for="p in s.punkte" :key="p" class="max-w-prose border-l border-linie-stark pl-3">
              {{ p }}
            </li>
          </ul>
          <p class="mt-4 font-mono text-xs leading-relaxed text-gedaempft">{{ s.stack }}</p>
        </div>
      </li>
    </ol>

    <p class="border-t border-linie pt-7 text-sm leading-relaxed text-gedaempft max-w-prose">
      Davor bis 2022 in der Elektronikfertigung bei Variosystems in Steinach,
      zuletzt in Prüffeld und Arbeitsvorbereitung. Dort entstand die
      Automatisierung der Fehlerprotokollierung, die den Weg in die
      Softwareentwicklung geebnet hat.
    </p>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">Technologien</h2>
    <dl class="mt-5">
      <div v-for="t in technologien" :key="t.gruppe" class="feld">
        <dt>{{ t.gruppe }}</dt>
        <dd class="max-w-prose">{{ t.werte }}</dd>
      </div>
    </dl>
  </article>
</template>
