---
layout: rsk
title: Light Client
tags: lumino, client, rif
description: "Lumino Light Client design and implementation specifications"
render_features: 'tables-with-borders'
---

In its initial implementation, RIF Lumino users had to run a full node in order to open off-chain payment channels and make payments. 

Users and developers can now make payments from wallets and dapps, without the need to run a full node.

To achieve that, a Light Client is needed. A RIF Lumino Light Client is a piece of software that:

- Supports the full API of the RIF Lumino full node, that means being able to interact with the RIF Lumino network, as though it were a full node.
- Run on the client side environment, i.e: browser, mobile/desktop apps, etc.

We identified two possible ways that a Light Client could be implemented:

1. Create different SDKs that are able to run into a client environment (ie: node.js SDK, Android SDK, iOS SDK). These SDKs implement the full RIF Lumino protocol, which means:
    - Interact with Lumino smart contracts
    - Implement the Lumino protocol specification. Basically, porting the code of the full node to each client SDK.

    **Advantages**:

    - There is no need for another node to connect to the network
    - You don't need to trust in another node to make off-chain payments

    **Disadvantages**:

    - The Light Client will be "light" only because it will be able to run into a browser or mobile app, but the full protocol and state machine of a full node must be implemented.
    - We need to do that for each environment, we need to rewrite the code for each language or platform.

2. Creation of RIF Lumino HUB and a Light Client library.

    A hub will be a Full Node with extended capabilities, such as:
    1. Can work as a full node only if the user specifies it
    2. Allow Light Clients to connect to it
    3. Implement the Lumino protocol and being in charge of sending and receiving messages from/to light clients.
    4. Interact with the Light Client library to request the signing of the messages involved in the protocol
    5. Enforce secure communications between the Light Client and the HUB
    6. Maintain connections at the transport layer for each Light Client registered
    7. Interact with the Lumino smart contracts to create/close channels (on-chain interactions)

    The Light client will be a library that:

    - Provides the HUB with the necessary signed messages (off-chain interactions)
    - Keep a reduced state machine of it's channels and partners in order to validate the messages the node requests to sign.
    - Select a hub to trust and use

    **Advantages**:

    - We can reuse the already implemented protocol of the full node, making some adaptations and code restructuring
    - The Light Client library will be simpler, so the implementation of it into different languages will be easier and faster.

    **Disadvantages**:

    - The Light Client library must trust at some point on the HUB node.

    General Disadvantages for both options:

    - The clients must be online to receive and send payments.

## Selected alternative

After a deep analysis, we took into consideration the following aspects:

- Faster adoption
- Security
- Easy implementation
- Software design correctness

We decided to follow the second approach.

## Specifications

As we already mention for this approach we had to work in two different parts:

- Node: Modify the actual node in order to accept and manage remote connections for Light Clients
- Clients SDK: Implement the SDKs for the languages we want to support on the light client side. At the moment the only supported language is JavaScript (web and React native), but Support for Android and iOS is on the roadmap.

*Requirements*

1. Two node modes, hub and full. Hub will work as a full node, but users can run the Hub node as a full node only.
2. Light clients must be able to register to the Lumino Hub. This means that they will communicate with the Lumino Hub and start an onboarding process.
3. The HUB must provide a way to accept Light Clients registrations. Light clients must provide the following during onboarding:
  1. Address
  2. Password (matrix server name signed with the private key)
4. The HUB must receive the messages that are directed to light clients. This means that all the messages sent by other nodes to the light clients will be handled by the HUB.
5. When receiving a message, the HUB must have two different workflows
  1. Standard workflow: the message destination is the HUB itself, the node must work as usual.
  2. Light Client workflow: the hub knows the lumino protocol, it must interact with the light client in order to sign the responses that must be sent to the rest of the network.
6. The communication between the Light Client and the HUB must be secure.
7. Each hub maintains connections at the transport layer for each Light Client registered under its node.
8. The State machine of the hub must be extended to handle state changes of the light clients. So basically the node will have a collection of different state machines and after each message it will have to select which state machine should be affected.
9. The database of the hub must store the information of channels and messages both for itself and the light clients registered.
10. All the operations must support RNS domain names
11. The hub will expose a REST API to the light client
12. After the onboarding process the light client will receive an API-KEY that will have to send in each node interaction.



## Design specification for the Light Clients SDKs

<br/>

**Component diagram**

![Component diagram](/assets/img/lumino/component-diagram.png)

Our SDKs will interact with different components:

| Component | Description |
| --- | --- |
| **Storage** | The SDK will need to store data of different kinds in the environment were it will be executed (configuration, state data, etc.). This storage must be provided by the application that is including the light client (for a web app it can be localstorage, for iOS it could be core data, etc.) |
| **Web3 provider** | One of the main reasons to have a light client is to allow the different kind of clients to connect to RIF Lumino Networking without having a full node running but keeping the private keys on the client side (and not in the node). Our SDKs will never have contact with the plain Private Keys, the idea is that apps  using the SDK have to provide a web3 provider that will be used to sign the different transactions needed by the light client. |
| **RIF Notifier** | A connection with a notifier is required in order to increase the security on the light client side. As an example, if a light client ask to a hub to open a channel. He has to validate that the node is behaving correctly and it really opened the channel, the only way to do this is &quot;listen&quot; on chain for particular events or transactions. To do this the light clients will be able to subscribe to notifiers that will inform him about the events on the blockchain. |
| **RIF Lumino Node** | This is the most obvious connection, our light client will have to maintain a connection with a RIF Lumino HUB in order to interact with RIF Lumino Network.|

We have divided the internal SDK structure in different components.

| Component | Description |
| ---   | ---   |
| **Light Client Service** | This component will implement the actual logic of the light client. It will be the component in charge of calling and orchestrating the interactions with the rest of the components. |
| **State Machine Service** | This component handles the internal state machine of the light client. It will be in charge of: (1.) Initialize a state machine. (2.) Based on the messages received perform the necessary state machine transitions. (3.) Persist the state machine to the storage. (4.) Load the state machine from the storage. |
| **Signer** | Component in charge of signing a transaction or a particular data stream. It will interact with the web3 provider. |
| **Notifier Manager** | Component in charge of interacting with the RIF Notifier |
| **Storage Manager** | This component will be the owner of the underlying storage, providing read and write access to it |

**Light client onboarding**

The following diagram describes the process that takes place when a light client registers itself to a Lumino hub.

![Light Client Onboarding](/assets/img/lumino/lumino-client-onboarding.png)

**Open Channel**

In order to open a channel, the Light Client must call the endpoint `light_channels` using the `PUT` method. We actually could have made the light client send the open channel transaction directly to RSK without passing through the node, but for the sake of maintaining all the logic on the node and to keep the light client SDK simpler, we decided to leave this logic on the node side.

It should send a JSON object in the body with the following structure:

![Light Client - JSON Body](/assets/img/lumino/lumino-open-channel.png)

| Field | Description |
| --- | --- |
| **partner_address** | With who we want to open a channel. |
| **creator_address** | Light client address. |
| **token_address** | Token of the channel. |
| **settle_timeout** | Amount of blocks to wait between close and settle channel. |
| **signed_tx** | Raw transaction to open the channel. |

**Deposit**

In order to deposit token on a channel the Light Client must call the endpoint `light_channels` using the PATCH method. We actually could have made the light client send the open channel transaction directly to RSK without passing through the node, but for the sake of maintaining all the logic on the node and keeping the light client SDK simpler we decided to leave this logic on the node side.

It should send a JSON object in the body with the following structure:

![Light Client - JSON Object](/assets/img/lumino/lumino-deposit.png)

| Field | Description |
| --- | --- |
| **signed_approval_tx** | Raw transaction for the token approval tx. |
| **signed_deposit_tx** | Raw transaction for register the deposit in the token network. |
| **total_deposit** | Amount to deposit. |

**Interaction between node and light client during the payment process**

The following diagram describes the logical message interactions required between the light client and a Lumino Hub in order to make a payment.

![Light Client anad Lumino Hub](/assets/img/lumino/lumino-interaction.png)

Next, you will see the diagram describing the interaction between the Light Client SDK and the Lumino Hub

> Note: The following diagram is a draft version.

![Light Client SDK and Lumino hub interaction](/assets/img/lumino/lumino-interaction-2.png)

- The flow starts when a Light Client invokes the `initPayment` endpoint. This indicates to the node a new payment request by the Light Client. This carries a few actions made by the node:
  - It creates a new Payment entity with all the general data related to the payment.
  - It starts the payment flow (see the document describing the exchange of messages between nodes in a payment flow)
  - This flow generates a few messages to sign by the light client (remember  the node never has access to the light client private keys, so it has to ask the light client to sign the messages it needs to send to the payee)
- The light client has to make a long polling to the `msg` endpoint using GET method. Every time the node needs some interaction with the light client it creates a new message in the `MessagesPending` table. This endpoint retrieves all the messages in this table for the light client.
  - PENDING: we have to remove from the response the messages that were already sent to the light client. We have 2 options here:
    - Delete the record from the table
    - Make a logic delete and change a flag in the record in order to not return that record anymore.
  - When the light client receives a new message to process it sends the message to the Light Client Service component. This service must:
    - Check if the message is valid
    - Make validations over that message. The SDK must check if the message to process received by the node has sent based on its internal state.
    - If all the validations were fine, the service generates a new message response and send it to the node.
- After the Light Client Service process the message and generate the response to the node, it sends it to the &quot;msg&quot; endpoint using the PUT method.
