<script setup lang="ts">
useSeoMeta({
  title: 'Open Source — Goran Strainovic',
  description:
    'Öffentliche eigene Projekte und Beiträge an fremden: ein Editor in Zig mit Vulkan, Werkzeuge rund um KI-Modelle, und Änderungen an einem Prüfwerkzeug für Lieferkettenangriffe.'
})

const gh = 'https://github.com/gstrainovic/'

const beitraege = [
  {
    name: 'Cobenian/shai-hulud-detect',
    was: 'Sechs übernommene Änderungen an einem Prüfwerkzeug für die npm-Lieferkettenangriffe: Lauffähigkeit unter Git Bash und WSL, Windows-Zeilenenden, zwei Korrekturen an der Erkennung von Datenabfluss.',
    url: 'https://github.com/Cobenian/shai-hulud-detect/commits?author=gstrainovic'
  }
]

const eigene = [
  {
    name: 'zid',
    sprache: 'Zig',
    was: 'Code-Editor mit eigener Oberfläche: wgpu über das Vulkan-Backend, Clay für das Layout, eigener Glyphen-Atlas und GPU-Text-Renderer über FreeType. Textpuffer und Syntaxhervorhebung kommen von flow-core, das Terminal von Ghostty, PDF von mupdf. Dazu ein eingebauter Agent gegen ein lokales Sprachmodell.'
  },
  {
    name: 'freshview',
    sprache: 'Rust',
    was: 'Der Terminal-Editor Fresh als Bibliothek in einer egui-Oberfläche, mit PDF- und Bildvorschau über mupdf in schwebenden Fenstern.'
  },
  {
    name: 'neoview',
    sprache: 'Rust',
    was: 'Neovim eingebettet in eine Oberfläche aus gpui, dem Framework hinter Zed.'
  },
  {
    name: 'editor-framework',
    sprache: 'Rust',
    was: 'Gerüst für einen Editor auf gpui, mit Lua für Plugins.'
  },
  {
    name: 'v-gui-editor',
    sprache: 'V',
    was: 'Editor-Prototyp im GUI-Framework der Sprache V, mit Explorer, Tableiste und Statusleiste.'
  },
  {
    name: 'shai-hulud-detect-rust',
    sprache: 'Rust',
    was: 'Eigene Rust-Fassung des Prüfwerkzeugs, dessen Bash-Original ich mitgepflegt habe.'
  },
  {
    name: 'agent-session-manager',
    sprache: 'Rust',
    was: 'Sitzungsverwalter für Claude Code im Terminal.'
  },
  {
    name: 'ai-proxy',
    sprache: 'TypeScript',
    was: 'Hält einen Modellschlüssel serverseitig, zählt Nutzung und setzt Tarifgrenzen durch.'
  }
]
</script>

<template>
  <article>
    <header class="border-b-2 border-akzent pb-6">
      <h1 class="text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-semibold tracking-[-0.02em]">Open Source</h1>
      <p class="mt-3 max-w-prose text-gedaempft">
        Was hier steht, lässt sich nachprüfen. Anders als die Kundenarbeit auf
        der Referenzseite ist der Quelltext offen und der Verlauf einsehbar.
      </p>
    </header>

    <h2 class="mt-12 font-mono text-xs text-gedaempft">Aufgeschrieben</h2>
    <div class="mt-5 border-t border-linie py-7">
      <h3 class="font-semibold">
        <NuxtLink to="/open-source/editor-suche/" class="text-akzent underline underline-offset-4">
          Sieben Monate auf der Suche nach einem Editor
        </NuxtLink>
      </h3>
      <p class="mt-2 max-w-prose leading-relaxed">
        Von VS Code über Terminal-Editoren und gpui zu Zig und Vulkan. Warum
        fertige Oberflächen-Frameworks bei einem Editor an Grenzen stossen, und
        was dabei über Werkzeuggrenzen für KI-Agenten herauskam.
      </p>
    </div>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">Beiträge an fremden Projekten</h2>
    <ol class="mt-5">
      <li v-for="b in beitraege" :key="b.name" class="border-t border-linie py-7">
        <h3 class="font-mono text-sm font-semibold">{{ b.name }}</h3>
        <p class="mt-2 max-w-prose leading-relaxed">{{ b.was }}</p>
        <p class="mt-2 text-sm">
          <a :href="b.url" rel="noopener" class="text-akzent underline underline-offset-4">Beitragsverlauf ansehen</a>
        </p>
      </li>
    </ol>

    <h2 class="mt-16 font-mono text-xs text-gedaempft">Eigene Projekte</h2>
    <ol class="mt-5">
      <li
        v-for="p in eigene"
        :key="p.name"
        class="grid gap-x-6 gap-y-2 border-t border-linie py-7 sm:grid-cols-[8.5rem_1fr]"
      >
        <p class="pt-1 font-mono text-xs text-akzent">{{ p.sprache }}</p>
        <div>
          <h3 class="font-mono text-sm font-semibold">
            <a :href="gh + p.name" rel="noopener" class="underline underline-offset-4">{{ p.name }}</a>
          </h3>
          <p class="mt-2 max-w-prose leading-relaxed">{{ p.was }}</p>
        </div>
      </li>
    </ol>
  </article>
</template>
