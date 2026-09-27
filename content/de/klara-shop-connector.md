---
title: WooCommerce- und Shopware-Bestellungen automatisch in KLARA
description: Plugin für WooCommerce und Shopware 6, das jede Bestellung als Kunde und Rechnung in KLARA anlegt, mit Schweizer MWST und 5-Rappen-Rundung. Einmalpreis, kein Abo.
---

# WooCommerce-Bestellungen automatisch in KLARA

**Keine Bestellung mehr abtippen.** Sobald eine Bestellung bezahlt ist, legt das
Plugin den Kunden und die Rechnung in KLARA an, mit allen Positionen, Versand,
Gebühren und dem richtigen MWST-Satz.

![Einstellungsseite im WordPress-Backend: API-Schlüssel, Auslöser, Entwurf oder Buchung, IBAN, Protokoll der übertragenen Bestellungen](/img/klara-connector-einstellungen.png)

## Was es tut

- Überträgt jede Bestellung, sobald sie «in Bearbeitung» (bezahlt) oder
  «abgeschlossen» ist, im Hintergrund, der Checkout bleibt schnell
- Sucht den Kunden in KLARA über die E-Mail-Adresse, legt neue Kunden an: Schweizer
  Firmen als Firma mit Ansprechperson, sonst als Person
- Legt die Rechnung als Entwurf an oder bucht sie direkt, mit IBAN und Zahlungsfrist
- Ordnet jede Position dem MWST-Satz Ihrer KLARA-Firma zu (8.1 %, 2.6 %, 3.8 %),
  Rundung auf 5 Rappen wie in KLARA
- Schreibt die KLARA-Rechnungsnummer in die Bestellung, jede Bestellung nur einmal;
  bei einem Fehler steht der Grund in der Bestellung, ein Klick überträgt sie erneut

![Bestellnotiz in WooCommerce: KLARA-Rechnung 2026003 angelegt, neuer Kunde](/img/klara-connector-bestellnotiz.png)

## Auch für Shopware 6

Dasselbe als Shopware-Plugin (6.6 und 6.7): Die Rechnung entsteht, sobald die Zahlung
bezahlt oder die Bestellung abgeschlossen ist. Rechnungsnummer und Ergebnis stehen in
den Zusatzfeldern der Bestellung.

![Shopware-Administration, Bestellung mit den Zusatzfeldern KLARA-Rechnungsnummer, Übertragung und Rechnungs-ID](/img/klara-connector-shopware.png)

## Für wen

Schweizer Onlineshops auf WooCommerce oder Shopware, die ihre Buchhaltung in KLARA
führen. KLARA selbst bietet keine Shop-Anbindung an, seit Jahren gewünscht in der
KLARA-Community. Shopify folgt.

## Preis

- **Basis:** 149 CHF einmalig pro Shop, Einrichtung inklusive
- **Pro (in Arbeit):** Rechnung direkt per E-Mail, ePost oder eBill versenden,
  Zahlungsstatus zurück in den Shop, Gutschriften bei Rückerstattung
- **Agentur:** 490 CHF für bis zu 10 Shops

Kein Abo. Zahlung erst, wenn es in Ihrem Shop läuft.

## Bestellen

Die erste Version läuft in meiner Testumgebung. Die ersten Shops richte ich
persönlich ein und prüfe die ersten Rechnungen mit Ihnen in KLARA:

[Bestellen per E-Mail](mailto:info@strainovic-it.ch?subject=Bestellung%20KLARA-Shop-Connector&body=Shop%3A%20%0AEtwa%20Bestellungen%20pro%20Monat%3A%20%0AEntwurf%20oder%20direkt%20buchen%3F%20)

Strainovic IT, Steinach SG, seit 2016 Entwicklung für Schweizer KMU und Agenturen.
Weitere Plugins: [Zefix/UID-Check](/zefix-uid-check/) für Firmenkunden im Checkout,
[bexio-Formular-Connector](/bexio-formular-connector/) für Website-Anfragen in bexio.
