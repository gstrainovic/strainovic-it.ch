<script setup lang="ts">
useSeoMeta({
  title: 'Kontakt — Goran Strainovic',
  description: 'Strainovic IT, Steinach. Kontakt per E-Mail an info@strainovic-it.ch.'
})

const angaben = [
  { feld: 'E-Mail', wert: 'info@strainovic-it.ch', href: 'mailto:info@strainovic-it.ch' },
  { feld: 'Firma', wert: 'Strainovic IT, Goran Strainovic' },
  { feld: 'Adresse', wert: 'Bahnstrasse 9b, 9323 Steinach, Schweiz' },
  { feld: 'Sprache', wert: 'Deutsch, Englisch' }
]
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">Kontakt</h1>
      <p class="mt-3 max-w-prose text-gedaempft">
        Schreiben Sie mir, am besten mit ein paar Sätzen zum Vorhaben und zum
        eingesetzten Stack.
      </p>
    </header>

    <dl class="mt-2">
      <div v-for="a in angaben" :key="a.feld" class="feld">
        <dt>{{ a.feld }}</dt>
        <dd class="max-w-prose">
          <a v-if="a.href" :href="a.href" class="text-akzent underline underline-offset-4">{{ a.wert }}</a>
          <span v-else>{{ a.wert }}</span>
        </dd>
      </div>
    </dl>
  </article>
</template>
