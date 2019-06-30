<template>
  <div>
    <div id="uns" class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3  text-white">Impressum</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section id="strainovic-it" class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-3">Adresse</h2>
            <p class="lead">
              Strainovic IT<br />
              Strainovic Goran<br />
              Bahnhofstrasse 9b<br />
              9323 Steinach<br />
              Schweiz<br />
              <a href="mailto:info@strainovic-it.ch">info@strainovic-it.ch</a
              ><br />
              <a href="tel:+41794117177">+41794117177</a><br />
            </p>
          </div>
        </div>
        <!-- </div> -->
        <!-- <div class="container"> -->
      </div>
    </section>
  </div>
</template>

<script>
//import H from '~/components/h'

export default {
  name: 'Home',
  layout: 'default',
  components: {
    //H
  }
}
</script>

<style>
.section-shaped .shape.shape-skew + .shape-container {
  padding-top: 14rem;
  padding-bottom: 15rem;
}
</style>
