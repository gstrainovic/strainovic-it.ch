---
title: WooCommerce and Shopware orders automatically in KLARA
description: Plugin for WooCommerce and Shopware 6 that creates every order as a customer and invoice in KLARA, with Swiss VAT and 5-centime rounding. CHF 149 per shop and year, setup included.
---

# WooCommerce orders automatically in KLARA

**No more retyping orders.** As soon as an order is paid, the plugin creates the
customer and the invoice in KLARA, with all line items, shipping, fees and the
correct VAT rate.

![Settings page in the WordPress admin: API key, trigger, draft or booking, IBAN, log of transferred orders](/img/klara-connector-einstellungen-en.png)

## What it does

- Transfers every order as soon as it is "Processing" (paid) or "Completed",
  in the background, so the checkout stays fast
- Looks up the customer in KLARA by email address and creates new customers: Swiss
  companies as a company with contact person, everyone else as a person
- Creates the invoice as a draft or books it directly, with IBAN and payment terms
- Maps every line item to the VAT rate of your KLARA company (8.1 %, 2.6 %, 3.8 %),
  rounded to 5 centimes as in KLARA
- Writes the KLARA invoice number into the order, each order only once;
  on an error the reason is shown in the order and one click sends it again

![Order notes in WooCommerce: KLARA invoice created, new customer](/img/klara-connector-bestellnotiz-en.png)

## Also for Shopware 6

The same as a Shopware plugin (6.6 and 6.7): the invoice is created as soon as the
payment is paid or the order is completed. Invoice number and result appear in the
custom fields of the order.

![Shopware administration, order with the custom fields KLARA invoice number, transfer and invoice ID](/img/klara-connector-shopware-en.png)

## Who it is for

Swiss online shops on WooCommerce or Shopware that keep their books in KLARA. KLARA
itself offers no shop integration, something the KLARA community has been asking for
for years. Shopify will follow.

## Price

- **Basic:** CHF 149 per shop and year, with updates and support; setup included in the first year
- **Pro (in progress):** send the invoice directly by email, ePost or eBill, payment
  status back to the shop, credit notes on refunds
- **Agency:** CHF 490 per year for up to 10 shops

Cancel any year. You pay the first year only once it runs in your shop.

## Order

The first version runs in my test environment. I set up the first shops personally
and check the first invoices in KLARA with you:

[Order by email](mailto:info@strainovic-it.ch?subject=Order%20KLARA%20shop%20connector&body=Shop%3A%20%0AOrders%20per%20month%2C%20roughly%3A%20%0ADraft%20or%20book%20directly%3F%20)

Strainovic IT, Steinach SG, developing for Swiss SMEs and agencies since 2016.
More plugins: [Zefix/UID check](/en/zefix-uid-check/) for business customers at checkout,
[bexio form connector](/en/bexio-formular-connector/) for website enquiries in bexio.
