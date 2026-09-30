---
title: UID check for WooCommerce and bexio
description: WordPress plugin that validates the Swiss UID (company ID) in the WooCommerce checkout and in Contact Form 7 against the federal UID register. With a bexio version that sends the result to bexio as a contact and note.
---

# UID check for WooCommerce and bexio

**Business customers checked at checkout.** The customer types in their UID, the Swiss
company identification number. The plugin checks it with the federal UID register.
Wrong or deleted companies never get as far as buying on invoice.

![WooCommerce checkout with UID field: the UID entered is not in the UID register, the order is rejected](/img/uid-check-checkout-fehler-en.png)

## What it does

- UID field in the WooCommerce checkout (classic and checkout block) and validation in
  Contact Form 7
- Format and check digit instantly, status "active" or "deleted" via the federal UID
  web service
- UID stored in the order, always in the same notation
- If the UID register cannot be reached, the plugin does not block any order with a
  correct check digit
- Tested with Germanized for WooCommerce (free version 4.1.4): UID field, validation
  and order work as without it. Not yet tested with Germanized Pro.

## Who it is for

Swiss online shops with business customers, B2B shops with purchase on invoice,
agencies with many WooCommerce clients. Not a replacement for a credit check, but the
step before it, which today is done by hand or not at all.

## UID Check for bexio

For shops that keep their customers in bexio: every business order arrives in bexio
with a checked UID and proof.

<video controls preload="metadata" poster="/video/uid-check-bexio-en-poster.jpg" width="1920" height="1080" style="width: 100%; height: auto;">
  <source src="/video/uid-check-bexio-en.mp4" type="video/mp4">
  Your browser cannot play this video.
</video>

[Watch the video on YouTube](https://www.youtube.com/watch?v=7KYTbrFYgag)

- Queries the UID register again with every order and stores the result with its time
  in the order
- Finds the customer in bexio by email address or creates them as a company with the
  data from the UID register
- Adds a note to the contact with the check result and the time of the query, as proof
  for the order
- Transfers in the background, an error never blocks the checkout, the transfer is
  retried automatically
- Set up with one click on "Connect to bexio", no bexio app of your own needed
- Customer and order data go directly from the shop to bexio, my connection service
  only handles the login to bexio

## Price

- **UID Check Switzerland, free:** check digit and status active/deleted at checkout.
  In the [WordPress plugin directory](https://wordpress.org/plugins/strainovic-uid-check-schweiz/). If it helps you: [donate](/en/spenden/).
- **UID Check for bexio:** free for 30 days, then CHF 79 per year and shop (agencies:
  CHF 199 per year for up to 10 shops). Everything in the free version, plus the check
  result with timestamp on every order and the transfer to bexio as a contact with a
  note.
- **Need more?** For example commercial register (Zefix) data such as purpose or
  authorised signatories, filling in company name and address automatically,
  showing the VAT status, invoice purchase only for valid companies, a warning when a
  customer company is deleted. Tell me what your shop needs.

[Try it free – send me the address of your shop](mailto:info@strainovic-it.ch?subject=Try%20UID%20Check%20for%20bexio&body=Shop%20URL%3A%20)

Strainovic IT, Steinach SG, developing for Swiss shops and agencies since 2016.
Another plugin: [bexio form connector](/en/bexio-formular-connector/), website enquiries straight into bexio.
