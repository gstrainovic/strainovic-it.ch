<template>
  <div>
    <section class="pb-300">
      <div class="container pt-lg">
        <div class="row">
          <div class="col-md-4 order-md-2 m-auto">
            <img
              v-lazy="require('static/img/webdesign.png')"
              alt="Webdesign"
              class="img-fluid floating"
            />
          </div>
          <div class="col-md-8 order-md-1">
            <div class="pr-md-5">
              <h2 v-if="h2" class="display-3">
                {{ $t('webdesign-and-programmierung') }}
              </h2>
              <h3 class="display-4 mt-5">
                {{
                  $t(
                    'webshop-webportal-web-app-homepage-website-and-webseiteerstellen-lassen'
                  )
                }}
              </h3>
              <p class="lead">
                {{
                  $t(
                    'konzentrieren-sie-sich-auf-ihr-business-und-ueberlassen-sie-unsdas-erstellen-der-webseite-so-erhalten-sie-schnell-und-einfacheine-verfuehrerisch-schoene-individuelle-webseite'
                  )
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="row row-grid pr-md-5">
          <template v-for="x in oben">
            <div :key="x.index" class="col-md-6 mt-4">
              <div class="d-flex align-items-center">
                <h4 class="mb-3">{{ $t(x.t) }}</h4>
              </div>
              <p>{{ $t(x.p) }}</p>
            </div>
          </template>
        </div>
        <h3 class="display-3 mt-5">{{ $t('loesungen') }}</h3>
        <div class="row row-grid pr-md-5">
          <template v-for="x in loesungen">
            <div :key="x.index" class="col-md-6 mt-4">
              <div class="d-flex align-items-center">
                <h4 class="mb-3">{{ $t(x.t) }}</h4>
              </div>
              <p>{{ $t(x.p) }}</p>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
export default {
  VueLazyload,
  props: {
    h2: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      oben: [
        {
          t: 'beratung',
          p:
            'anhand-ihrer-ziele-und-anforderungen-erhalten-sie-empfehlungen-ueber-die-besten-technologien-konzepte-skizzen-und-einen-zeit-und-ausfuehrungsplan'
        },
        {
          t: 'domain-and-hosting',
          p:
            'bei-einer-beratung-werden-sie-ueber-domains-und-hosting-informiert-sie-erhalten-empfehlungen-ueber-die-besten-webserver-fuer-alle-bereiche-egal-ob-statisch-wordpress-oder-komplexe-web-apps-webplattformen'
        },
        {
          t: 'individuelles-design',
          p:
            'sie-waehlen-ein-theme-aus-hunderten-aus-die-vorlage-wird-ihren-individuellen-wuenschen-angepasst'
        },
        {
          t: 'responsive',
          p:
            'ihre-webseite-wird-auf-allen-geraeten-funktionieren-egal-ob-desktop-smartphone-oder-tablet'
        },
        {
          t: 'https-ssl-verschluesselung',
          p:
            'sichern-sie-sich-vorteile-bei-google-und-sicherheit-durch-unserekostenlose-https-ssl-codierung'
        },
        {
          t: 'webshop-and-bezahlfunktionen',
          p:
            'ihr-shop-plattform-und-die-zahlungsmoeglichkeiten-werden-so-konfiguriert-das-sie-ihre-produkte-und-dienstleistungen-einfachonline-verkaufen-koennen-erstellt-mit-woocommerce-shopware-oder-anderen-technologien'
        },
        {
          t: 'performance',
          p:
            'webseitenbesucher-lieben-schnelle-webseiten-ihre-webseite-wird-optimiert-sodass-es-blitzschnell-laedt-google-und-ihre-besucher-werden-es-lieben'
        },
        {
          t: 'content',
          p:
            'erhalten-sie-unterstuetzung-auch-beim-inhalt-daher-bei-der-erstellung-von-texten-und-bei-der-auswahl-und-anpassung-derpassenden-bilder-videos-icons-und-grafiken'
        },
        {
          t: 'seo-and-google',
          p:
            'ihre-webseite-wird-fuer-seo-optimiert-damit-sie-bei-google-gefunden-werden'
        },
        {
          t: 'google-business-and-maps',
          p:
            'durch-google-business-and-maps-werden-sie-noch-einfacher-vor-allem-lokal-gefunden'
        },
        {
          t: 'impressum-and-datenschutzerklaerung',
          p:
            'ihr-impressum-and-datenschutzerklaerung-wird-auf-dem-neuesten-standdes-schweizer-und-europaeischen-datenschutzes-dsgvo-erstellt-so-muessen-sie-sich-rechtlich-keine-sorgen-machen'
        },
        {
          t: 'e-mail',
          p:
            'erhalten-sie-so-viele-e-mail-adressen-wie-benoetigt-eingerichtet-auf-dem-hosting-server-und-auf-ihrem-pc-mac-und-smartphone-tablets-von-ihnen-und-ggf-ihren-mitarbeitern'
        },
        {
          t: 'wartung',
          p:
            'keine-boesen-ueberraschungen-durch-hacker-oder-ausfaelle-wir-uebernehmen-die-wartung-und-kuemmern-uns-daher-um-die-sicherheit-die-backups-und-die-updates-ihrer-webseite-sie-muessen-sich-darueber-keine-sorgen-mehr-machen-und-keine-wartungen-selber-planen-und-ausfuehren'
        },
        {
          t: 'inhalte-pflegen-and-support',
          p:
            'ein-kurzes-e-mail-oder-anruf-genuegt-und-ihre-inhalte-werden-aktualisiert-oder-ihr-problem-wird-behoben-sie-moechten-lieber-selber-ihr-webcontent-anpassen-dank-benutzerfreundliche-cms-wie-z-b-wordpress-ist-dies-fuer-sie-nach-einer-kurzen-schulung-kein-problem'
        }
      ],
      loesungen: [
        {
          t: 'wordpress',
          p:
            'ihre-webseite-erstellen-wir-gerne-mit-wordpress-oder-andere-cms-wie-z-b-grav-so-koennen-sie-selber-inhalte-pflegen'
        },
        {
          t: 'statische-webseite',
          p:
            'sie-moechten-die-aktualisierung-ihrer-webseite-uns-ueberlassen-und-wuenschen-eine-besonders-schnelle-und-sichere-webseite-ihre-webseite-erstellen-wir-dann-mit-technologien-wie-z-b-html-5-css-3-bootstrap-vue-and-nuxt-react-and-gatsby'
        },
        {
          t: 'headless-cms',
          p:
            'dank-unserem-knowhow-muessen-sie-nicht-zwischen-geschwindigkeit-und-benutzerfreundlichkeit-entscheiden-ihre-webseite-erstellen-wir-imfrontend-mit-html-5-css-3-bootstrap-und-vue-and-nuxt-oder-react-and-gatsby-und-im-backend-mit-einem-headless-cms-wie-z-b-strapi'
        },
        {
          t: 'einfacher-webshop',
          p:
            'dank-einfach-zu-benutzende-und-gut-erweiterbare-shopsoftware-wie-z-b-woocommerce-shopware-erstellen-wir-kostenguenstig-ihren-eigenen-shop'
        },
        {
          t: 'webapps-and-webportale',
          p:
            'komplexe-webanwendungen-webapplikationen-portale-programmierenund-designen-wir-im-frontend-mit-html-css-3-bootstrap-und-react-oder-vue-und-im-backend-mit-z-b-headless-cms-node-php-python-und-als-datenbanken-z-b-sql-wie-mysql-mariadb-oder-nosql-wie-z-b-mongodb'
        }
      ]
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
