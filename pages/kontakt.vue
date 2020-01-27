<template>
  <div>
    <Header :bold="$t('kontakt')" :normal="$t('kontaktauf')"></Header>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Header from '@/components/Header'

Vue.use(VueLazyload)
export default {
  VueLazyload,
  components: {
    Header
  }
}
</script>

<style>
.section-shaped .shape.shape-skew + .shape-container {
  padding-top: 14rem;
  padding-bottom: 15rem;
}
</style>
