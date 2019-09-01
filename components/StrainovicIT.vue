<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8">
            <h2 v-if="h2" class="display-3">Über Strainovic IT</h2>
            <h3 class="lead mt-5">
              Strainovic IT wurde 2016 gegründet, befindet sich in Steinach im
              Kanton St.Gallen SG an der Ostschweiz am Bodensee und bietet alle
              digitale Dienstleistungen für die Informationstechnologie, auch
              bekannt als IT oder ICT an, wie z. B:
            </h3>
            <ul>
              <br />
              <li>Analyse & Beratung</li>
              <li>Projektplanung & Projektmanagement</li>
              <li>Installation & Konfiguration</li>
              <li>Design & Programmierung</li>
              <li>Tests</li>
              <li>Administration, Support</li>
              <li>Wartung, Backups, Updates</li>
              <li>Schulungen</li>
              <li>Automation</li>
            </ul>
            <h3 class="lead ">
              Wir unterstützen sowohl private auch als KMU, Firmen, Start-ups,
              AG, GmbH bei allen digitalen Herausforderungen, wie z.B:
            </h3>
          </div>
        </div>
        <!-- </div> -->
        <!-- <div class="container"> -->
        <div class="row">
          <div class="col">
            <ul>
              <h4>Web</h4>
              <li>CMS Webseiten mit z. B:</li>
              <ul>
                <li>WordPress</li>
                <li>Grav</li>
              </ul>
              <li>Statische Webseiten mit z. B:</li>
              <ul>
                <li>Hugo</li>
                <li>Jekyll</li>
                <li>Gatsby</li>
                <li>Nuxt</li>
              </ul>
              <li>Webshops mit z. B:</li>
              <ul>
                <li>Woocommerce</li>
                <li>Shopware</li>
              </ul>
              <li>Headless CMS mit z. B: Strapi</li>
              <li>Webportale</li>
              <li>Webapps und Webapplikationen mit z. B:</li>
              <ul>
                <li>React</li>
                <li>Vue</li>
              </ul>
            </ul>
          </div>
          <div class="col-lg-6 text-left">
            <ul>
              <h4>Mobile & Tablet</h4>
              <li>Apps für Android Smartphones</li>
              <li>Apps für iOS, iPad, iPhone, Apple</li>
              <br />
              <h4>Desktop & Server</h4>
              <li>Betriebssysteme wie z. B:</li>
              <ul>
                <li>Windows</li>
                <li>Linux, Ubuntu</li>
              </ul>
              <li>Software, Programme</li>
              <li>
                Office, VBA, Word, Excel, Access, Outlook, E-Mail & Powerpoint
              </li>
              <li>Plugins, Module, Bibliotheken & Erweiterungen</li>
            </ul>
          </div>
        </div>
        <div class="row text-left">
          <div class="col-lg-6">
            <ul>
              <h4>Grafik</h4>
              <li>Logo</li>
              <li>Flyer</li>
              <li>Broschüren & Prospekte</li>
              <li>Infografiken</li>
              <li>Icons</li>
              <li>Fotos (Beschaffung)</li>
              <br />
              <h4>Videos</h4>
              <li>Videoschnitt</li>
              <li>Hosting auf eigenen Server</li>
              <li>Hosting auf YouTube (kostenlos mit Werbung)</li>
              <li>Hosting auf Vimeo (kostenpflichtig ohne Werbung)</li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <h4>Google</h4>
              <li>Google SEO</li>
              <li>Google AdWords</li>
              <li>Google Business</li>
              <li>Google Maps</li>
              <br />
              <h4>SMM Social-Media-Marketing</h4>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>YouTube</li>
              <li>Chatbot</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul>
              <h4>Daten</h4>
              <li>Research</li>
              <li>Verarbeitung</li>
              <li>Datenbeschaffung</li>
              <ul>
                <li>manuelle Recherche</li>
                <li>Automatisiert per Crawler/Spider/Bot</li>
              </ul>
              <li>Automatisierungen</li>
              <li>Schnittstellen (API)</li>
            </ul>
          </div>
        </div>
        <div class="row mb-lg">
          <div class="col-lg-8">
            <h3 class="lead ">
              Die meisten Projekte werden direkt vom Gründer, Goran Strainovic
              umgesetzt. Grössere Projekte werden bei Bedarf mit Partner
              umgesetzt.
            </h3>
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
