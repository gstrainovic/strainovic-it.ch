---
title: Photograph the invoice, check the data
description: How Wartungsheft reads garage invoices with Mistral. Two stages instead of one, checks in code, and why nothing is saved before someone has seen it.
---

# Photograph the invoice, check the data

[Wartungsheft](https://wartungsheft.ch) is a web app for a car's service book,
built with Vue 3 as an installable PWA. The core is a photo: you photograph the
garage invoice, and the app reads out the garage, date, odometer reading,
amount, and line items. The line items become maintenance entries, and from the
maintenance entries the app calculates what is due next.

That sounds like one API call. In practice it is a chain in which the language
model is only one link. This article describes which links were added and why.

## Two stages instead of one

With Document Annotation, Mistral offers a single-stage route: image in,
structured JSON out. I built that in first and tested it with nine real invoice
images. One out of nine came back correct. For the others, the model invented
amounts that appeared on no invoice.

The route that stayed has two stages. First, `mistral-ocr-latest` reads the
image and returns Markdown, tables included. Then a chat model gets only this
text, not the image, and uses it to fill a schema. With the same nine images,
all nine were correct.

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

The schema is a Zod object via the Vercel AI SDK. The category of a line item is
a `z.enum` with the app's maintenance types. So the model cannot invent
"Motorservice" where the app knows `inspektion`. `temperature: 0` does not make
the answers correct, but repeatable, and that is the only way to observe an
error twice.

`maxRetries: 0` is there because otherwise the SDK retries twice on its own, on
top of the app's own `withRetry`. These silent retries used up the rate limit.

OCR is the expensive and slow part. Its result is cached under the SHA-256 of
the image, in memory and in the database. If the same photo is processed again,
for example after an error, OCR does not read it a second time.

## The prompt knows Switzerland

Most errors in the second stage were not reading errors. The model read
correctly and assigned incorrectly. The prompt is therefore a list of
distinctions that a person from Switzerland makes without thinking:

- "SG 218574" is a license plate from St. Gallen, not a
  VIN. A VIN has 17 characters.
- If a repair date is on the invoice, that one counts, not the
  invoice date. The service book needs the day the work was done.
- "Fr." and an amount without a currency mean CHF. EUR only if it says so.
- "1 014.80" is one number with a thousands space, not two numbers.

The vehicle registration document is the same. The fields are numbered and
labeled in four languages. The prompt names the four fields that matter: 15
license plate, 21 make and model, 23 VIN, 36 first registration. And it states
explicitly that the master number (field 18) and the type approval (field 24)
are not a VIN.

## What the code checks

A prompt is a request. So whatever can be checked is checked by the code, in
pure functions with unit tests.

**Line items against the total.** Many invoices have several description lines
above a single labor line:

```
Auspuff reparieren
Auto auf Ölverlust kontrollieren
Arbeit 1.50 Std.   130.00   195.00
```

The model attached the 195 francs to every line. On a real invoice, that turned
into four line items of 195 francs each, 844.40 in total against a total of
280.40. The prompt now explains the case. In addition, `repairItems` does the
math: if the sum of the line items is more than one franc above the total, it
merges consecutive line items with the same amount. But it keeps the merge only
if the sum matches afterward. Otherwise the form shows a notice and does not
guess any further.

**Categories by keyword.** A list of regular expressions overrides the model's
assignment when the description is unambiguous. "Auspuff reparieren" is
`auspuff`, no matter what the model thinks. The first match wins, and the order
is intentional: "Service mit Ölwechsel" becomes `oelwechsel`, because the more
specific rule comes before the general one for inspections.

**Duplicate invoices.** The same invoice often arrives twice, once as a photo
and later in the garage's combined PDF. An invoice counts as a duplicate if it
has the same amount down to the centime and a date at most 14 days apart. I
deliberately do not compare the garage name: OCR writes it too inconsistently,
and the 14 days catch invoices where the repair date was read once and the
invoice date the other time.

**The license plate.** If it is on the invoice, the app assigns the invoice to
the matching vehicle, even if a different one is currently open. Spellings like
"SG 218 574" and "CH-SG218574" are normalized to one form first. If the plate
belongs to no vehicle, the invoice is not preselected in the review list.

## A PDF, page by page

Garages like to send a PDF with all invoices of the year. The first approach
passed the whole PDF to the model in one call. With nine pages, invoices were
missing afterward, and the garage from the first one appeared on all of them.

Now OCR reads all pages, and the model processes each page separately. It also
determines the page type: `rechnung` with its own header, `fortsetzung` of the
previous one, or `andere` for terms and conditions and blank pages. So that it
can decide, it gets the first 1200 characters of the previous page, explicitly
for classification only. Garage, date, and amount may only come from the page
itself.

Putting it together is code again: `mergePdfPages` appends continuations to the
previous invoice and fills only empty fields there. The pages run three at a
time in parallel, not all at once. All calls go through a proxy of my own, which
allows at most 20 requests per minute.

## Nothing is saved before someone has seen it

The checks find contradictions, but not plausible errors. A misread odometer
reading that is higher than the last one looks like a correct one. That is why
no scan saves directly.

In the invoice form, a scan fills only empty fields. What the user has already
entered stays; the currency only as long as the user has not changed it. Several
photos or a combined PDF appear as a review list. Each row states its source
("Seite 3–4"), the detected vehicle, and whether the invoice has already been
entered. Duplicate and unclear rows are deselected.

Offline, the same applies. Without a connection, the app saves the photo with a
flag. When the connection comes back, it runs the scan then and again fills only
empty fields.

## The chat likes to claim it saved

The app also has a chat. It can create vehicles, enter invoices and maintenance,
and set the maintenance schedule, each through a tool. Before entering an
invoice, it shows all fields and waits for a "Ja".

The real problem was the opposite. The model wrote "Die Wartung wurde
eingetragen" without having called the tool. In the chat that looks like
success; in the database there is nothing.

One sentence in the prompt did not fix it. Worse: the model copied example
sentences for success messages in the prompt word for word, even without a
tool. So the prompt now describes success messages only by their form.

What helped was a guard in the code. `claimsActionWithoutTool` searches the text
of the response for a participle with an auxiliary verb ("wurde eingetragen",
"habe ich gespeichert") and checks whether a writing tool ran in the same
response. Reading tools like `list_vehicles` do not count. Negated sentences like
"noch keine Wartung eingetragen" are information and stay out, and "Ich habe
folgende Daten erfasst:" is the preview before confirmation, not success.

If the guard triggers, the code asks once more, this time with
`toolChoice: 'required'`. The first version forced this for all steps. Then,
after the tool result, another request with `tool_choice: "any"` went to
Mistral, and it never came back. The maintenance entry was saved, the chat hung
on the loading indicator, on the vehicle page in four out of six attempts. Now
the requirement applies only to the first step:

```ts
prepareStep: ({ stepNumber }) => (stepNumber === 0 ? { toolChoice: 'required' } : {}),
```

After that, eight out of eight attempts went through, five of them via the
guard.

## Dictation through the same second stage

Anyone who would rather speak than type can dictate the invoice. The dictation
runs through the same second stage as the photo, except that the text comes
from the transcription instead of OCR.

Which model is suitable for this, I measured rather than took from the
documentation, with six sentences from everyday garage work. The sentences were
voiced with Piper, not spoken by me; with technical terms like "Lambdasonde",
that colors the numbers. `voxtral-mini-latest` transcribed them with a
16.4 percent word error rate. `voxtral-small-latest` understands audio and
can call tools, which sounded like the more elegant route. But it rephrased and
once answered in English: "Zahnriemen mit Wasserpumpe ersetzt" became "The
water pump replaced the fan belt." The route via transcript and schema, on the
other hand, got all five fields right.

## How this is tested

The rules above are pure functions with Vitest tests: line items, categories,
duplicates, merging pages, the guard. They need neither network nor database.

The Playwright tests intercept the calls to Mistral and return fixed responses.
That way they check the form, the review list, and the chat without a run
costing money or depending on the model. A separate test project sends real
photos and a nine-page combined PDF to the real model. I start that by hand, not
on every change. During one of these runs, it turned out that number fields
showed "214,583 km", because they lacked the Swiss formatting.

## What carries over

None of this depends on cars. If you want to extract documents with a language
model, you can take this with you:

- Separate reading from understanding. OCR reads, the chat model gets only
  text and a schema.
- Schema fields with fixed values as an enum, not as free text.
- Write the prompt for the distinctions the model fails at, not for the ones it
  already handles.
- Recalculate in code everything that can be recalculated, and on a
  contradiction show a notice instead of guessing.
- Process long documents page by page and assemble them in code.
- Fill only empty fields, and before saving show what will be saved.
- Do not believe a model that reports success; check whether the tool ran.

The source code is open:
[github.com/gstrainovic/wartungsheft](https://github.com/gstrainovic/wartungsheft).
The pipeline is in `src/services/ai.ts`, the checks in
`src/services/invoice-scan.ts` and `src/services/invoice-items.ts`, the guard
in `src/services/chat-guard.ts`.
