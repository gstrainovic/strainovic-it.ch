<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="row mb-5 ">
          <div class="col-lg-12">
            <h2 v-if="h2" class="display-2">{{ $t('Projekte') }}</h2>
            <h4 class="display-4 mt-5">{{ $t('plugin') }}</h4>
            <h5 class="display-5 mt-4 ">
              {{ $t('oesterreichischer-hardwarehersteller') }}
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('ticketplugin-fuer-jira-projektmanagementsoftware') }}</p>
            <strong class="display-6 mt-3">{{ $t('technologien') }}</strong>
            <p>Jira, Java</p>
            <br />

            <h4 class="display-4 mt-5 ">{{ $t('design') }}</h4>
            <h5 class="display-5 mt-4 ">
              {{ $t('deutscher-tee-verkaeufer-in-amazon') }}
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('mockups-fuer-tee-verpackungen') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('photoshop') }}</p>
            <h5 class="display-5 mt-4 ">
              {{ $t('fuer-schweizer-taxigesellschaften') }}
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('redesign-eines-taximeter-app-fuer-android') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('photoshop-psd-android-studio-layout-editor-xml') }}</p>
            <br />

            <h4 class="display-4 mt-5 ">{{ $t('Ghostwriting') }}</h4>
            <h5 class="display-5 mt-4 ">{{ $t('deutsche-e-books') }}</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('ghostwriting-zusammenfassungen-und-formatierungen') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('microsoft-word') }}</p>
            <br />

            <h4 class="display-4 mt-5 ">
              {{ $t('social-media-marketing-smm') }}
            </h4>
            <h5 class="display-5 mt-4 ">{{ $t('deutsche-reiseagentur') }}</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>Neue Kunden mit täglichen Posts inspirieren</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>Facebook</p>
            <br />

            <h4 class="display-4 mt-5 ">
              Zeitersparnis durch Automatisierungen
            </h4>
            <h5 class="display-5 mt-4 ">Prüffeld, VS</h5>
            <strong class="display-5 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              Wegfall von manuellen Eintragungen in Excel.<br />
              Interaktion mit Excel und Testprogramm.
            </p>
            <strong class="display-5 mt-3 ">{{ $t('technologien') }}</strong>
            <p>AutoIT und VBA</p>

            <h5 class="display-5 mt-5 ">
              Technische Abteilung, VS
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              Wegfall von manuellen Eintragungen in Excel, Outlook, Aegis,
              Clipboard, SAP.
            </p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>FSharp, AutoIT und VBA</p>

            <h5 class="display-5 mt-5 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              Durchforsten einer Webseiten und ausfüllen von Formularfeldern.
              Erstellt mit FSharp, Fsharp.Data ,Docker ,Canopy auf Google Cloud
              Plattform.
            </p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>FSharp, AutoIT und VBA</p>
            <br />

            <h4 class="display-4 mt-5 ">
              Design von Printmedien
            </h4>
            <h5 class="display-5 mt-4 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>Visitenkarte, Flyer, Banner</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>Photoshop, Illustrator, Inkscape, Canva.</p>
            <br />

            <h4 class="display-4 mt-5 ">Webdesign</h4>
            <p>
              Die von mir erstellten Webseiten finden Sie im
              <a class="" rel="noopener noreferrer" href="/portfolio/#web"
                ><b>Portfolio</b></a
              >
              <br />

              <br />
            </p>

            <h4 class="display-4 mt-5 ">Softwareentwicklung</h4>
            <h5 class="display-5 mt-4 ">
              rBranches für einen österreichischen Kunden
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              Programmierung eines D-A-CH Branchenverzeichnisses im Team
            </p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>R mit RStudio</p>
            <h5 class="display-5 mt-5 ">
              Plugin für einen deutschen Kunden
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              Unbenötigte Formularfelder in Shopware bei der Registrierung
              deaktivieren
            </p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>PHP</p>
            <br />

            <h4 class="display-4 mt-5 ">Schulungen</h4>
            <h5 class="display-5 mt-4 ">
              Schulung beim Kunden in Zürich
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>Basics der Webseitenerstellung</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>WordPress, Divi</p>

            <h5 class="display-5 mt-5 ">
              Schulung eines Kunden aus St.Gallen
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>Basics der Programmierung</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>F# (FSharp), Visual Studio</p>
            <br />

            <h4 class="display-4 mt-5 ">
              Installation und Konfiguration
            </h4>
            <h5 class="display-5 mt-4 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">Ziele</strong>
            <p>Besseres Projektmanagement</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>Redmine, Odoo</p>
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
