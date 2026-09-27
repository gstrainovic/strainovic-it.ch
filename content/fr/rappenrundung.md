---
title: Arrondi à 5 centimes pour WooCommerce
description: Plugin gratuit qui arrondit le total WooCommerce à 5 centimes. La différence apparaît sur une ligne séparée sans TVA dans le panier, la commande et la facture.
---

# Arrondi à 5 centimes pour WooCommerce

**Des totaux comme sur toute facture suisse.** WooCommerce calcule au centime près,
d’où des montants comme CHF 29.91 dans la commande, la facture et la comptabilité.
Le plugin arrondit à 5 centimes et affiche la différence ouvertement sur une ligne séparée.

![Bloc checkout de WooCommerce : sous-total CHF 29.91, arrondi -CHF 0.01, total CHF 29.90, TVA de CHF 2.24 comprise](/img/rappenrundung-checkout-fr.png)

## Ce qu’il fait

- Arrondit le total du panier et du checkout à 0.05 CHF, dans le checkout classique
  comme dans les blocs panier et checkout
- La différence d’arrondi est une position séparée sans TVA ; la TVA de vos produits
  et des frais de port reste exactement celle que calcule WooCommerce
- Reste juste avec les codes promo, les frais de port et les frais d’autres plugins,
  car le total est contrôlé après chaque calcul
- La position figure dans la commande comme tout autre frais, afin que factures,
  exports et connecteurs comptables voient le même total
- Actif uniquement si la devise de la boutique est le CHF ; libellé de la ligne au choix

## Prix

Gratuit. Le plugin sera publié dans le répertoire WordPress ; d’ici là, je vous
l’envoie sur demande :

[Demander le plugin par e-mail](mailto:info@strainovic-it.ch?subject=Arrondi%20%C3%A0%205%20centimes%20pour%20WooCommerce&body=Boutique%3A%20)

Strainovic IT, Steinach SG, développement pour les PME et agences suisses depuis 2016.
Complément idéal : [connecteur de boutique KLARA](/fr/klara-shop-connector/) pour les commandes
comme factures dans KLARA, [Zefix/contrôle IDE](/fr/zefix-uid-check/) pour les clients entreprises au checkout.
