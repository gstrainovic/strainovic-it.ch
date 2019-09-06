// const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Strainovic-IT.ch',
    meta: [
      { charset: 'utf-8' },
      { name: 'X-UA-Compatible', content: 'IE=edge' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=6, user-scalable=6, shrink-to-fit=no'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Webdesign, Programmierung & Marketing - Software, Homepage & Webseite erstellen und vermarkten lassen'
      },
      { name: 'author', content: 'Strainovic IT, Goran Strainovic' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
      // }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  transition: {
    name: 'fade',
    mode: 'out-in',
    duration: 250
  },

  /*
   ** Global CSS
   */
  css: [
    '~assets/argon/vendor/nucleo/css/nucleo.css',
    '~assets/argon/vendor/font-awesome/css/font-awesome.css',
    '~assets/argon/scss/argon.scss',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/argon/argon-kit',
    { src: '~plugins/i18n.js' }
    // { src: '~/plugins/vue-lazyload', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'Deutsch',
            code: 'de',
            iso: 'de-DE',
            // file: 'de-DE.js'
            file: 'de-DE.js'
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        vueI18nLoader: true,
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'de',
        detectBrowserLanguage: {
          useCookie: true
        },
        parsePages: false,
        pages: {
          'dienstleistungen/index': {
            de: '/dienstleistungen',
            en: '/services'
          },
          'dienstleistungen/marketing': {
            de: '/dienstleistungen/marketing',
            en: '/services/marketing'
          },
          'dienstleistungen/software-und-apps': {
            de: '/dienstleistungen/software-und-apps',
            en: '/services/software-and-apps'
          },
          'dienstleistungen/webdesign-und-programmierung': {
            de: '/dienstleistungen/webdesign-und-programmierung',
            en: '/services/webdesign-and-coding'
          },
          'referenzen-und-portfolio/index': {
            de: '/referenzen-und-portfolio',
            en: '/portfolio'
          },
          'referenzen-und-portfolio/projekte': {
            de: '/referenzen-und-portfolio/projekte',
            en: '/portfolio/projects'
          },
          'referenzen-und-portfolio/webdesign': {
            de: '/referenzen-und-portfolio/webdesign',
            en: '/portfolio/webdesign'
          },
          'ueber-uns/index': {
            de: '/ueber-uns',
            en: '/about'
          },
          'ueber-uns/strainovic-it': {
            de: '/ueber-uns/strainovic-it',
            en: '/about/strainovic-it'
          },
          'ueber-uns/goran-strainovic': {
            de: '/ueber-uns/goran-strainovic',
            en: '/about/goran-strainovic'
          },
          datenschutz: {
            de: '/datenschutz',
            en: '/privacy-policy'
          },
          impressum: {
            de: '/impressum',
            en: '/imprint'
          },
          kontakt: {
            de: '/kontakt',
            en: '/contact'
          }
        }
        // alwaysRedirect: false
      }
    ],

    [
      'nuxt-validate',
      '@nuxtjs/component-cache',
      {
        // lang: 'de'
        // classes: true,
        // classNames: {
        //   valid: 'is-valid',
        //   invalid: 'is-invalid'
        // }
      }
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    [
      'bootstrap-vue/nuxt',
      {
        css: false
      }
    ],
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    '@nuxtjs/sitemap'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  sitemap: {
    hostname: 'https://www.strainovic-it.ch'
  },

  webfontloader: {
    google: {
      families: ['Open+Sans:300,400,600,700&display=swap'] //Loads Lato font with weights 400 and 700
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config) {
    //   config.module.rules.push({
    //     resourceQuery: /blockType=i18n/,
    //     type: 'javascript/auto',
    //     loader: ['@kazupon/vue-i18n-loader', 'yaml-loader']
    //   })
    // }
    // extend(config, ctx) {}
  }
}
