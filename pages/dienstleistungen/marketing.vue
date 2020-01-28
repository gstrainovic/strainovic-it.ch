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
  },
        head () {
        return {
          meta: [
            { hid: 'description', name: 'description', content: this.$t('dienst_marketing_meta_description') }
          ]
        }
      }

}
</script>

<style></style>
