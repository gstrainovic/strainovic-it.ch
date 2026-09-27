---
title: Trois programmes ou un programme maison
description: Pourquoi j’ai construit moi-même mon archivage de documents avec OCR, tags et chat, plutôt que d’assembler Paperless-ngx et des extensions. Ce que l’évaluation a montré et à quoi cela ressemble six mois plus tard.
---

# Trois programmes ou un programme maison

En février 2026, je voulais me débarrasser de mes papiers : factures, contrats,
lettres médicales, documents fiscaux. Les photographier ou les téléverser en
PDF, le reste devait se faire tout seul. Avant, j’ai examiné plus de 30 projets
open source, puis j’ai construit moi-même. Cet article explique pourquoi, et à
quoi ressemble la situation six mois plus tard.

## Cinq exigences et un ordinateur portable faible

La liste était courte, et chaque point était obligatoire :

1. Téléversement de photos et de PDF avec une archive derrière
2. Reconnaissance de texte (OCR) via Mistral OCR
3. Des tags qui découlent du contenu, sans que je les pose
4. Recherche plein texte et un chat qui répond aux questions sur tous les documents
5. Une seule interface pour tout

Le point 2 venait du matériel. Mon ordinateur portable a 4 Go de mémoire
graphique et peu de RAM. MinerU en demande 16 à 32 Go, Docling a des pics de 3 à
4 Go, PaddleOCR veut un GPU correct. Une reconnaissance de texte locale de bonne
qualité était donc exclue.

## Le motif dans l’évaluation

J’ai examiné des archivages de documents comme Paperless-ngx, Papermerge,
Docspell, Mayan EDMS et Teedy, des outils RAG comme AnythingLLM, kotaemon, Open
WebUI, Dify et RAGFlow, ainsi que des ERP avec module documentaire. Chaque projet
a eu une ligne, chaque exigence une colonne.

Après quelques lignes, le motif était clair. Les archivages savaient archiver,
taguer et chercher, mais pas répondre aux questions. Les outils RAG savaient
répondre aux questions, mais rien classer : pas de dossiers, pas de tags par
document, pas d’archive que l’on parcourt. Chaque groupe avait exactement la
moitié.

## La meilleure combinaison comptait trois programmes

Le plus proche était Paperless-ngx avec deux extensions :

- **Paperless-ngx** comme archive avec recherche plein texte
- **paperless-gpt** pour Mistral OCR et les tags par modèle de langage
- **paperless-ai** pour le chat sur tous les documents

Cela fait trois programmes avec trois interfaces, trois configurations et deux
index qui doivent correspondre à l’archive. Qui téléverse un document va dans
une interface ; qui pose une question, dans une autre. C’est exactement ce que
je ne voulais pas. L’exigence 5 a été la raison de construire moi-même.

## Ce qui est né à la place

Le DMS est une interface Vue 3 avec PrimeVue sur Supabase : PostgreSQL avec
pgvector pour les vecteurs, Storage pour les fichiers, Edge Functions pour le
traitement. Un téléversement passe par quatre étapes :

```
upload-document → process-ocr → extract-data → generate-embed
```

`upload-document` calcule le SHA-256 du fichier et refuse les doublons.
`process-ocr` lit localement les PDF avec couche texte et n’envoie à Mistral OCR
que les photos et les scans. `extract-data` détermine le type de document, lit
des champs comme le montant et l’échéance selon un schéma et attribue des tags.
`generate-embed` découpe le texte en sections de 1000 caractères qui se
chevauchent de 200, et enregistre leurs vecteurs.
Si une étape échoue, l’erreur est indiquée sur le document.

La recherche combine les deux choses que PostgreSQL apporte : la recherche plein
texte allemande avec `tsvector` et la recherche vectorielle avec pgvector,
pondérées à 0,4 et 0,6. Le chat récupère par la même recherche les sections
pertinentes et indique pour chaque réponse les documents dont elle provient.

Comme tout se trouve dans une seule base de données, les droits s’appliquent
aussi à un seul endroit. Une équipe peut réserver des types de documents comme
les certificats de salaire aux seuls admins. La fonction de recherche filtre
selon les mêmes règles que la liste de documents, si bien qu’un document bloqué
n’apparaît ni dans les résultats ni comme source dans le chat. Avec trois
programmes, chaque index aurait dû reproduire les droits de l’archive.

Aucune partie de l’application n’appelle Mistral directement. Tous les appels
passent par un [proxy maison](https://github.com/gstrainovic/ai-proxy), qui
détient la clé et compte la consommation par organisation.

## Mistral OCR était-il le bon choix ?

En février, c’était le seul que l’ordinateur portable permettait. En septembre,
j’ai mesuré à nouveau : Mistral OCR contre des modèles de vision proposés en
Suisse par Infomaniak et kvant, avec des justificatifs artificiels et réels,
propres et déformés.

Sur des scans propres, les grands modèles de vision comme Kimi K2.6 et Qwen3.5
font aussi bien ou mieux, mais plus lentement et plus cher. Dès que le document
devient difficile, Mistral OCR passe devant : sur des pages déformées avec des
tableaux denses, il a trouvé 91 % des cellules, les modèles de vision 82 % au
plus. Sur des documents suisses comme les QR-factures et les certificats de
salaire, il a fait le moins d’erreurs de caractères, sur de vraies photos de
téléphone il a trouvé 97 à 99 % des champs.

Pour la protection des données, Mistral n’est pas le meilleur choix, mais un
choix admissible. Les serveurs sont en France, et la loi suisse sur la
protection des données autorise la transmission vers l’UE sans garanties
supplémentaires. Un fournisseur suisse serait meilleur pour l’emplacement. La
règle du test était donc : la qualité avant l’emplacement. Les détails feront
l’objet d’un article à part.

## À quoi cela ressemble aujourd’hui

Pour cet article, j’ai refait l’évaluation en septembre 2026. Le domaine évolue
vite : certains projets ont intégré Mistral OCR, Papermerge cherche de nouveaux
mainteneurs, OpenKM ne distribue plus sa version communautaire que sans code
source.

C’est chez Paperless-ngx que les choses ont le plus bougé. La version 3.0 est
sortie en juillet 2026 avec de l’IA intégrée : des suggestions de titre, de tags et de type de document,
et un chat sur un ou plusieurs documents, avec des liens vers les sources. Comme
modèle de langage servent Ollama ou toute API compatible OpenAI. La
reconnaissance de texte dans le cloud, Paperless-ngx ne la propose lui-même que
via Azure. Mistral OCR et les tags dès l’import, c’est toujours paperless-gpt
qui les apporte. D’après son README, paperless-ai n’est plus maintenu.

Papra, un archivage léger, a depuis juillet Mistral OCR et les tags par modèle
de langage. Il ne lui manque que le chat.

De trois programmes, on est donc passé à deux. Qui veut aujourd’hui un archivage
privé avec chat et peut vivre avec deux interfaces devrait d’abord essayer
Paperless-ngx 3 avec paperless-gpt. C’est plus mûr que mon projet ne peut le
devenir en six mois.

Construire soi-même en vaut la peine si l’une des cinq exigences n’est pas
négociable, ou si l’archivage doit tourner pour d’autres. Des organisations avec
des rôles, des droits par type de document jusque dans le chat, la consommation
par organisation : cela se greffe difficilement sur trois programmes reliés.

## Ce qui est transposable

- Écrire les exigences en colonnes avant de remplir la première ligne, et noter
  la source de chaque cellule.
- Chercher des motifs, pas le vainqueur. « Chaque groupe a la moitié » en dit
  plus que trente jugements isolés.
- Compter les combinaisons : trois programmes qui, ensemble, savent tout faire
  sont une solution à part entière avec sa propre charge de maintenance.
- Refaire l’évaluation avant une décision si elle date de plus de quelques
  mois. Dans ce domaine, beaucoup de choses changent en six mois.

Le code source est ouvert :
[github.com/gstrainovic/dms](https://github.com/gstrainovic/dms).
L’évaluation complète avec les deux états se trouve dans `docs/evaluation.md`, le
traitement dans `supabase/functions/`.
