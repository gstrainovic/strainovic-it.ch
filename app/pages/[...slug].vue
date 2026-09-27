<script setup lang="ts">
const route = useRoute()
const { sprache } = useSprache()

const { data: seite } = await useAsyncData(`seite-${route.path}`, () =>
  // Nuxt Content führt die Pfade ohne Schrägstrich am Ende.
  queryCollection(`seiten_${sprache.value}`).path(ohneSprache(route.path).replace(/(.)\/$/, '$1')).first()
)

if (!seite.value) {
  throw createError({ statusCode: 404, statusMessage: 'Seite nicht gefunden', fatal: true })
}

useSeoMeta({
  title: seite.value.title,
  description: seite.value.description,
  robots: (seite.value as { robots?: string }).robots
})
</script>

<template>
  <article class="prose prose-neutral dark:prose-invert">
    <ContentRenderer v-if="seite" :value="seite" />
  </article>
</template>
