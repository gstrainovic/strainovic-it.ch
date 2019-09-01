<template>
  <div>
    <Header bold="Impressum"></Header>
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <!-- <h2 class="display-3">Adresse</h2> -->
            <p class="lead">
              Strainovic IT<br />
              Strainovic Goran<br />
              Bahnhofstrasse 9b<br />
              9323 Steinach<br />
              Schweiz<br />
              <a href="tel:+41794117177">
                <i class="ni ni-mobile-button"></i> +41 79 411 71 77<br />
              </a>
              <a href="mailto:info@strainovic-it.ch">
                <i class="ni ni-email-83"></i> info@strainovic-it.ch</a
              >
            </p>
            <p class="lead">UID:<br />CHE-311.771.818</p>
            <p class="lead">
              Handelsregister-Nummer:<br />
              CH-320.1.081.299-3
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
import Header from '~/components/Header'

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
</style>
