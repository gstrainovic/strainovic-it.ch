# todo.md

Die Seite ist live. Geltende Regeln und Hintergrund stehen in `AGENTS.md`.

- [ ] Search Console (URL-Prüfung): sind `/klara-shop-connector/`, `/abaninja-shop-connector/`
      und `/rappenrundung/` auf Google? Indexierung ist beantragt, die Sitemap mit allen
      13 Seiten neu eingereicht. Falls nach zwei Wochen noch «nicht auf Google»: erneut beantragen.
- [ ] Mail-Authentifizierung: DMARC ist seit 27.09.2026 mit `p=none` gesetzt (Berichte an
      info@), SPF auf `~all`. Am 28.09. eine Testmail an Gmail schicken und prüfen, dass
      `dmarc=pass` im Header steht; ab 04.10. auf `p=quarantine` verschärfen, wenn die
      DMARC-Berichte nur Infomaniak als Absender zeigen. DNS im Infomaniak-Manager
      (Domain strainovic-it.ch → DNS-Zone), der API-Token hat keine DNS-Rechte.
