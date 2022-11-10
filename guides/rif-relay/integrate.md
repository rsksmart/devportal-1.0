---
layout: rsk
title: RIF Relay Integration
tags: rif, envelope, relay, user, guide, integrate
permalink: /guides/rif-relay/integrate/
---

This guide goes over the exposed RIF Relay methods that dApps and wallets can consume to provide relaying as a service, with the purpose of allowing users to pay transaction fees with tokens in a particular system.

## Table of Contents
- [**Introduction**](#introduction)
- [**Requirements**](#requirements)
  - [**RIF Relay Smart Contracts**](#rif-relay-smart-contracts)
  - [**RIF Relay Server**](#rif-relay-server)
  - [**RIF Relay SDK**](#rif-relay-sdk)
  - [**Relay Request**](#relay-request)
  - [**Custom worker replenish function**](#custom-worker-replenish-function)

## Introduction

There are multiple ways to integrate RIF Relay into a system. These will be detailed down below.

Additionally, it's important to note that not _all_ of the RIF Relay components are needed for a successful integration, as explained in the following section.

## Requirements

### RIF Relay Smart Contracts

These need to be deployed and their addresses known. For steps on how to do this, please refer to the [Contract Deployment Regtest](/guides/rif-relay/deployment/#regtest) of the Deployment guide.


### RIF Relay Server

The RIF Relay Server is the off-chain component in charge of receiving transactions and sending them to the on-chain components, chiefly the RIF Relay Hub. The RIF Relay Hub manages information about the RIF Relay Workers and RIF Relay Managers, but also communicates with the rest of the on-chain components in turn: the Smart Wallets, Factory and Verifier contracts.

The RIF Relay Manager owns RIF Relay Worker accounts with funds in native coin. To relay a transaction, a Worker signs it and sends it to the RIF Relay Hub paying for the gas consumed. In the case of a happy flow, transactions will ultimately be relayed through the RIF Relay Hub, using the EIP-712 library.

For more details on this, please refer to the [Architecture page](/rif/relay/architecture/).

Users can interact with the RIF Relay Server directly or indirectly. For the latter, a user can communicate with a RIF Relay Server through a RIF Relay Client. A RIF Relay Client knows the addresses of different RIF Relay Servers and it can send on-chain requests to any one of them. The RIF Relay Client then sends the transaction to be sponsored to the RIF Relay Server via HTTP request.

In any case, you'll need to have the server installed and running. To achieve this please refer to the following guides:
1. [RIF Relay Installation](/guides/rif-relay/install/)
2. [RIF Relay Launch](/guides/rif-relay/deployment/)

### RIF Relay SDK

To simplify the integration process a SDK was developed, the SDK is a library that needs to be used from a dApp that will provide us a way to sign transactions.

The SDK's job is to provide a simple access to the general functions from the RIF Relay system. To create an instance of the SDK, follow the steps below:

```typescript
  import {
      DefaultRelayingServices,
      EnvelopingConfig,
      RelayingServicesAddresses
  } from "@rsksmart/rif-relay-sdk";
  import Web3 from "web3";
  
   const config: Partial<EnvelopingConfig> = {
        chainId: <RSK_CHAIN_ID>,
        preferredRelays: [<RIF_RELAY_SERVER_URL>],
        logLevel: 0
    };

    const contractAddresses: RelayingServicesAddresses = {
        relayHub: '0xE0825f57Dd05Ef62FF731c27222A86E104CC4Cad',
        smartWallet: '0x73ec81da0C72DD112e06c09A6ec03B5544d26F05',
        smartWalletFactory: '0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a',
        smartWalletDeployVerifier: '0x1eD614cd3443EFd9c70F04b6d777aed947A4b0c4',
        smartWalletRelayVerifier: '0x5159345aaB821172e795d56274D0f5FDFdC6aBD9',
        // TODO: Why aren't these addresses required? we may set them as optional
        penalizer: '',
        customSmartWallet: '',
        customSmartWalletFactory: '',
        customSmartWalletDeployVerifier: '',
        customSmartWalletRelayVerifier: '',
        sampleRecipient: ''
    };

    const web3 = new Web3(<RSK_NODE_ENDPOINT>);

    const relayingServices = new DefaultRelayingServices(web3);
    await relayingServices.initialize(config, contractAddresses, {
        loglevel: 1
    });
```
> All the contracts addresses and the chainId are from RSK Node Regtest

Where variables are:

  * **RSK_CHAIN_ID**: The RSK node chain ID which is running (e.g. `33`).
  * **RIF_RELAY_SERVER_URL**: The RIF Relay Server URL (e.g. `http://localhost:8090`).
  * **RSK_NODE_ENDPOINT**: The RSK node endpoint which is running (e.g. `http://localhost:4444`).


### Relay Request

To relay transactions we need to have a smart wallet already deployed, the deployment process and definition of a smart wallet can be found [Smart Wallet](/guides/rif-relay/smart-wallets).

The steps that we must follow are:

1. Deploy the smart wallet.
2. Create the transaction that we would like to relay.
3. Envelope the transaction with the Token that we would like to use to pay to the worker and the amount to be paid.
4. Relay the transaction.

```typescript
  import {
      RelayingTransactionOptions,
      SmartWallet,
      RelayingResult
  } from "@rsksmart/rif-relay-sdk";
  import Web3 from "web3";
  import { TransactionConfig } from 'web3-core';

    // Step 1
    const smartWallet: SmartWallet = <SMART_WALLET>;

    // Step 2
    const unsignedTx: TransactionConfig = {
        to: <DESTINATION_ADDRESS>,
        value: <AMOUNT_TO_TRANSFER>
    };

    // Step 3
    const relayTrxOpts: RelayingTransactionOptions = {
        smartWallet,
        unsignedTx,
        tokenAddress: <TOKEN_ADDRESS>,
        tokenAmount: <AMOUNT_OF_TOKENS>
    };

    // Step 4
    const relayintResult: RelayingResult = await relayingServices.relayTransaction(
        relayTrxOpts
    );
```

Where variables are:

  * **SMART_WALLET**: the generated smart wallet from the deployment process.
  * **TOKEN_ADDRESS**: the token contract address.
  * **AMOUNT_OF_TOKENS**: string containing the amount of tokens in decimal unit.

### Custom worker replenish function

Each relayed transaction is signed by a Relay Worker account. The worker accounts are controlled by the Relay Manager. When a relay worker signs and relays a transaction, the cost for that transaction is paid using the funds in that worker's account. If the transaction is not subsidized, then the worker is compensated with tokens.

Worker accounts must always have some minimum balance to pay gas for the transaction. These balances can be managed by implementing a replenishment strategy. The Relay Manager can use the strategy to top off a relay worker's account when the balance gets too low.

We provide a default implementation for a replenish strategy. RIF Relay solution integrators can implement their own replenish strategy.

To implement and use your own replenish strategy:

1. In the folder `src` from the RIF Relay Server project, open `ReplenishFunction.ts` with a text editor.
2. On the function `replenishStrategy` write your new replenish strategy.
3. Re build the project `npm run build`
4. Add the command `--customReplenish` when running a RIF Relay Server or change the config JSON file to set `customReplenish` on true.
