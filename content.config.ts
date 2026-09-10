import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    seiten: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        robots: z.string().optional()
      })
    })
  }
})
