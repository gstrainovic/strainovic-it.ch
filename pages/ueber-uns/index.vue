<template>
  <div>
    <Header :bold="$t('UeberUns')"> </Header>
    <StrainovicIT h2="false"></StrainovicIT>
    <GoranStrainovic h2="false"></GoranStrainovic>
  </div>
</template>

<script>
import Header from '@/components/Header'
import StrainovicIT from '@/components/StrainovicIT'
import GoranStrainovic from '@/components/GoranStrainovic'
export default {
  components: {
    Header,
    StrainovicIT,
    GoranStrainovic
  },
        head () {
        return {
          meta: [
            { hid: 'description', name: 'description', content: this.$t('ueber_meta_description') }
          ]
        }
      }

}
</script>

<style></style>
