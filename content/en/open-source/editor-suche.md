---
title: Seven months searching for an editor
description: From VS Code through terminal editors and gpui to Zig. Eleven attempts and why tool limits for an AI agent belong in the code.
---

# Seven months searching for an editor

VS Code was my first and only editor. But its performance bothered me:
sometimes it uses an enormous amount of CPU and memory. So I started looking
for something faster.

My requirements were modest: preview for PDF and images, a terminal, and Git
in the editor.

## Terminal editors are fast, but blind

The first path led into the terminal. Speed is not a problem there. Preview
is: no image, no PDF, no rendered Markdown.

So I tried to retrofit it. In Fresh, the plugins are too limited for that. In
LazyVim it works, but not everywhere. Not every terminal cooperates, and it
wasn't stable either: LazyVim crashed on image previews in the explorer. Above
all of it hung the suspicion that sooner or later I would hit a ceiling built
into the terminal itself.

## Swap the shell instead of patching the plugin

That turned into my first own approach, and it reverses the task. If the
preview doesn't fit into the terminal, then the terminal editor has to go
into a window.

Two attempts went in this direction. `neoview` embeds Neovim via `nvim-rs`
in a UI built with gpui, the framework Zed is built with. The UI talks to
Neovim over msgpack-rpc. `freshview` does the same with the editor Fresh, only
more tightly: Fresh runs as a library in the same process, egui provides the
window, `egui_ratatui` translates in between, and mupdf draws PDF and images
in floating windows next to it.

The next attempts, `flexed` and `editor-framework`, are no longer wrappers but
scaffolds on gpui in which nothing is core and everything is a plugin. In
`editor-framework` the plugins are written in Lua and can be reloaded without
a rebuild.

## Why Rust was dropped

Zed is a good editor, but without PDF preview. And Zed is written in Rust.

Rust was too slow to build for me. `neoview` and `freshview` had their
difficulties, sluggish rendering here, a crash when closing the PDF preview
there. That might have been fixable, or maybe not. Something else decided it:
with these compile times I wasn't making progress fast enough. And gpui is
Rust, so it went too.

What I was looking for was another fast language that could compete with Zed.
Go seemed dated, V too little known, and Zig was just breaking through as a
competitor to Rust. So Zig, and there builds are pleasantly faster for me.

## Eleven attempts, eight UIs

Each row is its own repo, in the order in which they were created. Some lived
for a day, some for a week. All eleven fall within five weeks between early
March and early April 2026.

| Started | Attempt | Language | UI | Reason for stopping |
|---|---|---|---|---|
| March 2 | neoview | Rust | gpui | Build times |
| March 2 | freshview | Rust | egui, egui_ratatui | Build times |
| March 8 | flexed | Rust | gpui | Build times |
| March 9 | editor-framework | Rust | gpui, mlua | Build times |
| March 14 | slint-rust-editor | Rust | Slint | Build times |
| March 15 | mojo-nuklear-editor | Mojo, C bridge | Nuklear | Mojo unsuitable for writing editors |
| March 17 | slint-editor | Mojo | Slint via Python | Slint only reachable via Python |
| March 22 | v-gui-editor | V | V's GUI framework | Scrolling broke after adding explorer and tabs |
| March 25 | zed-clone | Zig | dvui | Crash when scrolling, large files slow |
| March 26 | sokol-nanovg-zig-editor | Zig | sokol, NanoVG | Font gone after switching to Vulkan, sokol's game loop cost CPU |
| April 2 | qt-ziged | Zig | Qt 6 via libqt6zig | Remained a technical demonstration |

On April 3, `zid` began. There has been no new attempt since.

## What came of it

The editor is called `zid` and is written in Zig. It draws via wgpu, with the
renderer locked to the Vulkan backend. Layout is done by Clay. Text rendering
is my own: glyph atlas and GPU renderer on top of FreeType.

The editor itself is my own: input, editing commands, search, line wrapping,
line numbers, key bindings. Underneath lies third-party code, and deliberately
so. Text storage is handled by `flow-core`, the core library of the editor
Flow Control, with buffer, cursor and selection types. Syntax highlighting
comes from the same house via tree-sitter. The terminal is Ghostty's
emulation, Markdown is rendered by zigdown, PDF is drawn by mupdf.

That is a different cut than in `neoview` and `freshview`. There, the whole
editor was third-party and only the shell was my own. In `zid` it is the
other way around: the editor is my own, and the third-party parts are the
building blocks underneath that have nothing to do with editing.

## Rules belong in the code, not in the prompt

`zid` has a built-in agent that works against a local language model,
llama-server with Qwen3-4B. An agent in the editor needs tools, and tools
need limits. The obvious way is to write the limits into the system prompt.
With a model of this size, though, a prompt line is only a request, and it
costs space in a context of 8192 tokens on every request. That is why the
limits live in the code. There, however, they have to be airtight.

An example. Anyone who wants to overwrite an existing file gets a
confirmation dialog. The model bypassed it on the first try: instead of
`write_file` it sent a `replace_text` whose search text was the entire file.
Formally not an overwrite, in practice exactly that.

Since then, `replace_text` also counts as an overwrite as soon as it replaces
half the file or more:

```zig
/// replace_text mit `old` = (fast) ganzer Datei ist ein verkapptes Überschreiben und
/// braucht dieselbe Bestätigung wie write_file auf eine bestehende Datei.
pub fn replaceCountsAsRewrite(file_len: usize, old_len: usize) bool {
    if (file_len == 0) return false;
    return old_len * 2 >= file_len;
}
```

The same applies to paths. Instead of telling the model to stay inside the
project, a function resolves the path and returns nothing if it lies outside.
A path that leads out of the project via `..` or as an absolute path then
cannot produce any file operation at all.

Rules like these are pure functions, and pure functions can be tested. Both
have unit tests. On top of that there is an end-to-end script that runs the
editor headless against the real model and checks the rejection path: request
an overwrite, wait for the dialog, reject, file unchanged, and a path outside
the project gets refused. A prompt line you can only hope for.

Conversely, the same holds for capabilities. The `command` tool gets its
choices generated from the editor's command enumeration. Every menu and every
keyboard shortcut is thus automatically reachable for the agent, without a
second list having to be maintained anywhere.

The question of which window a file opened by the agent appears in is also
not an instruction to the model, but a function with a unit test. The system
prompt has shrunk to three sentences: the role, the convention that paths are
meant relative to the project, and the request to answer briefly in the
user's language after tool results. Everything else lives in the code, where
it is checked, instead of in the prompt, where it is requested.

## What remains open

There are limits that stay in place deliberately. The editor loads exactly
one font face, which is why the Markdown view shows bold and italic through
colors instead of real font faces. Points like these are recorded as
decisions in the project documentation, not as open tasks.

## Where it stands today

Of the three requirements from the introduction, two are met: PDF and images
open in a tab, the terminal is built in. Git is only halfway there. The
explorer shows the status of every file, diff and blame are still missing.
Added along the way were things that weren't on the list: Markdown preview,
slides from Markdown with export to PDF, go to definition via a language
server, quick open and command palette, and the agent. It is built for Linux
and Windows.

The source code is open: [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
The eleven attempts before it are public as well, each under its name from
the table.

How the agent operates and checks the editor without a window is covered in
the next article: [An AI agent tests my editor without a window](/en/open-source/ki-testet-ohne-fenster/).
