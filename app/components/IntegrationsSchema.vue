<script setup lang="ts">
// Ein echter Ablauf aus den Referenzen, nicht als Zierde. Gezeigt wird das,
// was Text schlecht zeigt: Richtung und Rueckweg. Der Kasten rechts ist das
// selbst gebaute Stueck, deshalb traegt nur er die Akzentfarbe.
</script>

<template>
  <figure class="m-0">
    <div class="schema">
      <div class="schema-kasten">
        <p class="schema-rolle">Bestandssystem</p>
        <p class="schema-name">ERP beim Kunden</p>
        <p class="schema-detail">Rechnungen liegen als PDF vor und müssen von Hand erfasst werden.</p>
      </div>

      <div class="schema-mitte">
        <div class="schema-pfeil">
          <span class="schema-marke">Rechnungs-PDF</span>
          <!-- quer, ab 52rem -->
          <svg class="schema-quer" viewBox="0 0 100 12" aria-hidden="true">
            <path d="M0 6h92" />
            <path d="M86 2l6 4-6 4z" class="schema-spitze" />
          </svg>
          <!-- hoch, auf schmalen Schirmen -->
          <svg class="schema-hoch" viewBox="0 0 12 40" aria-hidden="true">
            <path d="M6 0v32" />
            <path d="M2 26l4 6 4-6z" class="schema-spitze" />
          </svg>
        </div>
        <div class="schema-pfeil schema-pfeil-zurueck">
          <svg class="schema-quer" viewBox="0 0 100 12" aria-hidden="true">
            <path d="M8 6h92" />
            <path d="M14 2l-6 4 6 4z" class="schema-spitze" />
          </svg>
          <svg class="schema-hoch" viewBox="0 0 12 40" aria-hidden="true">
            <path d="M6 8v32" />
            <path d="M2 14l4-6 4 6z" class="schema-spitze" />
          </svg>
          <span class="schema-marke">strukturiertes JSON</span>
        </div>
      </div>

      <div class="schema-kasten schema-kasten-eigen">
        <p class="schema-rolle">selbst gebaut</p>
        <p class="schema-name">Dienst auf Azure</p>
        <p class="schema-detail">Liest den Beleg aus, ordnet Positionen zu und gibt sie strukturiert zurück.</p>
      </div>
    </div>

    <figcaption class="mt-4 max-w-prose text-sm leading-relaxed text-gedaempft">
      Damit verbucht das ERP Eingangsrechnungen selbst, statt sie abtippen zu
      lassen. Die Anwender lernen dem Dienst ihre eigenen Rechnungsbilder an.
      Gebaut mit TypeScript, Node.js und Prisma.
    </figcaption>
  </figure>
</template>

<style scoped>
.schema {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: stretch;
  border: 1px solid var(--c-linie);
  background-color: var(--c-flaeche);
}

.schema-kasten {
  padding: 1.1rem 1.25rem;
  border-top: 1px solid var(--c-linie);
}

.schema-kasten:first-child {
  border-top: 0;
}

.schema-kasten-eigen {
  border-left: 3px solid var(--c-akzent);
}

.schema-rolle {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-gedaempft);
}

.schema-kasten-eigen .schema-rolle {
  color: var(--c-akzent);
}

.schema-name {
  margin-top: 0.25rem;
  font-weight: 600;
}

.schema-detail {
  margin-top: 0.4rem;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--c-gedaempft);
}

/* Mitte: auf schmalen Schirmen zeigen die Pfeile nach unten. */
.schema-mitte {
  display: grid;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-top: 1px solid var(--c-linie);
  background-color: var(--c-papier);
}

.schema-pfeil {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.schema-pfeil svg {
  fill: none;
  stroke: var(--c-linie-stark);
  stroke-width: 1.5;
}

/* Schmale Schirme: der Ablauf laeuft nach unten, also die hohen Pfeile. */
.schema-quer {
  display: none;
}

.schema-hoch {
  width: 0.75rem;
  height: 2.5rem;
}

.schema-spitze {
  fill: var(--c-linie-stark);
  stroke: none;
}

.schema-marke {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  white-space: nowrap;
  color: var(--c-gedaempft);
}

@media (min-width: 52rem) {
  .schema {
    grid-template-columns: 1fr auto 1fr;
  }

  .schema-kasten {
    border-top: 0;
  }

  .schema-mitte {
    border-top: 0;
    border-inline: 1px solid var(--c-linie);
    align-content: center;
    min-width: 15rem;
  }

  .schema-hoch {
    display: none;
  }

  .schema-quer {
    display: block;
    flex: 1;
    height: 0.75rem;
    min-width: 3rem;
  }
}
</style>
