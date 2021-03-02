---
layout: rsk
title: RIF Marketplace Storage Tech Specs
tags: rif, marketplace, storage, IPFS, technical
---

**Storage Services** allows Providers of decentralized storage to register their offers, defining a capacity, a storage system (IPFS for now), and a set of subscription/pricing plans. Consumers can browse the available offers and rent the desired space to store the required content, having the option to upload it directly or simply replicate it among different Providers, if required.

The service is implemented through a **Smart Contract** that handles all Storage Offers and Agreements in a transparent and decentralized way. The **RIF Storage Pinning** service is permanently connected to the Blockchain listening to any activity on the Marketplace so it can proceed and persist the required content in an automated manner, providing simplicity and security to all parties.

## User Flows

![Storage Use Cases](/assets/img/rif-marketplace/rifmkt-storage-uc.png)

* High-level use cases with operations within the RNS Marketplace*

### [Provider] Creating new Offer

1. User goes to Marketplace and starts the creation process.
2. His account address (eq. the future Offer Id) is read from Metamask and displayed steps that he should do with already prefilled command that he should run:
```shell
$ npm install -g @rsksmart/rif-storage-pinner
$ rif-pinner init --offerId <his account address>
```
3. He installs the package and run the `init` command. The pinner DB is instantiated for given Offer ID and new Peer identity is generated. URL is displayed (or we can automatically even open the browser on the given URL) which points to Marketplace and has the PeerId as parameter.
4. On that page there is the form to fill all remaining things needed to create Offer like capacity offered and billing plans. The PeerId is already prefilled.
5. Offer is created and it is displayed to him to run `rif-pinner daemon` command that starts listening for new Agreements and connects to IPFS.

### [Provider] Funds payout

Provider can be paid only with funds that were already spent on running the Agreement. The Contract calculates the amount available to pay to the Provider..

1. The Provider goes to Marketplace and reviews his active Offers
2. Selects which Offers he wants to payout.
3. Through UI he creates a transaction that requests this payout.
4. If Agreement does not have any more funds to run, it is terminated, the space utilized by the Agreement is made again available for others to be rented and any remaining funds returned to Consumer.

### [Provider] Offer termination

The Provider can decide to terminate an Offer. The active Agreements will continue to run until they run out of funds, but Consumers can not deposit new funds to the Agreements. He needs to be aware that the termination process can take quite a while.

1. Provider goes to Marketplace and sees his Offers.
2. The Provider chooses Offer to terminate.
3. Reviews the estimate until when the Agreements will be active.
4. Submit and creates termination transaction.

### [Consumer] Creating new Agreement

1. Finds an Offer (e.g., through filtering) on RIF Marketplace that suits his requirements.
2. Configures the new Agreement.
    - Defines capacity that he will request for the data.
    - Chooses price, token, and frequency of payments.
    - Chooses amount of funds to deposit.
    - Pins an existing hash or uploads a set of files.
3. Create transaction for the newAgreement call.

### [Consumer] Depositing Funds

1. Goes to RIF Marketplace UI.
2. Selects which of his Agreements he wants to top-up.
3. Choose amounts and make the transaction.

### [Consumer] Withdraw Funds / Termination of Agreement

A Consumer can decide to withdraw funds. The maximum he can withdraw are all funds except those for the currently active period. If he would withdraw all of these funds it is practically termination of the Agreement.

1. Goes to RIF Marketplace UI.
2. Selects which of his Agreements he wants to withdraw funds from.
3. Choose amounts (limited to deposited funds minus fund for current period).
4. Make transaction.

## Architecture

### Data Structure

This is an entity relationship diagram (ERD), showing relationships between different data structures:

![Storage Entity Relationship Diagram](/assets/img/rif-marketplace/rifmkt-storage-erd.png)

### Components

![Storage Architecture](/assets/img/rif-marketplace/rifmkt-storage-arch.png)

The main **high-level components** are:

 - **RIF Marketplace UI** - the main web UI where all transactions originate.
 - **Cache** - a cache that stores the state of the Smart Contract in an easy-readable format and does some basic preprocessing on it.
 - **Pinning Service** - a service running on Provider's machine connected to IPFS node which orchestrates the pinning mechanism.
 - **Smart Contract** - a place where the state is stored and managed. This is the "origin of truth".
 - **RIF Storage.js** - a library that can abstract away lot of magic happening in order to file be pinned.


## Implementation notes

### Freeing up Offers capacity

Offer's capacity is tracked as part of the Smart Contract in order not to exceed the Provider's capacity. Hence when a new Agreement is being created, it is checked whether there is enough capacity remaining and if so the requested capacity is allocated. The capacity of the expired Agreement is returned to Offer during Payout Funds call of the Smart Contract

### Pinning Service Listening Strategies

Pinning Service listens on events that defines the service's actions like when new agreement is created (and hence something should be pinned) etc. The main source of this events is blockchain.

Unforunately, public RSKj nodes do not currently have enable for listening on events or the `eth_getLogs` call to poll for events. This requires Provider to run his own RSKj node, which is something he might not want to do and it might be an adoption barrier.

Since the Marketplace's Cache service supports WebSockets connections, and is already used in the Marketplace UI for listening on events and updates from Cache, we decided to add support for listening on events from Cache. This has become the new default option. For those that they don't trust our Cache, they can still run their own RSKj node and use that as source of the events.

## Glossary

- Actors
  - **Consumer** - actor that wants his files to be persisted in the network.
  - **Provider** - actor that offers his storage for Consumers to be used in monetary exchange.
- Entities
  - **Offer** - Offer created by Provider that announces availability of his storage space.
    - *Billing Periods* - Specifies periods how often is payment required (e.g. every month, every 2 months...).
    - *Billing Prices* - Specifies prices per byte for each Billing Period, resulting in period-price tuple.
    - *Billing Plan* - Is a period-price tuple which defines Billing Price per Billing Period.
    - *Maximum Duration* - Duration which Consumer can maximally rent the storage space for.
    - *Total Capacity* - Total capacity in bytes that Provider is offering.
    - *Available Capacity* - Capacity in bytes in given time that is left free for Consumers to use.
    - *Utilized Capacity* - Capacity in bytes which is currently being utilized by active Agreements.
    - *Location* - Optional, self proclaimed location (country) from which the Service is provided (where the data will be stored).
    - *Storage Network* - Offer is always connected to one Storage System like IPFS or Swarm.
    - *Offer Termination* - Provider can choose to discontinue his Offer. No new Agreements will be accepted, but current Agreements will be finished based on the number of Billing Periods already purchased.
  - **Data Source** - Data Source is an abstract entity that defines the data that should be stored under an Agreement. There might be different mechanisms on how files should be retrieved, updated and removed.
    - *IPFS Source* - Hash pointer to immutable data source.
    - *Contract Source* - Pointer to different smart-contract that handles the mutability (eq. adding/removing files)
  - **Agreement** - Consumer creates Agreement for a specific Provider's Offer, specifying, and the corresponding Data Source
    - *Data Reference* - Pointer to Data Source
    - *Agreement Termination* - Consumer can decide to terminate the Agreement, which will take effect after finishing of current billing period.
    - *Available Funds* - Amount of funds deposited for the Agreement, ready to be spend for the Agreement.
    - *Spent Funds* - Amount of funds already spend as a payment for the Storage service to Provider. Funds are awaiting Provider's request to payout.
    - *Deposit Funds* - In order for an Agreement to be active, it needs to have available funds for each Billing Period renewal. Consumer can therefore deposit funds.
    - *Withdraw Funds* - Customer can withdraw deposited funds, which have not be used for Billing Period renewal.
    - *Payout Funds* - Upon finishing of a Billing Period, the Provider can request the funds for the finished periods to be transferred to him.
    - *Active Agreement* - Active Agreement is that one that had sufficient funds to pay for the current Billing Period. Provider stores and provide the files specified by Data Reference. When it runs out of funds it will become "Inactive Agreement".
    - *Inactive Agreement* - Inactive Agreement is that one that either expired or was terminated by either party, therefore the Provider is not required to store and provide the files defined in Data Reference.
    - *Expired Agreement* - Expired Agreement is that one that "naturally" ran out of funds and becomes Inactive Agreement.
