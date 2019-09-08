<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8">
            <h2 v-if="h2" class="display-3">{{ $t('ueber-strainovic-it') }}</h2>
            <h3 class="lead mt-5">
              {{
                $t(
                  'strainovic-it-wurde-2016-gegruendet-befindet-sich-in-steinach-imkanton-st-gallen-sg-an-der-ostschweiz-am-bodensee-und-bietet-alledigitale-dienstleistungen-fuer-die-informationstechnologie-auchbekannt-als-it-oder-ict-an-wie-z-b'
                )
              }}
            </h3>
            <ul>
              <br />
              <li>{{ $t('analyse-and-beratung') }}</li>
              <li>{{ $t('projektplanung-and-projektmanagement') }}</li>
              <li>{{ $t('installation-and-konfiguration') }}</li>
              <li>{{ $t('design-and-programmierung') }}</li>
              <li>{{ $t('tests') }}</li>
              <li>{{ $t('administration-support') }}</li>
              <li>{{ $t('wartung-backups-updates') }}</li>
              <li>{{ $t('schulungen') }}</li>
              <li>{{ $t('automation') }}</li>
            </ul>
            <h3 class="lead ">
              {{
                $t(
                  'wir-unterstuetzen-sowohl-private-auch-als-kmu-firmen-start-ups-ag-gmbh-bei-allen-digitalen-herausforderungen-wie-z-b'
                )
              }}
            </h3>
          </div>
        </div>
        <!-- </div> -->
        <!-- <div class="container"> -->
        <div class="row">
          <div class="col">
            <ul>
              <h4>Web</h4>
              <li>{{ $t('cms-webseiten-mit-z-b') }}</li>
              <ul>
                <li>{{ $t('wordpress') }}</li>
                <li>{{ $t('grav') }}</li>
              </ul>
              <li>{{ $t('statische-webseiten-mit-z-b') }}</li>
              <ul>
                <li>Hugo</li>
                <li>{{ $t('jekyll') }}</li>
                <li>{{ $t('gatsby') }}</li>
                <li>{{ $t('nuxt') }}</li>
              </ul>
              <li>{{ $t('webshops-mit-z-b') }}</li>
              <ul>
                <li>{{ $t('woocommerce') }}</li>
                <li>{{ $t('shopware') }}</li>
              </ul>
              <li>{{ $t('headless-cms-mit-z-b-strapi') }}</li>
              <li>{{ $t('webportale') }}</li>
              <li>{{ $t('webapps-und-webapplikationen-mit-z-b') }}</li>
              <ul>
                <li>{{ $t('react') }}</li>
                <li>{{ $t('vue') }}</li>
              </ul>
            </ul>
          </div>
          <div class="col-lg-6 text-left">
            <ul>
              <h4>{{ $t('mobile-and-tablet') }}</h4>
              <li>{{ $t('apps-fuer-android-smartphones') }}</li>
              <li>{{ $t('apps-fuer-ios-ipad-iphone-apple') }}</li>
              <br />
              <h4>{{ $t('desktop-and-server') }}</h4>
              <li>{{ $t('betriebssysteme-wie-z-b') }}</li>
              <ul>
                <li>{{ $t('windows') }}</li>
                <li>{{ $t('linux-ubuntu') }}</li>
              </ul>
              <li>{{ $t('software-programme') }}</li>
              <li>
                {{
                  $t(
                    'office-vba-word-excel-access-outlook-e-mail-and-powerpoint'
                  )
                }}
              </li>
              <li>{{ $t('plugins-module-bibliotheken-and-erweiterungen') }}</li>
            </ul>
          </div>
        </div>
        <div class="row text-left">
          <div class="col-lg-6">
            <ul>
              <h4>{{ $t('grafik') }}</h4>
              <li>{{ $t('logo') }}</li>
              <li>{{ $t('flyer') }}</li>
              <li>{{ $t('broschueren-and-prospekte') }}</li>
              <li>{{ $t('infografiken') }}</li>
              <li>{{ $t('icons') }}</li>
              <li>{{ $t('fotos-beschaffung') }}</li>
              <br />
              <h4>{{ $t('videos') }}</h4>
              <li>{{ $t('videoschnitt') }}</li>
              <li>{{ $t('hosting-auf-eigenen-server') }}</li>
              <li>{{ $t('hosting-auf-youtube-kostenlos-mit-werbung') }}</li>
              <li>
                {{ $t('hosting-auf-vimeo-kostenpflichtig-ohne-werbung') }}
              </li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <h4>{{ $t('google') }}</h4>
              <li>{{ $t('google-seo') }}</li>
              <li>{{ $t('google-adwords') }}</li>
              <li>{{ $t('google-business') }}</li>
              <li>{{ $t('google-maps') }}</li>
              <br />
              <h4>{{ $t('smm-social-media-marketing') }}</h4>
              <li>{{ $t('facebook') }}</li>
              <li>{{ $t('instagram') }}</li>
              <li>{{ $t('twitter') }}</li>
              <li>{{ $t('youtube') }}</li>
              <li>{{ $t('chatbot') }}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul>
              <h4>{{ $t('daten') }}</h4>
              <li>{{ $t('research') }}</li>
              <li>{{ $t('verarbeitung') }}</li>
              <li>{{ $t('datenbeschaffung') }}</li>
              <ul>
                <li>{{ $t('manuelle-recherche') }}</li>
                <li>{{ $t('automatisiert-per-crawler-spider-bot') }}</li>
              </ul>
              <li>{{ $t('automatisierungen') }}</li>
              <li>{{ $t('schnittstellen-api') }}</li>
            </ul>
          </div>
        </div>
        <div class="row mb-lg">
          <div class="col-lg-8">
            <h3 class="lead ">
              {{
                $t(
                  'die-meisten-projekte-werden-direkt-vom-gruender-goran-strainovicumgesetzt-groessere-projekte-werden-bei-bedarf-mit-partnerumgesetzt'
                )
              }}
            </h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    h2: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.section-shaped .shape.shape-skew + .shape-container {
  padding-top: 14rem;
  padding-bottom: 15rem;
}
</style>
