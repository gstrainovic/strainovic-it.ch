# todo.md

Gearbeitet wird auf dem Branch `neubau`. Rahmen und Regeln stehen in
`AGENTS.md`.

## Vor dem Umschalten der Domain

- [ ] Impressum und Datenschutz juristisch gegenlesen lassen. Beide Texte
      sind neu geschrieben und beschreiben, was die Seite tatsächlich tut.
- [ ] Entscheiden, ob die UID `CHE-311.771.818` im Impressum bleibt. Der
      Handelsregistereintrag ist gelöscht, die UID stammt aus einem anderen
      Register und ist davon unabhängig.
- [ ] In der Search Console prüfen, ob auf `/en`, `/en/about`, `/en/contact`
      und `/en/privacy-policy` Traffic ankommt. Die Weiterleitungen stehen,
      die Zahl entscheidet nur, wie sorgfältig das beobachtet werden muss.

## Cloudflare Pages

- [ ] Projekt anlegen und mit `gstrainovic/strainovic-it.ch` verbinden.
      Build-Befehl `npm run generate`, Ausgabeverzeichnis `.output/public`,
      Branch zunächst `neubau`.
- [ ] Auf der Vorschau-URL prüfen: alle sechs Seiten, der Schalter für hell
      und dunkel, die Weiterleitungen, `sitemap.xml` und `robots.txt`.
- [ ] `www.strainovic-it.ch` und die nackte Domain auf Cloudflare umhängen.
- [ ] Netlify-Site für die Hauptdomain abschalten. Die CV-Site auf Netlify
      bleibt bestehen.
- [ ] In der Search Console die neue Sitemap einreichen.

## Danach

- [ ] Renovate einrichten, dazu eine CI, die den Build und die internen
      Links prüft.
- [ ] Kein Porträt. Das vorhandene Bild ist ein hochskalierter
      Urlaubsausschnitt mit Weichzeichner. Erst wieder aufnehmen, wenn ein
      brauchbares Foto existiert.
- [ ] *Erwägen:* ein einziges Schema, das eine echte Integration zeigt, etwa
      Warenwirtschaft, Dienst dazwischen, ERP. Wäre die einzige Grafik der
      Seite und würde vorführen, was verkauft wird.
- [ ] *Erwägen:* `llms.txt` beobachten. Die Datei liegt bereit, die
      Konvention ist aber ein Vorschlag ohne gesicherte Verbreitung.

## Anderes Repo

- [ ] In `~/projects/find-jobs/TODO.md` den Punkt „strainovic-it.ch neu
      bauen" streichen. Er schlägt Hugo oder reines HTML vor, gebaut ist
      Nuxt 4.
