<template>
  <div>
    <Header :bold="$t('ReferenzenUndPortfolio')"> </Header>
    <Webdesign h2="false"></Webdesign>
    <Projekte h2="false"></Projekte>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Webdesign from '@/components/Webdesign'
import Projekte from '@/components/Projekte'
export default {
  components: {
    Header,
    Webdesign,
    Projekte
  }
}
</script>

<style></style>
