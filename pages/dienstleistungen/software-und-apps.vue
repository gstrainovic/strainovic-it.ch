<template>
  <div>
    <Header :bold="$t('Dienstleistungen')" :normal="$t('SoftwareUndApps')">
    </Header>
    <SoftwareUndApps></SoftwareUndApps>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Header from '@/components/Header'
import SoftwareUndApps from '@/components/SoftwareUndApps'

Vue.use(VueLazyload)
export default {
  VueLazyload,
  components: {
    Header,
    SoftwareUndApps
  }
}
</script>

<style>
.section-shaped .shape.shape-skew + .shape-container {
  padding-top: 14rem;
  padding-bottom: 15rem;
}
</style>
