<script setup lang="ts">
import texte from '~/texte/profil'

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
    </header>

    <h2 class="mt-12 font-mono text-xs text-gedaempft">{{ t.werdegang }}</h2>
    <ol class="mt-5">
      <li
        v-for="s in t.stationen"
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

    <p class="border-t border-linie pt-7 text-sm leading-relaxed text-gedaempft max-w-prose">{{ t.davor }}</p>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">{{ t.technologienTitel }}</h2>
    <dl class="mt-5">
      <div v-for="g in t.technologien" :key="g.gruppe" class="feld">
        <dt>{{ g.gruppe }}</dt>
        <dd class="max-w-prose">{{ g.werte }}</dd>
      </div>
    </dl>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">{{ t.openSourceTitel }}</h2>
    <p class="mt-5 max-w-prose leading-relaxed">
      {{ t.openSourceText }}
      <NuxtLink :to="pfad('/open-source/')" class="text-akzent underline underline-offset-4">{{ t.openSourceLink }}</NuxtLink>
    </p>
  </article>
</template>
