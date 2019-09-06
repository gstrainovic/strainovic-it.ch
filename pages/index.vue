<template>
  <div>
    <Header
      :bold="$t('webdesign-programmierung-and-marketing')"
      :normal="
        $t('software-homepage-and-webseite-erstellen-und-vermarkten-lassen')
      "
    >
    </Header>
    <section id="was-wir-tun">
      <div class="container">
        <div class="row mb-lg mt-5">
          <div class="col-md-7 order-md-1">
            <div class="pr-md-5">
              <h2 class="display-4">{{ $t('index.h2') }}</h2>
            </div>
          </div>
        </div>
        <div class="row mt-5 mb-4">
          <div class="col-md-6 order-md-1">
            <div class="pr-md-5">
              <h6 class="display-2">{{ $t('was-wir-tun') }}</h6>
            </div>
          </div>
        </div>
        <div class="row mb-lg">
          <div class="col-lg-6">
            <!-- <H title="Test"></H> -->
            <h2 class="display-3">{{ $t('analyse-and-beratung') }}</h2>
            <p class="lead">
              {{
                $t(
                  'anhand-ihrer-anforderungen-erhalten-sie-eine-individuelle-empfehlung-ein-konzept-ueber-die-beste-loesung-zu-ihrem-projekt'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">
              {{ $t('installation-and-konfiguration') }}
            </h2>
            <p class="lead ">{{ $t('dasrad') }}</p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">
              {{ $t('projektplanung-and-projekt-and-shy-management') }}
            </h2>
            <p class="lead ">
              {{
                $t(
                  'gerne-arbeiten-wir-mit-ihrem-team-zusammen-und-uebernehmen-falls-gewuenscht-die-ganze-planung-und-koordination-bis-zum-erfolgreichen-abschluss-ihres-projektes'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">{{ $t('design-and-programmierung') }}</h2>
            <p class="lead ">{{ $t('keine-komp') }}</p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">{{ $t('automation') }}</h2>
            <p class="lead ">{{ $t('sparen') }}</p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">{{ $t('tests-and-uebergabe') }}</h2>
            <p class="lead ">{{ $t('nachdem') }}</p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">{{ $t('schulung') }}</h2>
            <p class="lead ">{{ $t('schulung-lead') }}</p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">{{ $t('wartung-and-sicherheit') }}</h2>
            <p class="lead ">{{ $t('keine-sorge') }}</p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">{{ $t('fehlerbehebung-and-support') }}</h2>
            <p class="lead ">{{ $t('auch-nach') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Header from '@/components/Header'

Vue.use(VueLazyload)
export default {
  components: {
    Header
  },
  VueLazyload
}
</script>

<style>
.section-shaped .shape.shape-skew + .shape-container {
  padding-top: 14rem;
  padding-bottom: 15rem;
}
</style>
