---
layout: rsk
title: RIF Marketplace RNS Tech Specs
tags: rif, marketplace, rns, domains, technical
---

RIF Name Service (RNS) enables the use of human readable names for blockchain addresses helping users to receive transactions in personalized domains. The Name Services (RNS) Marketplace allows users to buy and sell RNS domains. Sellers can list their owned domains and set a listing price in RIF for each of them. Buyers  can browse the available Domains and purchase the one they prefer by paying the listed price. 


## User Flows

![RNS Use Cases](/assets/img/rif-marketplace/rifmkt-rns-uc.png)

* High-level use cases with operations within the RNS Marketplace*

### [Seller] Selling an RNS Domain
1. List an RNS Domain for sale by submitting two transactions.
    - Specify the price in RIF
    - *(future)* Specify payment currency among the options available.

2. Send approval Domain transfer transaction. (Transaction 1/2)
3. List in the Marketplace by submitting the Placement transaction. (Transaction 2/2)

### [Seller] Cancel a listed RNS Domain
1. Removing a listed RNS Domain from the Marketplace by submitting two transactions.
2. Send approval Domain transfer transaction. (Transaction 1/2)
3. Send the unplacement transaction to remove the Domain from the Marketplace. (Transaction 2/2)

### [Buyer] Buy an RNS Domain

A Buyer can browse the available RNS Domains, filter based on the selected criteria and purchares the desired domain.

1. Buyer goes to Marketplace and sees the listed Domains.
2. The Buyer chooses the Domain to buy.
3. Buyer reviews the listing price.
4. Submit and creates buying transaction (Transaction 1/1)


## Architecture

### Data Structure
This is an entity relationship diagram (ERD), showing relationships between different data structures:

![RNS Entity Relationship Diagram](/assets/img/rif-marketplace/rifmkt-rns-erd.png)


### Components

![RNS Architecture](/assets/img/rif-marketplace/rifmkt-rns-arch.png)

The main **high-level components** are:

The architectre is composed of service-specific **smart contracts** deployed on the RSK blockchain, a shared read-only **cache** for performance and scalability, and a **front-end (UI)** application which allows users to easily connect, browse the available services and interact with other Marketplace participants. 

 - **RIF Marketplace UI** - the main web UI where all transactions originate.
 - **Cache** - a cache that stores the state of the Smart Contract in an easy-readable format and does some basic preprocessing on it.
 - **Smart Contract** - where the state of RNS Domains buying/selling transactions is stored and managed.


## Implementation notes

### Currency Conversions

There is a `rates` service implemented in the Cache which periodically gets the currency conversion rates between all relevant currencies and tokens and stores this information in the database.

### Keys management 

Keys are kept at the user's normal Wallet (e.g., Metamask), and all transactions will be originating from RIF Marketplace UI where they will be signed using this Wallet. 

### Name Resolution
Depending on the time and the way a domain was registered by the user it may be possible that the readable domain cannot be obtained. This is due to the way on which RNS domains are stored on the blockchain as hashes and not in the readable form. In these cases the RIF Marketplace UI will display an *Unknown(0x123..)* label for those domains.

## Glossary

 - Actors
    - **Buyer** - actor that wants buy an RNS Domain on the RIF Marketplace.
    - **Seller** - actor that wants to sell an RNS Domain on the RIF Marketplace.
 - Entities
    - **RNS Domain** - An NFT (non-fungible token) which represents a unique name for account/wallet addresses.
