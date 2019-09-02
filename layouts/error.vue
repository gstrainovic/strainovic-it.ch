<template>
  <div class="mb-200">
    <Header
      v-if="error.statusCode === 404"
      bold="Entschuldigung, diese Seite existiert nicht"
      normal="Fehlermeldung: 404"
      error="True"
    ></Header>
    <Header
      v-else
      bold="Entschuldigung, ein Fehler ist aufgetreten"
      error="True"
    ></Header>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  },
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>
