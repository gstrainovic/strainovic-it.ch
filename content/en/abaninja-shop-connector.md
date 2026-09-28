---
title: WooCommerce orders automatically in AbaNinja
description: WordPress plugin that creates every WooCommerce order as an address and invoice in AbaNinja, with Swiss VAT and an exact total. CHF 149 per shop and year, setup included.
---

# WooCommerce orders automatically in AbaNinja

**No more retyping orders.** As soon as an order is paid, the plugin creates the
address and the invoice in AbaNinja, with all line items, shipping, fees and the
correct VAT rate.

![Settings page in the WordPress admin: API token, trigger, payment terms, log of transferred orders](/img/abaninja-connector-einstellungen-en.png)

## What it does

- Transfers every order as soon as it is "Processing" (paid) or "Completed",
  in the background, so the checkout stays fast
- Creates the customer as an address in AbaNinja; if AbaNinja reports an existing
  address with the same email, that one is used, no duplicates
- Creates the invoice with all line items, prices including VAT, order number as
  reference; the total in AbaNinja matches the shop to the centime
- Writes the AbaNinja invoice number into the order, each order only once;
  on an error the reason is shown in the order and one click sends it again
- Never asks for Mr or Ms: customers are created without a guessed salutation

![Order notes in WooCommerce: AbaNinja invoice RE-0001 created, order already in AbaNinja](/img/abaninja-connector-bestellnotiz-en.png)

## Who it is for

Swiss online shops on WooCommerce that keep their books in AbaNinja, and their
fiduciaries. The AbaNinja API is available from the Basic plan, the free Starter
plan does not include it.

## Price

- **Basic:** CHF 149 per shop and year, with updates and support; setup included in the first year
- **Fiduciaries and agencies:** CHF 490 per year for up to 10 shops

Cancel any year. You pay the first year only once it runs in your shop.

## Order

I set up the first shops personally and check the first invoices in AbaNinja with you:

[Order by email](mailto:info@strainovic-it.ch?subject=Order%20AbaNinja%20shop%20connector&body=Shop%3A%20%0AAbaNinja%20plan%3A%20%0AOrders%20per%20month%2C%20roughly%3A%20)

Strainovic IT, Steinach SG, developing for Swiss SMEs and agencies since 2016.
More plugins: [KLARA shop connector](/en/klara-shop-connector/),
[5-centime rounding for WooCommerce](/en/rappenrundung/), [UID check](/en/zefix-uid-check/).
