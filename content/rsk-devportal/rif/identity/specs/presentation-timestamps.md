---
menu_title: Presentations timestamps
title: Presentations timestamps
menu_order: 700
layout: rsk
tags: rif, rif-identity, timestamps, credentials, DID, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

# Presentations timestamps

### Emitting and validating presentations with timestamps

A use case of the Verifiable Credential model{% include rif-id-ref.html id="7" %} is the presentation of credentials person to person, using QR codes. This article expresses some considerations that are important when implementing verification of this kind of presentations.

* Verifiable Presentations (VP) should always be signed by a DID controller.
* VC presentations (VP) must contain a `presentation_date` and, optionally, an `expiration_date`.
* Verifier should check both dates to make sure it is a Presentation that was signed at the verification time. If no `expiration_date` is present the Verifier should have a (configurable) parameter `presentation_grace` from the `presentation_date`, for example `presentation_grace=1 minute`. This prevents replay attacks.
* A recommended verification user experience is:
  1. Verifier asks credential to Holder
  2. Holder selects a credential
  3. Holder taps on _show QR_ button
  4. Holder shows QR
  5. Verifier scans QR
  6. Verifier app verifies VP
  7. Verifier app displays presented credentials information
  8. Verifier validates information
* To prove that the person presenting the credential is really the owner of the credential, it is advisable to request that they present a verified photo of themselves, or other kind of physical proof
* The verifier app could stablish a communication channel when scanning the holder's QR and request a challenge-response authentication to prove control of the DID - a new protocol can be defined for this specific case
* It is important to remark the difference between _proving DID control_ and _proving the person is the real owner_
