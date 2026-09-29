---
title: Arrotondamento a 5 centesimi per WooCommerce
description: Plugin gratuito che arrotonda il totale di WooCommerce a 5 centesimi. La differenza compare come voce separata senza IVA nel carrello, nell’ordine e nella fattura.
---

# Arrotondamento a 5 centesimi per WooCommerce

**Totali come su ogni fattura svizzera.** WooCommerce calcola al centesimo, per questo
importi come CHF 29.91 finiscono nell’ordine, nella fattura e nella contabilità. Il plugin
arrotonda a 5 centesimi e mostra la differenza apertamente su una riga separata.

![Blocco checkout di WooCommerce: subtotale CHF 29.91, arrotondamento -CHF 0.01, totale CHF 29.90 con IVA di CHF 2.24 inclusa](/img/rappenrundung-checkout-it.png)

## Cosa fa

- Arrotonda il totale nel carrello e nel checkout a 0.05 CHF, nel checkout classico
  e nei blocchi carrello e checkout
- La differenza di arrotondamento è una voce separata senza IVA; l’IVA dei vostri prodotti
  e della spedizione resta esattamente quella calcolata da WooCommerce
- Funziona anche con buoni, spedizione e commissioni di altri plugin, perché il totale
  viene verificato dopo ogni calcolo
- La voce compare nell’ordine come ogni commissione, così fatture, esportazioni e
  connettori contabili vedono lo stesso totale
- Attivo solo se la valuta del negozio è il CHF; denominazione della riga a scelta

## Prezzo

Gratuito, senza registrazione:

[Scaricare il plugin (ZIP, versione 0.4.0)](https://www.strainovic-it.ch/downloads/strainovic-it-rappenrundung-0.4.0.zip)

Installazione in WordPress da Plugin → Aggiungi nuovo → Carica plugin. Il plugin sarà
pubblicato nella directory di WordPress, poi gli aggiornamenti arriveranno automaticamente.
Fino ad allora vi informo volentieri sulle nuove versioni:
[Ricevere gli aggiornamenti via e-mail](mailto:info@strainovic-it.ch?subject=Aggiornamenti%20arrotondamento%205%20centesimi).

## Altri plugin per negozi svizzeri

- **[Connettore negozio KLARA](/it/klara-shop-connector/):** basta ricopiare gli ordini.
  Ogni ordine pagato in WooCommerce o Shopware arriva in KLARA come cliente e fattura,
  con l’IVA e lo stesso totale arrotondato del negozio.
- **[Connettore negozio AbaNinja](/it/abaninja-shop-connector/):** lo stesso per AbaNinja.
  Indirizzo e fattura vengono creati automaticamente, i clienti esistenti sono riconosciuti
  dall’indirizzo e-mail.
- **[Connettore moduli bexio](/it/bexio-formular-connector/):** le richieste dai moduli di
  contatto e di offerta (Contact Form 7, WPForms, Gravity Forms, Elementor) arrivano in
  bexio come contatto, su richiesta già con un’offerta.
- **[Controllo IDI](/it/uid-check/):** verifica l’IDI dei clienti aziendali nel
  checkout presso il registro IDI della Confederazione, con una versione bexio per la
  prova in bexio. Le ditte cancellate o inventate non arrivano all’acquisto su fattura.

Strainovic IT, Steinach SG, sviluppo per PMI e agenzie svizzere dal 2016.
