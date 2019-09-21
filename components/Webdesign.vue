<template>
  <div>
    <section class="pb-300">
      <div class="container">
        <div class="row mb-lg mt-5">
          <div class="container container-lg">
            <h2 v-if="h2" class="display-2">{{ $t('webdesign') }}</h2>
            <div class="row">
              <template v-for="x in sites">
                <div :key="x.index" class="col-md-6 mb-5 mb-md-0 mt-5">
                  <div class="card card-lift--hover shadow">
                    <a rel="noopener noreferrer" :href="x.link" target="_blank">
                      <img
                        v-lazy="x.img"
                        alt="responsive webdesign development"
                        class="card-img-top"
                      />
                    </a>
                    <div class="card-body">
                      <table class="table">
                        <tr>
                          <th>{{ $t('projekt') }}</th>
                          <td v-if="x.project">{{ $t(x.project) }}</td>
                          <td v-else>{{ $t('webseite') }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('branche') }}</th>
                          <td>{{ $t(x.branche) }}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('firmenort') }}</th>
                          <td>
                            {{ $t(x.adresse) }}<br />{{ $t(x.kanton) }}<br />{{
                              $t(x.land)
                            }}
                          </td>
                        </tr>
                        <tr>
                          <th>{{ $t('technologie') }}</th>
                          <td>{{ $t(x.technologie) }}</td>
                        </tr>
                        <tr>
                          <th>Link</th>
                          <td>
                            <a
                              rel="noopener noreferrer"
                              :href="x.link"
                              target="_blank"
                              >{{ x.link }}</a
                            >
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </template>
            </div>
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
  },
  data() {
    return {
      sites: [
        {
          link: 'https://www.ddp-transporte.ch',
          img:
            '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-ddp.jpg',
          branche: 'transportunternehmen',
          adresse: 'ch-9403-goldach-sg',
          kanton: 'kanton-st-gallen',
          land: 'schweiz',
          technologie: 'Grav CMS'
        },
        {
          link: 'https://buegeln.services',
          img: '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-bs.jpg',
          branche: 'buegelservice',
          adresse: 'ch-9323-steinach-sg',
          kanton: 'kanton-st-gallen',
          land: 'schweiz',
          technologie: 'jekyll'
        },
        {
          link: 'https://www.mobile-schere.ch',
          img: '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-ms.jpg',
          branche: 'mobile-friseurin',
          adresse: 'ch-9215-kradolf-schoenenberg',
          kanton: 'kanton-thurgau',
          land: 'schweiz',
          technologie: 'wordpress-divi'
        },
        {
          link: 'https://www.exrex.ch',
          img: '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-er.jpg',
          branche: 'verkauf-von-kino-rex-sg-inventar',
          adresse: 'ch-9053-teufen-ar',
          kanton: 'kanton-appenzell-ausserrhoden',
          land: 'schweiz',
          technologie: 'wordpress-divi'
        },
        {
          link: 'https://buegeln.services',
          img: '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-bs.jpg',
          branche: 'buegelservice',
          adresse: 'ch-9323-steinach-sg',
          kanton: 'kanton-st-gallen',
          land: 'schweiz',
          technologie: 'jekyll'
        },
        {
          link: 'https://gstrainovic.github.io/gost.pw',
          img: '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-cv.jpg',
          branche: 'alter-cv-lebenslauf',
          adresse: 'ch-9323-steinach-sg',
          kanton: 'kanton-st-gallen',
          land: 'schweiz',
          technologie: 'jekyll'
        },
        {
          link: 'https://www.strainovic-it.ch',
          img:
            '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-argon.jpg',
          branche: 'it-dienstleistungen',
          adresse: 'ch-9323-steinach-sg',
          kanton: 'kanton-st-gallen',
          land: 'schweiz',
          technologie: 'vue-and-nuxt-argon-and-bootstrap'
        },
        {
          link: 'https://www.monsenso.com',
          img:
            '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-monsenso.jpg',
          branche: 'medtech',
          adresse: 'dk-2100-kopenhagen',
          kanton: '',
          land: 'daenemark',
          technologie: 'wordpress-divi'
        },
        {
          link: '',
          img:
            '/img/portfolio-responsive-webdesign/ResponsiveWebDesign-mpf.jpg',
          project: 'webshop-fuer-lieferservice',
          branche: 'persisches-restaurant',
          adresse: 'de-65931-sindlingen',
          kanton: 'frankfurt-am-main',
          land: 'deutschland',
          technologie: 'wordpress'
        }
      ]
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

.table a {
  font-size: 1.4vh;
}
@media only screen and (max-width: 765px) {
  .table {
    font-size: 3vmin;
  }
}
</style>
