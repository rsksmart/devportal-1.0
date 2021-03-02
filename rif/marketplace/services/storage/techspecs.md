---
layout: rsk
title: RIF Marketplace Storage Tech Specs
tags: rif, marketplace, storage, IPFS, technical
---

**Storage Services** allows Providers of decentralized storage to register their offers, defining a capacity, a storage system (**IPFS** only), and a set of subscription/pricing plans. Consumers can browse the available offers and rent the desired space to store the required content, having the option to upload it directly or simply replicate it among different Providers, if required.

The service is implemented through a **Smart Contract** that handles all Storage Offers and Agreements in a transparent and decentralized way. The **RIF Storage Pinning** service is permanently connected to the Blockchain listening to any activity on the Marketplace so it can proceed and persist the required content in an automated manner, providing simplicity and security to all parties.

See [Glossary](#glossary) for explanation of terms.

## User Flows

![Storage Use Cases](/assets/img/rif-marketplace/rifmkt-storage-uc.png)

* High-level use cases with operations within the RNS Marketplace*

### Creating new Offer [Provider]

1. User goes to Marketplace and starts the creation process.
2. User account address (eq. the future Offer Id) is read from Metamask and the displayed steps to be carried out, including the prefilled commands to run:

```shell
$ npm install -g @rsksmart/rif-storage-pinner
$ rif-pinner init --offerId <user account address>
```
3. User installs the package and run the `init` command. The pinner DB is instantiated for the given Offer ID and a new Peer identity is generated. The URL is displayed (or can be opened automatically in the browser on the given URL) which points to Marketplace and has the PeerId as parameter.
4. On that page, there is the form to fill all remaining things needed to create Offer like capacity offered and billing plans. The PeerId is already prefilled.
5. Offer is created and it is displayed to the user to run `rif-pinner daemon` command that starts listening for new Agreements and connects to IPFS.

### Funds payout [Provider]

Provider can be paid only with funds that were already spent on running the Agreement. The Contract calculates the amount available to pay to the Provider.

1. The Provider goes to Marketplace and reviews their active Offers
2. Selects which Offers to payout.
3. Through the UI, provider creates a transaction that requests this payout.
4. If Agreement does not have any more funds to run, it is terminated, the space utilized by the Agreement is made available for others to be rented and any remaining funds returned to the Consumer.

### [Provider] Offer termination

The Provider can decide to terminate an Offer. The active Agreements will continue to run until they run out of funds, but Consumers can not deposit new funds to the Agreements. Provider needs to be aware that the termination process can take quite a while.

1. Provider goes to Marketplace and sees own Offers.
2. The Provider chooses which Offer to terminate.
3. Reviews the estimate until when the Agreements will be active.
4. Submit and creates termination transaction.

### Creating new Agreement [Consumer]

1. Finds an Offer (e.g., through filtering) on RIF Marketplace that suits his requirements.
2. Configures the new Agreement.
    - Defines the capacity to be requested for the data.
    - Chooses price, token, and frequency of payments.
    - Chooses amount of funds to deposit.
    - Pins an existing hash or uploads a set of files.
3. Create transaction for the newAgreement call.

### Depositing Funds [Consumer]

1. Goes to RIF Marketplace UI.
2. Selects which of his Agreements he wants to top-up.
3. Chooses amount and create the transaction.

### Withdraw Funds / Termination of Agreement [Consumer]

A Consumer can decide to withdraw funds. The maximum withdrawal limit is all the funds, except those for the currently active period. Once the consumer withdraws all of the funds, it is practically a termination of the Agreement.

1. Goes to RIF Marketplace UI.
2. Selects which Agreement to withdraw funds from.
3. Chooses amount (limited to deposited funds minus fund for current period).
4. Creates the transaction.

## Architecture

### Data Structure

This is an entity relationship diagram (ERD), showing relationships between different data structures:

![Storage Entity Relationship Diagram](/assets/img/rif-marketplace/rifmkt-storage-erd.png)

### Components

![Storage Architecture](/assets/img/rif-marketplace/rifmkt-storage-arch.png)

The main **high-level components** are:

 - **RIF Marketplace UI** - the main web UI where all transactions originate.
 - **Cache** - a cache that stores the state of the Smart Contract in a readable format and does some basic preprocessing on it.
 - **Pinning Service** - a service running on Provider's machine connected to IPFS node which orchestrates the pinning mechanism.
 - **Smart Contract** - a place where the state is stored and managed. This is the "origin of truth".
 - **RIF Storage.js** - a library that can abstract away lot of technicalities happening in order for the file to be pinned.


## Implementation notes

### Freeing up Offers capacity

Offer's capacity is tracked as part of the Smart Contract in order not to exceed the Provider's capacity. Hence, when a new Agreement is being created, it is checked whether there is enough capacity remaining and if so the requested capacity is allocated. The capacity of the expired Agreement is returned to Offer during Payout Funds call of the Smart Contract.

### Pinning Service Listening Strategies

Pinning Service listens on events that defines the service's actions like when new agreement is created (and hence something should be pinned) etc. The main source of this events is the blockchain.

Unfortunately, public RSKj nodes do not currently support listening on events or the `eth_getLogs` call to poll for events. This requires the Provider to run own RSKj node, which can be a daunting task, causing an adoption barrier.

Since the Marketplace's Cache service supports WebSockets connections, and it's already used in the Marketplace UI for listening on events and updates from Cache, we decided to add support for listening on events from Cache. This has become the new default option. For those with minimal trust for the Cache, they can still run their own RSKj node and use that as source of the events.

## Glossary

- Actors
  - **Consumer** - actor that wants their files to be persisted in the network.
  - **Provider** - actor that offers their storage for Consumers to be used in monetary exchange.
- Entities
  - **Offer** - Offer created by Provider that announces availability of their storage space.
    - *Billing Periods* - Specifies periods how often is payment required (e.g. every month, every 2 months...).
    - *Billing Prices* - Specifies prices per byte for each Billing Period, resulting in period-price tuple.
    - *Billing Plan* - Is a period-price tuple which defines Billing Price per Billing Period.
    - *Maximum Duration* - The duration which the Consumer can maximally rent the storage space for.
    - *Total Capacity* - Total capacity in bytes that Provider is offering.
    - *Available Capacity* - Capacity in bytes in given time that is left free for Consumers to use.
    - *Utilized Capacity* - Capacity in bytes which is currently being utilized by active Agreements.
    - *Location* - Optional, self proclaimed location (country) from which the Service is provided (where the data will be stored).
    - *Storage Network* - Offer is always connected to one Storage System like IPFS or Swarm.
    - *Offer Termination* - The provider can choose to discontinue their Offer. No new Agreements will be accepted, but current Agreements will be finished based on the number of Billing Periods already purchased.
  - **Data Source** - Data Source is an abstract entity that defines the data that should be stored under an Agreement. There might be different mechanisms on how files should be retrieved, updated and removed.
    - *IPFS Source* - Hash pointer to immutable data source.
    - *Contract Source* - A pointer to different smart-contract that handles the mutability (eq. adding/removing files)
  - **Agreement** - Consumer creates Agreement for a specific Provider's Offer, specification, and the corresponding Data Source
    - *Data Reference* - Pointer to Data Source
    - *Agreement Termination* - Consumer can decide to terminate the Agreement, which will take effect after termination of current billing period.
    - *Available Funds* - Amount of funds deposited for the Agreement, available to be spent on the Agreement.
    - *Spent Funds* - The amount of funds already spent as a payment for the Storage service to the Provider. Funds awaiting Provider's request to payout.
    - *Deposit Funds* - In order for an Agreement to be active, it needs to have available funds for each Billing Period renewal. Consumer can therefore deposit funds.
    - *Withdraw Funds* - Customer can withdraw deposited funds, which have not been used for Billing Period renewal.
    - *Payout Funds* - Upon termination of a Billing Period, the Provider can request the funds for the terminated periods to be transferred to them.
    - *Active Agreement* - Active Agreement includes having sufficient funds to pay for the current Billing Period. Provider stores and provide the files specified by Data Reference. In the event of funds being exhausted, it will become an "Inactive Agreement".
    - *Inactive Agreement* - Inactive Agreement occurs during expiration or termination by either party, therefore the Provider is not required to store and provide the files defined in Data Reference.
    - *Expired Agreement* - Expired Agreement occurs when funds are exhausted, hence, it becomes an Inactive Agreement.
