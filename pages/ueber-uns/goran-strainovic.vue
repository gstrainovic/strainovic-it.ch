<template>
  <div>
    <Header :bold="$t('UeberUns')" :normal="$t('GoranStrainovic')"></Header>
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
  },
    head () {
      return {
        meta: [
          { hid: 'description', name: 'description', content: this.$t('ueber_goran_meta_description') }
        ]
      }
    }
}
</script>

<style></style>
