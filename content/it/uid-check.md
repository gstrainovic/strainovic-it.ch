---
title: Controllo IDI per WooCommerce e bexio
description: Plugin WordPress che verifica il numero IDI svizzero nel checkout WooCommerce e in Contact Form 7 presso il registro IDI della Confederazione. Con una versione bexio che trasmette l’esito a bexio come contatto e nota.
---

# Controllo IDI per WooCommerce e bexio

**Clienti aziendali verificati nel checkout.** Il cliente inserisce il suo numero IDI,
il plugin lo verifica presso il registro IDI della Confederazione. Ditte inesistenti o
cancellate non arrivano nemmeno all’acquisto su fattura.

![Checkout WooCommerce con campo IDI: il numero inserito non è iscritto nel registro IDI, l’ordine viene rifiutato](/img/uid-check-checkout-fehler-it.png)

## Cosa fa

- Campo IDI nel checkout WooCommerce (classico e checkout a blocchi) e verifica in
  Contact Form 7
- Formato e cifra di controllo subito, stato «attivo» o «cancellato» tramite il
  servizio web IDI della Confederazione
- Numero IDI salvato nell’ordine, sempre nella stessa grafia
- Se il registro IDI non è raggiungibile, il plugin non blocca nessun ordine con cifra
  di controllo corretta

## Per chi

Negozi online svizzeri con clienti aziendali, negozi B2B con acquisto su fattura,
agenzie con molti clienti WooCommerce. Non sostituisce una verifica della solvibilità,
ma è il passo che la precede e che oggi si fa a mano, o non si fa affatto.

## Controllo IDI per bexio

Per i negozi che gestiscono i loro clienti in bexio: ogni ordine aziendale arriva in
bexio con numero IDI verificato e prova.

<video controls preload="metadata" poster="/video/uid-check-bexio-it-poster.jpg" width="1920" height="1080" style="width: 100%; height: auto;">
  <source src="/video/uid-check-bexio-it.mp4" type="video/mp4">
  Il vostro browser non può riprodurre questo video.
</video>

- Interroga di nuovo il registro IDI a ogni ordine e salva l’esito con l’ora
  nell’ordine
- Cerca il cliente in bexio tramite l’indirizzo e-mail o lo crea come impresa con i
  dati del registro IDI
- Completa il contatto con una nota con l’esito della verifica e l’ora della
  richiesta, come prova per l’ordine
- Trasmette in background, un errore non blocca mai il checkout, la trasmissione
  viene ripetuta automaticamente
- Configurazione con un clic su «Connetti a bexio», senza un’app bexio propria
- I dati dei clienti e degli ordini vanno direttamente dal negozio a bexio, il mio
  servizio di connessione si occupa solo dell’accesso a bexio

## Prezzo

- **Controllo IDI Svizzera, gratuito:** cifra di controllo e stato attivo/cancellato
  nel checkout. Presto nella directory dei plugin di WordPress. Se vi è utile: [donazioni](/it/spenden/).
- **Controllo IDI per bexio:** 30 giorni di prova gratuita, poi 79 CHF all’anno per
  negozio (agenzie: 199 CHF all’anno per un massimo di 10 negozi). Tutto quello che
  offre la versione gratuita, più l’esito con data e ora in ogni ordine e la
  trasmissione a bexio come contatto con nota.
- **Serve di più?** Ad esempio dati del registro di commercio (Zefix) come scopo o
  persone con diritto di firma, compilazione automatica di ragione sociale e
  indirizzo, stato IVA, acquisto su fattura solo per ditte valide, avviso quando un
  cliente viene cancellato. Scrivetemi di cosa ha bisogno il vostro negozio.

[Prova gratuita – scrivetemi l’indirizzo del vostro negozio](mailto:info@strainovic-it.ch?subject=Prova%20Controllo%20IDI%20per%20bexio&body=URL%20del%20negozio%3A%20)

Strainovic IT, Steinach SG, sviluppo per negozi online e agenzie svizzere dal 2016.
Altro plugin: [connettore moduli bexio](/it/bexio-formular-connector/), le richieste dal sito direttamente in bexio.
