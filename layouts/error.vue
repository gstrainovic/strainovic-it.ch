<template>
  <div class="mb-200">
    <Header
      v-if="error.statusCode === 404"
      :bold="$t('Error.404.Bold')"
      :normal="$t('Error.404.Normal')"
      error="True"
    ></Header>
    <Header v-else :bold="$t('Error.Else.Bold')" error="True"></Header>
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
