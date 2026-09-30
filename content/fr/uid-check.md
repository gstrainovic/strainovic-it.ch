---
title: Contrôle IDE pour WooCommerce et bexio
description: Plugin WordPress qui vérifie le numéro IDE suisse au checkout WooCommerce et dans Contact Form 7 auprès du registre IDE de la Confédération. Avec une version bexio qui transmet le résultat à bexio comme contact et note.
---

# Contrôle IDE pour WooCommerce et bexio

**Les clients entreprises vérifiés au checkout.** Le client saisit son numéro IDE, le
plugin le vérifie auprès du registre IDE de la Confédération. Les entreprises
inexistantes ou radiées n’arrivent même pas jusqu’à l’achat sur facture.

![Checkout WooCommerce avec champ IDE : le numéro saisi n’est pas inscrit au registre IDE, la commande est refusée](/img/uid-check-checkout-fehler-fr.png)

## Ce qu’il fait

- Champ IDE dans le checkout WooCommerce (classique et bloc de checkout) et
  vérification dans Contact Form 7
- Format et chiffre de contrôle immédiatement, statut « actif » ou « radié » via le
  service web IDE de la Confédération
- Numéro IDE enregistré dans la commande, toujours dans la même écriture
- Si le registre IDE est injoignable, le plugin ne bloque aucune commande dont le
  chiffre de contrôle est correct
- Testé avec Germanized for WooCommerce (version gratuite 4.1.4) : champ IDE,
  vérification et commande fonctionnent comme sans. Pas encore testé avec Germanized Pro.

## Pour qui

Les boutiques en ligne suisses avec des clients entreprises, les boutiques B2B avec
achat sur facture, les agences qui ont beaucoup de clients WooCommerce. Pas un
substitut à une vérification de solvabilité, mais l’étape qui la précède et qui se
fait aujourd’hui à la main, ou pas du tout.

## Contrôle IDE pour bexio

Pour les boutiques qui gèrent leurs clients dans bexio : chaque commande d’entreprise
arrive dans bexio avec un numéro IDE vérifié et une preuve.

<video controls preload="metadata" poster="/video/uid-check-bexio-fr-poster.jpg" width="1920" height="1080" style="width: 100%; height: auto;">
  <source src="/video/uid-check-bexio-fr.mp4" type="video/mp4">
  Votre navigateur ne peut pas lire cette vidéo.
</video>

[Voir la vidéo sur YouTube](https://www.youtube.com/watch?v=dOBMshp2Nrs)

- Consulte à nouveau le registre IDE à chaque commande et enregistre le résultat avec
  l’heure dans la commande
- Recherche le client dans bexio par son adresse e-mail ou le crée comme entreprise
  avec les données du registre IDE
- Complète le contact par une note avec le résultat de la vérification et l’heure de
  la requête, comme preuve pour la commande
- Transmet en arrière-plan, une erreur ne bloque jamais le checkout, la transmission
  est répétée automatiquement
- Mise en service d’un clic sur « Se connecter à bexio », sans application bexio propre
- Les données des clients et des commandes vont directement de la boutique à bexio,
  mon service de connexion se charge uniquement de la connexion à bexio

## Prix

- **Contrôle IDE Suisse, gratuit :** chiffre de contrôle et statut actif/radié au
  checkout. Dans le [répertoire des plugins WordPress](https://wordpress.org/plugins/strainovic-uid-check-schweiz/). S’il vous est utile : [faire un don](/fr/spenden/).
- **Contrôle IDE pour bexio :** 30 jours d’essai gratuit, ensuite 79 CHF par an et
  par boutique (agences : 199 CHF par an pour jusqu’à 10 boutiques). Tout ce que
  contient la version gratuite, plus le résultat horodaté dans chaque commande et la
  transmission à bexio comme contact avec une note.
- **Besoin de plus ?** Par exemple des données du registre du commerce (Zefix) comme
  le but ou les personnes autorisées à signer, remplir automatiquement la raison sociale et
  l’adresse, afficher le statut TVA, réserver l’achat sur facture aux entreprises
  valides, avertir lorsqu’un client est radié. Écrivez-moi ce dont votre boutique a
  besoin.

[Essai gratuit – envoyez-moi l’adresse de votre boutique](mailto:info@strainovic-it.ch?subject=Essai%20Contr%C3%B4le%20IDE%20pour%20bexio&body=URL%20de%20la%20boutique%3A%20)

Strainovic IT, Steinach SG, développement pour les boutiques et agences suisses depuis 2016.
Autre plugin : [connecteur de formulaires bexio](/fr/bexio-formular-connector/), les demandes du site directement dans bexio.
