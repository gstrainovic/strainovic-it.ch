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

Gratuit, sans inscription :

[Télécharger le plugin (ZIP, version 0.4.0)](https://www.strainovic-it.ch/downloads/strainovic-it-rappenrundung-0.4.0.zip)

Installation dans WordPress sous Extensions → Ajouter → Téléverser une extension. Le plugin
sera publié dans le répertoire WordPress, les mises à jour arriveront alors automatiquement.
D’ici là, je vous informe volontiers des nouvelles versions :
[Recevoir les mises à jour par e-mail](mailto:info@strainovic-it.ch?subject=Mises%20%C3%A0%20jour%20arrondi%205%20centimes).

## Autres plugins pour les boutiques suisses

- **[Connecteur de boutique KLARA](/fr/klara-shop-connector/) :** fini la ressaisie des
  commandes. Chaque commande payée dans WooCommerce ou Shopware arrive dans KLARA comme
  client et facture, avec la TVA et le même total arrondi que dans la boutique.
- **[Connecteur de boutique AbaNinja](/fr/abaninja-shop-connector/) :** la même chose pour
  AbaNinja. Adresse et facture sont créées automatiquement, les clients existants sont
  reconnus par leur adresse e-mail.
- **[Connecteur de formulaires bexio](/fr/bexio-formular-connector/) :** les demandes des
  formulaires de contact et de devis (Contact Form 7, WPForms, Gravity Forms, Elementor)
  arrivent comme contact dans bexio, sur demande avec une offre.
- **[Contrôle IDE](/fr/uid-check/) :** vérifie l’IDE des clients entreprises
  au checkout auprès du registre IDE de la Confédération, avec une version bexio pour la
  preuve dans bexio. Les entreprises radiées ou inventées n’accèdent pas à l’achat sur facture.

Strainovic IT, Steinach SG, développement pour les PME et agences suisses depuis 2016.
