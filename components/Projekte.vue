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
            <p>{{ $t('neue-kunden-mit-taeglichen-posts-inspirieren') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('facebook') }}</p>
            <br />

            <h4 class="display-4 mt-5 ">
              {{ $t('zeitersparnis-durch-automatisierungen') }}
            </h4>
            <h5 class="display-5 mt-4 ">{{ $t('prueffeld-vs') }}</h5>
            <strong class="display-5 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              {{ $t('wegfall-von-manuellen-eintragungen-in-excel') }}<br />
              {{ $t('interaktion-mit-excel-und-testprogramm') }}
            </p>
            <strong class="display-5 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('autoit-und-vba') }}</p>

            <h5 class="display-5 mt-5 ">{{ $t('technische-abteilung-vs') }}</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              {{
                $t(
                  'wegfall-von-manuellen-eintragungen-in-excel-outlook-aegis-clipboard-sap'
                )
              }}
            </p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('fsharp-autoit-und-vba') }}</p>

            <h5 class="display-5 mt-5 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              {{
                $t(
                  'durchforsten-einer-webseiten-und-ausfuellen-von-formularfeldern-erstellt-mit-fsharp-fsharp-data-docker-canopy-auf-google-cloudplattform'
                )
              }}
            </p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('fsharp-autoit-und-vba') }}</p>
            <br />

            <h4 class="display-4 mt-5 ">{{ $t('design-von-printmedien') }}</h4>
            <h5 class="display-5 mt-4 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('visitenkarte-flyer-banner') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('photoshop-illustrator-inkscape-canva') }}</p>
            <br />

            <h4 class="display-4 mt-5 ">{{ $t('webdesign') }}</h4>
            <p>
              {{ $t('die-von-mir-erstellten-webseiten-finden-sie-im')
              }}<a class="" rel="noopener noreferrer" href="/portfolio/#web"
                ><b> {{ $t('portfolio') }}</b></a
              ><br /><br />
            </p>

            <h4 class="display-4 mt-5 ">{{ $t('softwareentwicklung') }}</h4>
            <h5 class="display-5 mt-4 ">
              {{ $t('rbranches-fuer-einen-oesterreichischen-kunden') }}
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>
              {{
                $t('programmierung-eines-d-a-ch-branchenverzeichnisses-im-team')
              }}
            </p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('r-mit-rstudio') }}</p>
            <h5 class="display-5 mt-5 ">
              {{ $t('plugin-fuer-einen-deutschen-kunden') }}
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            {{
              $t(
                'less-than-p-greater-than-unbenoetigte-formularfelder-in-shopware-bei-der-registrierungdeaktivieren-less-than-p-greater-than'
              )
            }}
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>PHP</p>
            <br />

            <h4 class="display-4 mt-5 ">{{ $t('schulungen') }}</h4>
            <h5 class="display-5 mt-4 ">
              {{ $t('schulung-beim-kunden-in-zuerich') }}
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('basics-der-webseitenerstellung') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('wordpress-divi') }}</p>

            <h5 class="display-5 mt-5 ">
              {{ $t('schulung-eines-kunden-aus-st-gallen') }}
            </h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('basics-der-programmierung') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('f-fsharp-visual-studio-python') }}</p>
            <br />

            <h4 class="display-4 mt-5 ">
              {{ $t('installation-und-konfiguration') }}
            </h4>
            <h5 class="display-5 mt-4 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">{{ $t('ziel') }}</strong>
            <p>{{ $t('besseres-projektmanagement') }}</p>
            <strong class="display-6 mt-3 ">{{ $t('technologien') }}</strong>
            <p>{{ $t('redmine-odoo') }}</p>
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
