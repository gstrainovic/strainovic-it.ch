// Meldet die Seiten der Sitemap per IndexNow an Bing und die anderen beteiligten Suchmaschinen.
// Aufruf nach einem Deploy, der Seiten hinzufügt oder Texte ändert: `node scripts/indexnow.mjs`
// (`--dry-run` zeigt nur den Körper). Unveränderte Seiten wiederholt zu melden gilt als Spam.
// Der Schlüssel liegt als `public/<key>.txt`, IndexNow prüft ihn unter https://www.strainovic-it.ch/<key>.txt.
import { readdirSync, readFileSync } from 'node:fs'

const HOST = 'www.strainovic-it.ch'
const key = readdirSync('public').find(f => /^[a-f0-9]{32}\.txt$/.test(f))?.replace(/\.txt$/, '')
if (!key) throw new Error('kein IndexNow-Schlüssel in public/')

const sitemap = readFileSync('public/sitemap.xml', 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
const body = { host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList }

if (process.argv.includes('--dry-run')) {
  console.log(JSON.stringify(body, null, 2))
} else {
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body)
  })
  console.log(`IndexNow ${r.status} für ${urlList.length} URLs`)
  if (!r.ok) { console.log(await r.text()); process.exit(1) }
}
