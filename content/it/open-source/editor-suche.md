---
title: Sette mesi alla ricerca di un editor
description: Da VS Code agli editor da terminale, poi da gpui a Zig. Undici tentativi e perché i limiti degli strumenti di un agente IA vanno nel codice.
---

# Sette mesi alla ricerca di un editor

VS Code è stato il mio primo e unico editor. Ma le prestazioni mi davano
fastidio: a volte consuma tantissimo processore e memoria. Così ho iniziato a
cercare qualcosa di più veloce.

I miei requisiti erano pochi: anteprima per PDF e immagini, un terminale, e
Git nell'editor.

## Gli editor da terminale sono veloci, ma ciechi

La prima strada portava al terminale. Lì la velocità non è un problema.
L'anteprima sì: niente immagini, niente PDF, niente Markdown renderizzato.

Così ho provato ad aggiungerla. In Fresh i plugin sono troppo limitati per
farlo. In LazyVim funziona, ma non ovunque. Non tutti i terminali collaborano,
e non era nemmeno stabile: con le anteprime delle immagini nell'explorer
LazyVim andava in crash. Sopra tutto aleggiava il sospetto che prima o poi
avrei sbattuto contro un tetto insito nel terminale stesso.

## Cambiare il guscio invece di rattoppare il plugin

Da qui è nato il mio primo approccio, e ribalta il problema. Se l'anteprima
non entra nel terminale, allora è l'editor da terminale che deve entrare in
una finestra.

Due tentativi sono andati in questa direzione. `neoview` incorpora Neovim
tramite `nvim-rs` in un'interfaccia costruita con gpui, il framework con cui
è costruito anche Zed. L'interfaccia comunica con Neovim tramite msgpack-rpc.
`freshview` fa lo stesso con l'editor Fresh, ma in modo più stretto: Fresh
gira come libreria nello stesso processo, egui fornisce la finestra,
`egui_ratatui` traduce tra i due, e mupdf disegna PDF e immagini in finestre
fluttuanti accanto.

I tentativi successivi, `flexed` e `editor-framework`, non sono più wrapper,
ma impalcature su gpui in cui niente è nucleo e tutto è plugin. In
`editor-framework` i plugin sono in Lua e si possono ricaricare senza
ricompilare.

## Perché Rust è stato scartato

Zed è un buon editor, ma senza anteprima PDF. E Zed è scritto in Rust.

Per me Rust era troppo lento da compilare. `neoview` e `freshview` avevano le
loro difficoltà, una visualizzazione lenta qui, un crash alla chiusura
dell'anteprima PDF là. Forse si sarebbero potute risolvere, forse no. A
decidere è stato altro: con quei tempi di compilazione non avanzavo
abbastanza in fretta. E gpui è Rust, quindi è caduto anche lui.

Cercavo un altro linguaggio veloce con cui fare concorrenza a Zed. Go
sembrava datato, V troppo poco conosciuto, e Zig stava proprio emergendo come
concorrente di Rust. Quindi Zig, e lì per me la compilazione è piacevolmente
più veloce.

## Undici tentativi, otto interfacce

Ogni riga è un repository a sé, nell'ordine in cui sono nati. Alcuni sono
vissuti un giorno, altri una settimana. Tutti e undici stanno in cinque
settimane, tra inizio marzo e inizio aprile 2026.

| Iniziato | Tentativo | Linguaggio | Interfaccia | Motivo dell'abbandono |
|---|---|---|---|---|
| 2 marzo | neoview | Rust | gpui | Tempi di compilazione |
| 2 marzo | freshview | Rust | egui, egui_ratatui | Tempi di compilazione |
| 8 marzo | flexed | Rust | gpui | Tempi di compilazione |
| 9 marzo | editor-framework | Rust | gpui, mlua | Tempi di compilazione |
| 14 marzo | slint-rust-editor | Rust | Slint | Tempi di compilazione |
| 15 marzo | mojo-nuklear-editor | Mojo, ponte C | Nuklear | Mojo inadatto a scrivere editor |
| 17 marzo | slint-editor | Mojo | Slint tramite Python | Slint raggiungibile solo tramite Python |
| 22 marzo | v-gui-editor | V | Framework GUI di V | Lo scorrimento si è rotto dopo l'aggiunta di explorer e schede |
| 25 marzo | zed-clone | Zig | dvui | Crash durante lo scorrimento, file grandi lenti |
| 26 marzo | sokol-nanovg-zig-editor | Zig | sokol, NanoVG | Font sparito dopo il passaggio a Vulkan, il game loop di sokol costava CPU |
| 2 aprile | qt-ziged | Zig | Qt 6 tramite libqt6zig | Rimasto una dimostrazione tecnica |

Il 3 aprile è iniziato `zid`. Da allora non c'è più stato alcun nuovo
tentativo.

## Che cosa ne è uscito

L'editor si chiama `zid` ed è scritto in Zig. Disegna tramite wgpu, con il
renderer fissato sul backend Vulkan. Il layout lo fa Clay. La resa del testo
è mia: atlante di glifi e renderer GPU basato su FreeType.

L'editor stesso è mio: input, comandi di modifica, ricerca, a capo
automatico, numeri di riga, assegnazione dei tasti. Sotto c'è codice di
terzi, ed è voluto. La memorizzazione del testo la gestisce `flow-core`, la
libreria centrale dell'editor Flow Control, con i tipi per buffer, cursore e
selezione. L'evidenziazione della sintassi viene dalla stessa casa tramite
tree-sitter. Il terminale è l'emulazione di Ghostty, il Markdown lo
renderizza zigdown, il PDF lo disegna mupdf.

È un taglio diverso rispetto a `neoview` e `freshview`. Lì tutto l'editor era
di terzi e solo il guscio era mio. Con `zid` è il contrario: l'editor è mio,
di terzi sono i mattoni sottostanti, che non hanno niente a che fare con la
modifica del testo.

## Le regole vanno nel codice, non nel prompt

`zid` ha un agente integrato che lavora con un modello linguistico locale,
llama-server con Qwen3-4B. Un agente nell'editor ha bisogno di strumenti, e
gli strumenti hanno bisogno di limiti. La via più ovvia è scrivere i limiti
nel prompt di sistema. Con un modello di queste dimensioni, però, una riga di
prompt è solo una preghiera, e a ogni richiesta occupa spazio in un contesto
di 8192 token. Per questo i limiti stanno nel codice. Lì però devono essere
senza lacune.

Un esempio. Chi vuole sovrascrivere un file esistente riceve una finestra di
conferma. Il modello l'ha aggirata al primo tentativo: invece di
`write_file` ha inviato un `replace_text` il cui testo da cercare era l'intero
file. Formalmente non una sovrascrittura, in pratica esattamente quello.

Da allora anche `replace_text` conta come sovrascrittura non appena sostituisce
metà del file o più:

```zig
/// replace_text mit `old` = (fast) ganzer Datei ist ein verkapptes Überschreiben und
/// braucht dieselbe Bestätigung wie write_file auf eine bestehende Datei.
pub fn replaceCountsAsRewrite(file_len: usize, old_len: usize) bool {
    if (file_len == 0) return false;
    return old_len * 2 >= file_len;
}
```

Lo stesso vale per i percorsi. Invece di dire al modello di restare nel
progetto, una funzione risolve il percorso e non restituisce nulla se si
trova all'esterno. Un percorso che esce dal progetto tramite `..` o in forma
assoluta non può quindi generare alcuna operazione sui file.

Regole del genere sono funzioni pure, e le funzioni pure si possono testare.
Entrambe hanno unit test. In più c'è uno script end-to-end che fa girare
l'editor headless contro il modello reale e verifica il percorso del rifiuto:
chiedere una sovrascrittura, attendere la finestra, rifiutare, file
invariato, e un percorso fuori dal progetto viene respinto. Una riga di
prompt la si può solo sperare.

Al contrario, lo stesso vale per le capacità. Lo strumento `command` riceve le
sue opzioni generate dall'enumerazione dei comandi dell'editor. Ogni menu e
ogni scorciatoia da tastiera è così automaticamente raggiungibile per
l'agente, senza che da qualche parte si debba mantenere una seconda lista.

Anche la questione di in quale finestra compare un file aperto dall'agente
non è un'istruzione al modello, ma una funzione con unit test. Il prompt di
sistema si è ridotto a tre frasi: il ruolo, la convenzione che i percorsi si
intendono relativi al progetto, e la richiesta di rispondere brevemente nella
lingua dell'utente dopo i risultati degli strumenti. Tutto il resto sta nel
codice, dove viene verificato, invece che nel prompt, dove viene chiesto.

## Che cosa resta aperto

Ci sono limiti che restano volutamente. L'editor carica esattamente uno stile
di carattere, per questo la vista Markdown mostra grassetto e corsivo tramite
colori invece che con veri stili di carattere. Punti come questi sono
registrati come decisioni nella documentazione del progetto, non come
compiti aperti.

## A che punto è oggi

Dei tre requisiti dell'introduzione, due sono soddisfatti: PDF e immagini si
aprono in una scheda, il terminale è integrato. Git c'è solo a metà.
L'explorer mostra lo stato di ogni file, diff e blame mancano ancora. Si sono
aggiunte cose che non erano sulla lista: anteprima Markdown, slide da
Markdown con esportazione in PDF, salto alla definizione tramite un language
server, apertura rapida e palette dei comandi, e l'agente. Viene compilato
per Linux e Windows.

Il codice sorgente è aperto: [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
Anche gli undici tentativi precedenti sono pubblici, ognuno con il suo nome
della tabella.

Come l'agente usa e verifica l'editor senza finestra lo racconta il prossimo
articolo: [Un agente IA testa il mio editor senza finestra](/it/open-source/ki-testet-ohne-fenster/).
