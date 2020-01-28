<template>
  <div>
    <Header :bold="$t('ReferenzenUndPortfolio')"> </Header>
    <Webdesign h2="false"></Webdesign>
    <Marketingvideos h2="false"></Marketingvideos>
    <Projekte h2="false"></Projekte>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Webdesign from '@/components/Webdesign'
import Projekte from '@/components/Projekte'
import Marketingvideos from '@/components/Marketingvideos'
export default {
  components: {
    Header,
    Webdesign,
    Marketingvideos,
    Projekte
  },
        head () {
        return {
          meta: [
            { hid: 'description', name: 'description', content: this.$t('referenzen_meta_description') }
          ]
        }
      }

}
</script>

<style></style>
