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
  assert.ok(seiten.includes('/plugins/'))
})

const PLUGINS = ['uid-check', 'bexio-formular-connector', 'klara-shop-connector', 'abaninja-shop-connector', 'rappenrundung']
const kopf = html => html.match(/<header[^>]*>[\s\S]*?<\/header>/)[0]
const fuss = html => html.match(/<footer[^>]*>[\s\S]*?<\/footer>/)[0]
const ziele = html => [...html.matchAll(/<a [^>]*href="([^"]*)"/g)].map(m => m[1])

test('Header: Plugins, Referenzen, Profil, Kontakt; Open Source steht im Footer', () => {
  for (const sprache of Object.keys(SPRACHEN)) {
    const html = lies(mitSprache(sprache, '/profil/'))
    const nav = kopf(html).match(/<nav(?![^>]*aria-label)[^>]*>[\s\S]*?<\/nav>/)[0]
    assert.deepEqual(
      ziele(nav),
      ['/plugins/', '/referenzen/', '/profil/', '/kontakt/'].map(p => mitSprache(sprache, p)),
      `${sprache}: Hauptnavigation`
    )
    assert.ok(ziele(fuss(html)).includes(mitSprache(sprache, '/open-source/')), `${sprache}: Open Source fehlt im Footer`)
  }
})

test('Plugins-Seite verlinkt alle fünf Plugins, in jeder Sprache', () => {
  for (const sprache of Object.keys(SPRACHEN)) {
    const html = lies(mitSprache(sprache, '/plugins/'))
    assert.match(html, /<h1[^>]*>\s*Plugin/, `${sprache}: Überschrift`)
    const main = html.match(/<main[^>]*>[\s\S]*?<\/main>/)[0]
    for (const p of PLUGINS) {
      assert.ok(ziele(main).includes(mitSprache(sprache, `/${p}/`)), `${sprache}: Link auf ${p} fehlt`)
    }
  }
})

test('Profil verweist auf Open Source, in jeder Sprache', () => {
  for (const sprache of Object.keys(SPRACHEN)) {
    const main = lies(mitSprache(sprache, '/profil/')).match(/<main[^>]*>[\s\S]*?<\/main>/)[0]
    assert.ok(ziele(main).includes(mitSprache(sprache, '/open-source/')), `${sprache}: Link fehlt`)
  }
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
    const zip = html.match(/href="https:\/\/www\.strainovic-it\.ch\/downloads\/(strainovic-it-rappenrundung-[\d.]+\.zip)"/)
    assert.ok(zip, `${sprache}: kein Download-Link`)
    assert.ok(existsSync(join(AUSGABE, 'downloads', zip[1])), `${zip[1]} fehlt`)
    assert.doesNotMatch(html, /mailto:[^"]*body=Shop/, `${sprache}: noch die Mail-Anfrage statt Download`)
    for (const seite of ['klara-shop-connector', 'abaninja-shop-connector', 'bexio-formular-connector', 'uid-check']) {
      assert.match(html, new RegExp(`href="${mitSprache(sprache, `/${seite}/`)}"`), `${sprache}: Link auf ${seite} fehlt`)
    }
  }
})

test('UID-Check: Video in der Sprache der Seite, lokal ausgeliefert, ohne Hinweis auf deutsche Fassung', () => {
  for (const sprache of Object.keys(SPRACHEN)) {
    const html = lies(mitSprache(sprache, '/uid-check/'))
    const video = html.match(/<video[^>]*>[\s\S]*?<\/video>/)
    assert.ok(video, `${sprache}: kein <video>`)
    const poster = new RegExp(`poster="/video/uid-check-bexio-${sprache}-poster\\.jpg"`)
    for (const attribut of [/ controls[ >=]/, /preload="metadata"/, poster, /width="1920"/, /height="1080"/]) {
      assert.match(video[0], attribut, `${sprache}: ${attribut} fehlt am <video>`)
    }
    assert.match(video[0], new RegExp(`<source[^>]*src="/video/uid-check-bexio-${sprache}\\.mp4"[^>]*type="video/mp4"`))
    assert.doesNotMatch(html, /youtube|youtu\.be/i, `${sprache}: kein YouTube`)
    assert.doesNotMatch(html, /Video auf Deutsch|Video in German|Vidéo en allemand|Video in tedesco/i, `${sprache}: Hinweis auf deutsches Video`)
    assert.ok(existsSync(join(AUSGABE, 'video', `uid-check-bexio-${sprache}.mp4`)), `${sprache}: Video fehlt`)
    assert.ok(existsSync(join(AUSGABE, 'video', `uid-check-bexio-${sprache}-poster.jpg`)), `${sprache}: Poster fehlt`)
  }
})

test('UID-Check: ein Preisblock, ein Aufruf, nichts Ungebautes als verfügbar', () => {
  const nichtGebaut = /Mutationsalarm|alerte de mutation|allarme mutazioni|change alert|WPForms|Gravity Forms|Elementor/i
  for (const sprache of Object.keys(SPRACHEN)) {
    const html = lies(mitSprache(sprache, '/uid-check/'))
    const zaehle = re => (html.match(re) ?? []).length
    assert.equal(zaehle(/href="mailto:/g), 1, `${sprache}: genau ein Mail-Aufruf`)
    assert.match(html, /href="mailto:info@strainovic-it\.ch\?subject=[^"]*bexio/i, `${sprache}: Bestell-Mail fehlt`)
    assert.equal(zaehle(/(?<!1)79 CHF|CHF 79\b/g), 1, `${sprache}: 79 CHF genau einmal`)
    assert.equal(zaehle(/199 CHF|CHF 199/g), 1, `${sprache}: Agenturpreis genau einmal`)
    assert.doesNotMatch(html, /Strainovic UID[ -]Check (für|for|pour|per) bexio/i, `${sprache}: Produktname ohne Strainovic`)
    assert.doesNotMatch(html, /Vorbestell|Précommande|précommander|Preordin|Pre-order|zahlen erst bei Lieferung/i, `${sprache}: Vorbestellung`)
    assert.doesNotMatch(html, /\bPro\b[^<]{0,20}(79|199) CHF|>Pro:?</, `${sprache}: Pro-Stufe mit Preis`)
    assert.doesNotMatch(html, nichtGebaut, `${sprache}: Ungebautes`)
    assert.doesNotMatch(html, /In Arbeit|ohne Aufpreis|In progress|at no extra cost|En préparation|sans supplément|In preparazione|senza sovrapprezzo|Premium/i, `${sprache}: Zusage für Ungebautes`)
    // Zefix nutzt das Plugin nicht; erwähnt wird es nur als Frage im Block «Mehr gewünscht?».
    const sichtbar = html.replace(/<script[\s\S]*?<\/script>/g, '')
    const frage = (sichtbar.match(/<li[^>]*>[\s\S]*?<\/li>/g) ?? []).find(li => /Mehr gewünscht\?|Need more\?|Besoin de plus|Serve di più\?/.test(li))
    assert.ok(frage, `${sprache}: Block «Mehr gewünscht?» fehlt`)
    assert.match(frage, /\(Zefix\)/, `${sprache}: Frage nach Zefix fehlt`)
    assert.doesNotMatch(sichtbar.replace(frage, ''), /Zefix/i, `${sprache}: Zefix ausserhalb des Frageblocks`)
  }
  assert.match(lies('/uid-check/'), /Bald im WordPress-Plugin-Verzeichnis/)
  const plugins = readFileSync(new URL('../app/texte/plugins.ts', import.meta.url), 'utf8')
  const eintraege = plugins.split('\n').filter(z => z.includes("pfad: '/uid-check/'"))
  assert.equal(eintraege.length, 4)
  for (const z of eintraege) {
    assert.doesNotMatch(z, /Vorbestell|Précommande|Preordine|Pre-order|Zefix\.|depuis Zefix|da Zefix|from Zefix|aus Zefix/i, z)
  }
})

test('sitemap.xml nennt jede Seite in jeder Sprache, und nur vorhandene', () => {
  const sitemap = readFileSync(join(AUSGABE, 'sitemap.xml'), 'utf8')
  const eintraege = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(BASIS, ''))
  const indexierbar = seiten.filter(p => !lies(p).includes('content="noindex"'))
  const erwartet = indexierbar.flatMap(p => Object.keys(SPRACHEN).map(s => mitSprache(s, p)))
  assert.deepEqual([...eintraege].sort(), [...erwartet].sort())
})

test('UID-Check liegt unter /uid-check/, die alte Adresse /zefix-uid-check/ leitet per 301 dorthin', () => {
  const regeln = readFileSync(join(AUSGABE, '_redirects'), 'utf8')
    .split('\n')
    .filter(z => z.trim() && !z.startsWith('#'))
    .map(z => z.trim().split(/\s+/))
  for (const sprache of Object.keys(SPRACHEN)) {
    const neu = mitSprache(sprache, '/uid-check/')
    assert.ok(existsSync(join(AUSGABE, neu, 'index.html')), `${neu} fehlt`)
    for (const alt of [mitSprache(sprache, '/zefix-uid-check/'), mitSprache(sprache, '/zefix-uid-check')]) {
      assert.ok(regeln.some(([von, nach, code]) => von === alt && nach === neu && code === '301'), `${alt} → ${neu} 301 fehlt`)
      assert.ok(!existsSync(join(AUSGABE, alt, 'index.html')), `${alt} wird noch als Seite gebaut`)
    }
  }
})

test('keine Seite, kein interner Link und kein Eintrag in Sitemap oder llms.txt zeigt auf zefix-uid-check', () => {
  const html = (ordner = AUSGABE) =>
    readdirSync(ordner).flatMap(name => {
      const pfad = join(ordner, name)
      if (statSync(pfad).isDirectory()) return name.startsWith('_') ? [] : html(pfad)
      return name.endsWith('.html') ? [pfad] : []
    })
  for (const datei of html()) {
    assert.doesNotMatch(readFileSync(datei, 'utf8'), /href="[^"]*zefix-uid-check/, datei)
  }
  for (const datei of ['sitemap.xml', 'llms.txt']) {
    assert.doesNotMatch(readFileSync(join(AUSGABE, datei), 'utf8'), /zefix-uid-check/, datei)
  }
})

test('_redirects leitet /en nicht mehr auf die deutsche Seite', () => {
  const regeln = readFileSync(join(AUSGABE, '_redirects'), 'utf8')
    .split('\n')
    .filter(z => z.trim() && !z.startsWith('#'))
  assert.deepEqual(regeln.filter(z => /^\/en(\/|\s)/.test(z) && !/\s\/en\//.test(z)), [])
})
