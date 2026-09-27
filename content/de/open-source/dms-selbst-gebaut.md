---
title: Drei Programme oder ein eigenes
description: Warum ich meine Dokumentenablage mit OCR, Tags und Chat selbst gebaut habe, statt Paperless-ngx und Erweiterungen zu verbinden. Was die Evaluation zeigte und wie es ein halbes Jahr später aussieht.
---

# Drei Programme oder ein eigenes

Im Februar 2026 wollte ich meine Papiere loswerden: Rechnungen, Verträge,
Arztbriefe, Steuerunterlagen. Fotografieren oder als PDF hochladen, der Rest
sollte von selbst gehen. Vorher habe ich über 30 Open-Source-Projekte geprüft,
danach selbst gebaut. Dieser Artikel erklärt, warum, und wie die Lage ein
halbes Jahr später aussieht.

## Fünf Anforderungen und ein schwacher Laptop

Die Liste war kurz, und jeder Punkt war Pflicht:

1. Upload von Fotos und PDFs mit einem Archiv dahinter
2. Texterkennung (OCR) über Mistral OCR
3. Tags, die sich aus dem Inhalt ergeben, ohne dass ich sie setze
4. Volltextsuche und ein Chat, der Fragen über alle Dokumente beantwortet
5. Eine einzige Oberfläche für alles

Punkt 2 kam von der Hardware. Mein Laptop hat 4 GB Grafikspeicher und wenig
RAM. MinerU braucht 16 bis 32 GB, Docling hat Spitzen von 3 bis 4 GB, PaddleOCR
will eine ordentliche GPU. Lokale Texterkennung in guter Qualität fiel damit
weg.

## Das Muster in der Evaluation

Geprüft habe ich Dokumentenablagen wie Paperless-ngx, Papermerge, Docspell,
Mayan EDMS und Teedy, RAG-Werkzeuge wie AnythingLLM, kotaemon, Open WebUI,
Dify und RAGFlow, dazu ERP-Systeme mit Dokumentenmodul. Jedes Projekt bekam
eine Zeile, jede Anforderung eine Spalte.

Nach ein paar Zeilen war das Muster klar. Die Ablagen konnten archivieren,
taggen und suchen, aber keine Fragen beantworten. Die RAG-Werkzeuge konnten
Fragen beantworten, aber nichts ablegen: keine Ordner, keine Tags pro
Dokument, kein Archiv, das man durchblättert. Jede Gruppe hatte genau die
Hälfte.

## Die beste Kombination waren drei Programme

Am nächsten kam Paperless-ngx mit zwei Erweiterungen:

- **Paperless-ngx** als Archiv mit Volltextsuche
- **paperless-gpt** für Mistral OCR und Tags per Sprachmodell
- **paperless-ai** für den Chat über alle Dokumente

Das sind drei Programme mit drei Oberflächen, drei Konfigurationen und zwei
Indizes, die zum Archiv passen müssen. Wer ein Dokument hochlädt, geht in die
eine Oberfläche; wer eine Frage stellt, in eine andere. Genau das wollte ich
nicht. Anforderung 5 war der Grund für den Eigenbau.

## Was stattdessen entstand

Das DMS ist eine Vue-3-Oberfläche mit PrimeVue auf Supabase: PostgreSQL mit
pgvector für die Vektoren, Storage für die Dateien, Edge Functions für die
Verarbeitung. Ein Upload läuft durch vier Stufen:

```
upload-document → process-ocr → extract-data → generate-embed
```

`upload-document` rechnet den SHA-256 der Datei und lehnt Doppelte ab.
`process-ocr` liest PDFs mit Textebene lokal aus und schickt nur Fotos und
Scans an Mistral OCR. `extract-data` bestimmt den Dokumenttyp, liest Felder
wie Betrag und Frist nach einem Schema aus und vergibt Tags. `generate-embed`
zerlegt den Text in Abschnitte von 1000 Zeichen, die sich um 200 überlappen,
und speichert ihre Vektoren.
Schlägt eine Stufe fehl, steht der Fehler am Dokument.

Die Suche kombiniert beides, was PostgreSQL mitbringt: die deutsche
Volltextsuche mit `tsvector` und die Vektorsuche mit pgvector, gewichtet mit
0.4 und 0.6. Der Chat holt sich über dieselbe Suche die passenden Abschnitte
und nennt zu jeder Antwort die Dokumente, aus denen sie stammt.

Weil alles in einer Datenbank liegt, gelten auch die Rechte an einer Stelle.
Ein Team kann Dokumenttypen wie Lohnausweise nur für Admins freigeben. Die
Suchfunktion filtert nach denselben Regeln wie die Dokumentliste, deshalb
landet ein gesperrtes Dokument weder in Treffern noch als Quelle im Chat. Mit
drei Programmen hätte jeder Index die Rechte des Archivs nachbilden müssen.

Kein Teil der Anwendung ruft Mistral direkt. Alle Aufrufe gehen über einen
[eigenen Proxy](https://github.com/gstrainovic/ai-proxy), der den Schlüssel
hält und den Verbrauch pro Organisation zählt.

## War Mistral OCR die richtige Wahl?

Im Februar war es die einzige, die der Laptop zuliess. Im September habe ich
nachgemessen: Mistral OCR gegen Vision-Modelle, die Infomaniak und kvant in
der Schweiz anbieten, mit künstlichen und echten Belegen, sauber und verzerrt.

Bei sauberen Scans sind grosse Vision-Modelle wie Kimi K2.6 und Qwen3.5 gleich
gut oder besser, aber langsamer und teurer. Sobald die Vorlage schwierig
wird, liegt Mistral OCR vorn: Bei verzerrten Seiten mit dichten Tabellen fand
es 91 Prozent der Zellen, die Vision-Modelle höchstens 82. Bei Schweizer
Dokumenten wie QR-Rechnungen und Lohnausweisen machte es die wenigsten
Zeichenfehler, bei echten Handyfotos fand es 97 bis 99 Prozent der Felder.

Beim Datenschutz ist Mistral nicht die beste, sondern eine zulässige Wahl.
Die Server stehen in Frankreich, das Schweizer Datenschutzgesetz erlaubt die
Übermittlung in die EU ohne weitere Garantien. Ein Schweizer Anbieter wäre
beim Standort besser. Die Regel für den Test war deshalb: Qualität vor
Standort. Die Einzelheiten kommen in einem eigenen Artikel.

## Wie es heute aussieht

Für diesen Artikel habe ich die Evaluation im September 2026 wiederholt. Das
Feld bewegt sich schnell: Einige Projekte haben Mistral OCR dazubekommen,
Papermerge sucht neue Maintainer, OpenKM verteilt seine Community-Fassung nur
noch ohne Quellcode.

Am meisten hat sich bei Paperless-ngx getan. Version 3.0 kam im Juli 2026
mit eingebauter KI heraus: Vorschläge für Titel, Tags und Dokumenttyp und ein
Chat über ein oder mehrere Dokumente, mit Links zu den Quellen. Als
Sprachmodell dient Ollama oder jede OpenAI-kompatible API. Texterkennung in
der Cloud bietet Paperless-ngx selbst nur über Azure an. Mistral OCR und Tags
schon beim Einlesen bringt weiterhin paperless-gpt. paperless-ai wird laut
seinem README nicht mehr gepflegt.

Papra, eine schlanke Ablage, hat seit Juli Mistral OCR und Tags per
Sprachmodell. Ihr fehlt nur der Chat.

Aus drei Programmen sind also zwei geworden. Wer heute eine private Ablage mit
Chat will und mit zwei Oberflächen leben kann, sollte zuerst Paperless-ngx 3
mit paperless-gpt ausprobieren. Das ist reifer, als mein Projekt es
in einem halben Jahr werden kann.

Selbst bauen lohnt sich, wenn eine der fünf Anforderungen nicht verhandelbar
ist, oder wenn die Ablage für andere laufen soll. Organisationen mit Rollen,
Rechte pro Dokumenttyp bis in den Chat, Verbrauch pro Organisation: Das lässt
sich an drei verbundene Programme nur schwer anbauen.

## Was sich übertragen lässt

- Anforderungen als Spalten aufschreiben, bevor man die erste Zeile füllt,
  und zu jeder Zelle die Quelle notieren.
- Nach Mustern suchen, nicht nach dem Sieger. „Jede Gruppe hat die Hälfte"
  sagt mehr als dreissig einzelne Urteile.
- Kombinationen zählen: Drei Programme, die zusammen alles können, sind eine
  eigene Lösung mit eigenem Wartungsaufwand.
- Die Evaluation vor einer Entscheidung wiederholen, wenn sie älter als ein
  paar Monate ist. In diesem Feld ändert sich in einem halben Jahr viel.

Der Quelltext liegt offen:
[github.com/gstrainovic/dms](https://github.com/gstrainovic/dms). Die
vollständige Evaluation mit beiden Ständen steht in `docs/evaluation.md`, die
Verarbeitung in `supabase/functions/`.
