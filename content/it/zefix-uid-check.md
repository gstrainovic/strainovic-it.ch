---
title: Zefix/controllo IDI per WooCommerce e i moduli WordPress
description: Plugin WordPress che verifica il numero IDI svizzero nel checkout e nei moduli e compila ragione sociale e indirizzo da Zefix. Preordine, pagamento alla consegna.
---

# Zefix/controllo IDI per WooCommerce e i moduli WordPress

**Clienti aziendali verificati in pochi secondi.** Il cliente inserisce il suo numero
IDI, il plugin lo verifica presso la Confederazione, recupera ragione sociale e indirizzo
da Zefix e compila il modulo. Ditte inesistenti o cancellate non arrivano nemmeno
all’acquisto su fattura.

![Checkout WooCommerce con campo IDI: il numero inserito non è iscritto nel registro IDI, l’ordine viene rifiutato](/img/uid-check-checkout-fehler-it.png)

## Cosa fa

- Campo IDI nel checkout WooCommerce e nei moduli di contatto, di offerta e di
  registrazione (Contact Form 7, WPForms, Gravity Forms, Elementor Forms)
- Cifra di controllo e formato subito, stato «attivo» o «cancellato» tramite il
  servizio web IDI della Confederazione
- Ragione sociale, forma giuridica, sede e indirizzo da Zefix, automaticamente nel modulo
- Iscrizione IVA visibile, numero IDI salvato nell’ordine e nel conto cliente
- Acquisto su fattura solo per ditte valide
- Avviso di mutazione: cliente cancellato o trasferito, lo sapete per primi

## Per chi

Negozi online svizzeri con clienti aziendali, negozi B2B con acquisto su fattura,
agenzie con molti clienti WooCommerce. Non sostituisce una verifica della solvibilità,
ma è il passo che la precede e che oggi si fa a mano, o non si fa affatto.

## Strainovic UID Check per bexio

La prima versione Pro è pronta: un plugin WooCommerce per i negozi che gestiscono i
loro clienti in bexio. Ogni ordine aziendale arriva in bexio con numero IDI verificato
e prova.

<video controls preload="metadata" poster="/video/uid-check-bexio-poster.jpg" width="1920" height="1080" style="width: 100%; height: auto;">
  <source src="/video/uid-check-bexio.mp4" type="video/mp4">
  Il vostro browser non può riprodurre questo video.
</video>

*Video in tedesco, con il negozio di prova e il plugin in versione tedesca.*

- Verifica il numero IDI nel checkout presso il registro IDI della Confederazione, i
  numeri cancellati o errati vengono rifiutati nel checkout
- Cerca il cliente in bexio tramite l’indirizzo e-mail o lo crea come impresa con i
  dati del registro IDI
- Completa il contatto con una nota con l’esito della verifica e l’ora della
  richiesta, come prova per l’ordine
- Trasmette in background, un errore non blocca mai il checkout, la trasmissione
  viene ripetuta automaticamente
- Configurazione con un clic su «Connetti a bexio», senza un’app bexio propria
- I dati dei clienti e degli ordini vanno direttamente dal negozio a bexio, il mio
  servizio di connessione si occupa solo dell’accesso a bexio

**30 giorni di prova gratuita, poi 79 CHF all’anno per negozio.** Scrivetemi
l’indirizzo del vostro negozio:

[Provare gratis via e-mail](mailto:info@strainovic-it.ch?subject=Prova%20Strainovic%20UID%20Check%20per%20bexio&body=URL%20del%20negozio%3A%20)

## Prezzo

- **UID Check per bexio:** 30 giorni di prova gratuita, poi 79 CHF all’anno per negozio
- **Base:** gratuito nella directory dei plugin di WordPress (cifra di controllo, stato attivo/cancellato)
- **Pro:** 79 CHF all’anno per sito, 199 CHF all’anno per agenzie con un massimo di 10 siti
  (compilazione da Zefix, stato IVA, abilitazione dell’acquisto su fattura, avviso di mutazione)

## Preordinare

Sviluppo a partire dal primo ordine. Consegna quattro settimane dopo il vostro ordine,
pagate solo alla consegna. Scrivetemi quale negozio gestite e cosa manca oggi nel checkout:

[Preordinare via e-mail](mailto:info@strainovic-it.ch?subject=Preordine%20Zefix%2Fcontrollo%20IDI&body=URL%20del%20negozio%3A%20%0APlugin%20per%20moduli%20o%20WooCommerce%3A%20%0ACosa%20deve%20risolvere%20il%20plugin%20da%20voi%3F%20)

Strainovic IT, Steinach SG, sviluppo per negozi online e agenzie svizzere dal 2016.
Secondo plugin in preordine: [connettore moduli bexio](/it/bexio-formular-connector/), le richieste dal sito direttamente in bexio.
