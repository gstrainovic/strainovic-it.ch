---
title: Un agent IA teste mon éditeur sans fenêtre
description: Développement piloté par les tests avec un agent IA sur une application de bureau native. Mode headless, JSON-RPC comme télécommande et captures d’écran que l’agent regarde lui-même.
---

# Un agent IA teste mon éditeur sans fenêtre

J’écris mon éditeur `zid` avec Claude Code. Comment j’en suis arrivé là,
je l’explique dans l’[article sur ma recherche d’un éditeur](/fr/open-source/editor-suche/).
Ici, il s’agit de la question qui se pose ensuite : comment un agent IA
vérifie-t-il une interface qu’il ne peut ni cliquer ni voir ?

Sur le web, c’est réglé. Playwright ouvre un navigateur, clique, lit le DOM
et fait des captures d’écran. `zid` n’a rien de tout cela. Il est écrit en Zig,
dessine via wgpu avec son propre renderer de texte et construit la mise en page avec Clay.
Il n’y a pas de DOM, pas d’outils de développement et pas de navigateur qui
fasse une partie du travail.

Sans aide, un agent y écrit du code d’interface à l’aveugle. À la fin, il reste
« ça devrait fonctionner », et c’est moi qui vérifiais, à la main, dans la fenêtre.
J’ai inversé cela : l’application reçoit une télécommande et des yeux, et
l’agent utilise les deux lui-même.

## Trois niveaux

Les tests se font sur trois niveaux, et chacun attrape autre chose.

- **Les tests unitaires en Zig** vérifient la logique qui n’a pas besoin d’interface. La
  navigation dans les PDF se trouve dans `ui/pdf_nav.zig`, l’historique Git dans
  `git/git_history.zig`, la boîte de dialogue des dossiers dans `ui/folder_ops.zig`. Ces modules
  ne connaissent pas Clay et s’exécutent en quelques millisecondes.
- **Les scripts E2E en Python** lancent la vraie application sans fenêtre, la pilotent
  via JSON-RPC et vérifient l’état que l’application renvoie en JSON. Il y a
  23 scripts, pour un peu plus de 4000 lignes au total.
- **Les captures d’écran** sont écrites dans un fichier par l’application sur demande. Claude les
  regarde lui-même.

## Sans fenêtre, mais avec la même boucle

La commande est `zig build run -- --headless --ai=off`. L’application n’ouvre alors
aucune fenêtre, fait le rendu dans un tampon de 1200 × 800 pixels et écoute sur
le port 9999. `--ai=off` désactive l’agent intégré et son modèle de langage
local.

L’important, c’est que le mode headless n’est pas un monde à part. Avant, il avait
sa propre boucle de 27 lignes, qui ne faisait que récupérer les résultats du travail en arrière-plan.
Le changement d’onglet, les clics dans l’explorateur, la fermeture différée des onglets et
les saisies mises en tampon n’y passaient jamais. Les bugs dans exactement ces chemins
ne se reproduisaient qu’avec une fenêtre visible, et cette fenêtre gêne quand
je travaille en parallèle sur le même bureau.

Aujourd’hui, le mode headless exécute la même boucle de frames qu’avec fenêtre. Seul est sauté
ce qui suppose une fenêtre : les événements de fenêtre, le pointeur de la souris et
l’affichage à l’écran. Au lieu d’attendre des événements, la
boucle dort 16 millisecondes. Ce qui est testé en headless est donc le même code
que celui que j’utilise dans la fenêtre.

## JSON-RPC comme télécommande

Le serveur RPC connaît 48 méthodes. Une partie pilote l’application comme un
humain : `click`, `right_click`, `move_mouse`, `scroll`, `key_press`,
`type_text`. Une autre partie lit l’état : `ui_state` renvoie les dialogues
ouverts, les menus, les onglets et le focus, `editor_state` les lignes, le curseur et
la barre de recherche, `pdf_state` la page actuelle. Avec `element_bounds`, un
test obtient la position de n’importe quel élément de mise en page au lieu de deviner
des coordonnées.

Côté Python, une seule fonction suffit :

```python
def rpc(method, params=None):
    msg = json.dumps({"jsonrpc": "2.0", "method": method, "params": params or [], "id": 1}) + "\n"
    with socket.create_connection((HOST, PORT), timeout=10) as s:
        s.sendall(msg.encode())
        data = b""
        while not data.endswith(b"\n"):
            chunk = s.recv(65536)
            if not chunk:
                break
            data += chunk
    res = json.loads(data.decode())
    if "error" in res:
        raise RuntimeError(f"{method}: {res['error']}")
    return res["result"]
```

Le vrai travail réside dans la question de savoir quel thread a le droit de faire quoi. Le
serveur RPC tourne dans son propre thread, l’interface dans le thread principal.
Si un appel RPC modifie la liste des onglets pendant que le thread principal est en train
de la dessiner, l’application plante. C’est pourquoi les saisies atterrissent dans une file d’attente
que le thread principal traite une fois par frame :

```zig
/// Vom Main-Thread pro Frame aufrufen: gepufferte Eingaben anwenden.
pub fn drainInputs(ctx: *E2EContext) void {
    var batch: [64]InputEvent = undefined;
    while (true) {
        ctx.input_mutex.lock();
        const n = @min(ctx.pending_inputs.items.len, batch.len);
        @memcpy(batch[0..n], ctx.pending_inputs.items[0..n]);
        ctx.pending_inputs.replaceRangeAssumeCapacity(0, n, &.{});
        ctx.input_mutex.unlock();
        if (n == 0) return;
        for (batch[0..n]) |ev| applyInput(ctx.ui_system, ev);
    }
}
```

Les appels en lecture continuent de tourner dans le thread du serveur. Les données partagées ont
alors besoin d’un verrou. Le statut Git dans l’explorateur n’en avait pas : le thread principal
remplaçait la map pendant qu’un test la lisait, et l’application plantait dans
`isIgnored`. Depuis, chaque accès passe par trois fonctions qui tiennent le
verrou.

## Un test se lit comme un mode d’emploi

Voici à quoi ressemble le début du test de navigation dans les PDF :

```python
cfg = os.path.join(ROOT, "tmp", "e2e_pdf_cfg")
shutil.rmtree(cfg, ignore_errors=True)
env = dict(os.environ, XDG_CONFIG_HOME=cfg)
wait_port_free()
proc = subprocess.Popen(
    ["zig", "build", "run", "--", "--headless", "--ai=off", PDF],
    cwd=ROOT, stdout=log, stderr=subprocess.STDOUT, env=env,
    start_new_session=True,  # eigene Prozessgruppe, siehe finally
)
try:
    wait_port(proc)
    settle(20)
    # ...
    check(st["pdf"], f"PDF-Tab ist aktiv (nach {time.time() - t0:.1f}s)")
    check(st["pages"] >= 3, f"Dokument hat {st['pages']} Seiten")
    to_first_page()
    expect_page(0, "Bild auf hält am Anfang bei Seite 1")
```

Chaque vérification affiche une ligne avec `PASS` ou `FAIL` et une phrase qui
dit ce qui est visé. C’est écrit pour l’agent : il lit la
sortie et sait, sans stack trace, quelle étape a échoué.

Deux détails sont nés de mauvaises expériences. Chaque exécution reçoit un répertoire de
configuration neuf, sinon l’application restaure les onglets de la dernière session,
et le test mesure un état étranger. Et le test lance l’application
dans son propre groupe de processus, pour qu’à la fin il arrête vraiment tout.

## Ce que la capture d’écran montre et que l’état ne montre pas

La méthode RPC `screenshot` écrit un PPM dans `tmp/`. Claude ne lit pas les
fichiers PPM, donc l’agent les convertit avant de les regarder :

```python
from PIL import Image
for n in ['repo', 'diff', 'file', 'empty', 'split']:
    Image.open(f'tmp/e2e_git_history_{n}.ppm').save(f'tmp/e2e_git_history_{n}.png')
```

Ensuite, il ouvre les PNG et décrit ce qu’il voit. Il n’y a pas de couche
d’évaluation séparée. Le modèle qui a écrit le code
regarde le résultat.

Certaines choses n’existent que dans l’image. Lors de la construction de la boîte de dialogue des dossiers, les nouvelles icônes
manquaient sur chaque capture d’écran après la première. Aucun champ d’état ne connaît les icônes ;
le bug se trouvait dans le budget de l’atlas d’icônes, qui n’était jamais réinitialisé
en headless.

D’autres choses manquent dans l’état uniquement parce que personne ne les a encore demandées. Une
capture d’écran de l’explorateur a montré deux bugs à la fois. Un clic sur
un fichier passait par un ancien chemin de code qui écrivait le texte dans le buffer de
l’onglet *précédent* ; le fichier précédent était ensuite considéré comme modifié et
affichait un contenu étranger. Et après la fermeture de l’onglet actif, l’éditeur
continuait d’afficher le contenu de l’onglet fermé, mais sous le nom de son
voisin.

L’état JSON ne pouvait trahir ni l’un ni l’autre, car il indiquait seulement quel
onglet est actif, pas quel buffer l’éditeur affiche en ce moment. Le correctif
est donc venu avec une extension : `get_active_tab` renvoie depuis aussi
`editor_file` et `editor_modified`.

C’est devenu un schéma. La capture d’écran trouve le bug, un nouveau
champ d’état le fixe. La fois suivante, un `check` échoue, et
plus personne n’a besoin de regarder.

Là où l’apparence elle-même compte, le test vérifie les pixels. Les
boutons sous la page PDF s’éclairent au survol. Le script
fait une capture d’écran avec la souris à côté et une avec la souris dessus,
et compare la couleur au même endroit. Il n’y a pas besoin
de bibliothèque d’images pour cela : PPM, c’est un court en-tête texte suivi d’octets RGB bruts.

## Quand le test lui-même ment

Un test rouge ne vise pas toujours l’application.

Dans le test PDF, les numéros de page sautaient entre deux appels sans qu’on
ait tourné de page. La cause se trouvait dans le serveur RPC. Il liait le port avec
`reuse_address`, ce qui, sous Linux, active aussi `SO_REUSEPORT`. Des instances
orphelines de lancements précédents continuaient donc d’écouter, le noyau répartissait
les connexions, et une partie des réponses venait d’un ancien processus avec
un ancien état. Aujourd’hui, l’application lie le port en exclusivité, et un second lancement
signale qu’il est occupé.

D’autres pièges sont plus petits, mais ils figurent tous dans la documentation du projet,
pour que l’agent n’ait pas à les redécouvrir :

- Clay conserve la bounding box d’un élément qui n’est plus
  dessiné. C’est donc `ui_state` qui dit si un dialogue est ouvert, pas
  `element_bounds`.
- L’atlas d’icônes rastérise au maximum quatre nouvelles icônes par passage. La
  fonction utilitaire pour les captures d’écran fait donc le rendu deux fois.
- Un changement de page n’apparaît qu’à la frame suivante. Les tests interrogent
  l’état dans une courte boucle, au lieu d’attendre une fois et d’espérer.

Parfois, le test trouve aussi un vrai bug qu’il déclenche lui-même.
L’écriture d’une seule capture d’écran dans `tmp/` générait environ 2000
événements de fichiers. Chacun lançait sa propre mise à jour du statut Git,
la file d’attente se remplissait, et n’importe quelle autre tâche pouvait être
rejetée, y compris les réponses du chat. Depuis, le watcher ne signale les événements identiques
qu’une seule fois, et l’application met à jour le statut Git au plus
une fois toutes les 300 millisecondes. Pour la même capture d’écran, sur 2037
événements, il en reste deux et une mise à jour.

## Le déroulement

Dans mes instructions à l’agent, le développement piloté par les tests est la
norme : d’abord un test qui échoue, puis le plus petit code qui le fait
passer, puis le nettoyage. Sur une interface, cela signifie concrètement :

1. La logique derrière la fonctionnalité passe dans un module sans Clay, avec des
   tests unitaires.
2. Pour le chemin à travers l’interface, un script E2E est créé, ou une nouvelle
   étape dans un script existant. S’il manque au script un état qu’il devrait
   vérifier, l’application reçoit d’abord la méthode RPC correspondante.
3. L’agent lance le script, lit les lignes `FAIL`, modifie le code
   et relance jusqu’à ce que tout affiche `PASS`.
4. Il regarde les captures d’écran. Si quelque chose y attire l’attention, on revient à
   l’étape 2.

Les commits contiennent le test et le code ensemble, l’ordre n’est donc pas visible
dans l’historique. Ce qui est visible, en revanche, c’est pourquoi le deuxième niveau
est nécessaire. La navigation dans les PDF est arrivée avec un module propre et
testé unitairement. Dans l’application, elle paraissait pourtant saccadée. Le correctif a apporté le
script E2E et trois causes qu’aucun test unitaire ne pouvait voir : le thread du serveur lisait
un état qui ne lui appartenait pas, la molette de la souris comptait à l’envers, et
la détection du survol de Clay ne signalait rien du tout dans la vue PDF.

## Ce qui ne tourne pas automatiquement

Aucun hook ne lance les tests après une modification, et il n’y a pas de CI.
C’est l’agent qui décide quels scripts lancer en fonction de la modification. Pour cela,
`AGENTS.md` indique pour chaque fonctionnalité quel script la couvre. Une
règle est formulée de manière contraignante : après chaque modification du code de l’agent,
`scripts/e2e_ai_tools.py` doit rester vert. Là aussi, c’est une instruction, pas
un automatisme.

Une exécution complète des 23 scripts n’est pas une étape fixe. C’est la plus grande
lacune ouverte : une modification de l’explorateur qui casse au passage l’onglet terminal
ne se remarque que lorsque quelqu’un lance le script correspondant.

## Ce qu’il faut pour sa propre application

Rien de tout cela ne dépend de Zig. Qui veut développer une application de bureau native avec un agent
a besoin à peu près de ceci :

- Un mode sans fenêtre qui parcourt la même boucle qu’avec fenêtre.
- Une interface locale pour les saisies, qui arrivent dans le thread principal, pas
  dans le thread du serveur.
- Des appels en lecture qui renvoient l’état de l’interface en JSON, et
  un qui révèle la position d’un élément.
- Des captures d’écran dans un fichier, dans un format que le modèle sait lire.
- Un état neuf à chaque exécution de test et un port qu’une seule instance peut
  tenir.
- Un modèle qui comprend les images.
- Un fichier qui indique quel script couvre quelle fonctionnalité et
  quel piège est déjà connu.

Le code source est ouvert : [github.com/gstrainovic/zid](https://github.com/gstrainovic/zid).
Les méthodes RPC se trouvent dans `src/e2e_server.zig`, les scripts sous
`scripts/e2e_*.py`.
