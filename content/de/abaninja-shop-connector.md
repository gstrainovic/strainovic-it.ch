---
title: WooCommerce-Bestellungen automatisch in AbaNinja
description: WordPress-Plugin, das jede WooCommerce-Bestellung als Adresse und Rechnung in AbaNinja anlegt, mit Schweizer MWST und exaktem Total. Einmalpreis, kein Abo.
---

# WooCommerce-Bestellungen automatisch in AbaNinja

**Keine Bestellung mehr abtippen.** Sobald eine Bestellung bezahlt ist, legt das
Plugin die Adresse und die Rechnung in AbaNinja an, mit allen Positionen, Versand,
Gebühren und dem richtigen MWST-Satz.

![Einstellungsseite im WordPress-Backend: API-Token, Auslöser, Zahlungsfrist, Protokoll der übertragenen Bestellungen](/img/abaninja-connector-einstellungen.png)

## Was es tut

- Überträgt jede Bestellung, sobald sie «in Bearbeitung» (bezahlt) oder
  «abgeschlossen» ist, im Hintergrund, der Checkout bleibt schnell
- Legt den Kunden als Adresse in AbaNinja an; meldet AbaNinja eine bestehende Adresse
  mit derselben E-Mail, wird diese verwendet, keine Dubletten
- Legt die Rechnung mit allen Positionen an, Preise inklusive MWST, Bestellnummer als
  Referenz; das Total in AbaNinja stimmt auf den Rappen mit dem Shop überein
- Schreibt die AbaNinja-Rechnungsnummer in die Bestellung, jede Bestellung nur einmal;
  bei einem Fehler steht der Grund in der Bestellung, ein Klick überträgt sie erneut
- Fragt nie nach Herr oder Frau: Kunden werden ohne geratene Anrede angelegt

![Bestellnotiz in WooCommerce: AbaNinja-Rechnung RE-0001 angelegt](/img/abaninja-connector-bestellnotiz.png)

## Für wen

Schweizer Onlineshops auf WooCommerce, die ihre Buchhaltung in AbaNinja führen, und
ihre Treuhänder. Die AbaNinja-API ist ab dem Basic-Plan verfügbar, im kostenlosen
Starter-Plan gibt es sie nicht.

## Preis

- **Basis:** 149 CHF einmalig pro Shop, Einrichtung inklusive
- **Treuhänder und Agenturen:** 490 CHF für bis zu 10 Shops

Kein Abo. Zahlung erst, wenn es in Ihrem Shop läuft.

## Bestellen

Die ersten Shops richte ich persönlich ein und prüfe die ersten Rechnungen mit Ihnen
in AbaNinja:

[Bestellen per E-Mail](mailto:info@strainovic-it.ch?subject=Bestellung%20AbaNinja-Shop-Connector&body=Shop%3A%20%0AAbaNinja-Plan%3A%20%0AEtwa%20Bestellungen%20pro%20Monat%3A%20)

Strainovic IT, Steinach SG, seit 2016 Entwicklung für Schweizer KMU und Agenturen.
Weitere Plugins: [KLARA-Shop-Connector](/klara-shop-connector/),
[Rappenrundung für WooCommerce](/rappenrundung/), [Zefix/UID-Check](/zefix-uid-check/).
