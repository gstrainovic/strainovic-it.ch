<script setup lang="ts">
const route = useRoute()
const { sprache } = useSprache()
const BASIS = 'https://www.strainovic-it.ch'

// Kanonische Adresse je Seite. Ohne diese Angabe sucht Google sich selbst
// eine aus, wenn es dieselbe Seite mit und ohne Schraegstrich am Ende
// gesehen hat, und meldet sie als Duplikat. Die Form mit Schraegstrich
// gilt, so liefert der Hoster sie auch aus.
const kanonisch = computed(() => {
  const pfad = route.path.endsWith('/') ? route.path : `${route.path}/`
  return `${BASIS}${pfad}`
})

// Dieselbe Seite in den anderen Sprachen. x-default ist die deutsche
// Fassung, sie ist die Hauptfassung.
const fassungen = computed(() => {
  const pfad = ohneSprache(route.path)
  return [
    ...SPRACHEN.map(s => ({ rel: 'alternate', hreflang: s.tag, href: `${BASIS}${mitSprache(s.code, pfad)}` })),
    { rel: 'alternate', hreflang: 'x-default', href: `${BASIS}${pfad}` }
  ]
})

useHead({
  htmlAttrs: { lang: () => SPRACHEN.find(s => s.code === sprache.value)!.tag },
  link: () => [{ rel: 'canonical', href: kanonisch.value }, ...fassungen.value]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
