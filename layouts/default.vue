<template>
  <div>
    <headroom>
      <header class="header-global">
        <BaseNav class="navbar-main" type="transparent" effect="dark" expand>
          <n-link slot="brand" class="navbar-brand" to="/"
            >Strainovic IT</n-link
          >
          <div slot="content-header" slot-scope="{ closeMenu }" class="row">
            <div class="col-6 collapse-brand">
              <n-link to="/">Strainovic IT</n-link>
            </div>
            <div class="col-6 collapse-close">
              <CloseButton @click="closeMenu"></CloseButton>
            </div>
          </div>

          <ul
            class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto"
          >
            <n-link class="nav-link" :to="home.link">
              <i :class="home.icon"></i>
              <span class="nav-link-inner--text">{{ home.name }} </span>
            </n-link>

            <template v-for="x in links">
              <BaseDropdown :key="x.index" tag="li" class="nav-item">
                <n-link
                  slot="title"
                  :to="x.link"
                  class="nav-link"
                  data-toggle="dropdown"
                  role="button"
                >
                  <i :class="x.icon"></i>
                  <span class="nav-link-inner--text">{{ x.menu }}</span>
                </n-link>

                <n-link
                  v-for="s in x.submenu"
                  :key="s.index"
                  :to="s.link"
                  class="dropdown-item"
                  >{{ s.name }}
                </n-link>
              </BaseDropdown>
            </template>

            <n-link class="nav-link hide-this" :to="kontakt.link">
              <i :class="kontakt.icon"></i>
              <span class="nav-link-inner--text">{{ kontakt.name }} </span>
            </n-link>
          </ul>
        </BaseNav>
      </header>
    </headroom>
    <main>
      <nuxt />
    </main>

    <section class="section section-lg section-contact-us">
      <div class="container">
        <div class="row">
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
                <div class="container">
                  <div class="">
                    <div class="">
                      <h2 class="display-4">
                        Wir freuen uns auf Ihre Nachricht!
                      </h2>
                      <div class="">
                        <!-- <div class="col-md-5 lead"> -->
                        <SitAdresse></SitAdresse>
                        <!-- </div> -->

                        <div class="col-md-5 mt-5">
                          <!-- <VueFriendlyIframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDUUYNFXEhy1raQAPrhYCdSCttMLgMsxls      &q=Strainovic IT"
                  allowfullscreen
                  @load="onLoad"
                  @document-load="onDocumentLoad"          
                ></VueFriendlyIframe> -->
                        </div>
                      </div>
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
                              ><i class="ni ni-single-02"></i> Vorname *</label
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
                              ><i class="ni ni-single-02"></i> Nachname *</label
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
                              ><i class="ni ni-email-83"></i> E-Mail-Adresse
                              *</label
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

                      <ValidationProvider name="Nachricht" rules="required">
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
                              ><i class="ni ni-caps-small"></i> Nachricht
                              *</label
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
                        <i class="ni ni-send"></i>
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
            <h4 class="pt-0 font-weight-light">
              Folgen Sie uns auf einer dieser Plattformen.
            </h4>
          </div>
          <div class="col-lg-6 text-lg-center btn-wrapper">
            <a
              target="_blank"
              href="https://twitter.com/Strainovic_IT"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg"
              data-toggle="tooltip"
              title="Folge uns auf Twitter"
            >
              <i class="fa fa-twitter align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/StrainovicIT/"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg"
              data-toggle="tooltip"
              title="Like uns auf Facebook"
            >
              <i class="fa fa-facebook-square align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/strainovic_it/"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-instagram btn-lg btn-round"
              data-toggle="tooltip"
              title="Folge uns auf Instagram"
            >
              <i class="fa fa-instagram align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://ch.linkedin.com/in/goran-strainovic"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-linkedin btn-round btn-lg"
              data-toggle="tooltip"
              title="Folge uns auf LinkedIn"
            >
              <i class="fa fa-linkedin align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://github.com/gstrainovic"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg"
              data-toggle="tooltip"
              title="Spendiere uns einen Stern auf Github"
            >
              <i class="fa fa-github align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://www.xing.com/profile/Goran_Strainovic"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-xing btn-round btn-lg"
              data-toggle="tooltip"
              title="Folge uns auf Xing"
            >
              <i class="fa fa-xing align-top"></i>
            </a>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-sm-3 pt-4 pl-5 pb-5">
            <SitAdresse></SitAdresse>
          </div>
          <!-- </div> -->
          <!-- <div class="row align-items-center justify-content-md-between"> -->
          <div class="col-sm-9">
            <ul class="nav nav-footer">
              <template v-for="x in links">
                <li
                  :key="x.index"
                  class="nav-item mr-3 col-xs-12 col-sm-3 mb-4"
                >
                  <n-link :to="x.link" class="nav-link ">{{ x.menu }}</n-link>
                  <n-link
                    v-for="s in x.submenu"
                    :key="s.index"
                    :to="s.link"
                    class="nav-link"
                    >{{ s.name }}</n-link
                  >
                </li>
              </template>

              <template v-for="xx in rechtliches">
                <li :key="xx.index" class="nav-item mr-3 col-xs-12 col-sm">
                  <!-- <h5 class="nav-link pl-0 pt-4">{{ xx.menu }}</h5> -->
                  <n-link :to="home.link" class="nav-link">{{
                    home.name
                  }}</n-link>

                  <nuxt-link
                    v-for="s in xx.submenu"
                    :key="s.index"
                    :to="s.link"
                    class="nav-link"
                    >{{ s.name }}</nuxt-link
                  >

                  <n-link :to="kontakt.link" class="nav-link">{{
                    kontakt.name
                  }}</n-link>
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
import SitAdresse from '~/components/SitAdresse'
import BaseNav from '~/components/argon/BaseNav'
import BaseDropdown from '~/components/argon/BaseDropdown'
import CloseButton from '~/components/argon/CloseButton'
import { headroom } from 'vue-headroom'
// import VueFriendlyIframe from 'vue-friendly-iframe'
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
    SitAdresse,
    BaseNav,
    CloseButton,
    BaseDropdown,
    headroom,
    // VueFriendlyIframe,
    ValidationProvider
  },
  data() {
    return {
      links: [
        {
          menu: 'Dienstleistungen',
          link: '/dienstleistungen',
          icon: 'ni ni-spaceship',
          submenu: [
            {
              link: '/dienstleistungen/software-und-apps',
              name: 'Software & Apps'
            },
            {
              link: '/dienstleistungen/webdesign-und-programmierung',
              name: 'Webdesign & Programmierung'
            },
            {
              link: '/dienstleistungen/marketing',
              name: 'Marketing'
            }
          ]
        },
        {
          menu: 'Über uns',
          link: '/ueber-uns',
          icon: 'ni ni-single-02',
          submenu: [
            {
              link: '/ueber-uns/strainovic-it',
              name: 'Über Strainovic IT'
            },
            {
              link: '/ueber-uns/goran-strainovic',
              name: 'Über Goran Strainovic'
            }
          ]
        },
        {
          menu: 'Referenzen & Portfolio',
          link: '/referenzen-und-portfolio/',
          icon: 'ni ni-collection',
          submenu: [
            {
              link: '/referenzen-und-portfolio/webdesign',
              name: 'Webdesign'
            },
            {
              link: '/referenzen-und-portfolio/projekte',
              name: 'Projekte'
            }
          ]
        }
      ],
      kontakt: {
        icon: 'ni ni-email-83',
        link: '/kontakt',
        name: 'Kontakt'
      },
      home: {
        icon: 'ni ni-shop',
        link: '/',
        name: 'Startseite'
      },

      rechtliches: [
        {
          menu: 'Sonstige Links',
          link: '/',
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
a {
  padding-top: 14px !important;
  padding-bottom: 14px !important;
  margin-bottom: 8px !important;
  margin-top: 8px !important;
}

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
*:not(:placeholder-shown) + .form-control-placeholder {
  font-size: 75%;
  transform: translate3d(0, -100%, 0);
  /* opacity: 1; */
}

.subject {
  display: none;
}

@media (min-width: 992px) {
  .hide-this {
    display: none;
  }

  .navbar-main {
    padding: 0;
  }

  .nav-footer .nav-link {
    font-size: 1.1vh;
  }
}
</style>
