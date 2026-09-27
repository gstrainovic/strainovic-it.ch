<script setup lang="ts">
import texte, { artikel, eigene } from '~/texte/open-source'

const { pfad, t } = useSprache(texte)

useSeoMeta({
  title: () => t.value.titel,
  description: () => t.value.beschreibung
})

const gh = 'https://github.com/gstrainovic/'
const beitragUrl = 'https://github.com/Cobenian/shai-hulud-detect/commits?author=gstrainovic'

const texteArtikel = computed(() => artikel.map((a, i) => ({ pfad: a, ...t.value.artikel[i]! })))
const projekte = computed(() => eigene.map((p, i) => ({ ...p, was: t.value.eigene[i]! })))
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">{{ t.ueberschrift }}</h1>
      <p class="mt-3 max-w-prose text-gedaempft">{{ t.einleitung }}</p>
    </header>

    <h2 class="mt-12 font-mono text-xs text-gedaempft">{{ t.aufgeschrieben }}</h2>
    <div
      v-for="(a, i) in texteArtikel"
      :key="a.pfad"
      class="border-t border-linie py-7"
      :class="{ 'mt-5': i === 0 }"
    >
      <h3 class="font-semibold">
        <NuxtLink :to="pfad(a.pfad)" class="text-akzent underline underline-offset-4">{{ a.titel }}</NuxtLink>
      </h3>
      <p class="mt-2 max-w-prose leading-relaxed">{{ a.text }}</p>
    </div>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">{{ t.beitraegeTitel }}</h2>
    <ol class="mt-5">
      <li class="border-t border-linie py-7">
        <h3 class="font-mono text-sm font-semibold">Cobenian/shai-hulud-detect</h3>
        <p class="mt-2 max-w-prose leading-relaxed">{{ t.beitrag }}</p>
        <p class="mt-2 text-sm">
          <a :href="beitragUrl" rel="noopener" class="text-akzent underline underline-offset-4">{{ t.beleg }}</a>
        </p>
      </li>
    </ol>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">{{ t.eigeneTitel }}</h2>
    <ol class="mt-5">
      <li
        v-for="p in projekte"
        :key="p.name"
        class="grid gap-x-6 gap-y-2 border-t border-linie py-7 sm:grid-cols-[8.5rem_1fr]"
      >
        <p class="pt-1 font-mono text-xs text-akzent">{{ p.sprache }}</p>
        <div>
          <h3 class="font-mono text-sm font-semibold">
            <a :href="gh + p.name" rel="noopener" class="underline underline-offset-4">{{ p.name }}</a>
          </h3>
          <p class="mt-2 max-w-prose leading-relaxed">{{ p.was }}</p>
        </div>
      </li>
    </ol>
  </article>
</template>
