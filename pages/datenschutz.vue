<template>
  <div>
    <Header :bold="$t('datenschutzerklaerung')"></Header>
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h2>{{ $t('datenschutzerklaerung-der-strainovic-it') }}</h2>
            <br />
            {{ $t('version-vom-10-01-2020-v01-01a') }}<br />
            <br />
            {{ $t('indieserversi') }}

            <h3>
              {{ $t('verantwortlicher-datenschutzbeauftrager-vertreter') }}
            </h3>
            {{ $t('verant') }}

            <h3>{{ $t('erhebung-und-bearbeitung-von-personendaten') }}</h3>
            {{ $t('wirb') }}

            <h3>
              {{ $t('zwecke-der-datenbearbeitung-und-rechtsgrundlagen') }}
            </h3>
            {{ $t('wirver') }}
            <h3>
              {{ $t('verwendung-von-scriptbibliotheken-google-webfonts') }}
            </h3>
            <h4>{{ $t('art-und-zweck-der-verarbeitung') }}</h4>
            {{ $t('umunsere') }}
            <h4>{{ $t('rechtsgrundlage') }}</h4>
            {{ $t('rechtsgrundlageum') }}
            <h4>{{ $t('drittlandtransfer') }}</h4>
            {{ $t('googlev') }}

            <h3>
              {{ $t('datenweitergabe-und-datenuebermittlung-ins-ausland') }}
            </h3>
            {{ $t('wirg') }}
            <a
              href="http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:32001D0497:DE:HTML"
              >{{ $t('hier') }}</a
            >,
            <a
              href="http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2004:385:0074:0084:DE:PDF"
              >{{ $t('hier') }}</a
            >
            {{ $t('und') }}
            <a
              href="http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:32001D0497:DE:HTML"
              >{{ $t('hier') }}</a
            >
            {{ $t('abrufbar') }}

            <h3>{{ $t('dauer-der-aufbewahrung-von-personendaten') }}</h3>
            {{ $t('wirverareiten2') }}

            <h3>{{ $t('datensicherheit') }}</h3>
            {{ $t('wirtr') }}

            <h3>{{ $t('pflicht') }}</h3>
            {{ $t('imrahmen') }}

            <h3>{{ $t('rechte-der-betroffenen-person') }}</h3>
            {{ $t('siehaben') }}

            <h3>{{ $t('aenderungen') }}</h3>
            {{ $t('wirkoennen3') }}

            <p class="lead">
              {{ $t('diesedatens') }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="container"> -->
      <!--  div> -->
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
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

h1,
h2,
h3,
h4 {
  padding-top: 50px;
  padding-bottom: 25px;
  /* padding-top: 50px; */
  /* padding-bottom: 50px; */
}
</style>
