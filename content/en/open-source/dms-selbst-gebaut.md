---
title: Three programs or one of my own
description: Why I built my document archive with OCR, tags, and chat myself instead of connecting Paperless-ngx and extensions. What the evaluation showed and what things look like half a year later.
---

# Three programs or one of my own

In February 2026, I wanted to get rid of my paperwork: invoices, contracts,
doctor's letters, tax documents. Photograph them or upload them as a PDF, and
the rest should happen by itself. Beforehand I evaluated more than 30
open-source projects, and afterward I built it myself. This article explains
why, and what things look like half a year later.

## Five requirements and a weak laptop

The list was short, and every point was mandatory:

1. Upload of photos and PDFs with an archive behind it
2. Text recognition (OCR) via Mistral OCR
3. Tags that follow from the content, without me setting them
4. Full-text search and a chat that answers questions across all documents
5. A single interface for everything

Point 2 came from the hardware. My laptop has 4 GB of graphics memory and
little RAM. MinerU needs 16 to 32 GB, Docling has peaks of 3 to 4 GB, PaddleOCR
wants a decent GPU. That ruled out local text recognition in good quality.

## The pattern in the evaluation

I evaluated document archives like Paperless-ngx, Papermerge, Docspell, Mayan
EDMS, and Teedy, RAG tools like AnythingLLM, kotaemon, Open WebUI, Dify, and
RAGFlow, plus ERP systems with a document module. Each project got a row, each
requirement a column.

After a few rows, the pattern was clear. The archives could archive, tag, and
search, but not answer questions. The RAG tools could answer questions, but not
file anything: no folders, no tags per document, no archive to browse. Each
group had exactly half.

## The best combination was three programs

The closest was Paperless-ngx with two extensions:

- **Paperless-ngx** as the archive with full-text search
- **paperless-gpt** for Mistral OCR and tags via a language model
- **paperless-ai** for the chat across all documents

That is three programs with three interfaces, three configurations, and two
indexes that have to match the archive. To upload a document, you go to one
interface; to ask a question, to another. That is exactly what I did not want.
Requirement 5 was the reason for building my own.

## What was built instead

The DMS is a Vue 3 interface with PrimeVue on Supabase: PostgreSQL with
pgvector for the vectors, Storage for the files, Edge Functions for the
processing. An upload goes through four stages:

```
upload-document → process-ocr → extract-data → generate-embed
```

`upload-document` computes the SHA-256 of the file and rejects duplicates.
`process-ocr` extracts PDFs with a text layer locally and sends only photos and
scans to Mistral OCR. `extract-data` determines the document type, extracts
fields like amount and deadline according to a schema, and assigns tags.
`generate-embed` splits the text into chunks of 1000 characters that overlap by
200, and stores their vectors.
If a stage fails, the error is recorded on the document.

The search combines both things PostgreSQL provides: German full-text search
with `tsvector` and vector search with pgvector, weighted 0.4 and 0.6. The chat
gets the matching chunks through the same search and names, for each answer,
the documents it comes from.

Because everything is in one database, the permissions also live in one place.
A team can restrict document types like salary statements to admins. The search
function filters by the same rules as the document list, so a restricted
document ends up neither in results nor as a source in the chat. With three
programs, each index would have had to replicate the archive's permissions.

No part of the application calls Mistral directly. All calls go through a
[proxy of my own](https://github.com/gstrainovic/ai-proxy), which holds the key
and counts usage per organization.

## Was Mistral OCR the right choice?

In February, it was the only one the laptop allowed. In September, I measured
again: Mistral OCR against vision models that Infomaniak and kvant offer in
Switzerland, with synthetic and real documents, clean and distorted.

On clean scans, large vision models like Kimi K2.6 and Qwen3.5 are as good or
better, but slower and more expensive. As soon as the source gets difficult,
Mistral OCR is ahead: on distorted pages with dense tables, it found 91 percent
of the cells, the vision models at most 82. On Swiss documents like QR bills
and salary statements, it made the fewest character errors, and on real phone
photos it found 97 to 99 percent of the fields.

For data protection, Mistral is not the best choice, but a permissible one.
The servers are in France, and the Swiss Data Protection Act (nDSG) allows
transfers to the EU without further safeguards. A Swiss provider would be
better in terms of location. The rule for the test was therefore: quality
before location. The details will follow in a separate article.

## What things look like today

For this article, I repeated the evaluation in September 2026. The field moves
fast: some projects have gained Mistral OCR, Papermerge is looking for new
maintainers, and OpenKM now distributes its community edition only without
source code.

The biggest change was at Paperless-ngx. Version 3.0 came out in July 2026 with
built-in AI: suggestions for title, tags, and document type, and a
chat across one or more documents, with links to the sources. The language
model is Ollama or any OpenAI-compatible API. Paperless-ngx itself offers cloud
text recognition only via Azure. Mistral OCR and tags at ingestion are still
provided by paperless-gpt. According to its README, paperless-ai is no longer
maintained.

Papra, a lean archive, has had Mistral OCR and tags via a language model since
July. It only lacks the chat.

So three programs have become two. If you want a private archive with chat
today and can live with two interfaces, try Paperless-ngx 3 with paperless-gpt
first. It is more mature than my project can become in half a year.

Building your own pays off if one of the five requirements is non-negotiable,
or if the archive is meant to run for others. Organizations with roles,
permissions per document type all the way into the chat, usage per
organization: that is hard to bolt onto three connected programs.

## What carries over

- Write down the requirements as columns before filling the first row, and
  note the source for each cell.
- Look for patterns, not for the winner. "Each group has half" says more than
  thirty individual verdicts.
- Count combinations: three programs that together can do everything are a
  solution of their own with their own maintenance effort.
- Repeat the evaluation before a decision if it is older than a few months. In
  this field, a lot changes in half a year.

The source code is open:
[github.com/gstrainovic/dms](https://github.com/gstrainovic/dms). The complete
evaluation with both versions is in `docs/evaluation.md`, the processing in
`supabase/functions/`.
