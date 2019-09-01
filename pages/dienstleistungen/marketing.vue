<template>
  <div>
    <Header bold="Dienstleistungen" normal="Marketing"> </Header>
    <section
      id="marketing"
      class="section section section-shaped my-0 overflow-hidden"
    >
      <div class="shape shape-style-1 shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container pt-lg pb-200">
        <div class="row">
          <div class="col-lg-6">
            <h2 class="display-2 ">Online & Printmedienmarketing</h2>
            <!-- <h3 class="display-4 ">Online- & Printmedienmarketing</h3> -->
            <p class="lead ">
              Wir helfen Ihnen Ihre Produkte und Dienstleistungen bekannter zu
              machen und zu vermarkten.
            </p>
          </div>
          <div class="col-md-6 order-lg-2 ml-lg-auto">
            <div class="position-relative pl-md-5 mt-5">
              <img
                v-lazy="require('static/img/marketing.svg')"
                alt="Marketing"
                class="img-center img-fluid"
              />
            </div>
          </div>
        </div>
        <div class="row row-grid mt-3">
          <div class="col-lg-6">
            <!-- <icon name="ni ni-settings" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Design von Grafiken & Printmedien</h4>
            <p class=" mt-3">
              Wir helfen Ihnen lokal und offline Ihre Bekanntheit zu steigern,
              indem wir Ihre Visitenkarten, Flyer, Broschüren, Prospekte und
              Infografiken designen und bei unserem Partner drucken lassen.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">SEM - Search Engine Marketing</h4>
            <p class=" mt-3">
              Wir beraten und unterstützen Sie bei der Online Marketing über die
              Suchmaschine Google. Unser Ziel ist es das Sie dort gut gefunden
              werden, und daher auf der ersten Seite, oben bei den gut
              Platzierten Suchresultaten. Dazu setzen wir auf Content, Google
              SEO, Google Adwords, Google Business, Google Maps und verwenden
              alle für Sie optimalen sozialen Kanäle wie Facebook, Instagram,
              Twitter, Youtube.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">
              Erstellung und Beschaffung von Onine Content
            </h4>
            <p class=" mt-3">
              Mit dem optimalem Design z. B. Ihrer Webseite und Marketing ist es
              noch nicht getan. Ohne überzeugenden Webseiteninhalt, locken Sie
              zwar (erschwert) Besucher an, generieren jedoch daraus keine
              Kunden. Wir helfen Ihnen durch spannende Webinhalte Besucher von
              Ihrem Produkt oder Dienstleistungen zu überzeugen und so es zu
              verkaufen. Dabei setzen wir auf ein breites Multimedia Angebot wie
              Texte schreiben, Videos und Fotos zu beschaffen oder durch unseren
              Fotografen zu erstellen.
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">Datenbeschaffung</h4>
            <p class=" mt-3">
              Gerne unterstützen wir Sie auch bei der Datenbeschaffung für Ihr
              Marketing. Egal ob Adressen, Branchenverzeichnisse,
              Konkurrenzvergleiche, wir helfen Ihnen bei der Beschaffung mit
              manuellem Google Research, Spider/Crawler/Bot oder durch unser
              Netzwerk an Partnern und Schnittstellen.
            </p>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Header from '~/components/Header'

Vue.use(VueLazyload)
export default {
  VueLazyload,
  components: {
    Header
  }
}
</script>

<style>
.section-shaped .shape.shape-skew + .shape-container {
  padding-top: 14rem;
  padding-bottom: 15rem;
}
</style>