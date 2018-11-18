---
layout: rns
title: Register a name
---



The process consists of two main phases:

1. [The auction phases](#the-auction-phase)
2. [The annual rent payment](#the-storage-rent-payment)

![phases](/img/phases.png)

## The auction phase

Any user can start an auction for any available domain name. It is a public auction that respects the Vickrey auction principles.

A Vickrey auction is a type of blind auction. Bidders submit written bids without knowing the bid of the other people in the auction. The highest bidder wins but the price paid is the second-highest bid.

> The good obtained after the auction is a domain registered under the `rsk` top level domain in the **RSK Name Service running on the RSK blockchain**.

![auction-phase](/img/auction-phase.png)

The Vickrey auction process consists in 4 phases:

1. **Open**: domain’s default state.

    Any user can start an auction for any name that remains in Open state. This auction is also recorded in the blockchain, and can be accessed by any other user. 

2. **Auction**: Auction started.

    Any user can place a bid for the domain auctioned. 
    
    This phase lasts 3 days (72hs).

3. **Reveal**: Users must reveal their bets.
    
    Once the auction phase finishes, users who bade must reveal their bet. If no bids are revealed, the state returns to Open. 
    
    This phase lasts 2 days (48hs).
    
4. **Owned**: Domain is owned by the auction winner.

    After the reveal period the winner is owner of the domain, and will pay the second-highest bid. 
    
    The winner must finalize the reveal phase. When finalized, the auction records the winner as the owner of the auctioned domain name hash.

## The storage rent payment

Once the name is acquired, the owner must pay an annual rent for the value of the storage. It's called storage rent. This payment commitment is described and registered when the user bids for a domain.

Those domains the rent is not paid for and do expire will go back to the Open state and will be available to open up for auction again. 

![rent-phase](/img/rent-phase.png)

> Please note that if your domain expires it will not be automatically cleared from the registry and resolver.
