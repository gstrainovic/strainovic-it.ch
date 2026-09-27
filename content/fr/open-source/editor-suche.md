---
title: Sept mois à la recherche d’un éditeur
description: De VS Code aux éditeurs en terminal, puis de gpui à Zig. Onze tentatives et pourquoi les limites des outils d’un agent IA ont leur place dans le code.
---

# Sept mois à la recherche d’un éditeur

VS Code a été mon premier et unique éditeur. Mais ses performances me
gênaient : parfois, il consomme énormément de processeur et de mémoire. J’ai
donc commencé à chercher quelque chose de plus rapide.

Mes exigences étaient modestes : un aperçu pour les PDF et les images, un
terminal, et Git dans l’éditeur.

## Les éditeurs en terminal sont rapides, mais aveugles

Le premier chemin menait au terminal. Là, la vitesse n’est pas un problème.
L’aperçu, si : pas d’image, pas de PDF, pas de Markdown rendu.

J’ai donc essayé de l’ajouter après coup. Dans Fresh, les plugins sont trop
limités pour cela. Dans LazyVim, cela fonctionne, mais pas partout. Tous les
terminaux ne suivent pas, et ce n’était pas stable non plus : LazyVim
plantait lors des aperçus d’images dans l’explorateur. Par-dessus tout
planait le pressentiment que je finirais par buter contre un plafond inscrit
dans le terminal lui-même.

## Changer l’enveloppe plutôt que rafistoler le plugin

C’est de là qu’est née ma première approche personnelle, et elle inverse le
problème. Si l’aperçu ne rentre pas dans le terminal, alors c’est l’éditeur
en terminal qui doit entrer dans une fenêtre.

Deux tentatives sont allées dans ce sens. `neoview` intègre Neovim via
`nvim-rs` dans une interface construite avec gpui, le framework avec lequel
Zed est aussi construit. L’interface communique avec Neovim via msgpack-rpc.
`freshview` fait la même chose avec l’éditeur Fresh, mais de manière plus
étroite : Fresh tourne comme bibliothèque dans le même processus, egui
fournit la fenêtre, `egui_ratatui` traduit entre les deux, et mupdf dessine
les PDF et les images dans des fenêtres flottantes à côté.

Les tentatives suivantes, `flexed` et `editor-framework`, ne sont plus des
wrappers, mais des squelettes sur gpui dans lesquels rien n’est noyau et
tout est plugin. Dans `editor-framework`, les plugins sont écrits en Lua et
se rechargent sans recompilation.

## Pourquoi Rust a été écarté

Zed est un bon éditeur, mais sans aperçu PDF. Et Zed est écrit en Rust.

Rust était trop lent à compiler pour moi. `neoview` et `freshview` avaient
leurs difficultés, un affichage lent ici, un plantage à la fermeture de
l’aperçu PDF là. On aurait peut-être pu les maîtriser, peut-être pas. C’est
autre chose qui a tranché : avec ces temps de compilation, je n’avançais pas
assez vite. Et gpui, c’est du Rust, donc il est parti avec.

Je cherchais un autre langage rapide, avec lequel on puisse concurrencer Zed.
Go paraissait poussiéreux, V trop peu connu, et Zig était justement en pleine
percée comme concurrent de Rust. Donc Zig, et là, la compilation est pour moi
agréablement plus rapide.

## Onze tentatives, huit interfaces

Chaque ligne est un dépôt à part, dans l’ordre dans lequel ils ont été créés.
Certains ont vécu un jour, d’autres une semaine. Les onze tiennent en cinq
semaines, entre début mars et début avril 2026.

| Début | Tentative | Langage | Interface | Raison de l’abandon |
|---|---|---|---|---|
| 2 mars | neoview | Rust | gpui | Temps de compilation |
| 2 mars | freshview | Rust | egui, egui_ratatui | Temps de compilation |
| 8 mars | flexed | Rust | gpui | Temps de compilation |
| 9 mars | editor-framework | Rust | gpui, mlua | Temps de compilation |
| 14 mars | slint-rust-editor | Rust | Slint | Temps de compilation |
| 15 mars | mojo-nuklear-editor | Mojo, pont C | Nuklear | Mojo inadapté pour écrire des éditeurs |
| 17 mars | slint-editor | Mojo | Slint via Python | Slint accessible uniquement via Python |
| 22 mars | v-gui-editor | V | Framework GUI de V | Le défilement a cassé après l’ajout de l’explorateur et des onglets |
| 25 mars | zed-clone | Zig | dvui | Plantage au défilement, gros fichiers lents |
| 26 mars | sokol-nanovg-zig-editor | Zig | sokol, NanoVG | Police disparue après le passage à Vulkan, la boucle de jeu de sokol coûtait du CPU |
| 2 avril | qt-ziged | Zig | Qt 6 via libqt6zig | Resté une démonstration technique |

Le 3 avril a commencé `zid`. Depuis, il n’y a plus eu de nouvelle tentative.

## Ce qui en est sorti

L’éditeur s’appelle `zid` et est écrit en Zig. Il dessine via wgpu, avec le
renderer fixé sur le backend Vulkan. La mise en page est assurée par Clay.
Le rendu du texte est maison : atlas de glyphes et renderer GPU basé sur
FreeType.

L’éditeur lui-même est maison : saisie, commandes d’édition, recherche,
retour à la ligne, numéros de ligne, raccourcis clavier. En dessous se trouve
du code tiers, et c’est voulu. Le stockage du texte est assuré par
`flow-core`, la bibliothèque centrale de l’éditeur Flow Control, avec les
types de tampon, de curseur et de sélection. La coloration syntaxique vient
de la même maison via tree-sitter. Le terminal est l’émulation de Ghostty,
le Markdown est rendu par zigdown, le PDF est dessiné par mupdf.

C’est un autre découpage que pour `neoview` et `freshview`. Là, tout
l’éditeur était tiers et seule l’enveloppe était maison. Avec `zid`, c’est
l’inverse : l’éditeur est maison, et ce qui est tiers, ce sont les briques en
dessous, qui n’ont rien à voir avec l’édition.

## Les règles ont leur place dans le code, pas dans le prompt

`zid` a un agent intégré qui travaille avec un modèle de langage local,
llama-server avec Qwen3-4B. Un agent dans l’éditeur a besoin d’outils, et les
outils ont besoin de limites. La voie évidente consiste à écrire les limites
dans le prompt système. Mais avec un modèle de cette taille, une ligne de
prompt n’est qu’une prière, et elle coûte de la place à chaque requête dans
un contexte de 8192 tokens. C’est pourquoi les limites sont dans le code. Là,
en revanche, elles doivent être sans faille.

Un exemple. Qui veut écraser un fichier existant reçoit une boîte de dialogue
de confirmation. Le modèle l’a contournée dès la première tentative : au lieu
de `write_file`, il a envoyé un `replace_text` dont le texte recherché était
le fichier entier. Formellement pas un écrasement, en pratique exactement
cela.

Depuis, `replace_text` compte aussi comme écrasement dès qu’il remplace la
moitié du fichier ou plus :

```zig
/// replace_text mit `old` = (fast) ganzer Datei ist ein verkapptes Überschreiben und
/// braucht dieselbe Bestätigung wie write_file auf eine bestehende Datei.
pub fn replaceCountsAsRewrite(file_len: usize, old_len: usize) bool {
    if (file_len == 0) return false;
    return old_len * 2 >= file_len;
}
```

Il en va de même pour les chemins. Au lieu de dire au modèle de rester dans
le projet, une fonction résout le chemin et ne renvoie rien s’il se trouve à
l’extérieur. Un chemin qui sort du projet via `..` ou en absolu ne peut alors
produire aucune opération sur un fichier.

De telles règles sont des fonctions pures, et les fonctions pures se testent.
Les deux ont des tests unitaires. S’y ajoute un script de bout en bout qui
fait tourner l’éditeur en headless contre le vrai modèle et vérifie le chemin
du refus : demander un écrasement, attendre la boîte de dialogue, refuser,
fichier inchangé, et un chemin hors du projet est rejeté. Une ligne de prompt,
on ne peut que l’espérer.

À l’inverse, il en va de même pour les capacités. L’outil `command` reçoit
ses choix générés à partir de l’énumération des commandes de l’éditeur. Chaque
menu et chaque raccourci clavier est ainsi automatiquement accessible à
l’agent, sans qu’une deuxième liste doive être tenue à jour quelque part.

La question de savoir dans quelle fenêtre apparaît un fichier ouvert par
l’agent n’est pas non plus une instruction au modèle, mais une fonction avec
un test unitaire. Le prompt système s’est réduit à trois phrases : le rôle,
la convention selon laquelle les chemins s’entendent relativement au projet,
et la demande de répondre brièvement dans la langue de l’utilisateur après
les résultats des outils. Tout le reste est dans le code, où c’est vérifié,
au lieu d’être dans le prompt, où c’est demandé.

## Ce qui reste ouvert

Il y a des limites qui restent en place volontairement. L’éditeur charge
exactement une graisse de police, c’est pourquoi la vue Markdown affiche le
gras et l’italique par des couleurs au lieu de vraies variantes de police. Ces
points figurent comme décisions dans la documentation du projet, pas comme
tâches ouvertes.

## Où en est le projet aujourd’hui

Sur les trois exigences de l’introduction, deux sont remplies : les PDF et
les images s’ouvrent dans un onglet, le terminal est intégré. Git n’est là
qu’à moitié. L’explorateur affiche le statut de chaque fichier, diff et blame
manquent encore. Se sont ajoutées des choses qui n’étaient pas sur la liste :
aperçu Markdown, diapositives à partir de Markdown avec export en PDF, saut à
la définition via un serveur de langage, ouverture rapide et palette de
commandes, et l’agent. Il est compilé pour Linux et Windows.

Le code source est ouvert : [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
Les onze tentatives précédentes sont également publiques, chacune sous son nom
dans le tableau.

Comment l’agent pilote et vérifie l’éditeur sans fenêtre, c’est l’objet du
prochain article : [Un agent IA teste mon éditeur sans fenêtre](/fr/open-source/ki-testet-ohne-fenster/).
