---
title: Ein KI-Agent testet meinen Editor ohne Fenster
description: Testgetriebene Entwicklung mit einem KI-Agenten an einer nativen Desktop-App. Headless-Modus, JSON-RPC als Fernbedienung und Screenshots, die der Agent selbst ansieht.
---

# Ein KI-Agent testet meinen Editor ohne Fenster

Meinen Editor `zid` schreibe ich mit Claude Code. Wie es
dazu kam, steht im [Artikel über die Editor-Suche](/open-source/editor-suche/).
Hier geht es um die Frage, die sich danach stellt: Wie prüft ein KI-Agent
eine Oberfläche, die er weder anklicken noch sehen kann?

Im Web ist das gelöst. Playwright öffnet einen Browser, klickt, liest das DOM
und macht Screenshots. `zid` hat nichts davon. Er ist in Zig geschrieben,
zeichnet über wgpu mit eigenem Text-Renderer und legt das Layout mit Clay an.
Es gibt kein DOM, keine Entwicklerwerkzeuge und keinen Browser, der
irgendetwas abnimmt.

Ohne Hilfe schreibt ein Agent dort Oberflächencode blind. Am Ende steht
„sollte funktionieren", und geprüft habe dann ich, von Hand, im Fenster.
Das habe ich umgedreht: Die App bekommt eine Fernbedienung und Augen, und
der Agent benutzt beide selbst.

## Drei Ebenen

Getestet wird auf drei Ebenen, und jede fängt etwas anderes.

- **Unit-Tests in Zig** prüfen Logik, die keine Oberfläche braucht. Das
  Blättern in PDFs liegt in `ui/pdf_nav.zig`, die Git-Historie in
  `git/git_history.zig`, der Ordnerdialog in `ui/folder_ops.zig`. Diese Module
  kennen Clay nicht und laufen in Millisekunden.
- **E2E-Skripte in Python** starten die echte App ohne Fenster, bedienen sie
  über JSON-RPC und prüfen den Zustand, den die App als JSON zurückgibt. Es
  sind 23 Skripte mit zusammen gut 4000 Zeilen.
- **Screenshots** schreibt die App auf Anfrage in eine Datei. Claude sieht
  sie sich selbst an.

## Ohne Fenster, aber mit derselben Schleife

Der Aufruf ist `zig build run -- --headless --ai=off`. Die App öffnet dann
kein Fenster, rendert in einen Puffer von 1200 × 800 Pixeln und lauscht auf
Port 9999. `--ai=off` schaltet den eingebauten Agenten mit seinem lokalen
Sprachmodell ab.

Wichtig ist, dass der Headless-Modus keine eigene Welt ist. Früher hatte er
eine eigene Schleife von 27 Zeilen, die nur Ergebnisse aus Hintergrundarbeit
abholte. Tabwechsel, Klicks im Explorer, verzögertes Schliessen von Tabs und
gepufferte Eingaben liefen dort nie. Fehler in genau diesen Pfaden liessen
sich nur mit sichtbarem Fenster nachstellen, und dieses Fenster stört, wenn
ich nebenbei am selben Desktop arbeite.

Heute läuft headless dieselbe Frame-Schleife wie im Fenster. Übersprungen
wird nur, was ein Fenster voraussetzt: Fensterereignisse, Mauszeiger und die
Ausgabe auf den Bildschirm. Statt auf Ereignisse zu warten, schläft die
Schleife 16 Millisekunden. Was headless getestet ist, ist damit derselbe Code,
den ich im Fenster benutze.

## JSON-RPC als Fernbedienung

Der RPC-Server kennt 48 Methoden. Ein Teil davon bedient die App wie ein
Mensch: `click`, `right_click`, `move_mouse`, `scroll`, `key_press`,
`type_text`. Ein anderer Teil liest Zustand: `ui_state` liefert offene
Dialoge, Menüs, Tabs und Fokus, `editor_state` Zeilen, Cursor und
Suchleiste, `pdf_state` die aktuelle Seite. Mit `element_bounds` holt ein
Test die Position eines beliebigen Layout-Elements, statt Koordinaten zu
raten.

Auf der Python-Seite genügt dafür eine Funktion:

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

Die eigentliche Arbeit steckt in der Frage, welcher Thread was darf. Der
RPC-Server läuft in einem eigenen Thread, die Oberfläche im Hauptthread.
Ändert ein RPC-Aufruf die Tab-Liste, während der Hauptthread sie gerade
zeichnet, stürzt die App ab. Deshalb landen Eingaben in einer Warteschlange,
die der Hauptthread einmal pro Frame abarbeitet:

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

Lesende Aufrufe laufen weiterhin im Server-Thread. Gemeinsame Daten brauchen
dann eine Sperre. Der Git-Status im Explorer hatte keine: Der Hauptthread
ersetzte die Map, während ein Test sie las, und die App stürzte in
`isIgnored` ab. Seither geht jeder Zugriff über drei Funktionen, die die
Sperre halten.

## Ein Test liest sich wie eine Bedienungsanleitung

So sieht der Anfang des Tests für das Blättern in PDFs aus:

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

Jede Prüfung druckt eine Zeile mit `PASS` oder `FAIL` und einem Satz, der
sagt, was gemeint ist. Das ist für den Agenten geschrieben: Er liest die
Ausgabe und weiss ohne Stacktrace, welcher Schritt gescheitert ist.

Zwei Details sind aus Schaden entstanden. Jeder Lauf bekommt ein frisches
Konfigurationsverzeichnis, sonst stellt die App die Tabs der letzten Sitzung
wieder her, und der Test misst fremden Zustand. Und der Test startet die App
in einer eigenen Prozessgruppe, damit er am Ende wirklich alles beendet.

## Was der Screenshot zeigt und der Zustand nicht

Die RPC-Methode `screenshot` schreibt ein PPM nach `tmp/`. Claude liest keine
PPM-Dateien, also wandelt der Agent sie vor dem Ansehen um:

```python
from PIL import Image
for n in ['repo', 'diff', 'file', 'empty', 'split']:
    Image.open(f'tmp/e2e_git_history_{n}.ppm').save(f'tmp/e2e_git_history_{n}.png')
```

Danach öffnet er die PNGs und beschreibt, was er sieht. Eine eigene
Bewertungsschicht gibt es nicht. Das Modell, das den Code geschrieben hat,
sieht sich das Ergebnis an.

Manches gibt es nur im Bild. Beim Bau des Ordnerdialogs fehlten auf jedem
Screenshot nach dem ersten die neuen Icons. Kein Zustandsfeld kennt Icons,
der Fehler lag im Budget des Icon-Atlas, das headless nie zurückgesetzt
wurde.

Anderes fehlt im Zustand nur, weil noch niemand danach gefragt hat. Ein
Screenshot aus dem Explorer zeigte zwei Fehler auf einmal. Ein Klick auf
eine Datei lief über einen alten Codepfad, der den Text in den Buffer des
*vorherigen* Tabs schrieb; die vorherige Datei galt danach als geändert und
zeigte fremden Inhalt. Und nach dem Schliessen des aktiven Tabs zeigte der
Editor weiter den Inhalt des geschlossenen Tabs, aber unter dem Namen des
Nachbarn.

Der JSON-Zustand konnte beides nicht verraten, denn er meldete nur, welcher
Tab aktiv ist, nicht welchen Buffer der Editor gerade anzeigt. Mit dem Fix
kam deshalb eine Erweiterung: `get_active_tab` liefert seither auch
`editor_file` und `editor_modified`.

Daraus ist ein Muster geworden. Der Screenshot findet den Fehler, ein neues
Zustandsfeld hält ihn fest. Beim nächsten Mal scheitert ein `check`, und
niemand muss mehr hinsehen.

Wo es auf das Aussehen selbst ankommt, prüft der Test die Pixel. Die
Schaltflächen unter der PDF-Seite hellen beim Überfahren auf. Das Skript
macht einen Screenshot mit der Maus daneben und einen mit der Maus darauf
und vergleicht die Farbe an derselben Stelle. Eine Bildbibliothek braucht
es dafür nicht: PPM ist ein kurzer Textkopf und danach rohe RGB-Bytes.

## Wenn der Test selbst lügt

Nicht jeder rote Test meint die App.

Beim PDF-Test sprangen die Seitenzahlen zwischen zwei Aufrufen, ohne dass
geblättert wurde. Die Ursache lag im RPC-Server. Er band den Port mit
`reuse_address`, und das setzt unter Linux auch `SO_REUSEPORT`. Verwaiste
Instanzen aus früheren Läufen lauschten also weiter, der Kernel verteilte
die Verbindungen, und ein Teil der Antworten kam aus einem alten Prozess mit
altem Zustand. Heute bindet die App den Port exklusiv, und ein zweiter Start
meldet, dass er belegt ist.

Andere Fallen sind kleiner, aber stehen alle in der Projektdokumentation,
damit der Agent sie nicht neu entdecken muss:

- Clay behält die Bounding-Box eines Elements, das nicht mehr gezeichnet
  wird. Ob ein Dialog offen ist, sagt deshalb `ui_state`, nicht
  `element_bounds`.
- Der Icon-Atlas rasterisiert höchstens vier neue Icons pro Durchgang. Die
  Hilfsfunktion für Screenshots rendert deshalb zweimal.
- Ein Seitenwechsel erscheint erst im nächsten Frame. Tests fragen den
  Zustand in einer kurzen Schleife ab, statt einmal zu warten und zu hoffen.

Manchmal findet der Test auch einen echten Fehler, den er selbst auslöst.
Das Schreiben eines einzigen Screenshots in `tmp/` erzeugte rund 2000
Dateiereignisse. Jedes stiess eine eigene Aktualisierung des Git-Status an,
die Warteschlange lief voll, und jede andere Aufgabe konnte verworfen
werden, auch die Antworten des Chats. Seither meldet der Watcher gleiche
Ereignisse nur einmal, und die App aktualisiert den Git-Status höchstens
einmal pro 300 Millisekunden. Beim selben Screenshot bleiben von 2037
Ereignissen zwei übrig und eine Aktualisierung.

## Der Ablauf

In meinen Anweisungen an den Agenten steht testgetriebene Entwicklung als
Standard: zuerst ein Test, der scheitert, dann der kleinste Code, der ihn
bestehen lässt, dann aufräumen. An einer Oberfläche heisst das praktisch:

1. Die Logik hinter der Funktion wandert in ein Modul ohne Clay, mit
   Unit-Tests.
2. Für den Weg durch die Oberfläche entsteht ein E2E-Skript oder ein neuer
   Schritt in einem bestehenden. Fehlt dem Skript ein Zustand, den es prüfen
   müsste, bekommt die App zuerst die RPC-Methode dafür.
3. Der Agent startet das Skript, liest die `FAIL`-Zeilen, ändert den Code
   und startet neu, bis alles `PASS` meldet.
4. Er sieht sich die Screenshots an. Fällt dort etwas auf, geht es zurück zu
   Schritt 2.

Die Commits enthalten Test und Code zusammen, die Reihenfolge ist in der
Historie daher nicht sichtbar. Sichtbar ist dagegen, warum die zweite Ebene
nötig ist. Das Blättern in PDFs kam mit einem sauberen, unit-getesteten
Modul. In der App wirkte es trotzdem sprunghaft. Der Fix brachte das
E2E-Skript mit und drei Ursachen, die kein Unit-Test sehen konnte: Der Server-Thread las
Zustand, der ihm nicht gehörte, das Mausrad zählte verkehrt herum, und
Clays Hover-Erkennung meldete in der PDF-Ansicht gar nichts.

## Was nicht automatisch läuft

Kein Hook startet die Tests nach einer Änderung, und es gibt keine CI.
Welche Skripte laufen, entscheidet der Agent anhand der Änderung. Dafür
steht in `AGENTS.md` bei jeder Funktion, welches Skript sie abdeckt. Eine
Regel ist verbindlich formuliert: Nach jeder Änderung am Agenten-Code muss
`scripts/e2e_ai_tools.py` grün bleiben. Auch das ist eine Anweisung, keine
Automatik.

Ein Gesamtlauf aller 23 Skripte ist kein fester Schritt. Das ist die grösste
offene Lücke: Eine Änderung am Explorer, die nebenbei den Terminal-Tab
bricht, fällt erst auf, wenn jemand das passende Skript startet.

## Was man für die eigene App braucht

Nichts davon hängt an Zig. Wer eine native Desktop-App mit einem Agenten
entwickeln will, braucht ungefähr das:

- Einen Modus ohne Fenster, der dieselbe Schleife durchläuft wie mit Fenster.
- Eine lokale Schnittstelle für Eingaben, die im Hauptthread ankommen, nicht
  im Thread des Servers.
- Lesende Aufrufe, die den Zustand der Oberfläche als JSON liefern, und
  einen, der die Position eines Elements verrät.
- Screenshots in eine Datei, in einem Format, das das Modell lesen kann.
- Frischen Zustand pro Testlauf und einen Port, den nur eine Instanz halten
  kann.
- Ein Modell, das Bilder versteht.
- Eine Datei, in der steht, welches Skript welche Funktion abdeckt und
  welche Falle schon bekannt ist.

Der Quelltext liegt offen: [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
Die RPC-Methoden stehen in `src/e2e_server.zig`, die Skripte unter
`scripts/e2e_*.py`.
