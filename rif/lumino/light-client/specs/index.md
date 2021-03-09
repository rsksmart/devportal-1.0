---
layout: rsk
title: Light Client
tags: lumino, client, rif
description: "Lumino Light Client design and implementation specifications"
---

In the current implementation of RIF Lumino users must run a full node in order to open off-chain payment channels and make payments. To get mass adoption, we need to allow users and developers to make payments from wallets and dapps, without the need to run a full node.

To achieve that, the implementation of a Light Client is a must. A RIF Lumino Light Client is a piece of software that must be able to:

- Support the full API of the RIF Lumino full node, that means being able to interact with the RIF Lumino network like if it were a full node.
- Run on the client side environment, i.e: browser, mobile/desktop apps, etc.

We have identified two possible ways that a Light Client can be implemented:

1. Create different SDKs that are able to run into a client environment (ie: node.js SDK, Android SDK, iOS SDK). These SDKs implement the full RIF Lumino protocol, which means:
    - Interact with Lumino smart contracts
    - Implement the Lumino protocol specification. Basically, porting the code of the full node to each client SDK..

    Advantages:

    - There is no need for another node to connect to the network
    - You don't need to trust into another node to make off-chain payments

    Disadvantages:

    - The Light Client will be "light" only because it will be able to run into a browser or mobile app, but the full protocol and state machine of a full node must be implemented.
    - We need to do that for each environment, we need to rewrite the code for each language or platform.

2. Creation of RIF Lumino HUB and a Light Client library.

    A hub will be a Full Node with extended capabilities:
    1. Can work as a full node only if the user specifies it
    2. Allow Light Clients to connect to it
    3. Implement the Lumino protocol and being in charge of sending and receiving messages from/to light clients.
    4. Interact with the Light Client library to request the signing of the messages involved in the protocol
    5. Enforce secure communications between the Light Client and a the HUB
    6. Maintain connections at the transport layer for each Light Client registered
    7. Interact with the Lumino smart contracts to create/close channels (on-chain interactions)

    The Light client will be a library that:

    - Provides to the HUB the necessary signed messages (off-chain interactions)
    - Keep a reduced state machine of his channels and partners in order to validate the messages the node requests to sign.
    - Select a hub to trust and use

    Advantages:

    - We can reuse the already implemented protocol of the full node, making some adaptations and code restructuring
    - The Light Client library will be simpler, so the implementation of it into different languages will be easier and faster.

    Disadvantages:

    - The Light Client library must trust at some point on the HUB node.

    General Disadvantages for both options:

    - The clients must be online to receive and send payments.

## Selected alternative

After a deep analysis where we take into consideration the following aspects:

- Faster adoption
- Security
- Easy implementation
- Software design correctness

We decided to follow the second approach.

## Specifications

As we already mention for this approach we will have to work in two different parts:

- Node: we will need to modify the actual node in order to accept and manage remote connections for Light Clients
- Clients SDK: we will need to implement the SDKs for the languages we want to support on the light client side. Initially the languages are: JavaScript (web and React native), Android and iOS.

Requirements

1. Two node modes, hub and full. Hub will work as a full node, but users can run the Hub node as a full node only.
2. Light clients must be able to register to the Lumino Hub. This means that they will communicate with the Lumino Hub and start an onboarding process.
3. HUB must provide a way to accept Light Clients registrations. Light clients must provide at the onboarding:
  1. Address
  2. Password (matrix server name signed with the private key)
4. The HUB must receive the messages that are directed to light clients. This means that all the messages sent by other nodes to the light clients will be handled by the HUB.
5. When receiving a message, the HUB must have two different workflows
  1. Standard workflow: the message destinatary is the HUB itself, node must work as usual.
  2. Light Client workflow: the hub knows the lumino protocol, it must interact with the light client in order to sign the responses he must send to the rest of the network.
6. The communication between the Light Client and the HUB must be secure.
7. Each hub maintains connections at the transport layer for each Light Client registered under his node.
8. The State machine of the hub must be extended to handle state changes of the light clients. So basically the node will have a collection of different state machines and after each message it will have to select which state machine should be affected.
9. The database of the hub must store the information of channels and messages both for itself and the light clients registered.
10. All the operations must support RNS domain names
11. The hub will expose a REST API to the light client
12. After the onboarding process the light client will receive an API-KEY that will have to send in each node interaction.



## Design specification for the Light Clients SDKs

<br/>

**Component diagram**

<div align="center"><img width="100%" src="/assets/img/lumino/component-diagram.png" alt=""/></div>

Our SDKs will interact with different components:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Component</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">
        Storage
      </td>
      <td>
        The SDK will need to store data of different kinds in the environment were it will be executed (configuration, state data, etc.). This storage must be provided by the application that is including the light client (for a web app it can be localstorage, for iOS it could be core data, etc.)
      </td>
    </tr>
    <tr>
      <td scope="row">
        Web3 provider
      </td>
      <td>
        One of the main reasons to have a light client is to allow the different kind of clients to connect to RIF Lumino Networking without having a full node running but keeping the private keys on the client side (and not in the node). Our SDKs will never have contact with the plain Private Keys, the idea is that apps  using the SDK have to provide a web3 provider that will be used to sign the different transactions needed by the light client.
      </td>
    </tr>
    <tr>
      <td scope="row">
        RIF Notifier
      </td>
      <td>
        A connection with a notifier is required in order to increase the security on the light client side. As an example, if a light client ask to a hub to open a channel. He has to validate that the node is behaving correctly and it really opened the channel, the only way to do this is &quot;listen&quot; on chain for particular events or transactions. To do this the light clients will be able to subscribe to notifiers that will inform him about the events on the blockchain.
      </td>
    </tr>
    <tr>
      <td scope="row">
        RIF Lumino Node
      </td>
      <td>
       This is the most obvious connection, our light client will have to maintain a connection with a RIF Lumino HUB in order to interact with RIF Lumino Network.
      </td>
    </tr>
  </tbody>
</table>

We have divided the internal SDK structure in different components.

<table class="table">
  <thead>
    <tr>
      <th scope="col">Component</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">
        Light Client Service
      </td>
      <td>
        This component will implement the actual logic of the light client. It will be the component in charge of calling and orchestrating the interactions with the rest of the components.
      </td>
    </tr>
    <tr>
      <td scope="row">
        State machine service
      </td>
      <td>
        This component handles the internal state machine of the light client. It will be in charge of:
          - Initialize a state machine
          - Based on the messages received perform the necessary state machine transitions
          - Persist the state machine to the storage
          - Load the state machine from the storage
      </td>
    </tr>
    <tr>
      <td scope="row">
        Signer
      </td>
      <td>
        Component in charge of signing a transaction or a particular data stream. It will interact with the web3 provider.
      </td>
    </tr>
    <tr>
      <td scope="row">
        Notifier Manager
      </td>
      <td>
        Component in charge of interacting with the RIF Notifier
      </td>
    </tr>
    <tr>
      <td scope="row">
        Storage Manager
      </td>
      <td>
        This component will be the owner of the underlying storage, providing read and write access to it
      </td>
    </tr>
  </tbody>
</table>

**Light client onboarding**

The following diagram describes the process that takes place when a light client registers itself to a Lumino hub.

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-client-onboarding.png" alt=""/></div>

**Open Channel**

In order to open a channel the Light Client must call the endpoint `light\_channels` using the PUT method (we actually can make the light client send the open channel transaction directly to RSK without passing thru the node, but for the sake of maintain all the logic on the node and keep the light client SDK simpler we decided to left it on the node side).

It should send a JSON object in the body with the following structure:

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-open-channel.png" alt=""/></div>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Field</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">
        partner\_address
      </td>
      <td>
     With who we want to open a channel.
      </td>
    </tr>
    <tr>
      <td scope="row">
      creator\_address
      </td>
      <td>
      Light client address.
      </td>
    </tr>
    <tr>
      <td scope="row">
        token\_address
      </td>
      <td>
        Token of the channel.
      </td>
    </tr>
    <tr>
      <td scope="row">
        settle\_timeout
      </td>
      <td>
        Amount of blocks to wait between close and settle channel.
      </td>
    </tr>
    <tr>
      <td scope="row">
        signed\_tx
      </td>
      <td>
        Raw transaction to open the channel.
      </td>
    </tr>
  </tbody>
</table>

**Deposit**

In order to deposit token on a channel the Light Client must call the endpoint &quot;light\_channels&quot; using the PATCH method (we actually can make the light client send the open channel transaction directly to RSK without passing thru the node, but for the sake of maintain all the logic on the node and keep the light client SDK simpler we decided to left it on the node side).

It should send a JSON object in the body with the following structure:

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-deposit.png" alt=""/></div>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Field</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">
      signed\_approval\_tx
      </td>
      <td>
      Raw transaction for the token approval tx.
      </td>
    </tr>
    <tr>
      <td scope="row">
      signed\_deposit\_tx
      </td>
      <td>
      Raw transaction for register the deposit in the token network
      </td>
    </tr>
    <tr>
      <td scope="row">
      total\_deposit
      </td>
      <td>
      Amount to deposit
      </td>
    </tr>
  </tbody>
</table>

**Interaction between node and light client during the payment process**

The following diagram describe the logical message interactions required between the light client and a Lumino Hub in order to make a payment.

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-interaction.png" alt=""/></div>

Next you will see the diagram describing the interaction between the Light Client SDK and the Lumino Hub

> Note: The following diagram is a draft version.

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-interaction-2.png" alt=""/></div>

- The flow start when a Light Client invokes the initPayment endpoint. This will indicate to the node a new payment request by the Light Client. This will carry a few actions made by the node:
  - It will create a new Payment entity with all the general data related to the payment.
  - It will start the payment flow (see the document describing the exchange of messages between nodes in a payment flow)
  - This flow will generate a few messages to sign by the light client (remember  the node never has access to the light client private keys, so he has to ask the light client to sign the messages he needs to send to the payee)
- The light client will have to make a long polling to the &quot;msg&quot; endpoint using GET method. Everytime the node needs some interaction with the light client it will create a new message in the &quot;MessagesPending&quot; table. This endpoint will retrieve all the messages in this table for the light client.
  - PENDING: we have to remove from the response the messages that were already sent to the light client. We have 2 options here:
    - Delete the record from the table
    - Make a logic delete and change a flag in the record in order to not return thar record anymore.
  - When the light client receives a new message to process it will send the message to the Light Client Service component. This service must:
    - Check if the message is valid
    - Make validations over that message. The SDK must check if the message to process received by the node has sense based in his internal state.
    - If all the validations were fine, the service generate a new message response and send it to the node.
- After the Light Client Service process the message and generate the response to the node, it send it to the &quot;msg&quot; endpoint using the PUT method.
