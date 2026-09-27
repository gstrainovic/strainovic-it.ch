# todo.md

Die Seite ist live. Geltende Regeln und Hintergrund stehen in `AGENTS.md`.

- [ ] In einigen Tagen in der Search Console nachsehen, ob die vier Seiten
      indexiert sind und die Weiterleitungen der alten Adressen verarbeitet
      wurden. Die Sitemap ist eingereicht und gelesen.
- [ ] Mail-Authentifizierung: DMARC ist seit 27.09.2026 mit `p=none` gesetzt (Berichte an
      info@), SPF auf `~all`. Am 28.09. eine Testmail an Gmail schicken und prüfen, dass
      `dmarc=pass` im Header steht; ab 04.10. auf `p=quarantine` verschärfen, wenn die
      DMARC-Berichte nur Infomaniak als Absender zeigen. DNS im Infomaniak-Manager
      (Domain strainovic-it.ch → DNS-Zone), der API-Token hat keine DNS-Rechte.
