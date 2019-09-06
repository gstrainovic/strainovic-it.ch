<template>
  <div>
    <Header
      :bold="$t('Dienstleistungen')"
      :normal="$t('WebdesignUndProgrammierung')"
    >
    </Header>
    <WebdesignUndProgrammierung></WebdesignUndProgrammierung>
  </div>
</template>

<script>
import Header from '@/components/Header'
import WebdesignUndProgrammierung from '@/components/WebdesignUndProgrammierung'

export default {
  components: {
    Header,
    WebdesignUndProgrammierung
  }
}
</script>

<style></style>
