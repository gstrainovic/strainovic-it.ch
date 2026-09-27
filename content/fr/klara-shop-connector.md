---
title: Commandes WooCommerce et Shopware automatiquement dans KLARA
description: Plugin pour WooCommerce et Shopware 6 qui crée chaque commande comme client et facture dans KLARA, avec la TVA suisse et l’arrondi à 5 centimes. Prix unique, pas d’abonnement.
---

# Commandes WooCommerce automatiquement dans KLARA

**Plus aucune commande à ressaisir.** Dès qu’une commande est payée, le plugin crée
le client et la facture dans KLARA, avec toutes les positions, les frais de port,
les frais et le bon taux de TVA.

![Page de réglages dans l’administration WordPress (interface en allemand) : clé API, déclencheur, brouillon ou comptabilisation, IBAN, journal des commandes transmises](/img/klara-connector-einstellungen.png)

## Ce qu’il fait

- Transmet chaque commande dès qu’elle passe à « En cours » (payée) ou « Terminée »,
  en arrière-plan : le checkout reste rapide
- Cherche le client dans KLARA par son adresse e-mail et crée les nouveaux clients :
  les entreprises suisses comme entreprise avec personne de contact, les autres comme personne
- Crée la facture comme brouillon ou la comptabilise directement, avec IBAN et délai de paiement
- Attribue chaque position au taux de TVA de votre entreprise KLARA (8,1 %, 2,6 %, 3,8 %),
  arrondi à 5 centimes comme dans KLARA
- Inscrit le numéro de facture KLARA dans la commande, chaque commande une seule fois ;
  en cas d’erreur, la raison figure dans la commande et un clic la retransmet

![Note de commande dans WooCommerce (en allemand) : facture KLARA 2026003 créée, nouveau client](/img/klara-connector-bestellnotiz.png)

## Aussi pour Shopware 6

La même chose comme plugin Shopware (6.6 et 6.7) : la facture est créée dès que le
paiement est réglé ou la commande terminée. Le numéro de facture et le résultat
figurent dans les champs personnalisés de la commande.

![Administration Shopware (en allemand), commande avec les champs personnalisés numéro de facture KLARA, transmission et ID de facture](/img/klara-connector-shopware.png)

L’interface du plugin est pour l’instant en allemand.

## Pour qui

Les boutiques en ligne suisses sous WooCommerce ou Shopware qui tiennent leur
comptabilité dans KLARA. KLARA ne propose pas elle-même de connexion aux boutiques,
une demande qui revient depuis des années dans la communauté KLARA. Shopify suivra.

## Prix

- **Base :** 149 CHF une fois par boutique, mise en place comprise
- **Pro (en cours de développement) :** envoi de la facture directement par e-mail,
  ePost ou eBill, statut de paiement renvoyé à la boutique, notes de crédit en cas de remboursement
- **Agence :** 490 CHF pour jusqu’à 10 boutiques

Pas d’abonnement. Paiement seulement quand cela fonctionne dans votre boutique.

## Commander

La première version tourne dans mon environnement de test. J’installe moi-même les
premières boutiques et je vérifie avec vous les premières factures dans KLARA :

[Commander par e-mail](mailto:info@strainovic-it.ch?subject=Commande%20connecteur%20KLARA&body=Boutique%3A%20%0ACommandes%20par%20mois%20environ%3A%20%0ABrouillon%20ou%20comptabilisation%20directe%3F%20)

Strainovic IT, Steinach SG, développement pour les PME et agences suisses depuis 2016.
Autres plugins : [Zefix/contrôle IDE](/fr/zefix-uid-check/) pour les clients entreprises au checkout,
[connecteur de formulaires bexio](/fr/bexio-formular-connector/) pour les demandes du site dans bexio.
