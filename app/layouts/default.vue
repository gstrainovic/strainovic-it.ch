<script setup lang="ts">
const seiten = [
  { pfad: '/', name: 'Start' },
  { pfad: '/profil', name: 'Profil' },
  { pfad: '/referenzen', name: 'Referenzen' },
  { pfad: '/open-source', name: 'Open Source' },
  { pfad: '/kontakt', name: 'Kontakt' }
]
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="border-b border-linie-stark bg-flaeche">
      <div class="mx-auto flex max-w-4xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4">
        <NuxtLink to="/" class="flex items-center gap-2.5 font-mono text-sm tracking-tight">
          <img src="/logo.svg" alt="" width="24" height="24" class="size-6">
          Strainovic&nbsp;IT
        </NuxtLink>
        <nav class="flex gap-6 text-sm">
          <NuxtLink
            v-for="s in seiten"
            :key="s.pfad"
            :to="s.pfad"
            class="text-gedaempft hover:text-tinte"
            active-class="!text-akzent"
          >
            {{ s.name }}
          </NuxtLink>
        </nav>
        <ThemaSchalter class="ms-auto" />
      </div>
    </header>

    <main class="mx-auto w-full max-w-4xl grow px-6 py-14">
      <slot />
    </main>

    <footer class="border-t border-linie bg-flaeche">
      <div
        class="mx-auto flex max-w-4xl flex-wrap justify-between gap-4 px-6 py-6 font-mono text-xs text-gedaempft"
      >
        <p>Strainovic IT, 9323 Steinach, Schweiz</p>
        <p class="flex gap-5">
          <NuxtLink to="/impressum" class="hover:text-tinte">Impressum</NuxtLink>
          <NuxtLink to="/datenschutz" class="hover:text-tinte">Datenschutz</NuxtLink>
        </p>
      </div>
    </footer>
  </div>
</template>
