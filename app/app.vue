<script setup lang="ts">
const route = useRoute()

// Kanonische Adresse je Seite. Ohne diese Angabe sucht Google sich selbst
// eine aus, wenn es dieselbe Seite mit und ohne Schraegstrich am Ende
// gesehen hat, und meldet sie als Duplikat. Die Form mit Schraegstrich
// gilt, so liefert der Hoster sie auch aus.
const kanonisch = computed(() => {
  const pfad = route.path.endsWith('/') ? route.path : `${route.path}/`
  return `https://www.strainovic-it.ch${pfad}`
})

useHead({
  link: [{ rel: 'canonical', href: kanonisch }]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
