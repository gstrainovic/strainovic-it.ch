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
            file: 'de-DE.js'
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'de',
        detectBrowserLanguage: {
          useCookie: true
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
    extend(config, ctx) {}
  }
}
