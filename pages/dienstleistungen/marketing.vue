<template>
  <div>
    <Header :bold="$t('Dienstleistungen')" :normal="$t('Marketing')"> </Header>
    <Marketing></Marketing>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Marketing from '@/components/Marketing'

export default {
  components: {
    Header,
    Marketing
  }
}
</script>

<style></style>
