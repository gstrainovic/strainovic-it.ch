<script setup lang="ts">
import texte, { projekte, weitere } from '~/texte/referenzen'

const { t } = useSprache(texte)

useSeoMeta({
  title: () => t.value.titel,
  description: () => t.value.beschreibung
})

const ausfuehrlich = computed(() => projekte.map((p, i) => ({ ...p, ...t.value.projekte[i]! })))
const kurz = computed(() => weitere.map((w, i) => ({ ...w, was: t.value.weitere[i]! })))
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">{{ t.ueberschrift }}</h1>
      <p class="mt-3 max-w-prose text-gedaempft">{{ t.einleitung }}</p>
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
            >{{ t.beleg }}</a>
          </p>
        </div>
      </li>
    </ol>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">{{ t.weitereTitel }}</h2>
    <ol class="mt-5">
      <li
        v-for="w in kurz"
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
