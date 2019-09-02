<template>
  <div id="#">
    <Header
      bold="Webdesign, Programmierung & Marketing"
      normal="Software, Homepage & Webseite erstellen und vermarkten lassen."
    >
    </Header>
    <section id="was-wir-tun">
      <div class="container">
        <div class="row mb-lg mt-5">
          <div class="col-md-7 order-md-1">
            <div class="pr-md-5">
              <h2 class="display-4">
                Alle IT Dienstleistungen für Private, Startup, KMU, GmbH, AG
                oder Einzelfirma aus einer Hand.
              </h2>
            </div>
          </div>
        </div>
        <div class="row mt-5 mb-4">
          <div class="col-md-6 order-md-1">
            <div class="pr-md-5">
              <h6 class="display-2">Was wir tun</h6>
            </div>
          </div>
        </div>
        <div class="row mb-lg">
          <div class="col-lg-6">
            <!-- <H title="Test"></H> -->
            <h2 class="display-3">Analyse & Beratung</h2>
            <p class="lead">
              Anhand Ihrer Anforderungen erhalten Sie eine individuelle
              Empfehlung - ein Konzept, über die beste Lösung zu Ihrem Projekt.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Installation & Konfiguration</h2>
            <p class="lead ">
              Das Rad wird nicht neu erfunden. Dank Know-how und Zugriff auf
              bereits vorhanden Vorlagen, Plugins und Software, sparen Sie Geld
              und Zeit.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Projektplanung & Projekt&shy;management</h2>
            <p class="lead ">
              Gerne arbeiten wir mit Ihrem Team zusammen und übernehmen, falls
              gewünscht die ganze Planung und Koordination bis zum erfolgreichen
              Abschluss Ihres Projektes.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Design & Programmierung</h2>
            <p class="lead ">
              Keine Kompromisse. Fehlende Elemente wie z. B. Designs, Templates
              und Erweiterungen werden mit neuesten Standards, Empfehlungen und
              Technologien neu designt und programmiert.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Automation</h2>
            <p class="lead ">
              Sparen Sie Zeit und Geld. Es werden alle Ihre Prozesse optimiert,
              so das Sie viel weniger Daten eingeben müssten. Weniger eintippen
              und seltener Kopieren und Einfügen erhöht Ihre Produktivität und
              vermindert das Risiko von Fehlern.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Tests & Übergabe</h2>
            <p class="lead ">
              Nachdem alle Arbeiten abgeschlossen sind, erfolgen Qualitätstests.
              Dabei wird z. B. bei Webseiten geprüft, ob alles auf allen Geräten
              und alle Browsern korrekt dargestellt wird.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Schulung</h2>
            <p class="lead ">
              Sie und ggf. Ihre Mitarbeiter erhalten entweder bei Ihnen lokal
              oder remote über TeamViewer eine Schulung, um z. B. im Webshop
              selbstständig Produkte zu aktualisieren.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Wartung & Sicherheit</h2>
            <p class="lead ">
              Keine Sorge vor Ausfällen oder Hacker. Durch die Übernahme der
              Updates und Backups bleibt die gesamte Software wie z. B. CMS,
              Plugins, Server aktuell und ausfallsicher.
            </p>
          </div>
          <div class="col-lg-6">
            <h2 class="display-3">Fehlerbehebung & Support</h2>
            <p class="lead ">
              Auch nach dem Projektende können Sie mit einem zuverlässigen
              Partner rechnen, welcher Störungen behebt.
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
