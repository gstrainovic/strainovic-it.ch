<template>
  <div>
    <section class="section section section-shaped my-0 overflow-hidden">
      <div class="container pt-lg pb-100">
        <div class="row">
          <div class="col">
            <h2 v-if="h2" class="display-3">Über Goran Strainovic</h2>
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
              <li><small class="h6 ">Gründer</small></li>
              <li><small class="h6 ">Programmierer</small></li>
              <li><small class="h6 ">Designer</small></li>
              <li><small class="h6 ">Projekt Manager</small></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <blockquote class="blockquote lead ">
              <p class="mb-0">
                Was nicht passt, wird passend gemacht.<br />
                Ich bin ein Perfektionist mit vielen Fähigkeiten,<br />
                der durch Kreativität und Ausdauer Herausforderungen meistert
                und Ziele erreicht.
              </p>
              <footer class="blockquote-footer ">
                Goran Strainovic /
                <cite title="Source Title te">Gründer von Strainovic IT</cite>
              </footer>
            </blockquote>
          </div>
        </div>
        <!-- <div class="row"> -->
        <div class="row mb-5 ">
          <div class="col-lg-12">
            <h3 class="display-3 mt-5 ">Skills</h3>
            <h4 class="display-4 mt-5 ">Sprachkenntnisse</h4>
            <p class="lead mb-5">Deutsch, Englisch, Serbisch, Rumänisch</p>
            <h4 class="display-4 mt-5 ">Elektroniker</h4>
            <p class="lead mb-5">
              Prüfen, Reparieren, Avor, technischer Support von Elektronik
              Baugruppen
            </p>
            <h4 class="display-4  mt-5">
              Als Gründer & Projektmanager
            </h4>
            <p class="lead">
              Akquise, Analysieren, Konzepterstellung, Beraten, Planen, Managen,
              Schulen
            </p>
            <h4 class="display-4 mt-5 ">
              Softwareentwickler & UI / UX Designer
            </h4>
            <p class="lead mb-5">
              Designen, Programmieren, Installieren, Konfigurieren, Erweitern,
              Warten, Testen
            </p>
          </div>
        </div>
        <!-- </div> -->
        <div class="row container mt-5 ">
          <div class="col ">
            <ul>
              <h4 class="">Front-End</h4>
              <!-- <h5>Programmieren</h5> -->
              <li>Bootstrap4</li>
              <li>HTML5 / CSS3 / JS (JavaScript)</li>
              <li>Gatsby & React</li>
              <li>Nuxt & Vue</li>
              <li>Jekyll</li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <h4 class="">Back-End</h4>
              <!-- <h5>Programmieren</h5> -->
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
              <h4 class="">Plattformen</h4>
              <!-- <h5>Konfigurieren</h5> -->
              <li>Microsoft Server</li>
              <li>Ubuntu Server und andere Linux Distributionen</li>
              <li>Docker</li>
              <li>AWS - Amazon Web Service</li>
              <li>GCP - Google Cloud Plattform</li>
              <li>Strapi - Headless CMS</li>
            </ul>
          </div>
          <div class="col mt-1">
            <ul>
              <h4 class="">Programme</h4>
              <!-- <h5>Installieren, Erweitern, Programmieren, Konfigurieren, Warten</h5> -->
              <li>WordPress - CMS</li>
              <li>Grav - CMS</li>
              <li>WooCommerce - Shopsoftware für WordPress</li>
              <li>ShopWare - Deutsche Shopsoftware</li>
              <li>Office - Word, Excel, Outlook, Access</li>
              <li>Odoo - Opensource ERP</li>
              <li>SAP</li>
              <li>Redmine - Projektmanagement</li>
            </ul>
          </div>
        </div>
        <div class="row mt-5 mb-5 ">
          <div class="col">
            <h3 class="display-3 ">Ausbildung</h3>
            <h4 class="display-4 mt-5 ">PC/LAN – Supporter SIZ</h4>
            <p class="lead mb-5">Berufsschule Wil<br />2002 – 2003</p>
            <h4 class="display-4  mt-5">
              Informatik – Anwender SIZ
            </h4>
            <p class="lead">Berufsschule Uzwil<br />2000 – 2001</p>
            <h4 class="display-4 mt-5 ">
              Praktikum als RTV- Elektriker
            </h4>
            <p class="lead mb-5">RTV Bohren Gossau<br />1998 - 1999</p>
            <h4 class="display-4 mt-5 ">Primar und Oberstufe</h4>
            <p class="lead mb-5">Niederuzwil<br />1989 – 1998</p>
          </div>
        </div>
        <!-- </div> -->
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
