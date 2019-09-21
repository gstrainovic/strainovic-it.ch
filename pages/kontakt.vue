<template>
  <div>
    <Header :bold="$t('kontakt')"></Header>
    <!-- <section
      id="marketing"
      class="section section section-shaped my-0 overflow-hidden"
    >
      <div class="shape shape-style-1 bg-gradient-info shape-skew">
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
            <h2 class="display-1 text-white">Marketing</h2>
            <h3 class="display-4 text-white">Online & Printmedien</h3>
            <p class="lead text-white">
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
      </div>
    </section> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Header from '@/components/Header'

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
