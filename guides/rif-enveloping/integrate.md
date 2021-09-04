---
layout: rsk
title: RIF Enveloping Integration
tags: rif, enveloping, envelope, relay, user, guide, integrate
permalink: /guides/rif-enveloping/integrate/
---

This guide goes over the exposed Enveloping methods that dApps and wallets can consume to provide relaying as a service, with the purpose of allowing users to pay transaction fees with tokens in a particular system.

## Table of Contents
- [**Introduction**](#introduction)
- [**Requirements**](#requirements)
  - [**Enveloping Smart Contracts**](#enveloping-smart-contracts)
  - [**Relay Server**](#relay-server)
- [**Integration options**](#integration-options)
  - [**Using the Relay Server directly**](#using-the-relay-server-directly)
    - [**Custom worker replenish function**](#custom-worker-replenish-function)
  - [**Using a Relay Provider**](#using-a-relay-provider)
  - [**Using Enveloping as a library**](#using-enveloping-as-a-library)

## Introduction

There are multiple ways to integrate Enveloping into a system. These will be detailed down below.

Additionally, it's important to note that not _all_ of the Enveloping components are needed for a successful integration, as explained in the following section.

## Requirements

### Enveloping Smart Contracts

These need to be deployed and their addresses known. For steps on how to do this, please refer to the [Deploy contracts locally section](/guides/rif-enveloping/install/#deploy-contracts-locally) of the Installation guide.

Once deployed, you'll only need the RSK node to be running.

### Relay Server

The Relay Server is the off-chain component in charge of receiving transactions and sending them to the on-chain components, chiefly the Relay Hub. The Relay Hub manages information about the Relay Workers and Relay Managers, but also communicates with the rest of the on-chain components in turn: the Smart Wallets, Factory and Verifier contracts.

The Relay Manager owns Relay Worker accounts with funds in native coin. To relay a transaction, a Worker signs it and sends it to the Relay Hub paying for the gas consumed. In the case of a happy flow, transactions will ultimately be relayed through the Relay Hub, using the EIP-712 library.

For more details on this, please refer to the [Architecture page](/rif/enveloping/architecture/).

Users can interact with the Relay Server directly or indirectly. For the latter, a user can communicate with a Relay Server through a Relay Client. A Relay Client knows the addresses of different Relay Servers and it can send on-chain requests to any one of them. The Relay Client then sends the transaction to be sponsored to the Relay Server via HTTP request.

In any case, you'll need to have the server installed and running. To achieve this please refer to the following guides:
1. [RIF Enveloping Installation](/guides/rif-enveloping/install/)
2. [RIF Enveloping Launch](/guides/rif-enveloping/launch/)

## Integration options

### Using the Relay Server directly

The simplest option to use Enveloping in your wallet or dApp is by calling the Relay Server directly. The instructions for running a Relayer are here. The communication with the Relay Server is done through HTTP requests.

The order of events for relaying transactions or deploying smart wallets through the Relay Server is:
1. Create a relay or deploy request.
2. Sign the structure (the wrapped transaction) using the EIP712 signature.
3. Create the metadata with the signature.
4. With the relay or deploy request and the metadata, create an HTTP request.
5. Call the Relay Server `/relay` method using an HTTP POST request.

Here's an example of how the HTTP Relay Request might look like:

```json
{
  "relayRequest": {
    "request": {
      "relayHub": "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701",
      "to": "0xafa16a8d7a94550079014d537e9440ddb7765d29",
      "data": "0x0a798f2400000000000000000000000020ff84b8da5034b51cf3dfdc7a92d2b7c3b6a2f300000000000000000000000074dc4471fa8c8fbe09c7a0c400a0852b0a9d04b200000000000000000000000000000000000000000000000000000000000001f4",
      "from": "0x20ff84b8da5034b51cf3dfdc7a92d2b7c3b6a2f3",
      "value": "0x0",
      "nonce": "0",
      "gas": "92705",
      "tokenAmount": "6",
      "tokenGas": "16368",
      "tokenContract": "0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8"
    },
    "relayData": {
      "gasPrice": "60000000",
      "callVerifier": "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2",
      "domainSeparator": "0xee8f106669d0f00ba21e4d25a7b02337c48fef88b142c67e6c9db7b2bc5b45d3",
      "callForwarder": "0xD13377bAaE7D7Ef60bfeb95B6e4E6e66ca371618",
      "relayWorker": "0x20bd539d672b605278f98cef7ee94d59bc3f1f17"
    }
  },
  "metadata": {
    "relayHubAddress": "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701",
    "signature": "0xa28883f3072c3a5a5f77153540382e8bdfd2c91b74614b9e8cb84ecd3ba588f03c20793e44c567cfefebdf4e34872da83706c7f55af5c467aa47e622d08718511b",
    "relayMaxNonce": 5
  }
}
```

Here are some useful resources to help you manually put these structures together:
1. [Relay Transaction Request structures](https://github.com/rsksmart/rif-relay/blob/master/src/relayclient/types/RelayTransactionRequest.ts)
2. [Account Manager `sign` implementation](https://github.com/rsksmart/rif-relay/blob/master/src/relayclient/AccountManager.ts#L65)
3. [HTTP Server `relayHandler` implementation](https://github.com/rsksmart/rif-relay/blob/master/src/relayserver/HttpServer.ts#L101)
4. [EIP-712](https://eips.ethereum.org/EIPS/eip-712)

#### Custom worker replenish function

Each relayed transaction is signed by a Relay Worker account. The worker accounts are controlled by the Relay Manager. When a relay worker signs and relays a transaction, the cost for that transaction is paid using the funds in that worker's account. If the transaction is not subsidized, then the worker is compensated with tokens.

Worker accounts must always have some minimum balance to pay gas for the transaction. These balances can be managed by implementing a replenishment strategy. The Relay Manager can use the strategy to top off a relay worker's account when the balance gets too low.

We provide a default implementation for a replenishment strategy.  Enveloping solution integrators can implement their own replenish strategy.

To implement and use your own replenish strategy:

1. In the folder `src/relayserver`, open `ReplenishFunction.ts` with a text editor.
2. On the function `replenishStrategy` write your new replenish strategy.
3. Re build the project `yarn && yarn prepare`
4. Add the command `--customReplenish` when running a Relay Server or change the config json file to set `customReplenish` on true.

### Using a Relay Provider

Another option is to use Enveloping through a Relay Provider. A Relay Provider is a web3 provider and all transactions and calls are handled through it. Under the hood, the Relay Provider uses a Relay Client instance to interact with the Relay Server.

Here's a sample typescript snippet for deploying a Smart Wallet address as well as relaying a transaction through the use of the Relay Provider.

```typescript
import { RelayProvider, resolveConfiguration } from "@rsksmart/enveloping";
import Web3 from "web3";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const web3 = new Web3("http://localhost:4444");

const smartWalletFactoryAbi = {
  // JSON data containing the abi of the smart wallet factory contract
}; 
const smartWalletFactoryAddress = "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701"; // the smart wallet factory contract address (can be retrieved from the deployment summary)
const smartWalletIndex = 0; // the index of the smart wallet to use (leave as 0 for default behavior)

const smartWalletAddress = await new web3.eth.Contract(
    smartWalletFactoryAbi,
    smartWalletFactoryAddress
).methods.getSmartWalletAddress(
    account.address,
    ZERO_ADDRESS,
    smartWalletIndex
).call(); // this will generate an address for the Smart Wallet to be deployed

const relayVerifierAddress = "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"; // the relay verifier contract address (can be retrieved from the deployment summary)
const deployVerifierAddress = "0x1938517B0762103d52590Ca21d459968c25c9E67"; // the deploy verifier contract address (can be retrieved from the deployment summary)

const config = await resolveConfiguration(web3.currentProvider,
    {
        verbose: true,
        onlyPreferredRelays: true,
        preferredRelays: ["http://localhost:8090"], // replace with your own if necessary
        factory: smartWalletFactoryAddress,
        gasPriceFactorPercent: 0,
        relayLookupWindowBlocks: 1e5,
        chainId: 33, // regtest
        relayVerifierAddress,
        deployVerifierAddress,
        smartWalletFactoryAddress
    });
config.relayHubAddress = "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701"; // the relay hub contract address (can be retrieved from the deployment summary)

const provider = new RelayProvider(web3.currentProvider, config);

provider.addAccount(account); // see note down below

web3.setProvider(provider);

// Deploy Smart Wallet

const tokenContract = "0x0E569743F573323F430B6E14E5676EB0cCAd03D9"; // token address to use on smart wallet
const tokenAmount = "100"; // total token amount for the smart wallet, the smart wallet address should have a balance greater than this number before calling the deploy

const deployTransaction = await provider.deploySmartWallet({
    from: account.address,
    to: ZERO_ADDRESS,
    gas: "0x27100",
    value: "0",
    callVerifier: deployVerifierAddress,
    callForwarder: smartWalletFactoryAddress,
    tokenContract,
    tokenAmount,
    data: "0x",
    index: smartWalletIndex,
    recoverer: ZERO_ADDRESS,
    isSmartWalletDeploy: true,
    onlyPreferredRelays: true,
    smartWalletAddress
});

// Relay Transaction

const unsigned_tx = {
  // some common web3 transaction with the usual parameters, for example:
  "nonce": "0x0",
  "to": "0xAfA16A8d7a94550079014D537e9440ddB7765d29",
  "value": "0x00",
  "data": "0x0a798f2400000000000000000000000020ff84b8da5034b51cf3dfdc7a92d2b7c3b6a2f30000000000000000000000001938517b0762103d52590ca21d459968c25c9e6700000000000000000000000000000000000000000000000000000000000001f4",
  "chainId": "33"
};

const tokenAmountForRelay = "10"; // how many tokens will be used to pay for the relaying. if left at 0, transaction will be sponsored

const relayTransaction = web3.eth.sendTransaction({
    from: account.address,
    callVerifier: relayVerifierAddress,
    callForwarder: smartWalletAddress,
    isSmartWalletDeploy: false,
    onlyPreferredRelays: true,
    tokenAmount: tokenAmountForRelay,
    tokenContract,
    ...unsigned_tx,
});
```

**Note**: in the example above the `account` object is assumed as an object containing the address (as string) and the privateKey (as buffer). This is just an example, **DO NOT** use this in production:

```typescript
decryptedAccount = web3.eth.accounts.privateKeyToAccount(_privateKey);
const account = {
  address: decryptedAccount.address,
  privateKey: Buffer.from(
    decryptedAccount.privateKey.replaceAll("0x", ""),
    "hex"
  ),
  privateKeyString: decryptedAccount.privateKey,
}
``` 

Before running this example, you need to know of a few requirements:

1. The smart wallet address generated by the contract call should be funded with tokens before running the deploy call. Otherwise, you can set `tokenAmount` to `0` (or remove it) to make a subsidized deploy instead.
2. The token address you use needs to be explicitly allowed. To do so, make a call to the contracts involved to allow them to work with your particular token. These contracts are the relay and deploy verifiers. The method in question is called `acceptToken`, and it can be successfully called only from the contract deployer account (if you are running this in regtest, then `accounts[0]` is the owner).

You can allow tokens by calling the relay verifier and deploy verifier (for both wallets, smart wallet and custom smart wallet) contracts manually with web3.

Here is an example of how to allow tokens using web3 on truffle console:
```typescript
const smartWalletDeployVerifierAbi = require("../src/cli/compiled/DeployVerifier.json").abi;
const customSmartWalletDeployVerifierAbi = require("../src/cli/compiled/CustomSmartWalletDeployVerifier.json").abi;
const relayVerifierAbi = require("../src/cli/compiled/RelayVerifier.json").abi;

const relayVerifierAddress = "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"; // the relay verifier contract address (can be retrieved from the deployment summary)
const deployVerifierAddress = "0x1938517B0762103d52590Ca21d459968c25c9E67"; // the deploy verifier contract address (can be retrieved from the deployment summary)
const customRelayVerifierAddress = "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"; // the custom smart wallet relay verifier contract address (can be retrieved from the deployment summary)
const customDeployVerifierAddress = "0x1938517B0762103d52590Ca21d459968c25c9E67"; // the custom smart wallet deploy verifier contract address (can be retrieved from the deployment summary)

const smartWalletDeployVerifier = await new web3.eth.Contract(smartWalletDeployVerifierAbi, deployVerifierAddress);
const smartWalletRelayVerifier = await new web3.eth.Contract(relayVerifierAbi, relayVerifierAddress);
const customSmartWalletDeployVerifier = await new web3.eth.Contract(customSmartWalletDeployVerifierAbi, customDeployVerifierAddress);
const customSmartWalletRelayVerifier = await new web3.eth.Contract(relayVerifierAbi, customRelayVerifierAddress);
const accounts = await web3.eth.getAccounts();

const tokenAddress = "0x0E569743F573323F430B6E14E5676EB0cCAd03D9"; // token address to allow

await smartWalletDeployVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
await smartWalletRelayVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
await customSmartWalletDeployVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
await customSmartWalletRelayVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
```

### Using Enveloping as a library

Development of an SDK for the Enveloping project is underway, and will be released soon.