---
title: Zefix/contrôle IDE pour WooCommerce et les formulaires WordPress
description: Plugin WordPress qui vérifie le numéro IDE suisse au checkout et dans les formulaires, et remplit la raison sociale et l’adresse depuis Zefix. Précommande, paiement à la livraison.
---

# Zefix/contrôle IDE pour WooCommerce et les formulaires WordPress

**Les clients entreprises vérifiés en quelques secondes.** Le client saisit son
numéro IDE, le plugin le vérifie auprès de la Confédération, récupère la raison sociale
et l’adresse dans Zefix et remplit le formulaire. Les entreprises inexistantes ou
radiées n’arrivent même pas jusqu’à l’achat sur facture.

![Checkout WooCommerce avec champ IDE : le numéro saisi n’est pas inscrit au registre IDE, la commande est refusée](/img/uid-check-checkout-fehler-fr.png)

## Ce qu’il fait

- Champ IDE dans le checkout WooCommerce et dans les formulaires de contact, de devis
  et d’inscription (Contact Form 7, WPForms, Gravity Forms, Elementor Forms)
- Chiffre de contrôle et format immédiatement, statut « actif » ou « radié » via le
  service web IDE de la Confédération
- Raison sociale, forme juridique, siège et adresse depuis Zefix, automatiquement dans le formulaire
- Assujettissement à la TVA visible, numéro IDE enregistré dans la commande et le compte client
- Achat sur facture réservé aux entreprises valides
- Alerte de mutation : client radié ou déménagé, vous êtes le premier informé

## Pour qui

Les boutiques en ligne suisses avec des clients entreprises, les boutiques B2B avec
achat sur facture, les agences qui ont beaucoup de clients WooCommerce. Pas un
substitut à une vérification de solvabilité, mais l’étape qui la précède et qui se
fait aujourd’hui à la main, ou pas du tout.

## Strainovic UID Check pour bexio

La première version Pro est prête : un plugin WooCommerce pour les boutiques qui
gèrent leurs clients dans bexio. Chaque commande d’entreprise arrive dans bexio avec
un numéro IDE vérifié et une preuve.

<video controls preload="metadata" poster="/video/uid-check-bexio-poster.jpg" width="1920" height="1080" style="width: 100%; height: auto;">
  <source src="/video/uid-check-bexio.mp4" type="video/mp4">
  Votre navigateur ne peut pas lire cette vidéo.
</video>

*Vidéo en allemand, avec la boutique de test et le plugin en version allemande.*

- Vérifie le numéro IDE au checkout auprès du registre IDE de la Confédération, les
  numéros radiés ou erronés sont refusés au checkout
- Recherche le client dans bexio par son adresse e-mail ou le crée comme entreprise
  avec les données du registre IDE
- Complète le contact par une note avec le résultat de la vérification et l’heure de
  la requête, comme preuve pour la commande
- Transmet en arrière-plan, une erreur ne bloque jamais le checkout, la transmission
  est répétée automatiquement
- Mise en service d’un clic sur « Se connecter à bexio », sans application bexio propre
- Les données des clients et des commandes vont directement de la boutique à bexio,
  mon service de connexion se charge uniquement de la connexion à bexio

**30 jours d’essai gratuit, ensuite 79 CHF par an et par boutique.** Envoyez-moi
l’adresse de votre boutique :

[Essayer gratuitement par e-mail](mailto:info@strainovic-it.ch?subject=Essai%20Strainovic%20UID%20Check%20pour%20bexio&body=URL%20de%20la%20boutique%3A%20)

## Prix

- **UID Check pour bexio :** 30 jours d’essai gratuit, ensuite 79 CHF par an et par boutique
- **Base :** gratuit dans le répertoire des plugins WordPress (chiffre de contrôle, statut actif/radié)
- **Pro :** 79 CHF par an et par site, 199 CHF par an pour les agences avec jusqu’à 10 sites
  (remplissage depuis Zefix, statut TVA, autorisation de l’achat sur facture, alerte de mutation)

## Précommander

Je développe dès la première commande. Livraison quatre semaines après votre
commande, vous ne payez qu’à la livraison. Dites-moi quelle boutique vous exploitez
et ce qui manque aujourd’hui dans votre checkout :

[Précommander par e-mail](mailto:info@strainovic-it.ch?subject=Pr%C3%A9commande%20Zefix%2Fcontr%C3%B4le%20IDE&body=URL%20de%20la%20boutique%3A%20%0APlugin%20de%20formulaire%20ou%20WooCommerce%3A%20%0AQue%20doit%20r%C3%A9soudre%20le%20plugin%20chez%20vous%3F%20)

Strainovic IT, Steinach SG, développement pour les boutiques et agences suisses depuis 2016.
Deuxième plugin en précommande : [connecteur de formulaires bexio](/fr/bexio-formular-connector/), les demandes du site directement dans bexio.
