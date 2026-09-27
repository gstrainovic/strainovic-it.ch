<script setup lang="ts">
import texte from '~/texte/kontakt'

const { t } = useSprache(texte)

useSeoMeta({
  title: () => t.value.titel,
  description: () => t.value.beschreibung
})

const angaben = computed(() => [
  { feld: t.value.felder.email, wert: 'info@strainovic-it.ch', href: 'mailto:info@strainovic-it.ch' },
  { feld: t.value.felder.firma, wert: 'Strainovic IT, Goran Strainovic' },
  { feld: t.value.felder.adresse, wert: t.value.adresse },
  { feld: t.value.felder.sprache, wert: t.value.sprachen }
])
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">{{ t.ueberschrift }}</h1>
      <p class="mt-3 max-w-prose text-gedaempft">{{ t.einleitung }}</p>
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
