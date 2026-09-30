---
title: Rappenrundung für WooCommerce
description: Gratis-Plugin, das das WooCommerce-Total auf 5 Rappen rundet. Die Differenz steht als eigene Position ohne MWST in Warenkorb, Bestellung und Rechnung.
---

# Rappenrundung für WooCommerce

**Totals wie auf jeder Schweizer Rechnung.** WooCommerce rechnet auf den Rappen genau,
darum landen Beträge wie CHF 29.91 in Bestellung, Rechnung und Buchhaltung. Das Plugin
rundet auf 5 Rappen und zeigt die Differenz offen als eigene Zeile.

![Checkout-Block von WooCommerce: Zwischensumme CHF 29.91, Rundung auf 5 Rappen -CHF 0.01, Gesamtsumme CHF 29.90 inklusive CHF 2.24 MWST](/img/rappenrundung-checkout.png)

## Was es tut

- Rundet das Total im Warenkorb und Checkout auf 0.05 CHF, im klassischen Checkout
  und in den Warenkorb- und Checkout-Blöcken
- Die Rundungsdifferenz ist eine eigene Position ohne MWST, die MWST Ihrer Produkte und
  des Versands bleibt genau so, wie WooCommerce sie berechnet
- Stimmt auch mit Gutscheinen, Versand und Gebühren anderer Plugins, weil das Total nach
  jeder Berechnung geprüft wird
- Die Position steht in der Bestellung wie jede Gebühr, damit Rechnungen, Exporte und
  Buchhaltungs-Connectoren dasselbe Total sehen
- Nur aktiv, wenn die Shop-Währung CHF ist; Bezeichnung der Zeile frei wählbar

## Preis

Gratis, im WordPress-Plugin-Verzeichnis:

[Strainovic IT Rappenrundung auf wordpress.org](https://wordpress.org/plugins/strainovic-it-rappenrundung/)

Installation in WordPress unter Plugins → Installieren, nach «Strainovic IT Rappenrundung»
suchen, installieren und aktivieren. Updates kommen automatisch über WordPress.

Hilft Ihnen das Plugin, freue ich mich über eine [Spende](/spenden/).

## Weitere Plugins für Schweizer Shops

- **[KLARA-Shop-Connector](/klara-shop-connector/):** Schluss mit dem Abtippen von
  Bestellungen. Jede bezahlte Bestellung aus WooCommerce oder Shopware landet als Kunde
  und Rechnung in KLARA, mit MWST und demselben gerundeten Total wie im Shop.
- **[AbaNinja-Shop-Connector](/abaninja-shop-connector/):** dasselbe für AbaNinja.
  Adresse und Rechnung entstehen automatisch, Bestandskunden werden an der E-Mail-Adresse
  erkannt.
- **[bexio-Formular-Connector](/bexio-formular-connector/):** Anfragen aus Kontakt- und
  Offertformularen (Contact Form 7, WPForms, Gravity Forms, Elementor) landen als Kontakt
  in bexio, auf Wunsch gleich mit Offerte.
- **[UID-Check](/uid-check/):** prüft die UID von Firmenkunden im Checkout
  beim UID-Register des Bundes, mit bexio-Version für den Nachweis in bexio. Gelöschte
  oder erfundene Firmen kommen nicht zum Rechnungskauf.

Strainovic IT, Steinach SG, seit 2016 Entwicklung für Schweizer KMU und Agenturen.
