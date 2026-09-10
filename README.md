# strainovic-it.ch

Website von Strainovic IT, Goran Strainovic. Statisch erzeugt mit Nuxt 4,
einsprachig deutsch, gehostet auf Cloudflare Pages.

Inhaltliche Regeln und Hintergrund stehen in `AGENTS.md`, offene Punkte in
`todo.md`.

## Entwickeln

Node 26 wird über `.nvmrc` vorgegeben.

```bash
npm install
npm run dev        # Entwicklungsserver auf http://localhost:3000
npm run generate   # statische Ausgabe nach .output/public
npm run preview    # erzeugte Ausgabe lokal ansehen
```

## Aufbau

| Ort | Inhalt |
|---|---|
| `app/pages/` | Start, Profil, Referenzen, Kontakt als Vue-Seiten |
| `content/` | Impressum und Datenschutz als Markdown über Nuxt Content |
| `app/assets/css/main.css` | Farben, Typografie und die Merkmalzeilen des Datenblatts |
| `public/` | Symbole, `_redirects`, `robots.txt`, `sitemap.xml`, `llms.txt` |

Farben liegen als CSS-Variablen mit `light-dark()` vor, der Schalter im Kopf
setzt dafür nur `data-thema` auf der Wurzel um.

## Ausliefern

Cloudflare Pages baut mit `npm run generate` und veröffentlicht
`.output/public`. Weiterleitungen der alten URLs stehen in
`public/_redirects`.
