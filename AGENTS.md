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

Der TXT-Eintrag `google-site-verification` muss bleiben. Darüber hängt die
Search-Console-Property `https://www.strainovic-it.ch/` auf dem Konto
`g.strainovic@gmail.com`. Wird er entfernt, verfällt die Bestätigung.

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

## Was die alte Seite in der Suche eingebracht hat

Gemessen über 16 Monate in der Search Console, Domain-Property
`strainovic-it.ch`:

| Kennzahl | Wert |
|---|---|
| Klicks | 71 |
| Impressionen | 3'353 |
| Klickrate | 2,1 % |
| Durchschnittliche Position | 33,7 |

Von den zehn häufigsten Suchanfragen brachten nur zwei überhaupt Klicks:
der Name „strainovic" drei, „webdesign st gallen" einen. Begriffe wie
„webdesign ausserrhoden" und „webdesign kanton st. gallen" hatten 258 und
226 Impressionen und null Klicks, weil die Seite auf Position 30 und
schlechter stand.

Daraus folgt die inhaltliche Linie: die Webdesign-Begriffe haben nie
getragen, ihr Wegfall kostet nichts. Getragen hat der Name. Die Seite ist
deshalb darauf ausgelegt, eine Namenssuche zu überzeugen, nicht darauf,
Suchbegriffe einzusammeln. Wer das wieder ändern will, bräuchte eigene
Inhaltsseiten und müsste 30 Positionen aufholen.

**Zwei Properties, das ist Absicht.** Leistungsdaten hängen an der
Property-Art. Die Domain-Property `strainovic-it.ch` trägt die Historie
und umfasst jedes Protokoll und jede Subdomain; die URL-Präfix-Property
`https://www.strainovic-it.ch/` dient der URL-Prüfung und den
Indexierungsanträgen. Beide sind über den TXT-Eintrag der Zone bestätigt.

## Open Source ist der überprüfbare Teil

`/open-source/` listet öffentliche eigene Projekte und Beiträge an fremden,
jeweils mit Link. Das ist der einzige Bereich der Seite, den ein Fremder in
Sekunden nachprüfen kann; die Referenzen sind aus gutem Grund anonymisiert
und damit unbelegbar.

Dort stehen nur Arbeiten ohne Kundenbezug. Was zu einem Kunden gehört, bleibt
auf der Referenzseite und in ihrer Form: Branche und Land statt Name.
Welche Repos wozu gehören, steht in
`~/projects/find-jobs/repos/ohne-kundenbezug.md`.

Artikel kommen als Markdown unter `content/open-source/`. Sie sind die
Ausnahme von der Regel, dass die Seite eine Visitenkarte bleibt: einer, der
etwas erklärt, trägt mehr als zehn kurze. Ein Erklärtext zu einem Thema, das
Sicherheitsfirmen besser abdecken, gehört nicht dazu.

## Wartung läuft lokal, nicht über Bots

`scripts/wochencheck.mjs` prüft die Live-Seite, vergleicht den
ausgelieferten Stand mit dem gepushten Commit und sieht die
Abhängigkeiten durch. Ausgelöst wird er einmal pro Woche vom täglichen
Lauf in `~/projects/find-jobs`.

Kein Renovate, kein Dependabot, keine CI mit Statuszeichen. Das Repo ist
öffentlich und Teil der Bewerbung; offene Update-Pull-Requests und ein
rotes Statuszeichen stellen dort Wartungsrückstand aus und sagen damit das
Gegenteil von dem, was die Seite belegen soll. Den Build prüft ohnehin
Netlify bei jedem Push.

Der Check spielt Aktualisierungen innerhalb der Versionsbereiche selbst
ein, aber nur nach grünem Build. Hauptversionen wechselt er nie selbst.

`npm audit` steht im Skript hinten und mit Einordnung. Die Seite liefert
nur Dateien aus, ohne Server und ohne Eingabefelder; ein Fund in einem
Build-Werkzeug erreicht keinen Besucher.

## Kein Porträt

Das vorhandene Bild ist ein hochskalierter Urlaubsausschnitt mit
Weichzeichner und unruhigem Hintergrund. Auf einer Seite, die Sorgfalt
belegen soll, arbeitet es gegen den Zweck. Erst wieder aufnehmen, wenn ein
brauchbares Foto existiert; bis dahin trägt die Typografie die Seite.

## Logo

`public/logo.svg` ist die einzige Quelle: ein «S» mit Terminal-Cursor in
IBM Plex Mono SemiBold, weiss auf dem Akzent `#12489e`. Die Schrift ist in
Pfade umgewandelt, das SVG braucht keinen Webfont. Favicons, App-Icons und
`favicon.ico` erzeugt `scripts/icons.sh` (braucht `resvg` und `magick`).
Nach jeder Änderung am Logo das Skript laufen lassen und die PNG mitcommitten.

## Repo ist öffentlich

`gstrainovic/strainovic-it.ch` ist auf GitHub öffentlich und Teil der
Visitenkarte. Was ein Besucher dort sieht, zählt: grüne CI, aktuelle
Lockfiles, ein lesbares README, keine toten Abhängigkeiten. Nichts committen,
was unter Diskretion fällt.
