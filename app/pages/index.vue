<script setup lang="ts">
useSeoMeta({
  title: 'Goran Strainovic — Fullstack-Entwickler',
  description:
    'Fullstack-Entwickler aus Steinach. Schwerpunkt API- und ERP-Integration, Vue und Node im Web, Go und Kubernetes im Betrieb.'
})

// Strukturierte Daten: klassische Suchmaschinen wie auch KI-Dienste lesen
// sie aus, um Person, Ort und Taetigkeit eindeutig zuzuordnen.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Strainovic IT',
        url: 'https://www.strainovic-it.ch/',
        email: 'info@strainovic-it.ch',
        areaServed: ['CH', 'DE', 'AT'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Bahnstrasse 9b',
          postalCode: '9323',
          addressLocality: 'Steinach',
          addressRegion: 'St. Gallen',
          addressCountry: 'CH'
        },
        founder: {
          '@type': 'Person',
          name: 'Goran Strainovic',
          jobTitle: 'Fullstack-Entwickler',
          knowsLanguage: ['de', 'en'],
          knowsAbout: [
            'API-Integration',
            'ERP-Integration',
            'TypeScript',
            'Go',
            'Vue.js',
            'Nuxt',
            'Node.js',
            'Kubernetes',
            'Azure Functions',
            'PostgreSQL'
          ]
        }
      })
    }
  ]
})

const kenndaten = [
  { feld: 'Tätigkeit', wert: 'Fullstack-Entwicklung, Schwerpunkt API- und ERP-Integration' },
  { feld: 'Standort', wert: 'Steinach, Kanton St. Gallen, Schweiz' },
  { feld: 'Erfahrung', wert: 'Seit 2016, 27 Entwicklungsprojekte in der Schweiz, Deutschland und Österreich' },
  { feld: 'Sprachen', wert: 'Deutsch als Muttersprache, Englisch in Wort und Schrift' }
]

const schwerpunkte = [
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
]
</script>

<template>
  <article>
    <!-- Kopfblock: die Kennung des Datenblatts -->
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
        Goran Strainovic
      </h1>
      <p class="mt-3 max-w-prose text-lg text-gedaempft">
        Ich baue Software, die im Betrieb steht: Webanwendungen, Schnittstellen
        zwischen Systemen und die Dienste dahinter.
      </p>
    </header>

    <dl class="mt-2">
      <div v-for="k in kenndaten" :key="k.feld" class="feld">
        <dt>{{ k.feld }}</dt>
        <dd class="max-w-prose">{{ k.wert }}</dd>
      </div>
    </dl>

    <section class="mt-12">
      <h2 class="font-mono text-xs text-gedaempft">Schwerpunkte</h2>
      <div class="mt-5 grid gap-px overflow-hidden border border-linie bg-linie sm:grid-cols-3">
        <div v-for="s in schwerpunkte" :key="s.titel" class="bg-flaeche p-5">
          <h3 class="font-semibold">{{ s.titel }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gedaempft">{{ s.text }}</p>
          <p class="mt-4 font-mono text-xs leading-relaxed text-gedaempft">{{ s.technik }}</p>
        </div>
      </div>
    </section>

    <section class="mt-16">
      <h2 class="font-mono text-xs text-gedaempft">Wie eine Anbindung aussieht</h2>
      <div class="mt-5">
        <IntegrationsSchema />
      </div>
    </section>
  </article>
</template>
