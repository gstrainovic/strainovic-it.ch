<template>
  <div>
    <section class="pb-300">
      <div class="container pt-lg">
        <div class="row">
          <div class="col-lg-6">
            <h2 v-if="h2" class="display-3 ">Software & Apps</h2>
            <h3 class="display-4 mt-5">Programmierung & Optimierung</h3>
            <p class=" ">
              Zusammen untersuchen wir den gesamten Informationsfluss Ihres
              Unternehmens. Dabei wird u. a folgende Bereiche analysiert und
              optimiert:
            </p>
            <ul class=" ">
              <li>Web/CMS</li>
              <li>ERP/CRM</li>
              <li>Shop</li>
              <li>Logistik</li>
              <li>Buchhaltung</li>
              <li>Office</li>
              <ul class="">
                <li>VBA</li>
                <li>Word, Excel, Access, Outlook & Powerpoint</li>
              </ul>
              <li>Intranet</li>
              <li>
                Betroffene Server, Datenbanken, Programme, Module, Plugins,
                Scripts und Erweiterungen
              </li>
            </ul>
            <p class=" ">
              Sie erhalten anschliessend Empfehlungen was und mit welchen
              Programmen und Technologien designt, konfiguriert und programmiert
              werden kann, um Verbesserungen zu erreichen.
            </p>
            <h6 class="display-3 mt-5 ">Ziele</h6>
          </div>
          <div class="col-md-6 order-lg-2 ml-lg-auto">
            <div class="position-relative pl-md-5 mt-5">
              <img
                v-lazy="require('static/img/programmierung.svg')"
                alt="Programmierung"
                class="img-center img-fluid"
              />
            </div>
          </div>
        </div>
        <div class="row row-grid mt-3">
          <div class="col-lg-6">
            <!-- <icon name="ni ni-settings" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Benutzerfreundlichkeit</h4>
            <p class=" mt-3">
              Ihre Software wird mit einer modernen Benutzeroberfläche, auch als
              GUI, UI, User Interface bekannt, designt und programmiert. Dadurch
              erhalten Sie einen hohen Bedienkomfort. Auf allen Geräten wie z.
              B. PC/Mac, Mobile und Tablet.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Lizenzkosten & Erweiterungen</h4>
            <p class=" mt-3">
              Durch Open Source sparen Sie Lizenzkosten und erhöhen die
              Anpassungsfähigkeit Ihrer Software.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Automation</h4>
            <p class=" mt-3">
              Ihre Programme werden so konfiguriert, dass Sie weniger Daten
              eingeben müssen. Dadurch sparen Sie Zeit und Geld, erhöhen die
              Produktivität und reduzieren Fehler beim Eintippen oder beim
              Kopieren und Einfügen.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Sicherheit</h4>
            <p class=" mt-3">
              Sichern Sie sich vor Hacker und Ausfällen. Ihr Server und alle
              Programme werden so eingerichtet, dass automatisch alles
              aktualisiert wird und Backups erstellt werde.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Schulung</h4>
            <p class=" mt-3">
              Holen Sie das Beste aus Ihrer Software heraus und steigern Sie die
              Produktivität. Sie lernen, alle Funktionen Ihrer Software optimal
              einzusetzen. Bei Ihnen vor Ort oder Remote über TeamViewer.
            </p>
          </div>
        </div>
        <!-- </div> -->
        <div class="row">
          <div class="col-lg-6">
            <h6 class="display-3 mt-5 ">Lösungen</h6>
          </div>
        </div>
        <div class="row row-grid mt-3">
          <div class="col-lg-6">
            <!-- <icon name="ni ni-settings" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Plugins</h4>
            <p class=" mt-3">
              Wir erweitern Ihre bestehende Software durch kombinieren oder
              programmieren von Plugins, Module und Erweiterungen
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Schnittstellen</h4>
            <p class=" mt-3">
              Bestehende Schnittstellen, API´s werden genutzt, erweitert oder
              neu programmiert.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Frontendautomatisierung</h4>
            <p class=" mt-3">
              Ist ein Zugriff auf Schnittstellen oder Datenbanken nicht möglich,
              können wir trotzdem Ihre Produktivität steigern, indem wir einfach
              von der Benutzeroberfläche auf diese Programme mit z. B AutoIt,
              VBA zugreifen und so optimieren
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Sicherheit</h4>
            <p class=" mt-3">
              Sichern Sie sich vor Hacker und Ausfällen. Ihr Server und alle
              Programme werden so eingerichtet, dass automatisch alles
              aktualisiert wird und Backups erstellt werde.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Software nach Mass</h4>
            <p class=" mt-3">
              Falls Sie mit bestehenden Software nicht zufrieden sind und diese
              unzureichend Erweiterbar sind, programmieren und designen wir
              gerne Ihre Software nach Ihren Vorstellungen. /
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
