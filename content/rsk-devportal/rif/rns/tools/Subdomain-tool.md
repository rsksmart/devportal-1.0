---
menu_order: 500
menu_title: Subdomain Tool
layout: rsk
title: RNS Manager
tags: rif, rns, rif-name-service, sub-domain, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

It's a sample DApp that could be seen as a component to facilitate the adoption of RNS.

<img src="/assets/img/rns/subdomain-tool.png" class="img-fluid" alt="registry" />

Find [rns-subdomain-tool](https://github.com/rnsdomains/rns-subdomain-tool) and run your standalone app!

It shows 2 action flows:
- **Register an alias:** invite a final user to register his subdomain under a given domain.
- **Check subdomain status:** it will allow the user to check if an alias/subdomain is available or not.

:incoming_envelope: You can set the tool up to _send an email_ with a template to the user confirming the registration.

:information_source: Also the tool will save information about registrations in a _Mongo DB_.

:raised_hand: This tool includes an option to set up a maximum number of contract _calls per hour_.
