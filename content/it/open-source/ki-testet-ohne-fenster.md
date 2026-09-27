---
title: Un agente IA testa il mio editor senza finestra
description: Sviluppo guidato dai test con un agente IA su un'applicazione desktop nativa. Modalità headless, JSON-RPC come telecomando e screenshot che l'agente guarda da solo.
---

# Un agente IA testa il mio editor senza finestra

Scrivo il mio editor `zid` con Claude Code. Come ci sono arrivato, lo
racconto nell'[articolo sulla ricerca di un editor](/it/open-source/editor-suche/).
Qui si tratta della domanda che viene subito dopo: come fa un agente IA a verificare
un'interfaccia che non può né cliccare né vedere?

Sul web il problema è risolto. Playwright apre un browser, clicca, legge il DOM
e fa screenshot. `zid` non ha niente di tutto questo. È scritto in Zig,
disegna tramite wgpu con un proprio renderer di testo e costruisce il layout con Clay.
Non c'è un DOM, non ci sono strumenti per sviluppatori e nessun browser che
faccia parte del lavoro.

Senza aiuto, un agente lì scrive codice dell'interfaccia alla cieca. Alla fine resta
"dovrebbe funzionare", e a verificare ero poi io, a mano, nella finestra.
Ho ribaltato la situazione: l'applicazione riceve un telecomando e degli occhi, e
l'agente li usa entrambi da solo.

## Tre livelli

Si testa su tre livelli, e ognuno cattura qualcosa di diverso.

- **Gli unit test in Zig** verificano la logica che non ha bisogno di interfaccia. La
  navigazione tra le pagine dei PDF sta in `ui/pdf_nav.zig`, la cronologia Git in
  `git/git_history.zig`, la finestra di dialogo delle cartelle in `ui/folder_ops.zig`. Questi moduli
  non conoscono Clay e girano in pochi millisecondi.
- **Gli script E2E in Python** avviano la vera applicazione senza finestra, la comandano
  tramite JSON-RPC e verificano lo stato che l'applicazione restituisce in JSON. Sono
  23 script, per un totale di poco più di 4000 righe.
- **Gli screenshot** li scrive l'applicazione su richiesta in un file. Claude li
  guarda da solo.

## Senza finestra, ma con lo stesso ciclo

Il comando è `zig build run -- --headless --ai=off`. L'applicazione allora non apre
nessuna finestra, esegue il rendering in un buffer di 1200 × 800 pixel e resta in ascolto sulla
porta 9999. `--ai=off` disattiva l'agente integrato con il suo modello linguistico
locale.

L'importante è che la modalità headless non sia un mondo a parte. Prima aveva
un proprio ciclo di 27 righe, che si limitava a raccogliere i risultati del lavoro in background.
Il cambio di tab, i clic nell'explorer, la chiusura ritardata delle tab e
gli input bufferizzati lì non passavano mai. Gli errori proprio in questi percorsi
si potevano riprodurre solo con una finestra visibile, e quella finestra dà fastidio quando
lavoro contemporaneamente sullo stesso desktop.

Oggi in headless gira lo stesso ciclo di frame che con la finestra. Viene saltato
solo ciò che presuppone una finestra: gli eventi della finestra, il puntatore del mouse e
l'output sullo schermo. Invece di attendere eventi, il
ciclo dorme 16 millisecondi. Ciò che è testato in headless è quindi lo stesso codice
che uso nella finestra.

## JSON-RPC come telecomando

Il server RPC conosce 48 metodi. Una parte comanda l'applicazione come farebbe
una persona: `click`, `right_click`, `move_mouse`, `scroll`, `key_press`,
`type_text`. Un'altra parte legge lo stato: `ui_state` restituisce i dialoghi
aperti, i menu, le tab e il focus, `editor_state` le righe, il cursore e la
barra di ricerca, `pdf_state` la pagina corrente. Con `element_bounds` un
test ottiene la posizione di un qualsiasi elemento del layout, invece di indovinare
le coordinate.

Sul lato Python basta una sola funzione:

```python
def rpc(method, params=None):
    msg = json.dumps({"jsonrpc": "2.0", "method": method, "params": params or [], "id": 1}) + "\n"
    with socket.create_connection((HOST, PORT), timeout=10) as s:
        s.sendall(msg.encode())
        data = b""
        while not data.endswith(b"\n"):
            chunk = s.recv(65536)
            if not chunk:
                break
            data += chunk
    res = json.loads(data.decode())
    if "error" in res:
        raise RuntimeError(f"{method}: {res['error']}")
    return res["result"]
```

Il vero lavoro sta nella domanda su quale thread possa fare cosa. Il
server RPC gira in un thread proprio, l'interfaccia nel thread principale.
Se una chiamata RPC modifica l'elenco delle tab mentre il thread principale lo sta
disegnando, l'applicazione va in crash. Per questo gli input finiscono in una coda
che il thread principale smaltisce una volta per frame:

```zig
/// Vom Main-Thread pro Frame aufrufen: gepufferte Eingaben anwenden.
pub fn drainInputs(ctx: *E2EContext) void {
    var batch: [64]InputEvent = undefined;
    while (true) {
        ctx.input_mutex.lock();
        const n = @min(ctx.pending_inputs.items.len, batch.len);
        @memcpy(batch[0..n], ctx.pending_inputs.items[0..n]);
        ctx.pending_inputs.replaceRangeAssumeCapacity(0, n, &.{});
        ctx.input_mutex.unlock();
        if (n == 0) return;
        for (batch[0..n]) |ev| applyInput(ctx.ui_system, ev);
    }
}
```

Le chiamate in lettura continuano a girare nel thread del server. I dati condivisi hanno
quindi bisogno di un lock. Lo stato Git nell'explorer non ne aveva: il thread principale
sostituiva la map mentre un test la leggeva, e l'applicazione andava in crash in
`isIgnored`. Da allora ogni accesso passa da tre funzioni che tengono il
lock.

## Un test si legge come un manuale d'uso

Ecco come appare l'inizio del test per la navigazione nei PDF:

```python
cfg = os.path.join(ROOT, "tmp", "e2e_pdf_cfg")
shutil.rmtree(cfg, ignore_errors=True)
env = dict(os.environ, XDG_CONFIG_HOME=cfg)
wait_port_free()
proc = subprocess.Popen(
    ["zig", "build", "run", "--", "--headless", "--ai=off", PDF],
    cwd=ROOT, stdout=log, stderr=subprocess.STDOUT, env=env,
    start_new_session=True,  # eigene Prozessgruppe, siehe finally
)
try:
    wait_port(proc)
    settle(20)
    # ...
    check(st["pdf"], f"PDF-Tab ist aktiv (nach {time.time() - t0:.1f}s)")
    check(st["pages"] >= 3, f"Dokument hat {st['pages']} Seiten")
    to_first_page()
    expect_page(0, "Bild auf hält am Anfang bei Seite 1")
```

Ogni verifica stampa una riga con `PASS` o `FAIL` e una frase che
dice che cosa si intende. È scritto per l'agente: legge
l'output e sa, senza stack trace, quale passo è fallito.

Due dettagli sono nati da esperienze negative. Ogni esecuzione riceve una directory di
configurazione nuova, altrimenti l'applicazione ripristina le tab dell'ultima sessione,
e il test misura uno stato estraneo. E il test avvia l'applicazione
in un proprio gruppo di processi, così alla fine termina davvero tutto.

## Ciò che lo screenshot mostra e lo stato no

Il metodo RPC `screenshot` scrive un PPM in `tmp/`. Claude non legge i file
PPM, quindi l'agente li converte prima di guardarli:

```python
from PIL import Image
for n in ['repo', 'diff', 'file', 'empty', 'split']:
    Image.open(f'tmp/e2e_git_history_{n}.ppm').save(f'tmp/e2e_git_history_{n}.png')
```

Poi apre i PNG e descrive ciò che vede. Non esiste un livello di
valutazione separato. Il modello che ha scritto il codice
guarda il risultato.

Alcune cose esistono solo nell'immagine. Durante la costruzione della finestra di dialogo delle cartelle, le nuove icone
mancavano in ogni screenshot dopo il primo. Nessun campo di stato conosce le icone;
l'errore stava nel budget dell'atlante delle icone, che in headless non veniva mai
azzerato.

Altre cose mancano nello stato solo perché nessuno le ha ancora richieste. Uno
screenshot dall'explorer ha mostrato due errori in una volta. Un clic su
un file passava per un vecchio percorso di codice che scriveva il testo nel buffer della
tab *precedente*; il file precedente risultava poi modificato e
mostrava contenuto estraneo. E dopo la chiusura della tab attiva, l'editor
continuava a mostrare il contenuto della tab chiusa, ma con il nome della
vicina.

Lo stato JSON non poteva rivelare né l'uno né l'altro, perché indicava solo quale
tab è attiva, non quale buffer l'editor sta mostrando. Con la correzione
è quindi arrivata un'estensione: `get_active_tab` da allora restituisce anche
`editor_file` e `editor_modified`.

Ne è nato uno schema. Lo screenshot trova l'errore, un nuovo
campo di stato lo fissa. La volta successiva fallisce un `check`, e
nessuno deve più guardare.

Dove conta l'aspetto in sé, il test verifica i pixel. I
pulsanti sotto la pagina PDF si illuminano al passaggio del mouse. Lo script
fa uno screenshot con il mouse accanto e uno con il mouse sopra
e confronta il colore nello stesso punto. Non serve una libreria
di immagini: PPM è una breve intestazione di testo seguita da byte RGB grezzi.

## Quando è il test stesso a mentire

Non ogni test rosso riguarda l'applicazione.

Nel test dei PDF, i numeri di pagina saltavano tra due chiamate senza che si
fosse sfogliato. La causa stava nel server RPC. Legava la porta con
`reuse_address`, e sotto Linux questo imposta anche `SO_REUSEPORT`. Istanze
orfane di esecuzioni precedenti continuavano quindi ad ascoltare, il kernel distribuiva
le connessioni, e una parte delle risposte arrivava da un vecchio processo con
un vecchio stato. Oggi l'applicazione lega la porta in modo esclusivo, e un secondo avvio
segnala che è occupata.

Altre trappole sono più piccole, ma sono tutte nella documentazione del progetto,
così l'agente non deve riscoprirle:

- Clay mantiene la bounding box di un elemento che non viene più
  disegnato. Se un dialogo è aperto lo dice quindi `ui_state`, non
  `element_bounds`.
- L'atlante delle icone rasterizza al massimo quattro nuove icone per passaggio. La
  funzione di supporto per gli screenshot esegue quindi il rendering due volte.
- Un cambio di pagina appare solo nel frame successivo. I test interrogano lo
  stato in un breve ciclo, invece di aspettare una volta e sperare.

A volte il test trova anche un errore reale che provoca lui stesso.
La scrittura di un solo screenshot in `tmp/` generava circa 2000
eventi sui file. Ognuno avviava un proprio aggiornamento dello stato Git,
la coda si riempiva, e qualsiasi altro compito poteva essere
scartato, comprese le risposte della chat. Da allora il watcher segnala gli eventi uguali
una sola volta, e l'applicazione aggiorna lo stato Git al massimo
una volta ogni 300 millisecondi. Con lo stesso screenshot, di 2037
eventi ne restano due e un aggiornamento.

## Il procedimento

Nelle mie istruzioni all'agente lo sviluppo guidato dai test è lo
standard: prima un test che fallisce, poi il codice minimo che lo fa
passare, poi la pulizia. Su un'interfaccia, in pratica, significa:

1. La logica dietro la funzionalità passa in un modulo senza Clay, con
   unit test.
2. Per il percorso attraverso l'interfaccia nasce uno script E2E o un nuovo
   passo in uno esistente. Se allo script manca uno stato che dovrebbe
   verificare, l'applicazione riceve prima il metodo RPC corrispondente.
3. L'agente avvia lo script, legge le righe `FAIL`, modifica il codice
   e riavvia finché tutto segnala `PASS`.
4. Guarda gli screenshot. Se lì salta all'occhio qualcosa, si torna al
   passo 2.

I commit contengono test e codice insieme, per cui l'ordine non è visibile
nella cronologia. È visibile invece perché il secondo livello
è necessario. La navigazione nei PDF è arrivata con un modulo pulito e
coperto da unit test. Nell'applicazione, però, risultava a scatti. La correzione ha portato con sé lo
script E2E e tre cause che nessun unit test poteva vedere: il thread del server leggeva
uno stato che non gli apparteneva, la rotella del mouse contava al contrario, e
il rilevamento dell'hover di Clay nella vista PDF non segnalava proprio nulla.

## Ciò che non gira automaticamente

Nessun hook avvia i test dopo una modifica, e non c'è una CI.
Quali script eseguire lo decide l'agente in base alla modifica. Per questo
in `AGENTS.md` per ogni funzionalità è indicato quale script la copre. Una
regola è formulata in modo vincolante: dopo ogni modifica al codice dell'agente,
`scripts/e2e_ai_tools.py` deve restare verde. Anche questa è un'istruzione, non
un automatismo.

Un'esecuzione completa di tutti i 23 script non è un passo fisso. È la più grande
lacuna aperta: una modifica all'explorer che di passaggio rompe la tab del terminale
si nota solo quando qualcuno avvia lo script corrispondente.

## Che cosa serve per la propria applicazione

Niente di tutto questo dipende da Zig. Chi vuole sviluppare un'applicazione desktop nativa con un agente
ha bisogno più o meno di questo:

- Una modalità senza finestra che percorre lo stesso ciclo che con la finestra.
- Un'interfaccia locale per gli input, che arrivano nel thread principale, non
  nel thread del server.
- Chiamate in lettura che restituiscono lo stato dell'interfaccia in JSON, e
  una che rivela la posizione di un elemento.
- Screenshot in un file, in un formato che il modello sa leggere.
- Uno stato nuovo per ogni esecuzione dei test e una porta che può essere tenuta
  da una sola istanza.
- Un modello che capisce le immagini.
- Un file che indica quale script copre quale funzionalità e
  quale trappola è già nota.

Il codice sorgente è aperto: [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
I metodi RPC si trovano in `src/e2e_server.zig`, gli script in
`scripts/e2e_*.py`.
