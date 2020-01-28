<template>
  <div>
    <Header :bold="$t('UeberUns')" normal="Strainovic IT"></Header>
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
  },
   head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: this.$t('ueber_strainovic_it_meta_description') }
      ]
    }
  }
}
</script>

<style></style>
