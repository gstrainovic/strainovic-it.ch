---
title: Ordini WooCommerce e Shopware automaticamente in KLARA
description: Plugin per WooCommerce e Shopware 6 che crea ogni ordine come cliente e fattura in KLARA, con l’IVA svizzera e l’arrotondamento a 5 centesimi. Prezzo unico, nessun abbonamento.
---

# Ordini WooCommerce automaticamente in KLARA

**Nessun ordine da ribattere.** Appena un ordine è pagato, il plugin crea il cliente
e la fattura in KLARA, con tutte le posizioni, le spese di spedizione, le commissioni
e l’aliquota IVA corretta.

![Pagina delle impostazioni nel backend di WordPress (interfaccia in tedesco): chiave API, attivazione, bozza o registrazione, IBAN, registro degli ordini trasmessi](/img/klara-connector-einstellungen.png)

## Cosa fa

- Trasmette ogni ordine appena passa a «In lavorazione» (pagato) o «Completato»,
  in background: il checkout resta veloce
- Cerca il cliente in KLARA tramite l’indirizzo e-mail e crea i nuovi clienti: le ditte
  svizzere come ditta con persona di contatto, gli altri come persona
- Crea la fattura come bozza o la registra direttamente, con IBAN e termine di pagamento
- Assegna ogni posizione all’aliquota IVA della vostra ditta in KLARA (8,1 %, 2,6 %, 3,8 %),
  arrotondamento a 5 centesimi come in KLARA
- Scrive il numero di fattura KLARA nell’ordine, ogni ordine una sola volta;
  in caso di errore il motivo è indicato nell’ordine e un clic lo ritrasmette

![Nota dell’ordine in WooCommerce (in tedesco): fattura KLARA 2026003 creata, nuovo cliente](/img/klara-connector-bestellnotiz.png)

## Anche per Shopware 6

Lo stesso come plugin Shopware (6.6 e 6.7): la fattura viene creata appena il pagamento
è saldato o l’ordine completato. Numero di fattura e risultato compaiono nei campi
personalizzati dell’ordine.

![Amministrazione Shopware (in tedesco), ordine con i campi personalizzati numero di fattura KLARA, trasmissione e ID fattura](/img/klara-connector-shopware.png)

L’interfaccia del plugin per ora è in tedesco.

## Per chi

Negozi online svizzeri su WooCommerce o Shopware che tengono la contabilità in KLARA.
KLARA stessa non offre un collegamento ai negozi online, una richiesta ricorrente da anni
nella community di KLARA. Seguirà Shopify.

## Prezzo

- **Base:** 149 CHF una tantum per negozio, configurazione inclusa
- **Pro (in sviluppo):** invio della fattura direttamente via e-mail, ePost o eBill,
  stato del pagamento di ritorno nel negozio, note di credito in caso di rimborso
- **Agenzia:** 490 CHF per un massimo di 10 negozi

Nessun abbonamento. Pagamento solo quando funziona nel vostro negozio.

## Ordinare

La prima versione gira nel mio ambiente di test. I primi negozi li configuro
personalmente e controllo con voi le prime fatture in KLARA:

[Ordinare via e-mail](mailto:info@strainovic-it.ch?subject=Ordine%20connettore%20KLARA&body=Negozio%3A%20%0AOrdini%20al%20mese%20circa%3A%20%0ABozza%20o%20registrazione%20diretta%3F%20)

Strainovic IT, Steinach SG, sviluppo per PMI e agenzie svizzere dal 2016.
Altri plugin: [Zefix/controllo IDI](/it/zefix-uid-check/) per i clienti aziendali nel checkout,
[connettore moduli bexio](/it/bexio-formular-connector/) per le richieste dal sito in bexio.
