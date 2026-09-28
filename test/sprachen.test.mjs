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
      for (const tag of ['li', 'h2', 'h3', 'img', 'table', 'pre', 'video']) {
        assert.equal(zaehle(lies(ziel), tag), zaehle(lies(pfad), tag), `Anzahl <${tag}>`)
      }
    })

    test(`${ziel}: interne Links bleiben in der Sprache`, () => {
      const html = lies(ziel)
      const links = [...html.matchAll(/<a [^>]*href="(\/[^"]*)"/g)].map(m => m[1])
      // Die Sprachwahl darf auf die anderen Fassungen zeigen, alles andere nicht.
      const sprachwahl = new Set(Object.keys(SPRACHEN).map(s => mitSprache(s, pfad)))
      // Dateien unter /downloads/ gibt es nur einmal für alle Sprachen.
      const falsch = links.filter(l => !sprachwahl.has(l) && !l.startsWith(`/${sprache}/`) && !l.startsWith('/downloads/'))
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

test('Rappenrundung: direkter Download und Hinweis auf die anderen Plugins, in jeder Sprache', () => {
  for (const sprache of Object.keys(SPRACHEN)) {
    const html = lies(mitSprache(sprache, '/rappenrundung/'))
    // Volle Adresse: an relative Links hängt NuxtLink einen Schrägstrich an (…zip/), der Download liefe ins Leere.
    const zip = html.match(/href="https:\/\/www\.strainovic-it\.ch\/downloads\/(rappenrundung-[\d.]+\.zip)"/)
    assert.ok(zip, `${sprache}: kein Download-Link`)
    assert.ok(existsSync(join(AUSGABE, 'downloads', zip[1])), `${zip[1]} fehlt`)
    assert.doesNotMatch(html, /mailto:[^"]*body=Shop/, `${sprache}: noch die Mail-Anfrage statt Download`)
    for (const seite of ['klara-shop-connector', 'abaninja-shop-connector', 'bexio-formular-connector', 'zefix-uid-check']) {
      assert.match(html, new RegExp(`href="${mitSprache(sprache, `/${seite}/`)}"`), `${sprache}: Link auf ${seite} fehlt`)
    }
  }
})

test('UID-Check: Abschnitt zum bexio-Plugin mit lokalem Video, Preis und Bestell-Mail, in jeder Sprache', () => {
  for (const sprache of Object.keys(SPRACHEN)) {
    const html = lies(mitSprache(sprache, '/zefix-uid-check/'))
    const video = html.match(/<video[^>]*>[\s\S]*?<\/video>/)
    assert.ok(video, `${sprache}: kein <video>`)
    for (const attribut of [/ controls[ >=]/, /preload="metadata"/, /poster="\/video\/uid-check-bexio-poster\.jpg"/, /width="1920"/, /height="1080"/]) {
      assert.match(video[0], attribut, `${sprache}: ${attribut} fehlt am <video>`)
    }
    assert.match(video[0], /<source[^>]*src="\/video\/uid-check-bexio\.mp4"[^>]*type="video\/mp4"|<source[^>]*type="video\/mp4"[^>]*src="\/video\/uid-check-bexio\.mp4"/)
    assert.doesNotMatch(html, /youtube|youtu\.be/i, `${sprache}: kein YouTube`)
    assert.match(html, /79 CHF|CHF 79/, `${sprache}: Preis fehlt`)
    assert.match(html, /href="mailto:info@strainovic-it\.ch\?subject=[^"]*bexio/i, `${sprache}: Bestell-Mail fehlt`)
  }
  assert.ok(existsSync(join(AUSGABE, 'video', 'uid-check-bexio.mp4')), 'Video fehlt')
  assert.ok(existsSync(join(AUSGABE, 'video', 'uid-check-bexio-poster.jpg')), 'Poster fehlt')
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
