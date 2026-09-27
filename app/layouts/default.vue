<script setup lang="ts">
import texte from '~/texte/layout'

const route = useRoute()
const { sprache, pfad, t } = useSprache(texte)

// Dieselbe Seite in jeder Sprache, für die Sprachwahl.
const fassungen = computed(() =>
  SPRACHEN.map(s => ({ ...s, pfad: mitSprache(s.code, ohneSprache(route.path)) }))
)
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="border-b border-linie-stark bg-flaeche">
      <div class="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4 sm:gap-x-8">
        <NuxtLink :to="pfad('/')" class="flex items-center gap-2.5 font-mono text-sm tracking-tight">
          <img src="/logo.svg" alt="" width="24" height="24" class="size-6">
          Strainovic&nbsp;IT
        </NuxtLink>
        <!-- Auf schmalen Schirmen unter Logo und Sprachwahl, sonst dazwischen. -->
        <nav class="order-last flex w-full flex-wrap gap-x-6 gap-y-1 text-sm sm:order-none sm:w-auto">
          <NuxtLink
            v-for="s in t.seiten"
            :key="s.pfad"
            :to="pfad(s.pfad)"
            class="text-gedaempft hover:text-tinte"
            active-class="!text-akzent"
          >
            {{ s.name }}
          </NuxtLink>
        </nav>
        <div class="ms-auto flex items-center gap-4">
          <nav :aria-label="t.sprachwahl" class="flex gap-2.5 font-mono text-xs uppercase">
            <NuxtLink
              v-for="f in fassungen"
              :key="f.code"
              :to="f.pfad"
              :hreflang="f.tag"
              :lang="f.tag"
              :title="f.name"
              :aria-current="f.code === sprache ? 'true' : undefined"
              :class="f.code === sprache ? 'text-akzent' : 'text-gedaempft hover:text-tinte'"
            >
              {{ f.code }}
            </NuxtLink>
          </nav>
          <ThemaSchalter :label="t.dunkel" />
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-4xl grow px-6 py-14">
      <slot />
    </main>

    <footer class="border-t border-linie bg-flaeche">
      <div
        class="mx-auto flex max-w-4xl flex-wrap justify-between gap-4 px-6 py-6 font-mono text-xs text-gedaempft"
      >
        <p>{{ t.ort }}</p>
        <p class="flex gap-5">
          <NuxtLink :to="pfad('/impressum/')" class="hover:text-tinte">{{ t.impressum }}</NuxtLink>
          <NuxtLink :to="pfad('/datenschutz/')" class="hover:text-tinte">{{ t.datenschutz }}</NuxtLink>
        </p>
      </div>
    </footer>
  </div>
</template>
