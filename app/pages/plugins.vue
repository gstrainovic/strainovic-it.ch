<script setup lang="ts">
import texte, { plattformen } from '~/texte/plugins'

const { pfad, t } = useSprache(texte)

useSeoMeta({
  title: () => t.value.titel,
  description: () => t.value.beschreibung
})
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">{{ t.ueberschrift }}</h1>
      <p class="mt-3 max-w-prose text-gedaempft">{{ t.einleitung }}</p>
    </header>

    <ol class="mt-5">
      <li
        v-for="p in t.liste"
        :key="p.pfad"
        class="border-t border-linie py-7"
      >
        <h2 class="font-semibold">
          <NuxtLink :to="pfad(p.pfad)" class="underline underline-offset-4">{{ p.titel }}</NuxtLink>
        </h2>
        <p class="mt-2 max-w-prose leading-relaxed">{{ p.text }}</p>
        <p class="mt-3 font-mono text-xs leading-relaxed text-gedaempft">{{ plattformen[p.pfad] }}</p>
      </li>
    </ol>
  </article>
</template>
