---
title: Photographier la facture, vérifier les données
description: Comment Wartungsheft lit les factures de garage avec Mistral. Deux étapes au lieu d’une, contrôle dans le code, et pourquoi rien n’est enregistré avant que quelqu’un l’ait vu.
---

# Photographier la facture, vérifier les données

[Wartungsheft](https://wartungsheft.ch) est une application web pour le carnet
d’entretien des voitures, construite avec Vue 3 comme PWA installable. Le cœur
est une photo : on photographie la facture du garage, et l’application en
extrait le garage, la date, le kilométrage, le montant et les positions. Les
positions deviennent des entretiens, et à partir des entretiens l’application
calcule ce qui est dû ensuite.

Cela ressemble à un appel d’API. En pratique, c’est une chaîne dont le modèle de
langage n’est qu’un maillon. Cet article décrit quels maillons se sont ajoutés
et pourquoi.

## Deux étapes au lieu d’une

Avec Document Annotation, Mistral propose une voie en une seule étape : l’image
entre, du JSON structuré sort. Je l’ai intégrée en premier et testée avec neuf
vraies images de factures. Une sur neuf est revenue correcte. Pour les autres,
le modèle inventait des montants qui ne figuraient sur aucune facture.

La voie qui est restée a deux étapes. D’abord, `mistral-ocr-latest` lit l’image
et renvoie du Markdown, tableaux compris. Ensuite, un modèle de chat reçoit
uniquement ce texte, pas l’image, et remplit avec lui un schéma. Avec les mêmes
neuf images, les neuf étaient correctes.

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

Le schéma est un objet Zod via le Vercel AI SDK. La catégorie d’une position
est un `z.enum` avec les types d’entretien de l’application. Le modèle ne peut
donc pas inventer « Motorservice » là où l’application connaît `inspektion`.
`temperature: 0` ne rend pas les réponses correctes, mais reproductibles, et
c’est la seule façon d’observer une erreur deux fois.

`maxRetries: 0` est là parce que sinon le SDK répète lui-même deux fois, en plus
du `withRetry` maison. Ces répétitions silencieuses épuisaient la limite de
débit.

L’OCR est la partie coûteuse et lente. Son résultat est mis en cache sous le
SHA-256 de l’image, en mémoire et dans la base de données. Si la même photo est
analysée à nouveau, par exemple après une erreur, l’OCR ne la lit pas une
deuxième fois.

## Le prompt connaît la Suisse

La plupart des erreurs de la deuxième étape n’étaient pas des erreurs de
lecture. Le modèle lisait correctement et attribuait mal. Le prompt est donc
une liste de distinctions qu’une personne de Suisse fait sans réfléchir :

- « SG 218574 » est une plaque d’immatriculation de Saint-Gall, pas un
  numéro de châssis. Celui-ci a 17 caractères.
- Si une date de réparation figure sur la facture, c’est elle qui compte, pas
  la date de facturation. Le carnet d’entretien a besoin du jour des travaux.
- « Fr. » et un montant sans devise signifient CHF. EUR seulement si c’est écrit.
- « 1 014.80 » est un nombre avec un espace de séparation des milliers, pas deux nombres.

Pour le permis de circulation, c’est la même chose. Les champs sont numérotés
et libellés en quatre langues. Le prompt nomme les quatre champs qui comptent :
15 plaque de contrôle, 21 marque et type, 23 numéro de châssis, 36 première mise
en circulation. Et il dit explicitement que le numéro matricule (champ 18) et la
réception par type (champ 24) ne sont pas des numéros de châssis.

## Ce que le code vérifie

Un prompt est une demande. Ce qui peut être vérifié, le code le vérifie donc,
dans des fonctions pures avec des tests unitaires.

**Positions contre le total.** Sur beaucoup de factures, plusieurs lignes de
description se trouvent au-dessus d’une seule ligne de travail :

```
Auspuff reparieren
Auto auf Ölverlust kontrollieren
Arbeit 1.50 Std.   130.00   195.00
```

Le modèle attachait les 195 francs à chaque ligne. Sur une vraie facture, cela
a donné quatre positions de 195 francs chacune, 844.40 au total pour un total de
280.40. Le prompt explique désormais ce cas. En plus, `repairItems` recalcule :
si la somme des positions dépasse le total de plus d’un franc, elle regroupe les
positions consécutives de même montant. Mais elle ne conserve ce regroupement
que si la somme correspond ensuite. Sinon, le formulaire affiche un avertissement
et ne devine pas plus loin.

**Catégories par mot-clé.** Une liste d’expressions régulières remplace
l’attribution du modèle quand la description est univoque. « Auspuff
reparieren » est `auspuff`, quoi qu’en pense le modèle. La première
correspondance l’emporte, l’ordre est voulu : « Service mit Ölwechsel » devient
`oelwechsel`, parce que la règle plus précise se trouve avant la règle générale
pour les inspections.

**Factures en double.** La même facture arrive souvent deux fois, une fois en
photo et plus tard dans le PDF groupé du garage. Est considérée comme doublon
une facture avec le même montant au centime près et une date à 14 jours au plus
d’écart. Je ne compare volontairement pas le nom du garage : l’OCR l’écrit de
façon trop irrégulière, et les 14 jours rattrapent les factures sur lesquelles
on a lu une fois la date de réparation et une fois la date de facturation.

**La plaque d’immatriculation.** Si elle figure sur la facture, l’application
l’attribue au véhicule correspondant, même si un autre est ouvert à ce
moment-là. Les graphies comme « SG 218 574 » et « CH-SG218574 » sont
auparavant ramenées à une seule forme. Si la plaque n’appartient à aucun
véhicule, la facture n’est pas présélectionnée dans la liste de contrôle.

## Un PDF, page par page

Les garages envoient volontiers un PDF avec toutes les factures de l’année. La
première approche donnait le PDF entier au modèle en un seul appel. Avec neuf
pages, des factures manquaient ensuite, et le garage de la première figurait
sur toutes.

Maintenant, l’OCR lit toutes les pages, et le modèle analyse chaque page
séparément. Il détermine aussi le type de page : `rechnung` avec son propre
en-tête, `fortsetzung` de la précédente, ou `andere` pour les CGV et les pages
vides. Pour qu’il puisse en décider, il reçoit les 1200 premiers caractères de
la page précédente, explicitement pour le classement uniquement. Le garage, la
date et le montant ne peuvent provenir que de la page elle-même.

L’assemblage est de nouveau du code : `mergePdfPages` rattache les suites à la
facture précédente et n’y remplit que les champs vides. Les pages sont traitées
par trois en parallèle, pas toutes à la fois. Tous les appels passent par un
proxy maison, qui autorise au plus 20 requêtes par minute.

## Rien n’est enregistré avant que quelqu’un l’ait vu

Le contrôle trouve des contradictions, mais pas les erreurs plausibles. Un
kilométrage mal lu, plus élevé que le dernier, ressemble à un kilométrage
correct. C’est pourquoi aucun scan n’enregistre directement.

Dans le formulaire de facture, un scan ne remplit que les champs vides. Ce que
l’utilisateur a déjà saisi reste en place ; la devise seulement tant qu’il ne
l’a pas changée lui-même. Plusieurs photos ou un PDF groupé apparaissent sous
forme de liste de contrôle. Chaque ligne indique sa provenance (« Seite 3–4 »),
le véhicule reconnu et si la facture est déjà saisie. Les lignes en double et
les lignes peu claires sont désélectionnées.

Hors ligne, il en va de même. Sans connexion, l’application enregistre la photo
avec un marqueur. Quand la connexion revient, elle effectue le scan après coup
et, là aussi, ne remplit que les champs vides.

## Le chat prétend volontiers avoir enregistré

L’application comporte aussi un chat. Il peut créer des véhicules, saisir des
factures et des entretiens et définir le plan d’entretien, chaque fois via un
tool. Avant de saisir une facture, il affiche tous les champs et attend un
« Ja ».

Le vrai problème était l’inverse. Le modèle écrivait « Die Wartung wurde
eingetragen » sans avoir appelé le tool. Dans le chat, cela ressemble à un
succès ; dans la base de données, il n’y a rien.

Une phrase dans le prompt n’a pas réglé cela. Pire : les phrases d’exemple de
messages de succès dans le prompt, le modèle les reprenait mot pour mot, même
sans tool. Le prompt ne décrit donc plus les messages de succès que par leur
forme.

Ce qui a aidé, c’est un garde-fou dans le code. `claimsActionWithoutTool`
cherche dans le texte de la réponse un participe avec auxiliaire (« wurde
eingetragen », « habe ich gespeichert ») et vérifie si un tool d’écriture a
tourné dans la même réponse. Les tools de lecture comme `list_vehicles` ne
comptent pas. Les phrases négatives comme « noch keine Wartung eingetragen »
sont de l’information et restent à l’écart, et « Ich habe folgende Daten
erfasst: » est l’aperçu avant la confirmation, pas un succès.

Si le garde-fou se déclenche, le code relance une fois, cette fois avec
`toolChoice: 'required'`. La première version l’imposait pour toutes les
étapes. Après le résultat du tool partait alors une nouvelle requête avec
`tool_choice: "any"` vers Mistral, et elle ne revenait jamais. L’entretien était
enregistré, le chat restait bloqué sur l’indicateur de chargement, sur la page
du véhicule dans quatre essais sur six. Maintenant, la contrainte ne vaut que
pour la première étape :

```ts
prepareStep: ({ stepNumber }) => (stepNumber === 0 ? { toolChoice: 'required' } : {}),
```

Ensuite, huit essais sur huit ont abouti, dont cinq via le garde-fou.

## Dicter via la même deuxième étape

Qui préfère parler plutôt que taper peut dicter la facture. La dictée passe par
la même deuxième étape que la photo, seul le texte vient de la transcription au
lieu de l’OCR.

Quel modèle convient pour cela, je l’ai mesuré plutôt que de le reprendre de la
documentation, avec six phrases du quotidien d’un garage. Les phrases étaient
synthétisées avec Piper, pas prononcées par moi ; pour des termes techniques
comme « Lambdasonde », cela colore les chiffres. `voxtral-mini-latest` les a
transcrites avec 16,4 pour cent d’erreurs de mots. `voxtral-small-latest`
comprend l’audio et peut appeler des tools, cela semblait la voie la plus
élégante. Mais il reformulait et a répondu une fois en anglais : « Zahnriemen
mit Wasserpumpe ersetzt » est devenu « The water pump replaced the fan belt. »
La voie par transcription et schéma a en revanche trouvé les cinq champs.

## Comment c’est testé

Les règles ci-dessus sont des fonctions pures avec des tests Vitest : positions,
catégories, doublons, assemblage des pages, le garde-fou. Elles n’ont besoin ni
de réseau ni de base de données.

Les tests Playwright interceptent les appels à Mistral et fournissent des
réponses fixes. Ils vérifient ainsi le formulaire, la liste de contrôle et le
chat, sans qu’une exécution coûte de l’argent ou dépende du modèle. Un projet de
test à part envoie de vraies photos et un PDF groupé de neuf pages au vrai
modèle. Je le lance à la main, pas à chaque modification. Lors de l’une de ces
exécutions, il est apparu que des champs numériques affichaient « 214,583 km »,
parce qu’il leur manquait le formatage suisse.

## Ce qui est transposable

Rien de tout cela ne dépend des voitures. Qui veut extraire des documents avec
un modèle de langage peut en retenir ceci :

- Séparer lire et comprendre. L’OCR lit, le modèle de chat ne reçoit que du
  texte et un schéma.
- Les champs de schéma à valeurs fixes en enum, pas en texte libre.
- Écrire le prompt pour les distinctions sur lesquelles le modèle échoue, pas
  pour celles qu’il maîtrise déjà.
- Tout ce qui peut être recalculé, le recalculer dans le code et, en cas de
  contradiction, afficher un avertissement au lieu de deviner.
- Analyser les longs documents page par page et les assembler dans le code.
- Ne remplir que les champs vides et montrer avant l’enregistrement ce qui sera
  enregistré.
- Ne pas croire un modèle qui annonce un succès, mais vérifier si le tool a
  tourné.

Le code source est ouvert :
[github.com/gstrainovic/wartungsheft](https://github.com/gstrainovic/wartungsheft).
Le pipeline se trouve dans `src/services/ai.ts`, le contrôle dans
`src/services/invoice-scan.ts` et `src/services/invoice-items.ts`, le garde-fou
dans `src/services/chat-guard.ts`.
