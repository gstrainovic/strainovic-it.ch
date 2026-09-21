import { execFileSync } from 'node:child_process'
import tailwindcss from '@tailwindcss/vite'

// Commit des Builds. Netlify liefert COMMIT_REF, lokal fragt git.
// Daran erkennt der Wochencheck, ob die Live-Seite dem Repo entspricht.
const commit =
  process.env.COMMIT_REF ??
  (() => {
    try {
      return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
    } catch {
      return 'unbekannt'
    }
  })()

export default defineNuxtConfig({
  compatibilityDate: '2026-09-10',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/image'],

  content: {
    build: {
      markdown: {
        highlight: {
          // Shiki buendelt nur die hier genannten Sprachen. Die Vorgabe kennt
          // weder Zig noch Python, deren Bloecke blieben ungefaerbt.
          langs: ['zig', 'python', 'bash', 'json', 'ts', 'vue', 'css', 'html', 'md', 'yaml']
        }
      }
    },

    renderer: {
      // Rechtstexte brauchen keine Sprungmarken; die Anker wuerden die
      // Ueberschriften als Links unterstreichen.
      anchorLinks: false
    }
  },

  css: ['~/assets/css/main.css'],

  // Adressen enden auf einen Schrägstrich. Netlify liefert die Seiten so
  // aus und leitet die Fassung ohne Schrägstrich per 301 dorthin. Damit
  // Links, Sitemap und Auslieferung dieselbe Form nennen, erzeugt auch
  // NuxtLink sie mit Schrägstrich.
  experimental: {
    defaults: {
      nuxtLink: { trailingSlash: 'append' }
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de-CH' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'build-commit', content: commit }
      ],
      // Quelle ist public/logo.svg, die PNG und das ICO erzeugt scripts/icons.sh.
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
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
