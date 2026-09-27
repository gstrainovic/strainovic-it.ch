---
title: Sieben Monate auf der Suche nach einem Editor
description: Von VS Code über Terminal-Editoren und gpui zu Zig. Elf Anläufe und warum Werkzeuggrenzen für einen KI-Agenten in den Code gehören.
---

# Sieben Monate auf der Suche nach einem Editor

VS Code war mein erster und einziger Editor. Doch die Leistung störte mich:
manchmal verbraucht er unheimlich viel Prozessor und Arbeitsspeicher. Also habe
ich angefangen, nach etwas Schnellerem zu suchen.

Meine Anforderungen waren überschaubar: Vorschau für PDF und Bilder, ein
Terminal, und Git im Editor.

## Terminal-Editoren sind schnell, aber blind

Der erste Weg führte in den Terminal. Dort ist die Geschwindigkeit kein
Problem. Die Vorschau schon: kein Bild, kein PDF, kein gerendertes Markdown.

Also habe ich versucht, es nachzurüsten. Bei Fresh sind die Plugins dafür zu
eingeschränkt. Bei LazyVim funktioniert es, aber nicht überall. Nicht jedes
Terminal spielt mit, und stabil war es auch nicht: bei Bildvorschauen im
Explorer stürzte LazyVim ab. Über allem stand die Ahnung, dass ich irgendwann
doch an eine Decke stosse, die im Terminal eingebaut ist.

## Die Hülle tauschen statt das Plugin flicken

Daraus wurde der erste eigene Ansatz, und er kehrt die Aufgabe um. Wenn die
Vorschau nicht in den Terminal passt, dann muss der Terminal-Editor eben in
ein Fenster.

Zwei Versuche gingen in diese Richtung. `neoview` bettet Neovim über `nvim-rs`
in eine Oberfläche aus gpui ein, dem Framework, mit dem auch Zed gebaut ist.
Die Oberfläche redet dabei über msgpack-rpc mit Neovim. `freshview` macht
dasselbe mit dem Editor Fresh, nur enger: Fresh läuft als Bibliothek im selben
Prozess, egui liefert das Fenster, `egui_ratatui` übersetzt dazwischen, und
mupdf zeichnet PDF und Bilder in schwebende Fenster daneben.

Die nächsten Anläufe, `flexed` und `editor-framework`, sind keine Wrapper
mehr, sondern Gerüste auf gpui, in denen nichts Kern ist und alles Plugin.
Bei `editor-framework` sind die Plugins in Lua und lassen sich ohne Neubau
nachladen.

## Warum Rust wegfiel

Zed ist ein guter Editor, aber ohne PDF-Vorschau. Und Zed ist in Rust
geschrieben.

Rust war mir zu langsam im Bauen. `neoview` und `freshview` hatten ihre
Schwierigkeiten, träge Darstellung hier, ein Absturz beim Schliessen der
PDF-Vorschau dort. Das hätte man vielleicht in den Griff bekommen, vielleicht
auch nicht. Entschieden hat etwas anderes: mit diesen Übersetzungszeiten kam
ich nicht schnell genug voran. Und gpui ist Rust, also fiel es mit.

Gesucht war eine andere schnelle Sprache, mit der sich Zed Konkurrenz machen
lässt. Go wirkte verstaubt, V zu wenig bekannt, und Zig stand gerade im
Durchbruch als Konkurrent zu Rust. Also Zig, und dort baut es sich für mich
angenehm schneller.

## Elf Anläufe, acht Oberflächen

Jede Zeile ist ein eigenes Repo, in der Reihenfolge, in der sie entstanden
sind. Manche haben einen Tag gelebt, manche eine Woche. Alle elf liegen in
fünf Wochen zwischen Anfang März und Anfang April 2026.

| Begonnen | Anlauf | Sprache | Oberfläche | Abbruchgrund |
|---|---|---|---|---|
| 2. März | neoview | Rust | gpui | Buildzeiten |
| 2. März | freshview | Rust | egui, egui_ratatui | Buildzeiten |
| 8. März | flexed | Rust | gpui | Buildzeiten |
| 9. März | editor-framework | Rust | gpui, mlua | Buildzeiten |
| 14. März | slint-rust-editor | Rust | Slint | Buildzeiten |
| 15. März | mojo-nuklear-editor | Mojo, C-Brücke | Nuklear | Mojo ungeeignet, um Editoren damit zu schreiben |
| 17. März | slint-editor | Mojo | Slint über Python | Slint nur über Python erreichbar |
| 22. März | v-gui-editor | V | GUI-Framework von V | Scrollen brach nach Einbau von Explorer und Tabs |
| 25. März | zed-clone | Zig | dvui | Absturz beim Scrollen, grosse Dateien langsam |
| 26. März | sokol-nanovg-zig-editor | Zig | sokol, NanoVG | Schrift nach Umbau auf Vulkan weg, Game-Loop von sokol kostete CPU |
| 2. April | qt-ziged | Zig | Qt 6 über libqt6zig | Blieb technische Demonstration |

Am 3. April begann `zid`. Seither gab es keinen neuen Anlauf mehr.

## Was daraus wurde

Der Editor heisst `zid` und ist in Zig geschrieben. Er zeichnet über wgpu,
im Renderer auf das Vulkan-Backend festgelegt. Das Layout macht Clay. Die
Textdarstellung ist eigen: Glyphen-Atlas und GPU-Renderer über FreeType.

Der Editor selbst ist eigen: Eingabe, Bearbeitungsbefehle, Suche,
Zeilenumbruch, Zeilennummern, Tastenbelegung. Darunter liegt Fremdes, und
zwar bewusst. Die Textspeicherung übernimmt `flow-core`, die Kernbibliothek
des Editors Flow Control, mit Puffer, Cursor- und Auswahltypen. Die
Syntaxhervorhebung kommt aus demselben Haus über tree-sitter. Das Terminal
ist die Emulation von Ghostty, Markdown rendert zigdown, PDF zeichnet mupdf.

Das ist ein anderer Schnitt als bei `neoview` und `freshview`. Dort war der
ganze Editor fremd und nur die Hülle eigen. Bei `zid` ist es umgekehrt: der
Editor ist eigen, fremd sind die Bausteine darunter, die nichts mit dem
Editieren zu tun haben.

## Regeln gehören in den Code, nicht in den Prompt

`zid` hat einen eingebauten Agenten, der gegen ein lokales Sprachmodell
arbeitet, llama-server mit Qwen3-4B. Ein Agent im Editor braucht Werkzeuge,
und Werkzeuge brauchen Grenzen. Der naheliegende Weg ist, die Grenzen in den
Systemprompt zu schreiben. Bei einem Modell dieser Grösse ist eine
Prompt-Zeile aber nur eine Bitte, und sie kostet bei jeder Anfrage Platz in
einem Kontext von 8192 Tokens. Deshalb stehen die Grenzen im Code. Dort
müssen sie allerdings lückenlos sein.

Ein Beispiel. Wer eine bestehende Datei überschreiben will, bekommt einen
Bestätigungsdialog. Das Modell hat ihn beim ersten Versuch umgangen: statt
`write_file` schickte es ein `replace_text`, dessen Suchtext die ganze Datei
war. Formal keine Überschreibung, praktisch genau das.

Seither zählt auch `replace_text` als Überschreiben, sobald es die halbe
Datei oder mehr ersetzt:

```zig
/// replace_text mit `old` = (fast) ganzer Datei ist ein verkapptes Überschreiben und
/// braucht dieselbe Bestätigung wie write_file auf eine bestehende Datei.
pub fn replaceCountsAsRewrite(file_len: usize, old_len: usize) bool {
    if (file_len == 0) return false;
    return old_len * 2 >= file_len;
}
```

Dasselbe gilt für Pfade. Statt dem Modell zu sagen, es solle im Projekt
bleiben, löst eine Funktion den Pfad auf und gibt nichts zurück, wenn er
ausserhalb liegt. Ein Pfad, der über `..` oder absolut aus dem Projekt
hinausführt, kann dann gar keine Dateioperation erzeugen.

Solche Regeln sind reine Funktionen, und reine Funktionen kann man testen.
Beide haben Unit-Tests. Dazu kommt ein End-to-End-Skript, das den Editor
headless gegen das echte Modell fährt und den Ablehnungsweg prüft: Überschreiben
verlangen, Dialog abwarten, ablehnen, Datei unverändert, und ein Pfad
ausserhalb des Projekts wird abgewiesen. Eine Prompt-Zeile kann man nur
hoffen.

Umgekehrt gilt dasselbe für Fähigkeiten. Das Werkzeug `command` bekommt
seine Auswahl aus der Kommando-Aufzählung des Editors erzeugt. Jedes Menü und
jedes Tastenkürzel ist damit automatisch für den Agenten erreichbar, ohne
dass irgendwo eine zweite Liste gepflegt werden müsste.

Auch die Frage, in welchem Fenster eine vom Agenten geöffnete Datei
erscheint, ist keine Anweisung an das Modell, sondern eine Funktion mit
Unit-Test. Der Systemprompt ist auf drei Sätze geschrumpft: die Rolle, die
Konvention, dass Pfade relativ zum Projekt gemeint sind, und die Bitte, nach
Werkzeugergebnissen kurz in der Sprache des Nutzers zu antworten. Alles
andere steht im Code, wo es geprüft wird, statt im Prompt, wo es erbeten
wird.

## Was offen bleibt

Es gibt Grenzen, die bewusst stehenbleiben. Der Editor lädt genau einen
Schriftschnitt, deshalb zeigt die Markdown-Ansicht fett und kursiv über
Farben statt über echte Schnitte. Solche Punkte stehen als Entscheidung in der
Projektdokumentation, nicht als offene Aufgabe.

## Wo es heute steht

Von den drei Anforderungen aus der Einleitung sind zwei erfüllt: PDF und
Bilder öffnen sich im Tab, das Terminal ist eingebaut. Git ist erst zur
Hälfte da. Der Explorer zeigt den Status jeder Datei, Diff und Blame fehlen
noch. Dazu gekommen sind Dinge, die nicht auf der Liste standen:
Markdown-Vorschau, Folien aus Markdown mit Export nach PDF, Sprung zur
Definition über einen Sprachserver, Schnellöffner und Befehlspalette, und der
Agent. Gebaut wird für Linux und Windows.

Der Quelltext liegt offen: [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
Die elf Anläufe davor sind ebenfalls öffentlich, jeder unter seinem Namen aus
der Tabelle.

Wie der Agent den Editor ohne Fenster bedient und prüft, steht im nächsten
Artikel: [Ein KI-Agent testet meinen Editor ohne Fenster](/open-source/ki-testet-ohne-fenster/).
