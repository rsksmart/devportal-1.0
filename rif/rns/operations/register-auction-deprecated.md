---
layout: rsk
title: Register a domain - Deprecated
tags: rif, rns, rif-name-service, domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

<div class="alert alert-danger">
    This contract has been <b>deprecated</b>. Please find the new registration process [here](Register-a-name).
</div>

The process consists of two main phases:

1. [The auction phase](#the-auction-phase)
2. [The annual rent payment](#rent-payment)

<img src="/assets/img/rns/phases.png" class="img-fluid" alt="phases" />

## The auction phase

Any user can start an auction for any available domain name. It is a public auction that respects the Vickrey auction principles.

A Vickrey auction is a type of blind auction. Bidders submit written bids without knowing the bid of the other people in the auction. The highest bidder wins, but the price paid is the second-highest bid.

> The good obtained after the auction is a domain registered under the `rsk` top level domain in the **RIF Name Service running on the RSK blockchain**.

<img src="/assets/img/rns/auction-phase.png" class="img-fluid" alt="auction-phase" />

The Vickrey auction process consists of 4 phases:

1. **Open**: A domain’s default state.

    Any user can start an auction for any name that remains in Open state. This auction is also recorded in the blockchain, and can be accessed by any other user.

2. **Auction**: Auction started.

    Any user can place a bid for the domain auctioned.

    This phase lasts 3 days (72 hours).

3. **Reveal**: Users must reveal their bids.

    Once the auction phase finishes, users who have bid must reveal their bid amounts. If no bids are revealed, the state returns to Open.

    This phase lasts 2 days (48 hours).

4. **Owned**: Domain is owned by the auction winner.

    After the reveal period, the winner becomes the owner of the domain, and pays the amount of the second highest bid.

    The winner must finalize the reveal phase. When finalized, the auction records the winner as the owner of the auctioned domain name hash.

## Rent payment

Once the name is acquired, the owner must pay an annual rent for the name.

When rent is not paid for a domain, it expires, and will go back to the Open state. This domain will be available to for auction again.

<img src="/assets/img/rns/rent-phase.png" class="img-fluid" alt="rent-phase" />

> Please note that if your domain expires it will not be automatically cleared from the registry and resolver.
