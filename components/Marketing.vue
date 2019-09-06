<template>
  <div>
    <section class="pb-300">
      <div class="container pt-lg">
        <div class="row">
          <div class="col-lg-6">
            <h2 v-if="h2" class="display-3">Marketing</h2>
            <h3 class="display-4 mt-5">{{ $t('online-and-printmedien') }}</h3>
            <p class="lead ">
              {{
                $t(
                  'wir-helfen-ihnen-ihre-produkte-und-dienstleistungen-bekannter-zu-machen-und-zu-vermarkten'
                )
              }}
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
            <h4 class=" mt-3">
              {{ $t('design-von-grafiken-and-printmedien') }}
            </h4>
            <p class=" mt-3">
              {{ $t('wir-helfen') }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">SEM - Search Engine Marketing</h4>
            <p class=" mt-3">
              {{ $t('wirberaten') }}
            </p>
          </div>
          <div class="col-lg-6">
            <!-- <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon> -->
            <h4 class=" mt-3">
              {{ $t('erstellung-und-beschaffung-von-content') }}
            </h4>
            <p class=" mt-3">
              {{ $t('mitdem') }}
            </p>
          </div>
          <div class="col-lg-6">
            <h4 class=" mt-3">{{ $t('datenbeschaffung') }}</h4>
            <p class=" mt-3">
              {{ $t('gerneunter') }}
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
