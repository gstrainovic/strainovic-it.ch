import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Eine Sammlung je Sprache. Die Dateien liegen unter content/<sprache>/,
// der Pfad in der Sammlung ist ohne Sprachordner, damit /fr/rappenrundung/
// dieselbe Datei in content/fr/ findet wie /rappenrundung/ in content/de/.
const seiten = (sprache: string) =>
  defineCollection({
    type: 'page',
    source: { include: `${sprache}/**/*.md`, prefix: '' },
    schema: z.object({
      robots: z.string().optional()
    })
  })

export default defineContentConfig({
  collections: {
    seiten_de: seiten('de'),
    seiten_fr: seiten('fr'),
    seiten_it: seiten('it'),
    seiten_en: seiten('en')
  }
})
