<template>
  <div>
    <Header :bold="$t('Dienstleistungen')"> </Header>
    <SoftwareUndApps h2="false"></SoftwareUndApps>
    <WebdesignUndProgrammierung h2="false"></WebdesignUndProgrammierung>
    <Marketing h2="false"></Marketing>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Marketing from '@/components/Marketing'
import SoftwareUndApps from '@/components/SoftwareUndApps'
import WebdesignUndProgrammierung from '@/components/WebdesignUndProgrammierung'
export default {
  components: {
    Header,
    Marketing,
    SoftwareUndApps,
    WebdesignUndProgrammierung
  },
}
</script>


<style></style>
