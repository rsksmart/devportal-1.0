---
menu_order: 400
menu_title: RNS Manager
layout: rsk
title: RNS Manager
tags: rif, rns, rif-name-service, manager, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

The [RNS Manager](https://manager.rns.rifos.org) is a simple tool that interacts with RNS Smart Contracts via Metamask. It has the following methods:
- Manage auction with Registrar contract
    - Check domain status with `entries`
    - Start an auction with `startAuction` ERC-677
    - Make a bid with `shaBid` and `newBid`
    - Reveal a bid with `unsealBid`
    - Finalize an auction with `finalizeAuction`
- Manage rent payment with Deed contract
    - Check rent status with `owner`, `tokenQuantity`, `expirationDate` and `canPayRent`
    - Pay the rent with `payRent` ERC-677
- Manage domain ownership with Registry contract
    - Manage `owner`
    - Manage `resolver`
    - Manage `TTL`
    - Manage sub nodes
- Manage domain resolutions with Resolver contract implementing `addr` field
    - Resolve a name with `addr`
    - Change address resolution with `setAddr`

For further information go to the [site](https://manager.rns.rifos.org).

This project is open source: [fork and PR!](https://github.com/rnsdomains/RNS-manager)
