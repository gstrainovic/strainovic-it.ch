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
                        alt="marketing videos"
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
                          <td>{{ $t(x.adresse) }}<br />{{ $t(x.land) }}</td>
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
          link: 'https://youtu.be/ixgB2-HvnJM',
          img: '/img/marketingvideos/omweek2019.jpg',
          branche: 'seo-and-sea-wissenskonferenz',
          adresse: '50933 Köln',
          land: 'deutschland',
          technologie: 'Adobe After Effects'
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
