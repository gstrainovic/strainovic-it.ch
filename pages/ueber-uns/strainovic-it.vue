<template>
  <div>
    <Header :bold="$t('UeberUns')" :normal="$t('StrainovicIT')"></Header>
    <StrainovicIT></StrainovicIT>
  </div>
</template>

<script>
import Header from '@/components/Header'
import StrainovicIT from '~/components/StrainovicIT'

export default {
  components: {
    Header,
    StrainovicIT
  }
}
</script>

<style></style>
