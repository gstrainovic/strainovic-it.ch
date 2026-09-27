---
title: Rechnung fotografieren, Daten prüfen
description: Wie Wartungsheft Werkstattrechnungen mit Mistral liest. Zwei Stufen statt einer, Nachkontrolle im Code, und warum nichts gespeichert wird, bevor jemand es gesehen hat.
---

# Rechnung fotografieren, Daten prüfen

[Wartungsheft](https://wartungsheft.ch) ist eine Web-App für das Serviceheft
von Autos, gebaut mit Vue 3 als installierbare PWA. Der Kern ist ein Foto: Man
fotografiert die Werkstattrechnung, und die App liest Werkstatt, Datum,
Kilometerstand, Betrag und Positionen heraus. Aus den Positionen entstehen
Wartungen, und aus den Wartungen rechnet die App, was als Nächstes fällig ist.

Das klingt nach einem API-Aufruf. In der Praxis ist es eine Kette, in der das
Sprachmodell nur ein Glied ist. Dieser Artikel beschreibt, welche Glieder dazu
kamen und warum.

## Zwei Stufen statt einer

Mistral bietet mit Document Annotation einen Weg in einer Stufe: Bild rein,
strukturiertes JSON raus. Den habe ich zuerst eingebaut und mit neun echten
Rechnungsbildern geprüft. Eine von neun kam richtig zurück. Bei den anderen
erfand das Modell Beträge, die auf keiner Rechnung standen.

Der Weg, der blieb, hat zwei Stufen. Zuerst liest `mistral-ocr-latest` das Bild
und gibt Markdown zurück, Tabellen eingeschlossen. Danach bekommt ein
Chat-Modell nur diesen Text, nicht das Bild, und füllt damit ein Schema. Mit
denselben neun Bildern waren alle neun richtig.

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

Das Schema ist ein Zod-Objekt über das Vercel AI SDK. Die Kategorie einer
Position ist ein `z.enum` mit den Wartungsarten der App. Das Modell kann also
nicht „Motorservice" erfinden, wo die App `inspektion` kennt. `temperature: 0`
macht die Antworten nicht richtig, aber wiederholbar, und nur so lässt sich ein
Fehler zweimal beobachten.

`maxRetries: 0` steht dort, weil das SDK sonst selbst zweimal wiederholt,
zusätzlich zum eigenen `withRetry`. Diese stillen Wiederholungen brauchten das
Rate-Limit auf.

Die OCR ist der teure und langsame Teil. Ihr Ergebnis wird unter dem SHA-256
des Bildes zwischengespeichert, im Speicher und in der Datenbank. Wird dasselbe
Foto erneut ausgewertet, etwa nach einem Fehler, liest die OCR es kein zweites
Mal.

## Der Prompt kennt die Schweiz

Die meisten Fehler der zweiten Stufe waren keine Lesefehler. Das Modell las
richtig und ordnete falsch zu. Der Prompt ist deshalb eine Liste von
Unterscheidungen, die ein Mensch aus der Schweiz ohne Nachdenken trifft:

- „SG 218574" ist ein Kontrollschild aus St. Gallen, keine
  Fahrgestellnummer. Die hat 17 Zeichen.
- Steht ein Reparaturdatum auf der Rechnung, zählt dieses, nicht das
  Rechnungsdatum. Das Serviceheft braucht den Tag der Arbeit.
- „Fr." und ein Betrag ohne Währung heissen CHF. EUR nur, wenn es dasteht.
- „1 014.80" ist eine Zahl mit Tausenderlücke, nicht zwei Zahlen.

Beim Fahrzeugausweis ist es dasselbe. Die Felder sind nummeriert und
viersprachig beschriftet. Der Prompt nennt die vier Felder, die zählen: 15
Kontrollschild, 21 Marke und Typ, 23 Fahrgestellnummer, 36 erste
Inverkehrsetzung. Und er sagt ausdrücklich, dass Stammnummer (Feld 18) und
Typengenehmigung (Feld 24) keine Fahrgestellnummer sind.

## Was der Code nachprüft

Ein Prompt ist eine Bitte. Was sich prüfen lässt, prüft deshalb der Code, in
reinen Funktionen mit Unit-Tests.

**Positionen gegen das Total.** Auf vielen Rechnungen stehen mehrere
Beschreibungszeilen über einer einzigen Arbeitszeile:

```
Auspuff reparieren
Auto auf Ölverlust kontrollieren
Arbeit 1.50 Std.   130.00   195.00
```

Das Modell hängte die 195 Franken an jede Zeile. Auf einer echten Rechnung
wurden so vier Positionen zu je 195 Franken daraus, zusammen 844.40 bei einem
Total von 280.40. Der Prompt erklärt den Fall inzwischen. Zusätzlich
rechnet `repairItems` nach: Liegt die Summe der Positionen mehr als einen
Franken über dem Total, fasst sie aufeinanderfolgende Positionen mit gleichem
Betrag zusammen. Das behält sie aber nur, wenn die Summe danach passt. Sonst
zeigt das Formular einen Hinweis und rät nicht weiter.

**Kategorien per Stichwort.** Eine Liste regulärer Ausdrücke überschreibt die
Zuordnung des Modells, wenn die Beschreibung eindeutig ist. „Auspuff
reparieren" ist `auspuff`, egal was das Modell meint. Der erste Treffer
gewinnt, die Reihenfolge ist Absicht: „Service mit Ölwechsel" wird
`oelwechsel`, weil die genauere Regel vor der allgemeinen für Inspektionen
steht.

**Doppelte Rechnungen.** Dieselbe Rechnung kommt oft zweimal, einmal als Foto
und später im Sammel-PDF der Werkstatt. Als doppelt gilt eine Rechnung mit
demselben Betrag auf den Rappen und einem Datum höchstens 14 Tage daneben. Den
Werkstattnamen vergleiche ich bewusst nicht: Die OCR schreibt ihn zu
uneinheitlich, und die 14 Tage fangen Rechnungen, auf denen einmal das
Reparatur- und einmal das Rechnungsdatum gelesen wurde.

**Das Kontrollschild.** Steht es auf der Rechnung, ordnet die App sie dem
passenden Fahrzeug zu, auch wenn gerade ein anderes offen ist. Schreibweisen
wie „SG 218 574" und „CH-SG218574" werden vorher auf eine Form gebracht. Gehört
das Schild zu keinem Fahrzeug, ist die Rechnung in der Prüfliste nicht
vorausgewählt.

## Ein PDF, Seite für Seite

Werkstätten schicken gern ein PDF mit allen Rechnungen des Jahres. Der erste
Ansatz gab das ganze PDF in einem Aufruf an das Modell. Bei neun Seiten fehlten
danach Rechnungen, und die Werkstatt der ersten stand auf allen.

Jetzt liest die OCR alle Seiten, und das Modell wertet jede Seite einzeln aus.
Es bestimmt dabei auch die Art der Seite: `rechnung` mit eigenem Kopf,
`fortsetzung` der vorherigen, oder `andere` für AGB und leere Seiten. Damit es
das entscheiden kann, bekommt es die ersten 1200 Zeichen der vorherigen Seite
mit, ausdrücklich nur zur Einordnung. Werkstatt, Datum und Betrag dürfen nur
von der eigenen Seite kommen.

Das Zusammensetzen ist wieder Code: `mergePdfPages` hängt Fortsetzungen an die
vorherige Rechnung und füllt dort nur leere Felder. Die Seiten laufen zu dritt
parallel, nicht alle auf einmal. Alle Aufrufe gehen über einen eigenen Proxy,
und der lässt höchstens 20 Anfragen pro Minute zu.

## Nichts wird gespeichert, bevor es jemand gesehen hat

Die Nachkontrolle findet Widersprüche, aber keine plausiblen Fehler. Ein
falsch gelesener Kilometerstand, der höher ist als der letzte, sieht aus wie
ein richtiger. Deshalb speichert kein Scan direkt.

Im Rechnungsformular füllt ein Scan nur leere Felder. Was der Nutzer schon
eingetragen hat, bleibt stehen; die Währung nur, solange er sie nicht selbst
umgestellt hat. Mehrere Fotos oder ein Sammel-PDF erscheinen als Prüfliste. Jede
Zeile nennt ihre Herkunft („Seite 3–4"), das erkannte Fahrzeug und ob die
Rechnung schon erfasst ist. Doppelte und unklare Zeilen sind abgewählt.

Offline gilt dasselbe. Ohne Verbindung speichert die App das Foto mit einer
Markierung. Kommt die Verbindung zurück, holt sie den Scan nach und füllt auch
dann nur leere Felder.

## Der Chat behauptet gern, er habe gespeichert

In der App gibt es auch einen Chat. Er kann Fahrzeuge anlegen, Rechnungen und
Wartungen eintragen und den Wartungsplan setzen, jeweils über ein Tool. Vor dem
Eintragen einer Rechnung zeigt er alle Felder und wartet auf ein „Ja".

Das eigentliche Problem war das Gegenteil. Das Modell schrieb „Die Wartung
wurde eingetragen", ohne das Tool aufgerufen zu haben. Im Chat sieht das aus
wie Erfolg, in der Datenbank steht nichts.

Ein Satz im Prompt hat das nicht behoben. Schlimmer: Beispielsätze für
Erfolgsmeldungen im Prompt übernahm das Modell wörtlich, auch ohne Tool. Der
Prompt beschreibt Erfolgsmeldungen deshalb nur noch in ihrer Form.

Geholfen hat ein Wächter im Code. `claimsActionWithoutTool` sucht im Text der
Antwort nach einem Partizip mit Hilfsverb („wurde eingetragen", „habe ich
gespeichert") und prüft, ob in derselben Antwort ein schreibendes Tool lief.
Lesende Tools wie `list_vehicles` zählen nicht. Verneinte Sätze wie „noch
keine Wartung eingetragen" sind Auskunft und bleiben aussen vor, und „Ich
habe folgende Daten erfasst:" ist die Vorschau vor der Bestätigung, kein
Erfolg.

Schlägt der Wächter an, fragt der Code einmal nach, diesmal mit
`toolChoice: 'required'`. Die erste Fassung erzwang das für alle Schritte. Dann
lief nach dem Tool-Ergebnis eine weitere Anfrage mit `tool_choice: "any"` an
Mistral, und die kam nie zurück. Die Wartung war gespeichert, der Chat hing
in der Ladeanzeige, auf der Fahrzeugseite in vier von sechs Versuchen. Jetzt
gilt der Zwang nur im ersten Schritt:

```ts
prepareStep: ({ stepNumber }) => (stepNumber === 0 ? { toolChoice: 'required' } : {}),
```

Danach liefen acht von acht Versuchen durch, fünf davon über den Wächter.

## Diktieren über dieselbe zweite Stufe

Wer lieber spricht als tippt, kann die Rechnung diktieren. Das Diktat läuft
durch dieselbe zweite Stufe wie das Foto, nur kommt der Text aus der
Transkription statt aus der OCR.

Welches Modell dafür taugt, habe ich gemessen, nicht aus der Dokumentation
übernommen, mit sechs Sätzen aus dem Werkstattalltag. Die Sätze waren mit
Piper vertont, nicht selbst gesprochen; bei Fachwörtern wie „Lambdasonde"
färbt das die Zahlen. `voxtral-mini-latest` schrieb sie mit 16,4 Prozent
Wortfehlern mit. `voxtral-small-latest` versteht Audio und
kann Tools aufrufen, das klang nach dem eleganteren Weg. Es formulierte aber um
und antwortete einmal auf Englisch: „Zahnriemen mit Wasserpumpe ersetzt" wurde
zu „The water pump replaced the fan belt." Der Weg über Transkript und Schema
traf dagegen alle fünf Felder.

## Wie das getestet wird

Die Regeln oben sind reine Funktionen mit Vitest-Tests: Positionen,
Kategorien, Duplikate, Seiten zusammensetzen, der Wächter. Sie brauchen weder
Netz noch Datenbank.

Die Playwright-Tests fangen die Aufrufe an Mistral ab und liefern feste
Antworten. So prüfen sie Formular, Prüfliste und Chat, ohne dass ein Lauf
Geld kostet oder vom Modell abhängt. Ein eigenes Testprojekt schickt echte
Fotos und ein Sammel-PDF mit neun Seiten an das echte Modell. Das starte ich
von Hand, nicht bei jeder Änderung. Bei einem dieser Läufe fiel auf, dass Zahlenfelder „214,583 km" anzeigten, weil ihnen die
Schweizer Formatierung fehlte.

## Was sich übertragen lässt

Nichts davon hängt an Autos. Wer Dokumente mit einem Sprachmodell auslesen
will, kann das mitnehmen:

- Lesen und Verstehen trennen. Die OCR liest, das Chat-Modell bekommt nur
  Text und ein Schema.
- Schema-Felder mit festen Werten als Enum, nicht als freier Text.
- Den Prompt für die Unterscheidungen schreiben, an denen das Modell scheitert,
  nicht für die, die es schon kann.
- Alles, was sich nachrechnen lässt, im Code nachrechnen und bei Widerspruch
  einen Hinweis zeigen statt raten.
- Lange Dokumente Seite für Seite auswerten und im Code zusammensetzen.
- Nur leere Felder füllen und vor dem Speichern zeigen, was gespeichert wird.
- Einem Modell, das Erfolg meldet, nicht glauben, sondern nachsehen, ob das
  Tool lief.

Der Quelltext liegt offen:
[github.com/gstrainovic/wartungsheft](https://github.com/gstrainovic/wartungsheft).
Die Pipeline steht in `src/services/ai.ts`, die Nachkontrolle in
`src/services/invoice-scan.ts` und `src/services/invoice-items.ts`, der Wächter
in `src/services/chat-guard.ts`.
