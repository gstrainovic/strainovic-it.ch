<template>
  <div>
    <headroom>
      <header class="header-global">
        <BaseNav class="navbar-main" type="transparent" effect="dark" expand>
          <n-link slot="brand" class="navbar-brand" :to="localePath('index')"
            >Strainovic IT</n-link
          >
          <div slot="content-header" slot-scope="{ closeMenu }" class="row">
            <div class="col-6 collapse-brand">
              <n-link :to="localePath('index')">Strainovic IT</n-link>
            </div>
            <div class="col-6 collapse-close">
              <CloseButton @click="closeMenu"></CloseButton>
            </div>
          </div>

          <ul
            class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto"
          >
            <n-link class="nav-link" :to="localePath(home.link)">
              <i :class="home.icon"></i>
              <span class="nav-link-inner--text">{{ $t(home.name) }} </span>
            </n-link>

            <template v-for="x in links">
              <BaseDropdown :key="x.index" tag="li" class="nav-item">
                <n-link
                  slot="title"
                  :to="localePath(x.link)"
                  class="nav-link"
                  data-toggle="dropdown"
                  role="button"
                >
                  <i :class="x.icon"></i>
                  <span class="nav-link-inner--text">{{ $t(x.menu) }}</span>
                </n-link>

                <n-link
                  v-for="s in x.submenu"
                  :key="s.index"
                  :to="localePath(s.link)"
                  class="dropdown-item"
                  >{{ $t(s.name) }}
                </n-link>
              </BaseDropdown>
            </template>

            <n-link class="nav-link" :to="localePath(kontakt.link)">
              <i :class="kontakt.icon"></i>
              <span class="nav-link-inner--text">{{ $t(kontakt.name) }}</span>
            </n-link>

            <BaseDropdown tag="li" class="nav-item">
              <n-link
                slot="title"
                :to="switchLocalePath(this.$i18n.locale)"
                class="nav-link"
                data-toggle="dropdown"
                role="button"
              >
                <i class="fa fa-flag"></i>
                <span class="nav-link-inner--text">{{ currentName }}</span>
              </n-link>

              <nuxt-link
                v-for="locale in availableLocales"
                :key="locale.code"
                class="dropdown-item"
                :to="switchLocalePath(locale.code)"
                >{{ locale.name }}</nuxt-link
              >
            </BaseDropdown>
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
                      <div class="display-4">
                        {{ $t('wir-freuen-uns-auf-ihre-nachricht') }}
                      </div>
                      <div class="">
                        <!-- <div class="col-md-5 lead"> -->
                        <SitAdresse></SitAdresse>
                        <!-- </div> -->

                        <div class="col-md-5 mt-5"></div>
                      </div>
                      <p>{{ $t('alle-felder-sind-pflichtfelder') }}</p>
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
                              ><i class="ni ni-single-02"></i
                              >{{ $t('vorname') }}</label
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
                              ><i class="ni ni-single-02"></i
                              >{{ $t('nachname') }}</label
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
                              ><i class="ni ni-email-83"></i
                              >{{ $t(' E-Mail-Adresse *') }}</label
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
                              ><i class="ni ni-caps-small"></i
                              >{{ $t('nachricht') }}</label
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
                        {{ $t('senden') }}
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
              {{ $t('vielen-dank-fuer-ihre-unterstuetzung') }}
            </h3>
            <h4 class="pt-0 font-weight-light">
              {{ $t('folgen-sie-uns-auf-einer-dieser-plattformen') }}
            </h4>
          </div>
          <div class="col-lg-6 text-lg-center btn-wrapper">
            <a
              target="_blank"
              href="https://twitter.com/Strainovic_IT"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg"
              data-toggle="tooltip"
              :title="$t('folge-uns-auf-twitter')"
            >
              <i class="fa fa-twitter align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/StrainovicIT/"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg"
              data-toggle="tooltip"
              :title="$t('like-uns-auf-facebook')"
            >
              <i class="fa fa-facebook-square align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/strainovic_it/"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-instagram btn-lg btn-round"
              data-toggle="tooltip"
              :title="$t('folge-uns-auf-instagram')"
            >
              <i class="fa fa-instagram align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://ch.linkedin.com/in/goran-strainovic"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-linkedin btn-round btn-lg"
              data-toggle="tooltip"
              :title="$t('folge-uns-auf-linkedin')"
            >
              <i class="fa fa-linkedin align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://github.com/gstrainovic"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg"
              data-toggle="tooltip"
              :title="$t('spendiere-uns-einen-stern-auf-github')"
            >
              <i class="fa fa-github align-top"></i>
            </a>
            <a
              target="_blank"
              href="https://www.xing.com/profile/Goran_Strainovic"
              rel="noopener noreferrer"
              class="btn btn-neutral btn-icon-only btn-xing btn-round btn-lg"
              data-toggle="tooltip"
              :title="$t('folge-uns-auf-xing')"
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
          <div class="col-sm-9">
            <ul class="nav nav-footer">
              <template v-for="x in links">
                <li
                  :key="x.index"
                  class="nav-item mr-3 col-xs-12 col-sm-3 mb-4"
                >
                  <n-link :to="localePath(x.link)" class="nav-link ">{{
                    $t(x.menu)
                  }}</n-link>
                  <n-link
                    v-for="s in x.submenu"
                    :key="s.index"
                    :to="localePath(s.link)"
                    class="nav-link"
                    >{{ $t(s.name) }}</n-link
                  >
                </li>
              </template>

              <li class="nav-item mr-3 col-xs-12 col-sm">
                <n-link :to="localePath(home.link)" class="nav-link">{{
                  $t(home.name)
                }}</n-link>

                <nuxt-link
                  v-for="s in rechtliches"
                  :key="s.index"
                  :to="localePath(s.link)"
                  class="nav-link"
                  >{{ $t(s.name) }}</nuxt-link
                >

                <n-link :to="localePath(kontakt.link)" class="nav-link">{{
                  $t(kontakt.name)
                }}</n-link>

                <nuxt-link
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  class="nav-link"
                  :to="switchLocalePath(locale.code)"
                  >{{ locale.name }}</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <input id="checkbox-cb" class="checkbox-cb" type="checkbox" />
      <div class="cookie-bar">
        <span class="message"
          >This website uses cookies to give you an incredible experience. By
          using this website you agree to the <a href="#">terms</a></span
        >
        <span class="mobile"
          >This website uses cookies, <a href="#">learn more</a></span
        >
        <label for="checkbox-cb" class="close-cb">x</label> -->
      <!-- </div> -->
      <!-- <BaseAlert dismissible class="fixed-bottom">{{
        $t('diese-webseite-speichert-ihre-sprachauswahl-in-cookies')
      }}</BaseAlert> -->
    </footer>
  </div>
</template>

<script>
import SitAdresse from '@/components/SitAdresse'
import BaseNav from '@/components/argon/BaseNav'
import BaseDropdown from '@/components/argon/BaseDropdown'
import CloseButton from '@/components/argon/CloseButton'
import { headroom } from 'vue-headroom'
import Vue from 'vue'
import de from 'vee-validate/dist/locale/de'
import { ValidationProvider } from 'vee-validate'
import { Validator } from 'vee-validate'
Validator.localize(de)
import VeeValidate from 'vee-validate'
import BaseAlert from '@/components/argon/BaseAlert'

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
    ValidationProvider,
    BaseAlert
  },
  data() {
    return {
      links: [
        {
          link: 'dienstleistungen',
          menu: 'Dienstleistungen',
          icon: 'ni ni-spaceship',
          submenu: [
            {
              name: 'SoftwareUndApps',
              link: 'dienstleistungen-software-und-apps'
            },
            {
              name: 'WebdesignUndProgrammierung',
              link: 'dienstleistungen-webdesign-und-programmierung'
            },
            {
              name: 'Marketing',
              link: 'dienstleistungen-marketing'
            }
          ]
        },
        {
          menu: 'UeberUns',
          link: 'ueber-uns',
          icon: 'ni ni-single-02',
          submenu: [
            {
              name: 'StrainovicIt',
              link: 'ueber-uns-strainovic-it'
            },
            {
              name: 'GoranStrainovic',
              link: 'ueber-uns-goran-strainovic'
            }
          ]
        },
        {
          menu: 'ReferenzenUndPortfolio',
          link: 'referenzen-und-portfolio',
          icon: 'ni ni-collection',
          submenu: [
            {
              name: 'Webdesign',
              link: 'referenzen-und-portfolio-webdesign'
            },
            {
              name: 'Videomarketing',
              link: 'referenzen-und-portfolio-videomarketing'
            },
            {
              name: 'Projekte',
              link: 'referenzen-und-portfolio-projekte'
            }
          ]
        }
      ],
      kontakt: {
        name: 'Kontakt',
        icon: 'ni ni-email-83',
        link: 'kontakt'
      },
      home: {
        name: 'Startseite',
        icon: 'ni ni-shop',
        link: 'index'
      },

      rechtliches: [
        {
          name: 'Impressum',
          link: 'impressum'
        },
        {
          name: 'Datenschutz',
          link: 'datenschutz'
        }
      ]
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentName() {
      return this.$i18n.locales.filter(i => i.code == this.$i18n.locale)[0].name
    }
  }
}
//
</script>

//
<style>
.navbar-nav .nav-link .nav-link-inner--text {
  margin-left: 0;
}

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
  .navbar-main {
    padding: 0;
  }
}

.nav-footer .nav-link {
  font-size: 0.789em;
  font-weight: 500;
  color: dimgrey;
}
</style>
