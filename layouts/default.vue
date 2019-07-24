<template>
  <div>
    <headroom>
      <header class="header-global">
        <BaseNav class="navbar-main" type="transparent" effect="dark" expand>
          <a slot="brand" class="navbar-brand" href="/#">Strainovic IT</a>
          <div slot="content-header" slot-scope="{ closeMenu }" class="row">
            <div class="col-6 collapse-brand">
              <a href="/#">Strainovic IT</a>
            </div>
            <div class="col-6 collapse-close">
              <CloseButton @click="closeMenu"></CloseButton>
            </div>
          </div>

          <ul
            class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto"
          >
            <template v-for="x in links">
              <BaseDropdown :key="x.index" tag="li" class="nav-item">
                <a
                  slot="title"
                  :href="x.link"
                  class="nav-link"
                  data-toggle="dropdown"
                  role="button"
                >
                  <i :class="x.icon"></i>
                  <span class="nav-link-inner--text">{{ x.menu }}</span>
                </a>

                <a
                  v-for="s in x.submenu"
                  :key="s.index"
                  :href="s.link"
                  class="dropdown-item"
                  >{{ s.name }}
                </a>
              </BaseDropdown>
            </template>

            <template v-for="x in noMenu">
              <a
                v-for="s in x.submenu"
                :key="s.index"
                class="nav-link"
                :href="s.link"
              >
                <i :class="x.icon"></i>
                <span class="nav-link-inner--text">{{ s.name }} </span>
              </a>
            </template>
          </ul>
        </BaseNav>
      </header>
    </headroom>
    <main>
      <nuxt />
    </main>
    <section id="kontakt" class="section section-shaped my-0 overflow-hidden">
      <div class="shape shape-style-3 bg-gradient-default shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container pt-lg pb-300">
        <div class="row">
          <div class="col-lg-10">
            <h2 class="display-3 text-white">
              Wir freuen uns auf Ihre Kontaktaufnahme!
            </h2>
            <div class="row">
              <div class="col-md-5 lead text-white">
                <p>
                  <br />
                  Strainovic IT<br />
                  Strainovic Goran<br />
                  Bahnstrasse 9b<br />
                  CH 9323 Steinach<br />
                  Kanton St.Gallen SG<br />
                  +41 79 411 71 77<br />
                  <a href="mailto:info@strainovic-it.ch"
                    >info@strainovic-it.ch</a
                  >
                </p>
              </div>
              <div class="col-md-5 mt-5">
                <VueFriendlyIframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDUUYNFXEhy1raQAPrhYCdSCttMLgMsxls      &q=Strainovic IT"
                  allowfullscreen
                  @load="onLoad"
                  @document-load="onDocumentLoad"
                ></VueFriendlyIframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row mt--300">
          <div class="col-lg-8">
            <card gradient="secondary" shadow body-classes="p-lg-5">
              <form
                name="Strainovic-it.ch Kontakt"
                action="/thank-you"
                netlify-honeypot="subject"
                method="post"
                netlify
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="Strainovic-it.ch Kontakt"
                />
                <div class="container my-5">
                  <div class="row">
                    <div class="col-lg-12">
                      <p>Alle Felder sind Pflichtfelder</p>
                      <ValidationProvider name="Vorname" rules="required|alpha">
                        <template #default="{ errors }">
                          <div class="form-group">
                            <input
                              id="Vorname"
                              v-model="alpha"
                              v-validate="'alpha'"
                              name="Vorname"
                              class="form-control"
                              type="alpha"
                              placeholder=" "
                              required
                            />
                            <label
                              class="form-control-placeholder"
                              for="Vorname"
                              >Vorname *</label
                            >
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </div>
                        </template>
                      </ValidationProvider>

                      <ValidationProvider
                        name="Nachname"
                        rules="required|alpha"
                      >
                        <template #default="{ errors }">
                          <div class="form-group">
                            <input
                              id="Nachname"
                              v-model="alpha"
                              v-validate="'alpha'"
                              name="Nachname"
                              class="form-control"
                              type="alpha"
                              placeholder=" "
                              required
                            />
                            <label
                              class="form-control-placeholder"
                              for="Nachname"
                              >Nachname *</label
                            >
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </div>
                        </template>
                      </ValidationProvider>

                      <ValidationProvider
                        name="E-Mail-Adresse"
                        rules="required|email"
                      >
                        <template #default="{ errors }">
                          <div class="form-group">
                            <input
                              id="E-Mail-Adresse"
                              v-model="email"
                              v-validate="required"
                              name="E-Mail-Adresse"
                              class="form-control"
                              type="email"
                              placeholder=" "
                              required
                            />
                            <label
                              class="form-control-placeholder"
                              for="E-Mail-Adresse"
                              >E-Mail-Adresse *</label
                            >
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </div>
                        </template>
                      </ValidationProvider>

                      <ValidationProvider name="Subject" class="subject">
                        <template #default="{ errors }">
                          <div class="form-group">
                            <input
                              id="Subject"
                              v-model="email"
                              name="Subject"
                              class="form-control"
                              type="email"
                              placeholder=" "
                              value="contact"
                            />
                            <label
                              class="form-control-placeholder"
                              for="Subject"
                              >Subject *</label
                            >
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </div>
                        </template>
                      </ValidationProvider>

                      <ValidationProvider
                        name="Nachricht"
                        rules="required|text"
                      >
                        <template #default="{ errors }">
                          <div class="form-group">
                            <textarea
                              id="Nachricht"
                              v-model="text"
                              v-validate="required"
                              name="Nachricht"
                              class="form-control"
                              type="text"
                              placeholder=" "
                              required
                              rows="4"
                              cols="80"
                            />
                            <label
                              class="form-control-placeholder"
                              for="Nachricht"
                              >Nachricht *</label
                            >
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </div>
                        </template>
                      </ValidationProvider>

                      <button
                        class="btn btn-primary btn-lg btn-block"
                        round
                        type="submit"
                      >
                        Senden
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </card>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="row row-grid align-items-center my-md">
          <div class="col-lg-6">
            <h3 class="text-primary font-weight-light mb-2">
              Vielen Dank für Ihre Unterstützung!
            </h3>
            <h4 class="mb-0 font-weight-light">
              Folgen Sie uns auf einer dieser Plattformen.
            </h4>
          </div>
          <div class="col-lg-6 text-lg-center btn-wrapper">
            <a
              target="_blank"
              href="https://twitter.com/Strainovic_IT"
              class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg"
              data-toggle="tooltip"
              title="Folge uns auf Twitter"
            >
              <i class="fa fa-twitter"></i>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/StrainovicIT/"
              class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg"
              data-toggle="tooltip"
              title="Like uns auf Facebook"
            >
              <i class="fa fa-facebook-square"></i>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/strainovic_it/"
              class="btn btn-neutral btn-icon-only btn-instagram btn-lg btn-round"
              data-toggle="tooltip"
              title="Folge uns auf Instagram"
            >
              <i class="fa fa-instagram"></i>
            </a>
            <a
              target="_blank"
              href="https://ch.linkedin.com/in/goran-strainovic"
              class="btn btn-neutral btn-icon-only btn-linkedin btn-round btn-lg"
              data-toggle="tooltip"
              title="Folge uns auf LinkedIn"
            >
              <i class="fa fa-linkedin"></i>
            </a>
            <a
              target="_blank"
              href="https://github.com/gstrainovic"
              class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg"
              data-toggle="tooltip"
              title="Spendiere uns einen Stern auf Github"
            >
              <i class="fa fa-github"></i>
            </a>
            <a
              target="_blank"
              href="https://www.xing.com/profile/Goran_Strainovic"
              class="btn btn-neutral btn-icon-only btn-xing btn-round btn-lg"
              data-toggle="tooltip"
              title="Folge uns auf Xing"
            >
              <i class="fa fa-xing"></i>
            </a>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-3">
            <p>
              Strainovic IT<br />
              Bahnstrasse 9b<br />
              CH 9323 Steinach<br />
              Kanton St.Gallen SG<br />
              +41 79 411 71 77<br />
              <a href="mailto:info@strainovic-it.ch">info@strainovic-it.ch</a>
            </p>
          </div>
          <!-- </div> -->
          <!-- <div class="row align-items-center justify-content-md-between"> -->
          <div class="col-md-9">
            <ul class="nav nav-footer justify-content-end">
              <template v-for="x in links">
                <li :key="x.index" class="nav-item mr-3">
                  <h5 class="nav-link">{{ x.menu }}</h5>
                  <a
                    v-for="s in x.submenu"
                    :key="s.index"
                    :href="s.link"
                    class="nav-link"
                    >{{ s.name }}</a
                  >
                </li>
              </template>

              <template v-for="xx in rechtliches">
                <li :key="xx.index" class="nav-item mr-3">
                  <h5 class="nav-link">{{ xx.menu }}</h5>
                  <nuxt-link
                    v-for="s in xx.submenu"
                    :key="s.index"
                    :to="s.link"
                    class="nav-link"
                    >{{ s.name }}</nuxt-link
                  >

                  <template v-for="xxx in noMenu">
                    <a
                      v-for="s in xxx.submenu"
                      :key="s.index"
                      :href="s.link"
                      class="nav-link"
                      >{{ s.name }}</a
                    >
                  </template>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import BaseNav from '~/components/argon/BaseNav'
import BaseDropdown from '~/components/argon/BaseDropdown'
import CloseButton from '~/components/argon/CloseButton'
import { headroom } from 'vue-headroom'
import VueFriendlyIframe from 'vue-friendly-iframe'
import Vue from 'vue'
import de from 'vee-validate/dist/locale/de'
// import ValidationProvider from 'vee-validate'
// Vue.use(ValidationProvider, {
// validity: true
// })
import { ValidationProvider } from 'vee-validate'
import { Validator } from 'vee-validate'
Validator.localize(de)
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    headroom,
    VueFriendlyIframe,
    ValidationProvider
  },
  data() {
    return {
      links: [
        {
          menu: 'Dienstleistungen',
          link: '##',
          icon: 'ni ni-spaceship',
          submenu: [
            {
              link: '/#was-wir-tun',
              name: 'Was wir tun'
            },
            {
              link: '/#software-und-apps',
              name: 'Software und Apps'
            },
            {
              link: '/#webdesign-und-programmierung',
              name: 'Webdesign und Programmierung'
            },
            {
              link: '/#marketing',
              name: 'Marketing'
            }
          ]
        },
        {
          menu: 'Über uns',
          link: '/ueber/##',
          icon: 'ni ni-single-02',
          submenu: [
            {
              link: '/ueber/#strainovic-it',
              name: 'Über Strainovic IT'
            },
            {
              link: '/ueber/#goran-strainovic',
              name: 'Über Goran Strainovic'
            }
          ]
        },
        {
          menu: 'Portfolio',
          link: '##',
          icon: 'ni ni-collection',
          submenu: [
            {
              link: '/portfolio/#web',
              name: 'Webseiten'
            },
            {
              link: '/portfolio/#diverse-projekte',
              name: 'Diverse Projekte'
            }
          ]
        }
      ],
      noMenu: [
        {
          menu: '',
          link: '##',
          icon: 'ni ni-email-83',
          submenu: [
            {
              link: '/#kontakt',
              name: 'Kontakt'
            }
          ]
        }
      ],
      rechtliches: [
        {
          menu: 'Sonstige Links',
          link: '##',
          icon: '',
          submenu: [
            {
              link: '/impressum',
              name: 'Impressum'
            },
            {
              link: '/datenschutz',
              name: 'Datenschutz'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style>
.headroom--not-top {
  padding-top: 0;
  padding-bottom: 0;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-control-placeholder {
  position: absolute;
  top: 0;
  padding: 7px 0 0 13px;
  transition: all 200ms;
  /* opacity: 0.5; */
}

.form-control:focus + .form-control-placeholder,
input:not(:placeholder-shown) + .form-control-placeholder {
  font-size: 75%;
  transform: translate3d(0, -100%, 0);
  /* opacity: 1; */
}

.subject {
  display: none;
}

@media (min-width: 992px) {
  .navbar-main {
    padding: 0;
  }
}
</style>
