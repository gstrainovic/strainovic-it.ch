<script setup lang="ts">
const route = useRoute()

const { data: seite } = await useAsyncData(`seite-${route.path}`, () =>
  queryCollection('seiten').path(route.path).first()
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
