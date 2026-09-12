import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-10',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/image'],

  content: {
    renderer: {
      // Rechtstexte brauchen keine Sprungmarken; die Anker wuerden die
      // Ueberschriften als Links unterstreichen.
      anchorLinks: false
    }
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de-CH' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      script: [
        {
          // Laeuft vor dem ersten Zeichnen, damit bei gewaehltem Thema
          // nicht kurz das falsche aufblitzt.
          innerHTML:
            "try{var t=localStorage.getItem('thema');if(t!=='hell'&&t!=='dunkel'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dunkel':'hell'}document.documentElement.dataset.thema=t}catch(e){}",
          tagPosition: 'head'
        }
      ]
    }
  },

  nitro: {
    // Rein statisch, festgeschrieben. Ohne diese Angabe erkennt Nitro im
    // Cloudflare-Build die Umgebung und waehlt `cloudflare-module`. Das
    // erwartet eine Server-Einstiegsdatei, die bei `generate` nicht
    // entsteht, ueberschreibt die `assets` aus wrangler.jsonc und bringt
    // Nuxt Content dazu, auf eine D1-Datenbank umzuschalten.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
