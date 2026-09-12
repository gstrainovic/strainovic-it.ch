# AGENTS.md — strainovic-it.ch

Öffentliche Website der Einzelfirma Strainovic IT, Goran Strainovic.

## Zweck

Die Seite ist die öffentliche Visitenkarte gegenüber Kunden und Recruitern im
DACH-Raum. Sie zeigt, wer Goran ist und was er baut. Sie ist kein
Akquise-Trichter und kein Agenturauftritt.

Der Lebenslauf liegt bewusst nicht auf dieser Domain, sondern auf
`cv.strainovic-it.ch` mit `X-Robots-Tag: noindex`. Deploy und Pflege stehen in
`~/projects/find-jobs/AGENTS.md`, Abschnitt „Deploy cv.strainovic-it.ch".

## Diskretion

Goran ist bei der Wälli AG angestellt und sucht diskret. Alles auf dieser
Domain ist öffentlich indexiert, deshalb gilt hier dieselbe Linie wie für das
LinkedIn-Profil in `~/projects/find-jobs/AGENTS.md`:

- Keine Verfügbarkeitsangabe, kein „offen für Projekte", kein „ab sofort".
- Keine Stundensätze, keine Preise, keine Pakete.
- Keine Zeugnis-Scans und keine Referenzschreiben im Volltext.
- Kein Geburtsdatum und keine Wohnadresse. Die Geschäftsadresse im Impressum
  ist Pflicht und bleibt.

## Zielgruppe und Sprache

Deutschschweiz zuerst, dann Deutschland und Österreich. Die Seite ist
einsprachig deutsch. Es gibt keine englische Fassung und keine i18n-Schicht.

## Inhaltliche Linie

Gezeigt wird Softwareentwicklung: Vue, Nuxt, Quasar, Node.js, Go, Python,
sowie DevOps mit Kubernetes, Ansible, Terraform und CI/CD.

Nicht gezeigt werden Webdesign mit WordPress oder Divi, Social-Media-Marketing,
Videomarketing, Ghostwriting und Photoshop-Arbeiten. Diese Leistungen stehen
nicht mehr im Angebot und ziehen genau die Anfragen an, die laut
`find-jobs/AGENTS.md` ohnehin abgelehnt werden.

Erste Person Singular, kein „wir". Keine Sternebewertungen, keine Ketten aus
Sonderzeichen in Titeln und Meta-Descriptions.

Portfolio ohne echte Screenshots. Die meisten Projekte sind interne
Anwendungen ohne vorzeigbare Oberfläche. Beschrieben werden Ziel, Rolle und
Stack in Textform.

## Fakten und Belege

Stationsdaten, Positionsbeschreibung und Projektliste kommen aus
`~/projects/find-jobs`: `waelli-position.md` und der Abschnitt „Verbindliche
Stationsdaten" in dessen AGENTS.md. Auf dieser Seite steht nichts, was dort
nicht belegt ist. Die Angaben müssen mit LinkedIn, freelancermap und dem CV
übereinstimmen.

## Stack

Die Seite wird von Nuxt 2 auf Nuxt 4 neu gebaut. Der alte Stand lässt sich
nicht mehr bauen: Webpack 4, node-sass und ein auf Node 12 gepinnter
Netlify-Build. Der ausgelieferte Stand ist älter als der letzte Commit.

- Nuxt 4 mit Vue 3, kein i18n-Modul.
- Fliesstext als Markdown über Nuxt Content, Layoutseiten als Vue-Komponenten.
- Node LTS in `.nvmrc` und in der Build-Konfiguration gepinnt.
- Abhängigkeiten so wenige wie möglich, Renovate hält sie aktuell.

## Hosting

Netlify, Site auf `www.strainovic-it.ch`, Build aus `master`. Build-Befehl
`npm run generate`, Ausgabe `.output/public`, Node-Version aus `.nvmrc`. Die
Weiterleitungen der alten Adressen liegen in `public/_redirects`, Netlify
wertet die Datei aus.

`cv.strainovic-it.ch` liegt als eigene Netlify-Site daneben, beschrieben in
`~/projects/find-jobs/AGENTS.md`.

Nicht in Frage kommen Vercel und GitHub Pages: Vercel Hobby ist laut
Fair-Use-Regeln auf private Nutzung beschränkt, GitHub Pages untersagt den
Betrieb des eigenen Geschäfts.

## DNS liegt bei Infomaniak

Nicht beim Hoster. An der Zone hängen MX und SPF für
`info@strainovic-it.ch`, die Google-Verifikation als TXT, der CNAME der
CV-Seite und ein CNAME für `autodiscover`.

Wer am DNS arbeitet, prüft MX und SPF zuerst. Die E-Mail ist die einzige
Kontaktmöglichkeit der Seite; fällt sie aus, merkt man es nicht, weil
Anfragen still verschwinden.

## Cloudflare ist vorbereitet, aber nicht aktiv

`wrangler.jsonc` liegt im Repo, das Nitro-Preset ist auf `static`
festgeschrieben, und ein Worker `strainovic-it-ch` existiert im
Cloudflare-Konto. Umgestellt wird erst, wenn Netlify nicht mehr taugt.

Auslöser ist die Umstellung der Altkonten auf Netlifys Guthabenmodell.
Konten von vor dem 04.09.2025 behalten den alten Tarif, dieses fällt
darunter. Im neuen Modell kostet ein Produktions-Deploy 15 von 300
Monats-Credits und ein Gigabyte Traffic 20; beim Überschreiten pausiert
Netlify alle Sites des Kontos, also auch die CV-Seite.

Vorsorglich wechseln lohnt nicht: Workers nehmen eine eigene Domain nur in
einer Cloudflare-Zone an, der Wechsel kostet also einen Nameserverwechsel
von Infomaniak zu Cloudflare und damit den Umzug von MX und SPF.

## Repo ist öffentlich

`gstrainovic/strainovic-it.ch` ist auf GitHub öffentlich und Teil der
Visitenkarte. Was ein Besucher dort sieht, zählt: grüne CI, aktuelle
Lockfiles, ein lesbares README, keine toten Abhängigkeiten. Nichts committen,
was unter Diskretion fällt.
