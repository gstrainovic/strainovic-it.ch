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
  }
}
</script>

<style></style>
