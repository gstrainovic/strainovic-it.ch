---
title: Zefix/controllo IDI per WooCommerce e i moduli WordPress
description: Plugin WordPress che verifica il numero IDI svizzero nel checkout e nei moduli e compila ragione sociale e indirizzo da Zefix. Preordine, pagamento alla consegna.
---

# Zefix/controllo IDI per WooCommerce e i moduli WordPress

**Clienti aziendali verificati in pochi secondi.** Il cliente inserisce il suo numero
IDI, il plugin lo verifica presso la Confederazione, recupera ragione sociale e indirizzo
da Zefix e compila il modulo. Ditte inesistenti o cancellate non arrivano nemmeno
all’acquisto su fattura.

![Checkout WooCommerce con campo IDI (in tedesco): il numero inserito non è iscritto nel registro IDI, l’ordine viene rifiutato](/img/uid-check-checkout-fehler.png)

## Cosa fa

- Campo IDI nel checkout WooCommerce e nei moduli di contatto, di offerta e di
  registrazione (Contact Form 7, WPForms, Gravity Forms, Elementor Forms)
- Cifra di controllo e formato subito, stato «attivo» o «cancellato» tramite il
  servizio web IDI della Confederazione
- Ragione sociale, forma giuridica, sede e indirizzo da Zefix, automaticamente nel modulo
- Iscrizione IVA visibile, numero IDI salvato nell’ordine e nel conto cliente
- Acquisto su fattura solo per ditte valide
- Avviso di mutazione: cliente cancellato o trasferito, lo sapete per primi

L’interfaccia del plugin per ora è in tedesco.

## Per chi

Negozi online svizzeri con clienti aziendali, negozi B2B con acquisto su fattura,
agenzie con molti clienti WooCommerce. Non sostituisce una verifica della solvibilità,
ma è il passo che la precede e che oggi si fa a mano, o non si fa affatto.

## Prezzo

- **Base:** gratuito nella directory dei plugin di WordPress (cifra di controllo, stato attivo/cancellato)
- **Pro:** 79 CHF all’anno per sito, 199 CHF all’anno per agenzie con un massimo di 10 siti
  (compilazione da Zefix, stato IVA, abilitazione dell’acquisto su fattura, avviso di mutazione)

## Preordinare

Sviluppo a partire dal primo ordine. Consegna quattro settimane dopo il vostro ordine,
pagate solo alla consegna. Scrivetemi quale negozio gestite e cosa manca oggi nel checkout:

[Preordinare via e-mail](mailto:info@strainovic-it.ch?subject=Preordine%20Zefix%2Fcontrollo%20IDI&body=URL%20del%20negozio%3A%20%0APlugin%20per%20moduli%20o%20WooCommerce%3A%20%0ACosa%20deve%20risolvere%20il%20plugin%20da%20voi%3F%20)

Strainovic IT, Steinach SG, sviluppo per negozi online e agenzie svizzere dal 2016.
Secondo plugin in preordine: [connettore moduli bexio](/it/bexio-formular-connector/), le richieste dal sito direttamente in bexio.
