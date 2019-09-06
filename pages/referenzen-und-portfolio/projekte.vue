<template>
  <div>
    <Header
      :bold="$t('ReferenzenUndPortfolio')"
      :normal="$t('Projekte')"
    ></Header>
    <Projekte></Projekte>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Projekte from '@/components/Projekte'
export default {
  components: {
    Header,
    Projekte
  }
}
</script>

<style></style>
