<template>
  <div>
    <section class="pb-300">
      <div class="container pt-lg">
        <div class="row">
          <div class="col-lg-6">
            <h2 v-if="h2" class="display-3 ">{{ $t('software-and-apps') }}</h2>
            <h3 class="display-4 mt-5">
              {{ $t('programmierung-and-optimierung') }}
            </h3>
            <p>
              {{
                $t(
                  'zusammen-untersuchen-wir-den-gesamten-informationsfluss-ihresunternehmens-dabei-wird-u-a-folgende-bereiche-analysiert-undoptimiert'
                )
              }}
            </p>
            <ul>
              <li>Web/CMS</li>
              <li>ERP/CRM</li>
              <li>Shop</li>
              <li>{{ $t('logistik') }}</li>
              <li>{{ $t('buchhaltung') }}</li>
              <li>Office</li>
              <ul class="">
                <li>VBA</li>
                <li>Word, Excel, Access, Outlook & Powerpoint</li>
              </ul>
              <li>Intranet</li>
              <li>
                {{
                  $t(
                    'betroffene-server-datenbanken-programme-module-plugins-scripts-und-erweiterungen'
                  )
                }}
              </li>
            </ul>
            <p>
              {{
                $t(
                  'sie-erhalten-anschliessend-empfehlungen-was-und-mit-welchenprogrammen-und-technologien-designt-konfiguriert-und-programmiertwerden-kann-um-verbesserungen-zu-erreichen'
                )
              }}
            </p>
            <h6 class="display-3 mt-5 ">{{ $t('ziel') }}</h6>
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
            <h4 class=" mt-3">{{ $t('benutzerfreundlichkeit') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'ihre-software-wird-mit-einer-modernen-benutzeroberflaeche-auch-alsgui-ui-user-interface-bekannt-designt-und-programmiert-dadurcherhalten-sie-einen-hohen-bedienkomfort-auf-allen-geraeten-wie-z-b-pc-mac-mobile-und-tablet'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('lizenzkosten-and-erweiterungen') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'durch-open-source-sparen-sie-lizenzkosten-und-erhoehen-dieanpassungsfaehigkeit-ihrer-software'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('automation') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'ihre-programme-werden-so-konfiguriert-dass-sie-weniger-dateneingeben-muessen-dadurch-sparen-sie-zeit-und-geld-erhoehen-dieproduktivitaet-und-reduzieren-fehler-beim-eintippen-oder-beimkopieren-und-einfuegen'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('sicherheit') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'sichern-sie-sich-vor-hacker-und-ausfaellen-ihr-server-und-alleprogramme-werden-so-eingerichtet-dass-automatisch-allesaktualisiert-wird-und-backups-erstellt-werde'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('schulung') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'holen-sie-das-beste-aus-ihrer-software-heraus-und-steigern-sie-dieproduktivitaet-sie-lernen-alle-funktionen-ihrer-software-optimaleinzusetzen-bei-ihnen-vor-ort-oder-remote-ueber-teamviewer'
                )
              }}
            </p>
          </div>
        </div>
        <!-- </div> -->
        <div class="row">
          <div class="col-lg-6">
            <h6 class="display-3 mt-5 ">{{ $t('loesungen') }}</h6>
          </div>
        </div>
        <div class="row row-grid mt-3">
          <div class="col-lg-6">
            <!-- <icon name="ni ni-settings" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('plugins') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'wir-erweitern-ihre-bestehende-software-durch-kombinieren-oderprogrammieren-von-plugins-module-und-erweiterungen'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('schnittstellen') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'bestehende-schnittstellen-api-s-werden-genutzt-erweitert-oderneu-programmiert'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('frontendautomatisierung') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'ist-ein-zugriff-auf-schnittstellen-oder-datenbanken-nicht-moeglich-koennen-wir-trotzdem-ihre-produktivitaet-steigern-indem-wir-einfachvon-der-benutzeroberflaeche-auf-diese-programme-mit-z-b-autoit-vba-zugreifen-und-so-optimieren'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('sicherheit') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'sichern-sie-sich-vor-hacker-und-ausfaellen-ihr-server-und-alleprogramme-werden-so-eingerichtet-dass-automatisch-allesaktualisiert-wird-und-backups-erstellt-werde'
                )
              }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">{{ $t('software-nach-mass') }}</h4>
            <p class=" mt-3">
              {{
                $t(
                  'falls-sie-mit-bestehenden-software-nicht-zufrieden-sind-und-dieseunzureichend-erweiterbar-sind-programmieren-und-designen-wirgerne-ihre-software-nach-ihren-vorstellungen'
                )
              }}
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
