<template>
  <div>
    <Header
      :bold="$t('ReferenzenUndPortfolio')"
      normal="Videomarketing"
    ></Header>
    <Marketingvideos></Marketingvideos>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Marketingvideos from '@/components/Marketingvideos'
export default {
  components: {
    Header,
    Marketingvideos
  },
        head () {
        return {
          meta: [
            { hid: 'description', name: 'description', content: this.$t('ref_videomarketing_meta_description') }
          ]
        }
      }

}
</script>

<style></style>
