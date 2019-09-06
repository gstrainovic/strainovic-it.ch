<template>
  <div>
    <Header :bold="$t('ÜberUns')" :normal="$t('GoranStrainovic')"></Header>
    <GoranStrainovic></GoranStrainovic>
  </div>
</template>

<script>
import Header from '@/components/Header'
import GoranStrainovic from '@/components/GoranStrainovic'

export default {
  components: {
    Header,
    GoranStrainovic
  }
}
</script>

<style></style>
