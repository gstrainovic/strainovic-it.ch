<template>
  <div>
    <Header
      :bold="$t('ReferenzenUndPortfolio')"
      :normal="$t('Webdesign')"
    ></Header>
    <Webdesign></Webdesign>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Webdesign from '@/components/Webdesign'
export default {
  components: {
    Header,
    Webdesign
  },
      head () {
        return {
          meta: [
            { hid: 'description', name: 'description', content: this.$t('ref_webdesign_meta_description') }
          ]
        }
      }
}
</script>

<style></style>
