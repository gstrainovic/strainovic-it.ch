<template>
  <div id="#">
    <div class="position-relative">
      <section class="section-shaped my-0">
        <div
          class="shape shape-style-1 bg-gradient-primary shape-default shape-skew"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-7">
                <h1 class="bold display-3 text-white">
                  <i v-if="error" class="fa fa-exclamation-triangle"></i>

                  {{ bold }}
                  <span v-if="normal" class="mt-2">{{ normal }}</span>
                  <br />
                  <n-link
                    v-if="error"
                    class="btn btn-success btn-lg btn-block"
                    round
                    :to="localePath('index')"
                  >
                    {{ $t('header.zurueck-zur-startseite') }}
                    <i class="ni ni-shop"></i>
                  </n-link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bold: {
      type: String,
      required: true
    },
    normal: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
<style></style>
