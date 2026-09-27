---
title: Fotografare la fattura, verificare i dati
description: Come Wartungsheft legge le fatture dell’officina con Mistral. Due fasi invece di una, controllo nel codice, e perché nulla viene salvato prima che qualcuno l’abbia visto.
---

# Fotografare la fattura, verificare i dati

[Wartungsheft](https://wartungsheft.ch) è una web app per il libretto di
manutenzione delle auto, realizzata con Vue 3 come PWA installabile. Il cuore è
una foto: si fotografa la fattura dell’officina e l’app ne estrae officina,
data, chilometraggio, importo e posizioni. Dalle posizioni nascono gli
interventi di manutenzione, e dagli interventi l’app calcola che cosa scade
dopo.

Sembra una chiamata API. In pratica è una catena in cui il modello linguistico
è solo un anello. Questo articolo descrive quali anelli si sono aggiunti e
perché.

## Due fasi invece di una

Con Document Annotation, Mistral offre una via in una sola fase: entra
l’immagine, esce JSON strutturato. L’ho integrata per prima e l’ho verificata
con nove immagini di fatture reali. Una su nove è tornata corretta. Per le
altre il modello inventava importi che non comparivano su nessuna fattura.

La via rimasta ha due fasi. Prima `mistral-ocr-latest` legge l’immagine e
restituisce Markdown, tabelle comprese. Poi un modello di chat riceve solo
questo testo, non l’immagine, e con esso compila uno schema. Con le stesse nove
immagini, tutte e nove erano corrette.

```ts
const { object } = await withRetry(() => generateObject({
  model,
  maxRetries: 0,
  temperature: 0,
  schema,
  messages: [{
    role: 'user',
    content: `${prompt}\n\n--- OCR-TEXT DES DOKUMENTS ---\n${ocrText}`,
  }],
}))
```

Lo schema è un oggetto Zod tramite il Vercel AI SDK. La categoria di una
posizione è uno `z.enum` con i tipi di manutenzione dell’app. Il modello quindi
non può inventare «Motorservice» dove l’app conosce `inspektion`.
`temperature: 0` non rende le risposte corrette, ma ripetibili, ed è l’unico
modo per osservare un errore due volte.

`maxRetries: 0` c’è perché altrimenti l’SDK ripete da sé due volte, in aggiunta
al `withRetry` interno. Queste ripetizioni silenziose esaurivano il rate limit.

L’OCR è la parte costosa e lenta. Il suo risultato viene messo in cache sotto
lo SHA-256 dell’immagine, in memoria e nel database. Se la stessa foto viene
analizzata di nuovo, per esempio dopo un errore, l’OCR non la legge una
seconda volta.

## Il prompt conosce la Svizzera

La maggior parte degli errori della seconda fase non erano errori di lettura.
Il modello leggeva correttamente e assegnava in modo sbagliato. Il prompt è
quindi un elenco di distinzioni che una persona in Svizzera fa senza pensarci:

- «SG 218574» è una targa di San Gallo, non un numero di telaio. Quello ha
  17 caratteri.
- Se sulla fattura c’è una data di riparazione, conta quella, non la data
  della fattura. Il libretto di manutenzione ha bisogno del giorno del lavoro.
- «Fr.» e un importo senza valuta significano CHF. EUR solo se è scritto.
- «1 014.80» è un numero con lo spazio delle migliaia, non due numeri.

Con la licenza di circolazione è lo stesso. I campi sono numerati e
intestati in quattro lingue. Il prompt nomina i quattro campi che contano: 15
targa, 21 marca e tipo, 23 numero di telaio, 36 prima messa in circolazione. E
dice esplicitamente che il numero di matricola (campo 18) e l’approvazione del
tipo (campo 24) non sono numeri di telaio.

## Che cosa verifica il codice

Un prompt è una richiesta. Ciò che si può verificare lo verifica quindi il
codice, in funzioni pure con unit test.

**Posizioni contro il totale.** Su molte fatture ci sono più righe di
descrizione sopra un’unica riga di lavoro:

```
Auspuff reparieren
Auto auf Ölverlust kontrollieren
Arbeit 1.50 Std.   130.00   195.00
```

Il modello attaccava i 195 franchi a ogni riga. Su una fattura reale ne sono
risultate quattro posizioni da 195 franchi ciascuna, in tutto 844.40 a fronte
di un totale di 280.40. Il prompt ora spiega il caso. In più `repairItems`
ricalcola: se la somma delle posizioni supera il totale di più di un franco,
unisce le posizioni consecutive con lo stesso importo. Mantiene però l’unione
solo se poi la somma torna. Altrimenti il modulo mostra un avviso e non
tira a indovinare oltre.

**Categorie per parola chiave.** Un elenco di espressioni regolari sovrascrive
l’assegnazione del modello quando la descrizione è univoca. «Auspuff
reparieren» è `auspuff`, qualunque cosa pensi il modello. Vince la prima
corrispondenza, l’ordine è voluto: «Service mit Ölwechsel» diventa
`oelwechsel`, perché la regola più precisa sta prima di quella generale per le
ispezioni.

**Fatture doppie.** La stessa fattura arriva spesso due volte, una volta come
foto e più tardi nel PDF cumulativo dell’officina. È considerata doppia una
fattura con lo stesso importo al centesimo e una data distante al massimo 14
giorni. Il nome dell’officina di proposito non lo confronto: l’OCR lo scrive in
modo troppo disomogeneo, e i 14 giorni intercettano le fatture su cui una volta
è stata letta la data di riparazione e una volta quella della fattura.

**La targa.** Se è sulla fattura, l’app la assegna al veicolo corrispondente,
anche se in quel momento ne è aperto un altro. Grafie come «SG 218 574» e
«CH-SG218574» vengono prima ricondotte a un’unica forma. Se la targa non
appartiene a nessun veicolo, la fattura non è preselezionata nella lista di
controllo.

## Un PDF, pagina per pagina

Le officine mandano volentieri un PDF con tutte le fatture dell’anno. Il primo
approccio passava l’intero PDF al modello in una sola chiamata. Con nove pagine
poi mancavano fatture, e l’officina della prima compariva su tutte.

Ora l’OCR legge tutte le pagine e il modello analizza ogni pagina singolarmente.
Determina anche il tipo di pagina: `rechnung` con una propria intestazione,
`fortsetzung` della precedente, oppure `andere` per condizioni generali e pagine
vuote. Per poterlo decidere riceve i primi 1200 caratteri della pagina
precedente, espressamente solo per la classificazione. Officina, data e importo
possono provenire solo dalla pagina stessa.

L’assemblaggio è di nuovo codice: `mergePdfPages` aggancia le continuazioni alla
fattura precedente e lì compila solo i campi vuoti. Le pagine vengono elaborate
a tre a tre in parallelo, non tutte insieme. Tutte le chiamate passano per un
proxy proprio, che consente al massimo 20 richieste al minuto.

## Nulla viene salvato prima che qualcuno l’abbia visto

Il controllo trova le contraddizioni, ma non gli errori plausibili. Un
chilometraggio letto male, più alto dell’ultimo, sembra uno corretto. Per
questo nessuna scansione salva direttamente.

Nel modulo della fattura una scansione compila solo i campi vuoti. Ciò che
l’utente ha già inserito resta; la valuta solo finché non l’ha cambiata lui
stesso. Più foto o un PDF cumulativo compaiono come lista di controllo. Ogni
riga indica la sua provenienza («Seite 3–4»), il veicolo riconosciuto e se la
fattura è già registrata. Le righe doppie e quelle poco chiare sono
deselezionate.

Offline vale lo stesso. Senza connessione l’app salva la foto con un
contrassegno. Quando la connessione torna, recupera la scansione e anche allora
compila solo i campi vuoti.

## La chat afferma volentieri di aver salvato

Nell’app c’è anche una chat. Può creare veicoli, registrare fatture e
manutenzioni e impostare il piano di manutenzione, ogni volta tramite un tool.
Prima di registrare una fattura mostra tutti i campi e aspetta un «Ja».

Il vero problema era l’opposto. Il modello scriveva «Die Wartung wurde
eingetragen» senza aver chiamato il tool. Nella chat sembra un successo, nel
database non c’è niente.

Una frase nel prompt non l’ha risolto. Peggio: le frasi di esempio per i
messaggi di successo nel prompt il modello le riprendeva alla lettera, anche
senza tool. Il prompt descrive quindi i messaggi di successo ormai solo nella
loro forma.

Ha aiutato un guardiano nel codice. `claimsActionWithoutTool` cerca nel testo
della risposta un participio con verbo ausiliare («wurde eingetragen», «habe
ich gespeichert») e verifica se nella stessa risposta è stato eseguito un tool
di scrittura. I tool di lettura come `list_vehicles` non contano. Le frasi
negative come «noch keine Wartung eingetragen» sono informazioni e restano
escluse, e «Ich habe folgende Daten erfasst:» è l’anteprima prima della
conferma, non un successo.

Se il guardiano scatta, il codice chiede una volta di nuovo, questa volta con
`toolChoice: 'required'`. La prima versione lo imponeva per tutti i passi. Allora,
dopo il risultato del tool, partiva un’altra richiesta con
`tool_choice: "any"` verso Mistral, che non tornava mai. La manutenzione era
salvata, la chat restava bloccata sull’indicatore di caricamento, sulla pagina
del veicolo in quattro tentativi su sei. Ora l’obbligo vale solo nel primo
passo:

```ts
prepareStep: ({ stepNumber }) => (stepNumber === 0 ? { toolChoice: 'required' } : {}),
```

Dopo, otto tentativi su otto sono andati a buon fine, cinque dei quali tramite
il guardiano.

## Dettare tramite la stessa seconda fase

Chi preferisce parlare anziché digitare può dettare la fattura. La dettatura
passa per la stessa seconda fase della foto, solo che il testo viene dalla
trascrizione invece che dall’OCR.

Quale modello sia adatto l’ho misurato, non ripreso dalla documentazione, con
sei frasi dalla quotidianità dell’officina. Le frasi erano sintetizzate con
Piper, non pronunciate da me; con termini tecnici come «Lambdasonde» questo
influenza i numeri. `voxtral-mini-latest` le ha trascritte con il 16,4 per
cento di errori di parola. `voxtral-small-latest` capisce l’audio e può
chiamare tool, sembrava la via più elegante. Però riformulava e una volta ha
risposto in inglese: «Zahnriemen mit Wasserpumpe ersetzt» è diventato «The
water pump replaced the fan belt.» La via tramite trascrizione e schema ha
invece azzeccato tutti e cinque i campi.

## Come viene testato

Le regole sopra sono funzioni pure con test Vitest: posizioni, categorie,
duplicati, assemblaggio delle pagine, il guardiano. Non hanno bisogno né di
rete né di database.

I test Playwright intercettano le chiamate a Mistral e forniscono risposte
fisse. Così verificano modulo, lista di controllo e chat, senza che
un’esecuzione costi denaro o dipenda dal modello. Un progetto di test a parte
manda foto reali e un PDF cumulativo di nove pagine al modello reale. Lo avvio a
mano, non a ogni modifica. In una di queste esecuzioni è emerso che i campi
numerici mostravano «214,583 km», perché mancava loro la formattazione svizzera.

## Che cosa si può trasferire

Niente di tutto questo dipende dalle auto. Chi vuole estrarre dati da documenti
con un modello linguistico può portarsi via questo:

- Separare lettura e comprensione. L’OCR legge, il modello di chat riceve solo
  testo e uno schema.
- Campi dello schema con valori fissi come enum, non come testo libero.
- Scrivere il prompt per le distinzioni su cui il modello fallisce, non per
  quelle che sa già fare.
- Tutto ciò che si può ricalcolare, ricalcolarlo nel codice e, in caso di
  contraddizione, mostrare un avviso invece di tirare a indovinare.
- Analizzare i documenti lunghi pagina per pagina e assemblarli nel codice.
- Compilare solo i campi vuoti e mostrare prima del salvataggio che cosa verrà
  salvato.
- Non credere a un modello che segnala un successo, ma controllare se il tool è
  stato eseguito.

Il codice sorgente è aperto:
[github.com/gstrainovic/wartungsheft](https://github.com/gstrainovic/wartungsheft).
La pipeline si trova in `src/services/ai.ts`, il controllo in
`src/services/invoice-scan.ts` e `src/services/invoice-items.ts`, il guardiano
in `src/services/chat-guard.ts`.
