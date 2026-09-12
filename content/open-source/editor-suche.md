---
title: Sieben Monate auf der Suche nach einem Editor
description: Von VS Code über Terminal-Editoren und gpui zu Zig und Vulkan. Warum die Suche bei einem eigenen Editor endete und was dabei über KI-Agenten herauskam.
---

# Sieben Monate auf der Suche nach einem Editor

VS Code war mein einziger Editor. Er kann alles, aber er kostet. Manchmal
frisst er Prozessor und Arbeitsspeicher in einem Ausmass, das zum Tippen von
Text nicht im Verhältnis steht. Also habe ich angefangen zu suchen.

Meine Anforderungen waren überschaubar: Vorschau für PDF und Bilder,
ein Terminal, und Git im Editor. Diese drei Punkte haben die nächsten sieben
Monate bestimmt.

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

Das funktionierte. Aus dem Wrapper wurde der Wunsch nach einem eigenen
Editor, und aus `editor-framework` ein Gerüst auf gpui mit Lua für Plugins.

## Warum Rust wegfiel

An der Sprache lag es nicht, an den Übersetzungszeiten schon. Für eine
Anwendung, an der man den ganzen Tag Kleinigkeiten ändert und sofort sehen
will, war mir Rust zu langsam im Bauen. Und gpui ist Rust, also fiel es mit.

Gesucht war eine Sprache, die schnell genug ist, um es mit Zed aufzunehmen.
Go wirkte verstaubt. V ist zu wenig verbreitet, als dass man darauf etwas
aufbauen möchte, das halten soll. Zig stand gerade im Durchbruch als
ernstzunehmender Gegenentwurf zu Rust. Also Zig.

## Der Abstieg durch die Stapel

Was dann folgte, liest sich rückblickend wie eine Bewegung in eine Richtung.
Jeder Versuch lag eine Schicht tiefer als der vorige.

| Versuch | Stack |
|---|---|
| Slint in Rust, dann in Mojo | fertiges UI-Framework |
| Nuklear in C | Immediate-Mode-Bibliothek |
| Das GUI-Framework von V | fertiges UI-Framework |
| SDL2 in Zig | Fenster und Eingabe |
| Sokol, dann Sokol mit NanoVG | dünne Grafikschicht |
| Qt in Zig | fertiges UI-Framework |
| Vulkan in Zig | die Grafikschnittstelle selbst |

Die fertigen Frameworks nehmen einem Arbeit ab und geben dafür Kontrolle aus
der Hand. Bei einem Editor merkt man das an den Stellen, an denen es weh tut:
Textdarstellung, Bildlauf über grosse Dateien, und wie viel zwischen
Tastendruck und Zeichen auf dem Schirm passiert.

## Was daraus wurde

Der Editor heisst `zid`, ist in Zig geschrieben und zeichnet über Vulkan. Das
Layout macht Clay, die Textdarstellung ist eigen. Er kann, was am Anfang auf
der Liste stand: PDF-Vorschau mit Blättern, Terminal, Git. Dazu kamen Dinge,
die sich unterwegs ergaben, etwa Sprung zur Definition über zls und der Export
von Markdown-Folien nach PDF über Marp.

Und er hat einen eingebauten Agenten, der gegen ein lokales Sprachmodell
arbeitet, llama-server mit Qwen3-4B. Das ist der Teil, der mich am meisten
gelehrt hat.

## Die Lektion: Regeln gehören in den Code

Ein Agent im Editor braucht Werkzeuge, und Werkzeuge brauchen Grenzen. Der
naheliegende Weg ist, die Grenzen in den Systemprompt zu schreiben. Genau das
funktioniert nicht.

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

Der Gewinn ist nicht nur Sicherheit. Solche Regeln sind reine Funktionen, und
reine Funktionen kann man testen. Eine Prompt-Zeile kann man nur hoffen.

Umgekehrt gilt dasselbe für Fähigkeiten. Die Werkzeugliste des Agenten wird
aus der Kommando-Aufzählung des Editors erzeugt. Jedes Menü und jedes
Tastenkürzel ist damit automatisch ein Werkzeug, ohne dass irgendwo eine
zweite Liste gepflegt werden müsste.

Ein kleines Modell mit vier Milliarden Parametern hält lange Regelwerke im
Prompt nicht zuverlässig ein. Das klingt nach einer Einschränkung, hat mich
aber zur besseren Bauform gezwungen. Dieselbe Einsicht kennt man aus der
Eingabeprüfung: man bittet den Aufrufer nicht um Wohlverhalten, man prüft an
der Grenze.

## Was offen bleibt

Es gibt Grenzen, die bewusst stehenbleiben. Der Editor lädt genau eine
Schriftschnitte, deshalb zeigt die Markdown-Ansicht fett und kursiv über
Farben statt über echte Schnitte. Solche Punkte stehen als Entscheidung in der
Projektdokumentation, nicht als offene Aufgabe.

Ob das alles nötig war, um einen Editor zu haben, der PDF anzeigen kann? Nein.
Aber ich weiss jetzt, was die Stapel unter der Oberfläche kosten, und das war
vorher nur eine Vermutung.
