---
title: Tre programmi o uno proprio
description: Perché ho costruito da solo il mio archivio di documenti con OCR, tag e chat, invece di collegare Paperless-ngx ed estensioni. Che cosa ha mostrato la valutazione e com’è la situazione sei mesi dopo.
---

# Tre programmi o uno proprio

Nel febbraio 2026 volevo liberarmi delle mie carte: fatture, contratti,
lettere del medico, documenti fiscali. Fotografarli o caricarli come PDF, il
resto doveva andare da sé. Prima ho esaminato oltre 30 progetti open source,
poi l’ho costruito da solo. Questo articolo spiega perché, e com’è la
situazione sei mesi dopo.

## Cinque requisiti e un laptop debole

L’elenco era breve, e ogni punto era obbligatorio:

1. Caricamento di foto e PDF con un archivio alle spalle
2. Riconoscimento del testo (OCR) tramite Mistral OCR
3. Tag che derivano dal contenuto, senza che debba assegnarli io
4. Ricerca full-text e una chat che risponde a domande su tutti i documenti
5. Un’unica interfaccia per tutto

Il punto 2 veniva dall’hardware. Il mio laptop ha 4 GB di memoria grafica e
poca RAM. MinerU richiede da 16 a 32 GB, Docling ha picchi da 3 a 4 GB,
PaddleOCR vuole una GPU seria. Un riconoscimento del testo locale di buona
qualità era quindi escluso.

## Lo schema nella valutazione

Ho esaminato archivi di documenti come Paperless-ngx, Papermerge, Docspell,
Mayan EDMS e Teedy, strumenti RAG come AnythingLLM, kotaemon, Open WebUI,
Dify e RAGFlow, e in più sistemi ERP con un modulo documenti. Ogni progetto
ha avuto una riga, ogni requisito una colonna.

Dopo qualche riga lo schema era chiaro. Gli archivi sapevano archiviare,
assegnare tag e cercare, ma non rispondere a domande. Gli strumenti RAG
sapevano rispondere a domande, ma non archiviare nulla: niente cartelle,
niente tag per documento, nessun archivio da sfogliare. Ogni gruppo aveva
esattamente la metà.

## La combinazione migliore erano tre programmi

Il più vicino era Paperless-ngx con due estensioni:

- **Paperless-ngx** come archivio con ricerca full-text
- **paperless-gpt** per Mistral OCR e tag tramite modello linguistico
- **paperless-ai** per la chat su tutti i documenti

Sono tre programmi con tre interfacce, tre configurazioni e due indici che
devono corrispondere all’archivio. Chi carica un documento va in
un’interfaccia; chi fa una domanda, in un’altra. Proprio questo non lo
volevo. Il requisito 5 è stato il motivo per costruirlo da solo.

## Che cosa è nato al suo posto

Il DMS è un’interfaccia Vue 3 con PrimeVue su Supabase: PostgreSQL con
pgvector per i vettori, Storage per i file, Edge Functions per
l’elaborazione. Un caricamento passa per quattro fasi:

```
upload-document → process-ocr → extract-data → generate-embed
```

`upload-document` calcola lo SHA-256 del file e rifiuta i doppioni.
`process-ocr` estrae in locale i PDF con livello di testo e manda a Mistral
OCR solo foto e scansioni. `extract-data` determina il tipo di documento,
estrae secondo uno schema campi come importo e scadenza e assegna i tag.
`generate-embed` suddivide il testo in sezioni da 1000 caratteri che si
sovrappongono di 200, e ne salva i vettori.
Se una fase fallisce, l’errore compare sul documento.

La ricerca combina entrambe le cose che PostgreSQL offre già: la ricerca
full-text in tedesco con `tsvector` e la ricerca vettoriale con pgvector,
ponderate con 0,4 e 0,6. La chat recupera le sezioni pertinenti tramite la
stessa ricerca e per ogni risposta indica i documenti da cui proviene.

Poiché tutto sta in un unico database, anche i permessi valgono in un unico
punto. Un team può riservare tipi di documento come i certificati di salario
ai soli admin. La funzione di ricerca filtra secondo le stesse regole della
lista dei documenti, perciò un documento bloccato non finisce né tra i
risultati né come fonte nella chat. Con tre programmi ogni indice avrebbe
dovuto replicare i permessi dell’archivio.

Nessuna parte dell’applicazione chiama Mistral direttamente. Tutte le
chiamate passano per un [proxy proprio](https://github.com/gstrainovic/ai-proxy),
che custodisce la chiave e conta il consumo per organizzazione.

## Mistral OCR era la scelta giusta?

A febbraio era l’unica che il laptop consentiva. A settembre ho misurato di
nuovo: Mistral OCR contro i modelli di visione che Infomaniak e kvant offrono
in Svizzera, con documenti sintetici e reali, puliti e distorti.

Con scansioni pulite, i grandi modelli di visione come Kimi K2.6 e Qwen3.5
sono altrettanto buoni o migliori, ma più lenti e più cari. Non appena
l’originale diventa difficile, Mistral OCR è in testa: con pagine distorte e
tabelle fitte ha trovato il 91 % delle celle, i modelli di visione al massimo
l’82 %. Con documenti svizzeri come le QR-fatture e i certificati di salario
ha commesso meno errori di carattere, con vere foto da smartphone ha trovato
dal 97 al 99 % dei campi.

Per la protezione dei dati Mistral non è la scelta migliore, ma una scelta
ammessa. I server si trovano in Francia, e la legge svizzera sulla protezione
dei dati consente il trasferimento nell’UE senza ulteriori garanzie. Un
fornitore svizzero sarebbe migliore per l’ubicazione. La regola per il test
era quindi: qualità prima dell’ubicazione. I dettagli arriveranno in un
articolo a parte.

## Com’è la situazione oggi

Per questo articolo ho ripetuto la valutazione nel settembre 2026. Il settore
si muove in fretta: alcuni progetti hanno aggiunto Mistral OCR, Papermerge
cerca nuovi maintainer, OpenKM distribuisce ormai la sua versione community
solo senza codice sorgente.

Il cambiamento più grande riguarda Paperless-ngx. La versione 3.0 è uscita nel
luglio 2026 con IA integrata: suggerimenti per titolo, tag e tipo di documento e una chat
su uno o più documenti, con link alle fonti. Come modello linguistico serve
Ollama o qualsiasi API compatibile con OpenAI. Il riconoscimento del testo nel
cloud Paperless-ngx lo offre di suo solo tramite Azure. Mistral OCR e i tag
già all’importazione li porta ancora paperless-gpt. paperless-ai, secondo il
suo README, non è più mantenuto.

Papra, un archivio snello, ha da luglio Mistral OCR e tag tramite modello
linguistico. Le manca solo la chat.

Da tre programmi si è quindi passati a due. Chi oggi vuole un archivio privato
con chat e può convivere con due interfacce dovrebbe provare prima
Paperless-ngx 3 con paperless-gpt. È più maturo di quanto il mio progetto
possa diventare in sei mesi.

Costruirlo da sé conviene quando uno dei cinque requisiti non è negoziabile,
oppure quando l’archivio deve funzionare per altri. Organizzazioni con ruoli,
permessi per tipo di documento fin dentro la chat, consumo per
organizzazione: tutto questo si aggiunge a fatica a tre programmi collegati.

## Che cosa si può trasferire

- Scrivere i requisiti come colonne prima di compilare la prima riga, e
  annotare per ogni cella la fonte.
- Cercare schemi, non il vincitore. «Ogni gruppo ha la metà» dice di più di
  trenta giudizi singoli.
- Contare le combinazioni: tre programmi che insieme sanno fare tutto sono una
  soluzione a sé, con un proprio onere di manutenzione.
- Ripetere la valutazione prima di una decisione, se ha più di qualche mese.
  In questo campo in sei mesi cambia molto.

Il codice sorgente è aperto:
[github.com/gstrainovic/dms](https://github.com/gstrainovic/dms). La
valutazione completa con entrambi gli stati si trova in `docs/evaluation.md`,
l’elaborazione in `supabase/functions/`.
