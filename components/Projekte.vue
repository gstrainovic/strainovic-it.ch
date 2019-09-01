<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="row mb-5 ">
          <div class="col-lg-12">
            <h2 v-if="h2" class="display-2">Projekte</h2>
            <h4 class="display-4 mt-5">Plugin</h4>
            <h5 class="display-5 mt-4 ">Österreichischer Hardwarehersteller</h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Ticketplugin für Jira - Projektmanagementsoftware</p>
            <strong class="display-6 mt-3">Technologien</strong>
            <p>Jira, Java</p>
            <br />

            <h4 class="display-4 mt-5 ">Design</h4>
            <h5 class="display-5 mt-4 ">Deutscher Tee Verkäufer in Amazon</h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Mockups für Tee Verpackungen</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>Photoshop</p>
            <h5 class="display-5 mt-4 ">Für schweizer Taxigesellschaften</h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Redesign eines Taximeter App für Android</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>Photoshop (PSD), Android Studio Layout Editor (XMl)</p>
            <br />

            <h4 class="display-4 mt-5 ">Ghostwriting</h4>
            <h5 class="display-5 mt-4 ">Deutsche E-Books</h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Ghostwriting / Zusammenfassungen und Formatierungen</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>Microsoft Word</p>
            <br />

            <h4 class="display-4 mt-5 ">Social Media Marketing - SMM</h4>
            <h5 class="display-5 mt-4 ">Deutsche Reiseagentur</h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Neue Kunden mit täglichen Posts inspirieren</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>Facebook</p>
            <br />

            <h4 class="display-4 mt-5 ">
              Zeitersparnis durch Automatisierungen
            </h4>
            <h5 class="display-5 mt-4 ">Prüffeld, VS</h5>
            <strong class="display-5 mt-3 ">Ziel</strong>
            <p>
              Wegfall von manuellen Eintragungen in Excel.<br />
              Interaktion mit Excel und Testprogramm.
            </p>
            <strong class="display-5 mt-3 ">Technologien</strong>
            <p>AutoIT und VBA</p>

            <h5 class="display-5 mt-5 ">
              Technische Abteilung, VS
            </h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>
              Wegfall von manuellen Eintragungen in Excel, Outlook, Aegis,
              Clipboard, SAP.
            </p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>FSharp, AutoIT und VBA</p>

            <h5 class="display-5 mt-5 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>
              Durchforsten einer Webseiten und ausfüllen von Formularfeldern.
              Erstellt mit FSharp, Fsharp.Data ,Docker ,Canopy auf Google Cloud
              Plattform.
            </p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>FSharp, AutoIT und VBA</p>
            <br />

            <h4 class="display-4 mt-5 ">
              Design von Printmedien
            </h4>
            <h5 class="display-5 mt-4 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Visitenkarte, Flyer, Banner</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
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
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>
              Programmierung eines D-A-CH Branchenverzeichnisses im Team
            </p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>R mit RStudio</p>
            <h5 class="display-5 mt-5 ">
              Plugin für einen deutschen Kunden
            </h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>
              Unbenötigte Formularfelder in Shopware bei der Registrierung
              deaktivieren
            </p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>PHP</p>
            <br />

            <h4 class="display-4 mt-5 ">Schulungen</h4>
            <h5 class="display-5 mt-4 ">
              Schulung beim Kunden in Zürich
            </h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Basics der Webseitenerstellung</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>WordPress, Divi</p>

            <h5 class="display-5 mt-5 ">
              Schulung eines Kunden aus St.Gallen
            </h5>
            <strong class="display-6 mt-3 ">Ziel</strong>
            <p>Basics der Programmierung</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
            <p>F# (FSharp), Visual Studio</p>
            <br />

            <h4 class="display-4 mt-5 ">
              Installation und Konfiguration
            </h4>
            <h5 class="display-5 mt-4 ">Strainovic IT</h5>
            <strong class="display-6 mt-3 ">Ziele</strong>
            <p>Besseres Projektmanagement</p>
            <strong class="display-6 mt-3 ">Technologien</strong>
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
.table {
  font-size: 2.3vmin;
}
@media only screen and (max-width: 765px) {
  .table {
    font-size: 3vmin;
  }
  a {
    font-size: 1.6vh;
  }
}
</style>
