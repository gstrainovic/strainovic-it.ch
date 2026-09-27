// Prüft die gebaute Seite auf vollständige Sprachfassungen.
// Vorher `npm run generate`, dann `npm test`.
//
// Deutsch ist die Hauptfassung ohne Präfix. Jede deutsche Seite braucht ihr
// Gegenstück unter /fr/, /it/ und /en/, sonst zeigen Sprachwahl und hreflang
// ins Leere.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const AUSGABE = new URL('../.output/public/', import.meta.url).pathname
const BASIS = 'https://www.strainovic-it.ch'
const SPRACHEN = { de: 'de-CH', fr: 'fr-CH', it: 'it-CH', en: 'en' }
const FREMD = ['fr', 'it', 'en']
const AUSGENOMMEN = new Set(['_nuxt', '__nuxt_content', '_fonts', '_ipx', 'img', ...FREMD])

// Deutsche Seiten: jedes index.html ausserhalb der Sprachordner und der Build-Ordner.
function deutscheSeiten(ordner = AUSGABE, pfad = '/') {
  const seiten = existsSync(join(ordner, 'index.html')) ? [pfad] : []
  for (const name of readdirSync(ordner)) {
    if (pfad === '/' && AUSGENOMMEN.has(name)) continue
    if (statSync(join(ordner, name)).isDirectory()) seiten.push(...deutscheSeiten(join(ordner, name), `${pfad}${name}/`))
  }
  return seiten
}

const lies = pfad => readFileSync(join(AUSGABE, pfad, 'index.html'), 'utf8')
const mitSprache = (sprache, pfad) => (sprache === 'de' ? pfad : `/${sprache}${pfad}`)
const seiten = deutscheSeiten()

test('die deutschen Seiten werden gefunden', () => {
  assert.ok(seiten.includes('/'))
  assert.ok(seiten.includes('/rappenrundung/'))
  assert.ok(seiten.includes('/open-source/editor-suche/'))
})

for (const pfad of seiten) {
  for (const sprache of Object.keys(SPRACHEN)) {
    const ziel = mitSprache(sprache, pfad)

    test(`${ziel}: vorhanden, mit lang, canonical und hreflang`, () => {
      assert.ok(existsSync(join(AUSGABE, ziel, 'index.html')), `${ziel} fehlt`)
      const html = lies(ziel)
      assert.match(html, new RegExp(`<html[^>]* lang="${SPRACHEN[sprache]}"`))
      assert.match(html, new RegExp(`<link[^>]*rel="canonical"[^>]*href="${BASIS}${ziel}"`))
      for (const [andere, tag] of Object.entries(SPRACHEN)) {
        assert.match(
          html,
          new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="${tag}"[^>]*href="${BASIS}${mitSprache(andere, pfad)}"`),
          `hreflang ${tag} fehlt`
        )
      }
      assert.match(html, new RegExp(`<link[^>]*rel="alternate"[^>]*hreflang="x-default"[^>]*href="${BASIS}${pfad}"`))
    })

    if (sprache === 'de') continue

    test(`${ziel}: gleicher Aufbau wie die deutsche Fassung`, () => {
      // Fehlt eine Übersetzung in einer Liste, fehlt ein Eintrag.
      const zaehle = (html, tag) => (html.match(new RegExp(`<${tag}[ >]`, 'g')) ?? []).length
      for (const tag of ['li', 'h2', 'h3', 'img', 'table', 'pre']) {
        assert.equal(zaehle(lies(ziel), tag), zaehle(lies(pfad), tag), `Anzahl <${tag}>`)
      }
    })

    test(`${ziel}: interne Links bleiben in der Sprache`, () => {
      const html = lies(ziel)
      const links = [...html.matchAll(/<a [^>]*href="(\/[^"]*)"/g)].map(m => m[1])
      // Die Sprachwahl darf auf die anderen Fassungen zeigen, alles andere nicht.
      const sprachwahl = new Set(Object.keys(SPRACHEN).map(s => mitSprache(s, pfad)))
      const falsch = links.filter(l => !sprachwahl.has(l) && !l.startsWith(`/${sprache}/`))
      assert.deepEqual(falsch, [])
    })
  }
}

test('Rappenrundung zeigt den Checkout in der jeweiligen Sprache', () => {
  for (const sprache of FREMD) {
    assert.match(lies(`/${sprache}/rappenrundung/`), new RegExp(`/img/rappenrundung-checkout-${sprache}\\.png`))
    assert.ok(existsSync(join(AUSGABE, 'img', `rappenrundung-checkout-${sprache}.png`)))
  }
})

test('sitemap.xml nennt jede Seite in jeder Sprache, und nur vorhandene', () => {
  const sitemap = readFileSync(join(AUSGABE, 'sitemap.xml'), 'utf8')
  const eintraege = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(BASIS, ''))
  const indexierbar = seiten.filter(p => !lies(p).includes('content="noindex"'))
  const erwartet = indexierbar.flatMap(p => Object.keys(SPRACHEN).map(s => mitSprache(s, p)))
  assert.deepEqual([...eintraege].sort(), [...erwartet].sort())
})

test('_redirects leitet /en nicht mehr auf die deutsche Seite', () => {
  const regeln = readFileSync(join(AUSGABE, '_redirects'), 'utf8')
    .split('\n')
    .filter(z => z.trim() && !z.startsWith('#'))
  assert.deepEqual(regeln.filter(z => /^\/en(\/|\s)/.test(z) && !/\s\/en\//.test(z)), [])
})
