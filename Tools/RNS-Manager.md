---
layout: rns
title: RNS Manager
---

The [RNS Manager](https://manager.rns.rsk.co) is a simple tool that interacts with RNS Smart Contracts via Metamask. It has the following methods:
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

For further information go to the [site](https://manager.rns.rsk.co).

This project is open source: [fork and PR!](https://github.com/rnsdomains/RNS-manager)
