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

Free, in the WordPress plugin directory:

[Strainovic IT Rappenrundung on wordpress.org](https://wordpress.org/plugins/strainovic-it-rappenrundung/)

Install it in WordPress under Plugins → Add New, search for “Strainovic IT Rappenrundung”,
install and activate. Updates arrive automatically through WordPress.

If the plugin helps you, I appreciate a [donation](/en/spenden/).

## More plugins for Swiss shops

- **[KLARA shop connector](/en/klara-shop-connector/):** no more retyping orders. Every
  paid order from WooCommerce or Shopware arrives in KLARA as customer and invoice, with
  VAT and the same rounded total as in the shop.
- **[AbaNinja shop connector](/en/abaninja-shop-connector/):** the same for AbaNinja.
  Address and invoice are created automatically, existing customers are recognised by
  their email address.
- **[bexio form connector](/en/bexio-formular-connector/):** enquiries from contact and
  quote forms (Contact Form 7, WPForms, Gravity Forms, Elementor) arrive in bexio as a
  contact, optionally with a quote.
- **[UID check](/en/uid-check/):** checks the UID of business customers at
  checkout against the federal UID register, with a bexio version for proof in bexio.
  Deleted or made-up companies do not get to pay by invoice.

Strainovic IT, Steinach SG, developing for Swiss SMEs and agencies since 2016.
