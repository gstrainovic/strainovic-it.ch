---
title: Ordini WooCommerce automaticamente in AbaNinja
description: Plugin WordPress che crea ogni ordine WooCommerce come indirizzo e fattura in AbaNinja, con l’IVA svizzera e un totale esatto. 149 CHF per negozio all’anno, configurazione inclusa.
---

# Ordini WooCommerce automaticamente in AbaNinja

**Nessun ordine da ribattere.** Appena un ordine è pagato, il plugin crea l’indirizzo
e la fattura in AbaNinja, con tutte le posizioni, le spese di spedizione, le commissioni
e l’aliquota IVA corretta.

![Pagina delle impostazioni nel backend di WordPress: token API, attivazione, termine di pagamento, registro degli ordini trasmessi](/img/abaninja-connector-einstellungen-it.png)

## Cosa fa

- Trasmette ogni ordine appena passa a «In lavorazione» (pagato) o «Completato»,
  in background: il checkout resta veloce
- Crea il cliente come indirizzo in AbaNinja; se AbaNinja segnala un indirizzo esistente
  con la stessa e-mail, usa quello, senza doppioni
- Crea la fattura con tutte le posizioni, prezzi IVA inclusa, numero d’ordine come
  riferimento; il totale in AbaNinja corrisponde al centesimo a quello del negozio
- Scrive il numero di fattura AbaNinja nell’ordine, ogni ordine una sola volta;
  in caso di errore il motivo è indicato nell’ordine e un clic lo ritrasmette
- Non chiede mai Signor o Signora: i clienti vengono creati senza appellativo indovinato

![Note dell’ordine in WooCommerce: fattura AbaNinja RE-0001 creata, ordine già presente in AbaNinja](/img/abaninja-connector-bestellnotiz-it.png)

## Per chi

Negozi online svizzeri su WooCommerce che tengono la contabilità in AbaNinja, e le loro
fiduciarie. L’API di AbaNinja è disponibile dal piano Basic, il piano gratuito Starter
non la offre.

## Prezzo

- **Base:** 149 CHF per negozio all’anno, aggiornamenti e supporto inclusi; configurazione inclusa il primo anno
- **Fiduciarie e agenzie:** 490 CHF all’anno per un massimo di 10 negozi

Disdicibile ogni anno. Il primo anno si paga solo quando funziona nel vostro negozio.

## Ordinare

I primi negozi li configuro personalmente e controllo con voi le prime fatture in AbaNinja:

[Ordinare via e-mail](mailto:info@strainovic-it.ch?subject=Ordine%20connettore%20AbaNinja&body=Negozio%3A%20%0APiano%20AbaNinja%3A%20%0AOrdini%20al%20mese%20circa%3A%20)

Strainovic IT, Steinach SG, sviluppo per PMI e agenzie svizzere dal 2016.
Altri plugin: [connettore negozio KLARA](/it/klara-shop-connector/),
[arrotondamento a 5 centesimi per WooCommerce](/it/rappenrundung/), [Controllo IDI](/it/zefix-uid-check/).
