---
# menu_order: 300
menu_title: Architecture
layout: rsk
title: RIF Gateways Chainlink Architecture
tags: rif, gateways, data services, chainlink, architecture
---

When a **Chainlink** request is created, a **Consumer** contract sends an on-chain transaction to an **Oracle** Contract within the Rootstock (RSK) blockchain. That transaction transfers payment tokens, along with the data representing your request. The **Oracle** Contract tracks balances from requesters and emits an event which notifies the off-chain **Chainlink** network (via the **External Initiator**), that this event needs to be processed.

Once the request is received, **Chainlink** performs the work of the request and returns the answer to the **Oracle** contract (via the **External Adapter**). The **Oracle** Contract updates the balance to pay the node operator and returns the result to the **Consumer** Contract.

The following diagram presents the **Chainlink/Rootstock integration** architecture and core components:
 

![Chainlink architecture](/assets/img/rif-gateways/rifgwy-chainlink.png)

**Core Components**:

- [External Data](#external-data)
- [Chainlink node](#chainlink-node)
- [External Adapter](#external-adapter)
- [External Initiator](#external-initiator)


## External Data

External data may represent an API, whether open or private, another blockchain, network, or any repository of data that would need to be read or written to. In the diagram above is represented by an **Exchange RPC API** which returns for example a *currency conversion rate*.

## Chainlink Node

The Chainlink node handles jobs, tasks, scheduling, and signing transactions for the blockchain. The Chainlink node runs through a specified set of sequential processes and includes a number of **core adapters** which give it support to read and process data, and write to the blockchain. The Chainlink node also contains the keystores used to sign transactions. This prevents needing to keep the sensitive keystore files unlocked on the blockchain node. The Chainlink node can read open APIs, process their response, and write to the Rootstock (RSK) blockchain through an **external adapter**.

## External Adapter

External Adapters (in our case **Rootstock (RSK) Adapter**) allow for additional functionality outside of what is supported within the core Chainlink Adapters. External adapters may be written in any language and can operate as a separate service that accepts and responds with JSON formatted data. The node operator must provision and add each external adapter they are willing to support as a bridge, and the adapter may be on a separate system than that which the Chainlink node resides on.

## External Initiator

The External initiator  (**Rootstock Initiator**) listens for Oracle events in the Rootstock Blockchain. It will subscribe to the blockchain node in order to read events occurring on the blockchain, and send the corresponding request to the Chainlink node.



Additional information can be found in the [Chainlink Docs site](https://docs.chain.link/docs/architecture-overview)




