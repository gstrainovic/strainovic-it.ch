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
          t: 'Beratung',
          p:
            'Anhand Ihrer Ziele und Anforderungen erhalten Sie Empfehlungen über die besten Technologien, Konzepte, Skizzen und einen Zeit- und Ausführungsplan.'
        },
        {
          t: 'Domain & Hosting',
          p:
            'Bei einer Beratung werden Sie über Domains und Hosting informiert. Sie erhalten Empfehlungen über die besten Webserver für alle Bereiche, egal ob statisch, WordPress oder komplexe Web-Apps / Webplattformen.'
        },
        {
          t: 'Individuelles Design',
          p:
            'Sie wählen ein Theme aus hunderten aus, die Vorlage wird Ihren individuellen Wünschen angepasst.'
        },
        {
          t: 'Responsive',
          p:
            'Ihre Webseite wird auf allen Geräten funktionieren, egal ob Desktop, Smartphone oder Tablet.'
        },
        {
          t: 'HTTPS/SSL Verschlüsselung',
          p:
            'Sichern Sie sich Vorteile bei Google und Sicherheit durch unserekostenlose HTTPS/SSL Codierung.'
        },
        {
          t: 'Webshop & Bezahlfunktionen',
          p:
            'Ihr Shop/Plattform und die Zahlungsmöglichkeiten werden so konfiguriert, das Sie Ihre Produkte und Dienstleistungen einfachonline verkaufen können. Erstellt mit WooCommerce, Shopware oderanderen Technologien.'
        },
        {
          t: 'Performance',
          p:
            'Webseitenbesucher lieben schnelle Webseiten. Ihre Webseite wird optimiert, sodass es blitzschnell lädt. Google und Ihre Besucher werden es lieben.'
        },
        {
          t: 'Content',
          p:
            'Erhalten Sie Unterstützung auch beim Inhalt, daher bei der Erstellung von Texten und bei der Auswahl und Anpassung derpassenden Bilder, Videos, Icons und Grafiken.'
        },
        {
          t: 'SEO & Google',
          p:
            'Ihre Webseite wird für SEO optimiert damit Sie bei Google gefunden werden.'
        },
        {
          t: 'Google Business & Maps',
          p:
            'Durch Google Business & Maps werden Sie noch einfacher, vor allem Lokal gefunden.'
        },
        {
          t: 'Impressum & Datenschutzerklärung',
          p:
            'Ihr Impressum & Datenschutzerklärung wird auf dem neuesten Standdes Schweizer und europäischen Datenschutzes DSGVO erstellt, somüssen Sie sich rechtlich keine Sorgen machen.'
        },
        {
          t: 'E-Mail',
          p:
            'Erhalten Sie so viele E-Mail-Adressen wie benötigt. Eingerichtetauf dem Hosting/Server und auf Ihrem PC/Mac und Smartphone/Tablets, von Ihnen und ggf. Ihren Mitarbeitern.'
        },
        {
          t: 'Wartung',
          p:
            'Keine bösen Überraschungen durch Hacker oder Ausfälle. Wir übernehmen die Wartung und kümmern uns daher um die Sicherheit, die Backups und die Updates Ihrer Webseite. Sie müssen sich darüber keine Sorgen mehr machen und keine Wartungen selber planen und ausführen.'
        },
        {
          t: 'Inhalte pflegen & Support',
          p:
            'Ein kurzes E-Mail oder Anruf genügt und Ihre Inhalte werden aktualisiert oder Ihr Problem wird behoben. Sie möchten lieber selber Ihr Webcontent anpassen? Dank benutzerfreundliche CMS wie z. B. WordPress ist dies für Sie nach einer kurzen Schulung kein Problem.'
        }
      ],
      loesungen: [
        {
          t: 'WordPress',
          p:
            'Ihre Webseite erstellen wir gerne mit WordPress oder andere CMS wie z.B. Grav, so können Sie selber Inhalte pflegen.'
        },
        {
          t: 'Statische Webseite',
          p:
            'Sie möchten die Aktualisierung ihrer Webseite uns überlassen und wünschen eine besonders schnelle und sichere Webseite? Ihre Webseite erstellen wir dann mit Technologien wie z. B. HTML5, CSS3, Bootstrap, Vue & Nuxt, React & Gatsby '
        },
        {
          t: 'Headless CMS',
          p:
            'Dank unserem KnowHow müssen Sie nicht zwischen Geschwindigkeit undBenutzerfreundlichkeit entscheiden. Ihre Webseite erstellen wir imFrontend mit HTML5, CSS3, Bootstrap und Vue & Nuxt oder React & Gatsby. Und im Backend mit einem Headless CMS wie z. B. Strapi. '
        },
        {
          t: 'Einfacher Webshop',
          p:
            'Dank einfach zu benutzende, und gut erweiterbare Shopsoftware wiez. B. WooCommerce, Shopware erstellen wir kostengünstig Ihren eigenen Shop. '
        },
        {
          t: 'Webapps & Webportale',
          p:
            'Komplexe Webanwendungen, Webapplikationen, Portale programmierenund designen wir im Frontend mit HTML, CSS3, Bootstrap und React oder Vue, und im Backend mit z. B. Headless CMS, Node, PHP, Python und als Datenbanken z. B. SQL wie MySQL, MariaDB oder NoSQL wie z.B. MongoDB. '
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
