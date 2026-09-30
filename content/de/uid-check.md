---
title: UID-Check für WooCommerce und bexio
description: WordPress-Plugin, das die Schweizer UID im WooCommerce-Checkout und in Contact Form 7 beim UID-Register des Bundes prüft. Mit bexio-Version, die das Prüfergebnis als Kontakt und Notiz an bexio übergibt.
---

# UID-Check für WooCommerce und bexio

**Firmenkunden im Checkout geprüft.** Der Kunde tippt seine UID ein, das Plugin prüft
sie beim UID-Register des Bundes. Falsche oder gelöschte Firmen kommen gar nicht erst
zum Rechnungskauf.

![WooCommerce-Checkout mit UID-Feld: die eingegebene UID ist nicht im UID-Register eingetragen, die Bestellung wird abgelehnt](/img/uid-check-checkout-fehler.png)

## Was es tut

- UID-Feld im WooCommerce-Checkout (klassisch und Checkout-Block) und Prüfung in
  Contact Form 7
- Format und Prüfziffer sofort, Status «aktiv» oder «gelöscht» über den
  UID-Webservice des Bundes
- UID in einheitlicher Schreibweise an der Bestellung gespeichert
- Ist das UID-Register nicht erreichbar, blockiert das Plugin keine Bestellung mit
  korrekter Prüfziffer
- Getestet mit Germanized für WooCommerce (Gratisversion 4.1.4): UID-Feld, Prüfung und
  Bestellung laufen wie ohne. Mit Germanized Pro noch nicht getestet.

## Für wen

Schweizer Onlineshops mit Firmenkunden, B2B-Shops mit Rechnungskauf, Agenturen mit
vielen WooCommerce-Kunden. Kein Ersatz für eine Bonitätsprüfung, aber der Schritt
davor, der heute von Hand passiert oder gar nicht.

## UID-Check für bexio

Für Shops, die ihre Kunden in bexio führen: Jede Firmenbestellung kommt mit geprüfter
UID und Nachweis in bexio an.

<video controls preload="metadata" poster="/video/uid-check-bexio-de-poster.jpg" width="1920" height="1080" style="width: 100%; height: auto;">
  <source src="/video/uid-check-bexio-de.mp4" type="video/mp4">
  Ihr Browser kann das Video nicht abspielen.
</video>

[Video auf YouTube ansehen](https://www.youtube.com/watch?v=A-6uZaViTn4)

- Fragt das UID-Register bei jeder Bestellung neu ab und speichert das Ergebnis mit
  Zeitpunkt an der Bestellung
- Sucht den Kunden in bexio über die E-Mail-Adresse oder legt ihn als Firma mit den
  Daten aus dem UID-Register an
- Ergänzt den Kontakt um eine Notiz mit Prüfergebnis und Zeitpunkt der Abfrage, als
  Nachweis zur Bestellung
- Übergibt im Hintergrund, ein Fehler blockiert den Checkout nie, die Übergabe wird
  automatisch wiederholt
- Einrichtung mit einem Klick auf «Mit bexio verbinden», ohne eigene bexio-App
- Kunden- und Bestelldaten gehen direkt vom Shop zu bexio, mein Verbindungsdienst
  übernimmt nur die Anmeldung bei bexio

## Preis

- **UID-Check Schweiz, gratis:** Prüfziffer und Status aktiv/gelöscht im Checkout.
  Im [WordPress-Plugin-Verzeichnis](https://wordpress.org/plugins/strainovic-uid-check-schweiz/). Hilft es Ihnen: [Spenden](/spenden/).
- **UID-Check für bexio:** 30 Tage gratis testen, danach 79 CHF pro Jahr und Shop
  (Agenturen: 199 CHF pro Jahr für bis zu 10 Shops). Alles aus der Gratis-Version,
  dazu das Prüfergebnis mit Zeitstempel an jeder Bestellung und die Übergabe als
  Kontakt mit Notiz an bexio.
- **Mehr gewünscht?** Zum Beispiel Angaben aus dem Handelsregister (Zefix) wie Zweck
  oder Zeichnungsberechtigte, Firmenname und Adresse automatisch ausfüllen,
  MWST-Status anzeigen, Rechnungskauf nur für gültige Firmen, Warnung bei gelöschten
  Kunden. Schreiben Sie mir, was Ihr Shop braucht.

[Gratis testen – schreiben Sie mir die Adresse Ihres Shops](mailto:info@strainovic-it.ch?subject=UID-Check%20f%C3%BCr%20bexio%20testen&body=Shop-URL%3A%20)

Strainovic IT, Steinach SG, seit 2016 Entwicklung für Schweizer Shops und Agenturen.
Weiteres Plugin: [bexio-Formular-Connector](/bexio-formular-connector/), Website-Anfragen direkt in bexio.
