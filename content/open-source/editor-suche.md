---
title: Sieben Monate auf der Suche nach einem Editor
description: Von VS Code über Terminal-Editoren und gpui zu Zig. Zehn Anläufe mit zehn Oberflächen-Bibliotheken, und warum Werkzeuggrenzen für einen KI-Agenten in den Code gehören.
---

# Sieben Monate auf der Suche nach einem Editor

VS Code war mein einziger Editor. Er kann alles, aber er kostet. Manchmal
frisst er Prozessor und Arbeitsspeicher in einem Ausmass, das zum Tippen von
Text nicht im Verhältnis steht. Also habe ich angefangen zu suchen.

Meine Anforderungen waren überschaubar: Vorschau für PDF und Bilder, ein
Terminal, und Git im Editor.

## Terminal-Editoren sind schnell, aber blind

Der erste Weg führte in den Terminal. Dort ist die Geschwindigkeit kein
Problem. Die Vorschau schon: kein Bild, kein PDF, kein gerendertes Markdown.

Also habe ich versucht, es nachzurüsten. Bei Fresh sind die Plugins dafür zu
eingeschränkt. Bei LazyVim funktioniert es, aber nicht überall. Nicht jedes
Terminal spielt mit, stabil genug war es auch nicht, und über allem stand die
Ahnung, dass ich irgendwann doch an eine Decke stosse, die im Terminal
eingebaut ist.

## Die Hülle tauschen statt das Plugin flicken

Daraus wurde der erste eigene Ansatz, und er kehrt die Aufgabe um. Wenn die
Vorschau nicht in den Terminal passt, dann muss der Terminal-Editor eben in
ein Fenster.

Zwei Versuche gingen in diese Richtung. `neoview` bettet Neovim über `nvim-rs`
in eine Oberfläche aus gpui ein, dem Framework, mit dem auch Zed gebaut ist.
`freshview` macht dasselbe mit dem Editor Fresh: Fresh läuft als Bibliothek im
selben Prozess, egui liefert das Fenster, `egui_ratatui` übersetzt dazwischen,
und mupdf zeichnet PDF und Bilder in schwebende Fenster daneben. Kein zweiter
Prozess, keine Netzwerkverbindung, kein Daemon.

Der nächste Anlauf, `editor-framework`, ist kein Wrapper mehr, sondern ein
Gerüst für einen eigenen Editor auf gpui, mit Lua für Plugins.

## Warum Rust wegfiel

An der Sprache lag es nicht, an den Übersetzungszeiten schon. Für eine
Anwendung, an der man den ganzen Tag Kleinigkeiten ändert und sofort sehen
will, war mir Rust zu langsam im Bauen. Und gpui ist Rust, also fiel es mit.

Gesucht war eine Sprache, die schnell genug ist, um es mit Zed aufzunehmen.
Go wirkte verstaubt. V ist zu wenig verbreitet, als dass man darauf etwas
aufbauen möchte, das halten soll. Zig stand gerade im Durchbruch als
ernstzunehmender Gegenentwurf zu Rust. Also Zig.

## Zehn Anläufe, zehn Oberflächen

Jede Zeile ist ein eigenes Repo. Die Bibliothek steht so in der jeweiligen
Projektdatei.

| Anlauf | Sprache | Oberfläche |
|---|---|---|
| neoview | Rust | gpui |
| freshview | Rust | egui, egui_ratatui |
| editor-framework | Rust | gpui, mlua |
| slint-rust-editor | Rust | Slint |
| mojo-nuklear-editor | C | Nuklear |
| slint-editor | Mojo | Slint |
| v-gui-editor | V | GUI-Framework von V |
| sokol-nanovg-zig-editor | Zig | sokol, NanoVG |
| zed-clone | Zig | dvui |
| zed-killer | Zig | gooey |

## Was daraus wurde

Der Editor heisst `zid` und ist in Zig geschrieben. Er zeichnet über wgpu,
gebaut mit dem Vulkan-Backend. Das Layout macht Clay. Die Textdarstellung ist
eigen: Glyphen-Atlas und GPU-Renderer über FreeType.

Was nicht eigen ist, ist der interessantere Teil. Der Textpuffer und die
Ansicht kommen als `flow-core` aus dem Editor Flow Control, die
Syntaxhervorhebung aus demselben Haus über tree-sitter. Das Terminal ist die
Emulation von Ghostty, Markdown rendert zigdown, PDF zeichnet mupdf.

Damit hat sich am Vorgehen nie etwas geändert. `neoview` und `freshview`
setzen einen fremden Editor in eine eigene Hülle, und `zid` macht genau
dasselbe. Gewechselt haben die Sprache und die Tiefe, in der die Hülle selbst
gebaut ist: von einer Brücke zwischen zwei Bibliotheken bis hinunter zum
eigenen Glyphen-Atlas.

## Regeln gehören in den Code, nicht in den Prompt

`zid` hat einen eingebauten Agenten, der gegen ein lokales Sprachmodell
arbeitet, llama-server mit Qwen3-4B. Ein Agent im Editor braucht Werkzeuge,
und Werkzeuge brauchen Grenzen. Der naheliegende Weg ist, die Grenzen in den
Systemprompt zu schreiben. Mit diesem Modell hält das nicht.

Ein Beispiel. Die Regel lautete: frag nach, bevor du eine bestehende Datei
überschreibst. Das Modell hat sie umgangen. Statt `write_file` schickte es ein
`replace_text`, dessen Suchtext die halbe Datei war. Formal keine
Überschreibung, praktisch genau das.

Die Regel wanderte daraufhin in den Code, als Grössenvergleich:

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
ausserhalb liegt. Ein `..` kann dann gar keine Dateioperation erzeugen.

Solche Regeln sind reine Funktionen, und reine Funktionen kann man testen.
Eine Prompt-Zeile kann man nur hoffen.

Umgekehrt gilt dasselbe für Fähigkeiten. Die Werkzeugliste des Agenten wird
aus der Kommando-Aufzählung des Editors erzeugt. Jedes Menü und jedes
Tastenkürzel ist damit automatisch ein Werkzeug, ohne dass irgendwo eine
zweite Liste gepflegt werden müsste.

Der Systemprompt nennt danach nur noch die Rolle und eine Konvention, dass
Pfade relativ zum Projekt gemeint sind. Alles andere steht im Code, wo es
geprüft wird, statt im Prompt, wo es erbeten wird.

## Was offen bleibt

Es gibt Grenzen, die bewusst stehenbleiben. Der Editor lädt genau eine
Schriftschnitte, deshalb zeigt die Markdown-Ansicht fett und kursiv über
Farben statt über echte Schnitte. Solche Punkte stehen als Entscheidung in der
Projektdokumentation, nicht als offene Aufgabe.
