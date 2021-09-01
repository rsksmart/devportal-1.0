---
layout: rsk
title: RIF Enveloping Architecture
tags: rif, enveloping, relay, rsk, envelope, architecture
permalink: /rif/enveloping/architecture/
---

## Table of Contents
- [**Glossary**](#glossary)
- [**On-Chain components**](#on-chain-components)
  - [**Relay Hub**](#relay-hub)
  - [**Smart Wallet**](#smart-wallet)
  - [**Relay Manager**](#relay-manager)
  - [**Relay Worker**](#relay-worker)
  - [**Stake Manager**](#stake-manager)
  - [**Relay & Deploy Verifier**](#relay--deploy-verifier)
  - [**Proxies**](#proxies)
    - [**Proxy Factory**](#proxy-factory)
    - [**Proxy**](#proxy)
  - [**GSNEip712Library**](#gsneip712library)
- [**Off-Chain components**](#off-chain-components)
  - [**Relay Server**](#relay-server)
  - [**Relay & Deploy Requests**](#relay--deploy-requests)
  - [**Tools**](#tools)
    - [**Contract Interactor**](#contract-interactor)
    - [**Relay Client**](#relay-client)
    - [**Relay Provider**](#relay-provider)
- [**Execution flow**](#execution-flow)
  - [**Relaying (Smart Wallet already created)**](#relaying-smart-wallet-already-created)
  - [**Gasless Smart Wallet creation**](#gasless-smart-wallet-creation)
- [**Deprecated**](#deprecated)
  - [**Paymaster**](#paymaster)

## Introduction

The system is designed to achieve deployments and transaction sponsorship at a low cost. The cost of the relay service provided by "sponsors" is agreed upon among the parties off-chain. The low cost of transactions on RSK contributes to keeping overall service costs low as well.

The Enveloping system is made up for various components, some of which are essential and others which are auxiliary. 

An overview of this is as follows:

On-chain, the system cannot work without its Smart Contracts, which encompass Smart Wallets plus the Relay Hub, the latter of which keeps tracks of staked relay managers. 

Off-chain, at least 1 Relay Server is needed to interact with the contracts. Without a Relay Server, envelopes cannot be created and sent to the contracts.
 
Details for each of these components are expanded down below, as well as an introductory glossary.

### Glossary

| Term                  | Desctiption                                                                                                                                                                                                    |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sponsor               | A third party that pays the gas consumed by a sponsored transaction (see below) by submitting it to the blockchain.                                                                                            |
| Sponsored Transaction | A transaction sent by the requester (see below) through the Sponsor, this type of transaction aims to separate the gas payer from the sender of the transaction.                                               |
| Requester             | It’s an EOA (see below). The requester sends a sponsored transaction to the Sponsor. They do not pay the gas with native-currency but with a token accepted by the Sponsor, if they don’t subsidize it.       |
| Recipient             | An abbreviation for recipient contract. It’s the destination of the requester’s transaction.                                                                                                                   |
| Envelope              | Using the “envelopes” analogy, it’s the transaction, (funded with native cryptocurrency as gas) sent by the Sponsor to the blockchain, that wraps the requester’s transaction payload (sponsored transaction). |
| Enveloping            | The entire system which allows the relay of sponsored transactions.                                                                                                                                            |
| DoS                   | A Denial of Service is an information-security threat whose goal is to become a service unavailable.                                                                                                           |
| DeFi                  | An acronym for Decentralized Finance, it’s a novel form for finance based in blockchain technology.                                                                                                            |
| EOA                   | An External Owned Account (EOA) is an account managed with a key, which is capable of signing and sending transactions, and paying the cost for it.                                                            |

## On-Chain components

### Relay Hub
The Relay Hub is the main on-chain component of the Enveloping architecture. It acts as an interface with the Relay Server and the whole on-chain architecture. It manages the balances of the accounts involved and forwards Relays Requests to the rest of the contracts, and receives the Relay Request and forwards it to the Smart Wallet. 

Also, the Relay Hub forms part of the relay worker’s registration process together with the Relay Managers. Furthermore, the Relay Hub keeps the balances that will be used to pay the relay workers for their transaction submission. Without enough balance in the Relay Hub to pay for the relay of a transaction the relay call will be reverted.

### Smart Wallet
It’s the “contract-based account” owned by the Requester’s EOA.

Smart Wallet are contracts that verify forwarded data and subsequently invoke the recipient contract of the transaction. The smart wallet is deployed *counterfactually* at the moment it is needed. This happens, for instance, when a user with some token balances wants to move those tokens without spending gas, i.e. using the enveloping system.

It is the component that calls the Recipient contract (i.e, the `msg.sender` address the Recipient will see). During the execution,  the contract verifies the Enveloping Request and, if it’s valid, it calls the defined Recipient’s function, otherwise it reverts the invocation. The verification includes checking that the owner of the SmartWallet made the request, rejecting any request with an invalid signature, and preventing replay attacks using a nonce.

### Relay Manager
An on-chain account that has staked balance. It delegates the requests to Relay Workers, which are the actual initiators of the relay flow. Any penalization done against a Relay Worker impacts the Relay Manager's stake. A Relay Worker can be managed by only one Relay Manager. A Relay Manager can have one or more Relay Workers. The responsibilities of the Relay Manager are: registering the Relay Server and adding relay workers, both in the Relay Hub.

### Relay Worker
An EOA that belongs to only one Relay Manager. It’s the sender of the Relay Request.

### Stake Manager
The Stake Manager supports multiple Relay Hubs, the stakers are the Relay Managers and they can authorize/de-authorize specific Relay Hubs so they can penalize the managers if needed. The staked cryptocurrency is held in the StakeManager contract.

The account staking for a specific Relay Manager for the first time becomes the owner of the stake, only this account can make subsequent stakes for this specific RelayManager.

When a Relay Manager unauthorised a Relay Hub, it means it is unstaking from it, which also means not being able to relay through that hub any more. Any balance held in the Relay Hub is sent to the original sender of the stake (the owner). Also, the workers’ balances are transferred to the stake owner, and, if configured, the Relay Manager’s balance can also be transferred to the stake owner.

Unstaking has a predefined delay (in blocks). This is intended to prevent the Relay Manager from unstaking before a slashing that was going to occur.

### Relay & Deploy Verifier
Abstract contracts that authorizes a specific relay or deploy request (see the [Relay & Deploy Requests](#relay--deploy-requests) section).

The verifiers are abstract contracts that authorize and validate specific relay requests.

Two example implementations are provided:
  - **Relay Verifier**: The Relay Verifier has a list of tokens that it accepts. When it receives a relay request, checks the token’s acceptance and the payer’s balance for the token.
  - **Deploy Verifier**: An implementation used in the SmartWallet deployment process. It performs the same relay verifier checks but also makes sure that the SmartWallet to be deployed doesn’t already exist. It also checks that a Proxy Factory address is provided in the Relay Request.

### Proxies

#### Proxy Factory
Factory of Proxies to the SmartWallet logic. The Smart Wallet itself is a template with portions delegated to an optional custom logic (which is also a proxy pattern).

#### Proxy
A simple proxy that delegates every call to a SmartWallet logic address. This proxy is the one instantiated per SmartWallet, and it will receive the SmartWallet template address as Master Copy (MC). So every call made to this proxy will end up executing the logic defined in the MC.

For the transaction execution (`execute()` call), MC logic will do the signature verification and payment. Then it will execute the request, and, if custom logic was defined, it will forward the flow to it before returning.

Moreover, when a proxy to the Smart Wallet is created, it can define a custom logic that replaces what is done with the Enveloping Request after verifying it. With no custom logic, the recipient is called, but with custom logic, the request is delegated to the logic code.

If a custom logic is set, it can be initialized (which would impact the proxy’s state of course). This happens automatically during the deployment of the Proxy if the code of the logic contract has defined a function that conforms to the initialize(bytes) ABI.

### GSNEip712Library
This is an auxiliary library that bridges the Relay Request into a call of a Smart Wallet or Proxy Factory (in such case, the Request is a Deploy Request).

Detailed documentation can be found [here](https://eips.ethereum.org/EIPS/eip-712).

## Off-chain components

### Relay Server 
The Relay Server receives sponsored transactions via HTTP.

The server has only one Relay Manager address and at least one Relay Worker, and points to just one Relay Hub.

When the Relay Server receives an HTTP Relay request, it creates an Envelope, wrapping the sponsored transaction, signs it using its Relay Worker address and then sends it to the Relay Hub contract.

The server is a service daemon, running as an HTTP service. It advertises itself (through the Relay Hub) and waits for client requests.

### Relay & Deploy Requests
An enveloping request is the sponsored transaction, the structure used to relay a transaction. It is formed by Relay Data and Forward Request:
- **Relay Data**: all information required to relay the defined Forward Request.
- **Forward Request**: it is formed by all the "common" transaction fields in addition to all the token-payment data and the Proxy Factory address as well.

When the Sponsor creates an Envelope (the actual blockchain transaction to submit), it will add this Enveloping Request (sponsored transaction) as part of the encoded data, along with the contract and method to call (RelayHub and relayCall respectively)

The **Relay request** is structure that wraps the transaction sent by an end-user. It includes data required for relaying the trasaction e.g. address of the payer, address of the original requester, token payment data.

The **Deploy request** structure that wraps the transaction sent to deploy a Smart wallet.

### Tools

### Contract Interactor
A provider and wrapper for all the smart contract ABIs.

### Relay Client
The Relay client is a typescript library for a client to access the blockchain through a relay. It provides APIs to find a relay, and to send transactions through it.

It can work access point to the Enveloping system. It creates, signs, and sends the Sponsored transaction, which is signed by the requester and forwarded to the Relay Server via the HTTP protocol.

It is not _strictly_ needed since any dApp or user could relay transactions using merely a Relay Server and the smart contracts, although this is arguably harder to do manually.

### Relay Provider
The access point to the Enveloping system for dApps using Web3. It wraps the RelayClient to provide Web3 compatibility.

## Execution flow

### Relaying (Smart Wallet already created)

![Enveloping - Execution Flow](/assets/img/rif-enveloping/Execution-flow.jpg)

1. A Requester creates a request.
2. A Requester sends the request to the Relay Client (through a Relay Provider).
3. The Relay Client wraps the request into a Relay Request and signs it.
4. The Relay Client sends the Relay Request to the Relay Server (via HTTP Client ↔ HTTP Server).
5. The Relay Server create a transaction including the Relay Request and signs it with a Relay Worker account.
6. The Relay Worker account is an EOA registered in the Relay Hub.
7. The Relay Server sends the transaction to the Relay Hub using the same worker account as the previous step, executing the `relayCall` function of the Relay Hub contract.
    - When the Relay Hub receives a transaction from a Relay Worker, it verifies with the Stake Manager that the Worker’s Relay Manager has indeed locked funds for staking. If not, the execution is reverted.
    - The Relay Worker account must have funds to pay the consumed gas (RBTC).
        - This verification is done in the Relay Client and in the Relay Server as well, by calling the Relay Verifier. The verifier checks that it accepts the token used to pay and that the payer has a sufficient token balance. In addition, it verifies the used smart wallet is the correct one. 
8. The RelayHub instructs the Smart Wallet to execute the Relay Request through the GsnEip712Library library.
9. The Smart Wallet checks the signature and the nonce of the Requester, reverting if it fails the checking.
10. Then, the Smart Wallet performs the token transfer between the Requester and the token recipient, using the data received within the Relay Request.
11. It invokes the recipient contract with the indicated method in the Forward Request.

### Gasless Smart Wallet creation

![Enveloping - Smart Wallet with Gasless EOA](/assets/img/rif-enveloping/SmartWalletWithGasless.jpg)

The gas-less requester has a SmartWallet address where they receive tokens but don't use them. If the requester needs to call a contract, e.g., to send the tokens to another account, they must deploy a Smart Wallet first.

1. A Requester creates a deploy wallet request.
2. A Requester sends the request to the Relay Server through the Relay Client.
3. The Relay Client wraps the transaction sent by the Requester in a Deploy Request to create the Smart Wallet and signs it.
4. The Relay Client sends to the Relay Server a Deploy Request (via HTTP Client ↔ HTTP Server).
5. The Relay Server signs the transaction containing the Deploy Request, with the Relay Worker account.
6. The Relay Server sends the request to the Relay Hub using the Relay Worker account executing the `relayCall` function of the Relay Hub contract. 
  - Here's where the Relay Server will typically call the Deploy Verifier to ensure:
    - The Verifier accepts the offered tokens.
    - The Proxy Factory instance to use is known by the verifier.
    - The Proxy Factory contract isn’t creating an existing Smart Wallet.
    - The requester has enough tokens to pay.
7. The Relay Hub calls the Proxy Factory using the method `relayedUserSmartWalletCreation`.
8. The Proxy Factory performs the following checks:
    - Checks the sender's nonce.
    - Checks the Deploy Request signature.
9. The Proxy Factory creates the Smart Wallet using the `create2` opcode.
10. Then it calls the `initialize` function in the Smart Wallet contract.
    - The Smart Wallet, during its initialization, executes the token transfer.
    - Then it initializes the Smart Wallet state and sets the requester’s EOA as the owner of the Smart Wallet.
    - In the case there is a custom logic, its initialization is called as well.

## Deprecated

### Paymaster
V2 deprecated the Paymaster contracts in favor of the Verifiers (see [versions](/rif/enveloping/versions/)).