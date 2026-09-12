#!/usr/bin/env node
// Wochencheck fuer strainovic-it.ch.
//
// Drei Pruefungen, in dieser Reihenfolge, weil sie so nach Dringlichkeit
// geordnet sind:
//   1. Erreichbarkeit  — antworten alle Seiten und Weiterleitungen?
//   2. Aktualitaet     — entspricht die Live-Seite dem letzten Commit?
//   3. Abhaengigkeiten — gibt es neue Versionen?
//
// Punkt 2 ist der wichtigste. Der alte Auftritt lief wochenlang mit einem
// veralteten Stand, weil der Build scheiterte und es niemand sah.
//
// Aufruf:  node scripts/wochencheck.mjs [--nur-pruefen]
// Ohne Schalter werden Aktualisierungen innerhalb der Versionsbereiche
// eingespielt, aber nur nach gruenem Build committet und gepusht.
// Hauptversionen werden nie automatisch gewechselt, nur gemeldet.

import { execFileSync } from 'node:child_process'

const BASIS = 'https://www.strainovic-it.ch'
const nurPruefen = process.argv.includes('--nur-pruefen')

const seiten = ['/', '/profil/', '/referenzen/', '/kontakt/', '/impressum/', '/datenschutz/']
const dateien = ['/robots.txt', '/sitemap.xml', '/llms.txt', '/google3be5299c276d6b3d.html']
const weiterleitungen = {
  '/dienstleistungen': '/profil/',
  '/ueber-uns': '/profil/',
  '/referenzen-und-portfolio': '/referenzen/',
  '/en': '/',
  '/en/about': '/profil/',
  '/services': '/profil/'
}

const befunde = []
const melde = (stufe, text) => {
  befunde.push({ stufe, text })
  console.log(`${stufe === 'fehler' ? '✗' : stufe === 'hinweis' ? '·' : '✓'} ${text}`)
}

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim()
}

function npmBefehl(...args) {
  try {
    return execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  } catch (e) {
    // npm outdated endet mit Code 1, wenn es Treffer gibt. Das ist kein Fehler.
    return e.stdout ?? ''
  }
}

// ---------------------------------------------------------------- 1. Erreichbarkeit
console.log('\n== Erreichbarkeit ==')
for (const pfad of [...seiten, ...dateien]) {
  const antwort = await fetch(BASIS + pfad, { redirect: 'manual' }).catch(() => null)
  if (antwort?.status === 200) melde('ok', `${pfad} antwortet mit 200`)
  else melde('fehler', `${pfad} antwortet mit ${antwort?.status ?? 'keiner Verbindung'}`)
}

console.log('\n== Weiterleitungen ==')
for (const [von, nach] of Object.entries(weiterleitungen)) {
  const antwort = await fetch(BASIS + von, { redirect: 'manual' }).catch(() => null)
  const ziel = antwort?.headers.get('location') ?? ''
  if (antwort?.status === 301 && ziel.endsWith(nach)) {
    melde('ok', `${von} leitet auf ${nach}`)
  } else {
    melde('fehler', `${von}: Status ${antwort?.status ?? '—'}, Ziel ${ziel || '—'}, erwartet 301 auf ${nach}`)
  }
}

// ---------------------------------------------------------------- 2. Aktualitaet
console.log('\n== Aktualitaet ==')
const html = await fetch(BASIS + '/').then(r => r.text()).catch(() => '')
const liveCommit = html.match(/name="build-commit" content="([^"]+)"/)?.[1] ?? null
const kopf = git('rev-parse', 'HEAD')
const gepusht = git('rev-parse', 'origin/master')

if (!liveCommit) {
  melde('hinweis', 'Die Live-Seite nennt keinen Commit. Vermutlich ein Stand von vor dieser Pruefung.')
} else if (liveCommit === gepusht) {
  melde('ok', `Live-Stand entspricht origin/master (${liveCommit.slice(0, 8)})`)
} else {
  melde('fehler', `Live-Stand ${liveCommit.slice(0, 8)} weicht von origin/master ${gepusht.slice(0, 8)} ab. Build beim Hoster pruefen.`)
}
if (kopf !== gepusht) {
  melde('hinweis', `Lokal liegen Commits, die nicht gepusht sind (${kopf.slice(0, 8)})`)
}

// ---------------------------------------------------------------- 3. Abhaengigkeiten
console.log('\n== Abhaengigkeiten ==')
const veraltet = JSON.parse(npmBefehl('outdated', '--json') || '{}')
const einträge = Object.entries(veraltet)

const hauptversion = v => Number(String(v).split('.')[0])
const majors = einträge.filter(([, d]) => hauptversion(d.latest) > hauptversion(d.wanted))
const imBereich = einträge.filter(([, d]) => d.current !== d.wanted)

if (einträge.length === 0) {
  melde('ok', 'Alle Abhängigkeiten aktuell')
}
for (const [name, d] of majors) {
  melde('hinweis', `${name}: neue Hauptversion ${d.current} → ${d.latest}, Entscheidung nötig`)
}

if (imBereich.length > 0) {
  for (const [name, d] of imBereich) {
    melde('hinweis', `${name}: ${d.current} → ${d.wanted} innerhalb des Bereichs`)
  }
  if (nurPruefen) {
    melde('hinweis', 'Nur geprüft, nichts geändert (--nur-pruefen)')
  } else {
    console.log('\nSpiele Aktualisierungen ein und baue …')
    npmBefehl('update')
    try {
      execFileSync('npm', ['run', 'generate'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
      melde('ok', 'Build nach der Aktualisierung grün')
      const geändert = git('status', '--porcelain', 'package.json', 'package-lock.json')
      if (geändert) {
        git('add', 'package.json', 'package-lock.json')
        git('commit', '-m', 'Abhängigkeiten innerhalb der Versionsbereiche aktualisieren\n\nEingespielt vom Wochencheck, Build vor dem Commit geprüft.')
        git('push', 'origin', 'master')
        melde('ok', 'Aktualisierung committet und gepusht')
      }
    } catch {
      git('checkout', '--', 'package.json', 'package-lock.json')
      melde('fehler', 'Build nach der Aktualisierung gescheitert, Änderung zurückgenommen. Von Hand ansehen.')
    }
  }
}

// ---------------------------------------------------------------- Sicherheitslücken
console.log('\n== Sicherheitslücken in ausgelieferten Paketen ==')
const audit = JSON.parse(npmBefehl('audit', '--omit=dev', '--json') || '{}')
const anzahl = audit?.metadata?.vulnerabilities ?? {}
const summe = Object.entries(anzahl)
  .filter(([k]) => k !== 'info')
  .reduce((a, [, v]) => a + v, 0)
if (summe === 0) melde('ok', 'Keine Meldungen in Laufzeit-Abhängigkeiten')
else melde('hinweis', `${summe} Meldungen, im Einzelnen: ${JSON.stringify(anzahl)}`)
console.log('  Die Seite liefert nur Dateien aus, ohne Server und ohne Eingaben.')
console.log('  Funde in Build-Werkzeugen erreichen keinen Besucher.')

// ---------------------------------------------------------------- Fazit
const fehler = befunde.filter(b => b.stufe === 'fehler')
const hinweise = befunde.filter(b => b.stufe === 'hinweis')
console.log(`\n== Fazit ==\n${fehler.length} Fehler, ${hinweise.length} Hinweise`)
process.exit(fehler.length > 0 ? 1 : 0)
