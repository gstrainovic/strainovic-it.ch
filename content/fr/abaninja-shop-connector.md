---
title: Commandes WooCommerce automatiquement dans AbaNinja
description: Plugin WordPress qui crée chaque commande WooCommerce comme adresse et facture dans AbaNinja, avec la TVA suisse et un total exact. 149 CHF par boutique et par an, mise en place comprise.
---

# Commandes WooCommerce automatiquement dans AbaNinja

**Plus aucune commande à ressaisir.** Dès qu’une commande est payée, le plugin crée
l’adresse et la facture dans AbaNinja, avec toutes les positions, les frais de port,
les frais et le bon taux de TVA.

![Page de réglages dans l’administration WordPress : jeton API, déclencheur, délai de paiement, journal des commandes transmises](/img/abaninja-connector-einstellungen-fr.png)

## Ce qu’il fait

- Transmet chaque commande dès qu’elle passe à « En cours » (payée) ou « Terminée »,
  en arrière-plan : le checkout reste rapide
- Crée le client comme adresse dans AbaNinja ; si AbaNinja signale une adresse
  existante avec le même e-mail, c’est celle-ci qui est utilisée, sans doublons
- Crée la facture avec toutes les positions, prix TVA comprise, numéro de commande
  en référence ; le total dans AbaNinja correspond au centime près à celui de la boutique
- Inscrit le numéro de facture AbaNinja dans la commande, chaque commande une seule fois ;
  en cas d’erreur, la raison figure dans la commande et un clic la retransmet
- Ne demande jamais Monsieur ou Madame : les clients sont créés sans formule d’appel devinée

![Notes de commande dans WooCommerce : facture AbaNinja RE-0001 créée, commande déjà présente dans AbaNinja](/img/abaninja-connector-bestellnotiz-fr.png)

## Pour qui

Les boutiques en ligne suisses sous WooCommerce qui tiennent leur comptabilité dans
AbaNinja, et leurs fiduciaires. L’API d’AbaNinja est disponible dès le plan Basic,
le plan gratuit Starter ne la propose pas.

## Prix

- **Base :** 149 CHF par boutique et par an, mises à jour et support compris ; mise en place comprise la première année
- **Fiduciaires et agences :** 490 CHF par an pour jusqu’à 10 boutiques

Résiliable chaque année. Vous ne payez la première année que lorsque tout fonctionne dans votre boutique.

## Commander

J’installe moi-même les premières boutiques et je vérifie avec vous les premières
factures dans AbaNinja :

[Commander par e-mail](mailto:info@strainovic-it.ch?subject=Commande%20connecteur%20AbaNinja&body=Boutique%3A%20%0APlan%20AbaNinja%3A%20%0ACommandes%20par%20mois%20environ%3A%20)

Strainovic IT, Steinach SG, développement pour les PME et agences suisses depuis 2016.
Autres plugins : [connecteur de boutique KLARA](/fr/klara-shop-connector/),
[arrondi à 5 centimes pour WooCommerce](/fr/rappenrundung/), [Contrôle IDE](/fr/uid-check/).
