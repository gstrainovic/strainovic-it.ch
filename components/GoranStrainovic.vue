<template>
  <div>
    <section class="section section section-shaped my-0 overflow-hidden">
      <div class="container pt-lg pb-100">
        <div class="row">
          <div class="col">
            <h2 v-if="h2" class="display-3">
              {{ $t('ueber') }} Goran Strainovic
            </h2>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img
                v-lazy="'/img/goran-strainovic.jpg'"
                alt="Strainovic Goran"
                class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                style="width: 250px;"
              />
            </div>
          </div>
          <div class="pt-4 align-items-center">
            <ul class="align-items-center ">
              <li>
                <small class="h6 ">{{ $t('gruender') }}</small>
              </li>
              <li>
                <small class="h6 ">{{ $t('programmierer') }}</small>
              </li>
              <li>
                <small class="h6 ">{{ $t('designer') }}</small>
              </li>
              <li>
                <small class="h6 ">{{ $t('projekt-manager') }}</small>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <blockquote class="blockquote lead ">
              <p class="mb-0">
                {{ $t('was-nicht-passt-wird-passend-gemacht') }}<br />
                {{ $t('ich-bin-ein-perfektionist-mit-vielen-faehigkeiten')
                }}<br />
                {{
                  $t(
                    'der-durch-kreativitaet-und-ausdauer-herausforderungen-meistert-und-ziele-erreicht'
                  )
                }}
              </p>
              <footer class="blockquote-footer ">
                Goran Strainovic /
                <cite title="Source Title te">{{
                  $t('gruender-von-strainovic-it')
                }}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
        <!-- <div class="row"> -->
        <div class="row mb-5 ">
          <div class="col-lg-12">
            <h3 class="display-3 mt-5 ">{{ $t('skills') }}</h3>
            <h4 class="display-4 mt-5 ">{{ $t('sprachkenntnisse') }}</h4>
            <p class="lead mb-5">
              {{ $t('deutsch-englisch-serbisch-rumaenisch') }}
            </p>
            <h4 class="display-4 mt-5 ">{{ $t('elektroniker') }}</h4>
            <p class="lead mb-5">
              {{
                $t(
                  'pruefen-reparieren-avor-technischer-support-von-elektronik-baugruppen'
                )
              }}
            </p>
            <h4 class="display-4  mt-5">
              {{ $t('als-gruender-and-projektmanager') }}
            </h4>
            <p class="lead">
              {{
                $t(
                  'akquise-analysieren-konzepterstellung-beraten-planen-managen-schulen'
                )
              }}
            </p>
            <h4 class="display-4 mt-5 ">
              {{ $t('softwareentwickler-and-ui-ux-designer') }}
            </h4>
            <p class="lead mb-5">
              {{
                $t(
                  'designen-programmieren-installieren-konfigurieren-erweitern-warten-testen'
                )
              }}
            </p>
          </div>
        </div>
        <!-- </div> -->
        <div class="row container mt-5 ">
          <div class="col ">
            <ul>
              <h4>Front-End</h4>
              <li>Bootstrap4</li>
              <li>HTML5 / CSS3 / JS (JavaScript)</li>
              <li>Gatsby & React</li>
              <li>Nuxt & Vue</li>
              <li>Jekyll</li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <h4>Back-End</h4>
              <li>Microsoft - .Net - F# - FSharp</li>
              <li>Microsoft - .Net - VB - VisualBasic</li>
              <li>AutoIt</li>
              <li>VBA - Visual Basic for (Office) Application</li>
              <li>PHP</li>
            </ul>
          </div>
        </div>
        <div class="row container mt-5 ">
          <div class="col mt-1">
            <ul>
              <h4>{{ $t('plattformen') }}</h4>
              <li>Microsoft Server</li>
              <li>{{ $t('ubuntu-server-und-andere-linux-distributionen') }}</li>
              <li>Docker</li>
              <li>AWS - Amazon Web Service</li>
              <li>GCP - Google Cloud Plattform</li>
              <li>Strapi - Headless CMS</li>
            </ul>
          </div>
          <div class="col mt-1">
            <ul>
              <h4>Programme</h4>
              <li>WordPress - CMS</li>
              <li>Grav - CMS</li>
              <li>{{ $t('woocommerce-shopsoftware-fuer-wordpress') }}</li>
              <li>{{ $t('shopware-deutsche-shopsoftware') }}</li>
              <li>Office - Word, Excel, Outlook, Access</li>
              <li>Odoo - Opensource ERP</li>
              <li>SAP</li>
              <li>Redmine - Projektmanagement</li>
            </ul>
          </div>
        </div>
        <div class="row mt-5 mb-5 ">
          <div class="col">
            <h3 class="display-3 ">{{ $t('ausbildung') }}</h3>
            <h4 class="display-4 mt-5 ">{{ $t('pc-lan-supporter-siz') }}</h4>
            <p class="lead mb-5">
              {{ $t('berufsschule-wil') }}<br />2002 – 2003
            </p>
            <h4 class="display-4  mt-5">
              {{ $t('informatik-anwender-siz') }}
            </h4>
            <p class="lead">{{ $t('berufsschule-uzwil') }}<br />2000 – 2001</p>
            <h4 class="display-4 mt-5 ">
              {{ $t('praktikum-als-rtv-elektriker') }}
            </h4>
            <p class="lead mb-5">
              {{ $t('rtv-bohren-gossau') }}<br />1998 - 1999
            </p>
            <h4 class="display-4 mt-5 ">{{ $t('primar-und-oberstufe') }}</h4>
            <p class="lead mb-5">{{ $t('niederuzwil') }}<br />1989 – 1998</p>
          </div>
        </div>
      </div>
    </section>
    <div></div>
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
