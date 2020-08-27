---
layout: rsk
title: RIF Storage Pinning service
---

## Glossary

 - Actors
    - **Consumer** - actor that wants his files to be persisted in the network.
    - **Provider** - actor that offers his storage for Consumers to be used in monetary exchange.
 - Entities
    - **Offer** - Offer created by Provider that announces availability of his storage space.
      - *Billing Periods* - Specifies periods how often is payment required (e.g. every month, every 2 months...).
      - *Billing Prices* - Specifies prices per Megabyte for each Billing Period, resulting in period-price tuple.
      - *Billing Plan* - Is a period-price tuple which defines Billing Price per Billing Period.
      - *Maximum Duration* - Duration which Consumer can maximally rent the storage space for.
      - *Total Capacity* - Total capacity in Megabytes that Provider is offering.
      - *Available Capacity* - Capacity in Megabytes in given time that is left free for Consumers to use.
      - *Utilized Capacity* - Capacity in Megabytes which is currently being utilized by active Agreements.
      - *Location* - Optional, self proclaimed location (country) from which the Service is provided (where the data will be stored).
      - *Storage Network* - Offer is always connected to one Storage System like IPFS or Swarm.
      - *Offer Termination* - Provider can choose to discontinue his Offer. No new Agreements will be accepted, but current Agreements will be finished based on the number of Billing Periods already purchased.
    - **Data Source** - Data Source is an abstract entity that defines the data that should be stored under an Agreement. There might be different mechanisms on how files should be retrieved, updated and removed.
      - *IPFS Source* - Hash pointer to immutable data source.
      - *Contract Source* - Pointer to different smart-contract that handles the mutability (eq. adding/removing files)
      - *IPNS Source* - IPNS hash which redirects to some immutable hash pointer
      - *RNS Source* - RNS domain or subdomain which has an IPFS hash set
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
