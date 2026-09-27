---
title: 5-centime rounding for WooCommerce
description: Free plugin that rounds the WooCommerce total to 5 centimes. The difference appears as a separate line without VAT in the cart, order and invoice.
---

# 5-centime rounding for WooCommerce

**Totals like on any Swiss invoice.** WooCommerce calculates to the centime, which is
why amounts like CHF 29.91 end up in orders, invoices and the books. The plugin rounds
to 5 centimes and shows the difference openly as a separate line.

![WooCommerce checkout block: subtotal CHF 29.91, rounding -CHF 0.01, total CHF 29.90 including CHF 2.24 VAT](/img/rappenrundung-checkout-en.png)

## What it does

- Rounds the total in cart and checkout to CHF 0.05, in the classic checkout as well
  as in the cart and checkout blocks
- The rounding difference is a separate line without VAT; the VAT on your products and
  shipping stays exactly as WooCommerce calculates it
- Stays correct with coupons, shipping and fees from other plugins, because the total
  is checked after every calculation
- The line appears in the order like any fee, so invoices, exports and accounting
  connectors see the same total
- Only active when the shop currency is CHF; the line label can be chosen freely

## Price

Free. The plugin will be listed in the WordPress directory; until then I will send it
to you on request:

[Request the plugin by email](mailto:info@strainovic-it.ch?subject=5-centime%20rounding%20for%20WooCommerce&body=Shop%3A%20)

Strainovic IT, Steinach SG, developing for Swiss SMEs and agencies since 2016.
Goes well with: [KLARA shop connector](/en/klara-shop-connector/) for orders as
invoices in KLARA, [Zefix/UID check](/en/zefix-uid-check/) for business customers at checkout.
