<script setup lang="ts">
import texte from '~/texte/start'

const { pfad, t } = useSprache(texte)

useSeoMeta({
  title: () => t.value.titel,
  description: () => t.value.beschreibung
})

// Strukturierte Daten: klassische Suchmaschinen wie auch KI-Dienste lesen
// sie aus, um Person, Ort und Taetigkeit eindeutig zuzuordnen.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
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
          jobTitle: t.value.beruf,
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
</script>

<template>
  <article>
    <!-- Kopfblock: die Kennung des Datenblatts -->
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
        Goran Strainovic
      </h1>
      <p class="mt-3 max-w-prose text-lg text-gedaempft">{{ t.einleitung }}</p>
    </header>

    <dl class="mt-2">
      <div v-for="k in t.kenndaten" :key="k.feld" class="feld">
        <dt>{{ k.feld }}</dt>
        <dd class="max-w-prose">{{ k.wert }}</dd>
      </div>
    </dl>

    <section class="mt-12">
      <h2 class="font-mono text-xs text-gedaempft">{{ t.schwerpunkteTitel }}</h2>
      <div class="mt-5 grid gap-px overflow-hidden border border-linie bg-linie sm:grid-cols-3">
        <div v-for="s in t.schwerpunkte" :key="s.titel" class="bg-flaeche p-5">
          <h3 class="font-semibold">{{ s.titel }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gedaempft">{{ s.text }}</p>
          <p class="mt-4 font-mono text-xs leading-relaxed text-gedaempft">{{ s.technik }}</p>
        </div>
      </div>
    </section>

    <section class="mt-16">
      <h2 class="font-mono text-xs text-gedaempft">{{ t.produkteTitel }}</h2>
      <div class="mt-5 grid gap-px overflow-hidden border border-linie bg-linie sm:grid-cols-2">
        <div v-for="p in t.produkte" :key="p.titel" class="bg-flaeche p-5">
          <h3 class="font-semibold">
            <NuxtLink :to="pfad(p.pfad)" class="underline underline-offset-4">{{ p.titel }}</NuxtLink>
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-gedaempft">{{ p.text }}</p>
        </div>
      </div>
    </section>

    <section class="mt-16">
      <h2 class="font-mono text-xs text-gedaempft">{{ t.schemaTitel }}</h2>
      <div class="mt-5">
        <IntegrationsSchema />
      </div>
    </section>
  </article>
</template>
