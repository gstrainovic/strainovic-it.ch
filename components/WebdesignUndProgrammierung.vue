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
              <h2 v-if="h2" class="display-3">Webdesign & Programmierung</h2>
              <h3 class="display-4 mt-5">
                Webshop, Webportal, Web-App, Homepage, Website & Webseite
                erstellen lassen.
              </h3>
              <p class="lead">
                Konzentrieren Sie sich auf Ihr Business und überlassen Sie uns
                das Erstellen der Webseite. So erhalten Sie schnell und einfach
                eine verführerisch schöne, individuelle Webseite.
              </p>
            </div>
          </div>
        </div>
        <div class="row row-grid pr-md-5">
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-settings-gear-65"></badge> -->
              <h4 class="mb-0">Beratung</h4>
            </div>
            <p>
              Anhand Ihrer Ziele und Anforderungen erhalten Sie Empfehlungen
              über die besten Technologien, Konzepte, Skizzen und einen Zeit-
              und Ausführungsplan.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-settings-gear-65"></badge> -->
              <h4 class="mb-0">Domain & Hosting</h4>
            </div>
            <p>
              Bei einer Beratung werden Sie über Domains und Hosting informiert.
              Sie erhalten Empfehlungen über die besten Webserver für alle
              Bereiche, egal ob statisch, WordPress oder komplexe Web-Apps /
              Webplattformen.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-html5"></badge> -->
              <h4 class="mb-0">Individuelles Design</h4>
            </div>
            <p>
              Sie wählen ein Theme aus hunderten aus, die Vorlage wird Ihren
              individuellen Wünschen angepasst.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-html5"></badge> -->
              <h4 class="mb-0">Responsive</h4>
            </div>
            <p>
              Ihre Webseite wird auf allen Geräten funktionieren, egal ob
              Desktop, Smartphone oder Tablet.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">HTTPS/SSL Verschlüsselung</h4>
            </div>
            <p>
              Sichern Sie sich Vorteile bei Google und Sicherheit durch unsere
              kostenlose HTTPS/SSL Codierung.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">Webshop & Bezahlfunktionen</h4>
            </div>
            <p>
              Ihr Shop/Plattform und die Zahlungsmöglichkeiten werden so
              konfiguriert, das Sie Ihre Produkte und Dienstleistungen einfach
              online verkaufen können. Erstellt mit WooCommerce, Shopware oder
              anderen Technologien.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">Performance</h4>
            </div>
            <p>
              Webseitenbesucher lieben schnelle Webseiten. Ihre Webseite wird
              optimiert, sodass es blitzschnell lädt. Google und Ihre Besucher
              werden es lieben.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">Content</h4>
            </div>
            <p>
              Erhalten Sie Unterstützung auch beim Inhalt, daher bei der
              Erstellung von Texten und bei der Auswahl und Anpassung der
              passenden Bilder, Videos, Icons und Grafiken.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">SEO & Google</h4>
            </div>
            <p>
              Ihre Webseite wird für SEO optimiert damit Sie bei Google gefunden
              werden.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">Google Business & Maps</h4>
            </div>
            <p>
              Durch Google Business & Maps werden Sie noch einfacher, vor allem
              Lokal gefunden.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">Impressum & Datenschutzerklärung</h4>
            </div>
            <p>
              Ihr Impressum & Datenschutzerklärung wird auf dem neuesten Stand
              des Schweizer und europäischen Datenschutzes DSGVO erstellt, so
              müssen Sie sich rechtlich keine Sorgen machen.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">E-Mail</h4>
            </div>
            <p>
              Erhalten Sie so viele E-Mail-Adressen wie benötigt. Eingerichtet
              auf dem Hosting/Server und auf Ihrem PC/Mac und
              Smartphone/Tablets, von Ihnen und ggf. Ihren Mitarbeitern.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">Sicherheit</h4>
            </div>
            <p>
              Keine bösen Überraschungen durch Hacker oder Ausfälle. Ihre
              Webseite wird so eingerichtet, dass automatisch Backups erstellt,
              und Plugins aktualisiert werden. Sie müssen sich darüber keine
              Sorgen mehr machen und keine Wartungen selber planen und
              ausführen.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <!-- <badge type="success" circle class="mr-3" icon="ni ni-satisfied"></badge> -->
              <h4 class="mb-0">Inhalte pflegen & Support</h4>
            </div>
            <p>
              Ein kurzes E-Mail oder Anruf genügt und Ihre Inhalte werden
              aktualisiert oder Ihr Problem wird behoben. Sie möchten lieber
              selber Ihr Webcontent anpassen? Dank benutzerfreundliche CMS wie
              z. B. WordPress ist dies nach einer kurzen Schulung kein Problem
              für Sie.
            </p>
          </div>
        </div>
        <h3 class="display-3 mt-5">Lösungen</h3>
        <div class="row row-grid pr-md-5">
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <h4 class="mb-0">WordPress</h4>
            </div>
            <p>
              Ihre Webseite erstellen wir gerne mit WordPress oder andere CMS
              wie z. B. Grav, so können Sie selber Inhalte pflegen.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <h4 class="mb-0">Statische Webseite</h4>
            </div>
            <p>
              Sie möchten die Aktualisierung ihrer Webseite uns überlassen und
              wünschen eine besonders schnelle und sichere Webseite? Ihre
              Webseite erstellen wir dann mit Technologien wie z. B. HTML5,
              CSS3, Bootstrap, Vue & Nuxt, React & Gatsby
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <h4 class="mb-0">Headless CMS</h4>
            </div>
            <p>
              Dank unserem KnowHow müssen Sie nicht zwischen Geschwindigkeit und
              Benutzerfreundlichkeit entscheiden. Ihre Webseite erstellen wir im
              Frontend mit HTML5, CSS3, Bootstrap und Vue & Nuxt oder React &
              Gatsby. Und im Backend mit einem Headless CMS wie z. B. Strapi.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <h4 class="mb-0">Einfacher Webshop</h4>
            </div>
            <p>
              Dank einfach zu benutzende, und gut erweiterbare Shopsoftware wie
              z. B. WooCommerce, Shopware erstellen wir kostengünstig Ihren
              eigenen Shop.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <div class="d-flex align-items-center">
              <h4 class="mb-0">Webapps & Webportale</h4>
            </div>
            <p>
              Komplexe Webanwendungen, Webapplikationen, Portale programmieren
              und designen wir im Frontend mit HTML, CSS3, Bootstrap und React
              oder Vue, und im Backend mit z. B. Headless CMS, Node, PHP, Python
              und als Datenbanken z. B. SQL wie MySQL, MariaDB oder NoSQL wie z.
              B. MongoDB.
            </p>
          </div>
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
  props: {
    h2: {
      type: Boolean,
      required: false,
      default: false
    }
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
