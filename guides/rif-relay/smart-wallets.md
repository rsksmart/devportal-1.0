---
layout: rsk
title: RIF Relay Smart Wallets
tags: rif, envelope, relay, user, guide, smart, wallet
permalink: /guides/rif-relay/smart-wallets/
---

This guide is intended to explain more about the interaction and deployment of the Smart Wallets. We will be using additional testing contracts that were included in the project, like the TestToken(ERC20). All the utils scripts are executed from the account[0] from the regtest blockchain. 

## Pre-Requisites

* Follow the deployment process in [Deployment Guide](/guides/rif-relay/deployment).
* The defintion of the smart wallet can be found in [Architecture](/rif/relay/architecture/#smart-wallet)

## RIF Relay SDK

The SDK was developed to simplify the interaction between dapps and RIF Relay. For further details about the SDK usage, please refer to the [related guide](/guides/rif-relay/integrate#rif-relay-sdk).

## Ways to create smart wallets

There are **two ways** to create a Smart Wallet:

1. **Regular transaction:** The Requester (or another account on behalf of the Requester) calls the Proxy Factory asking to get a new Smart Wallet. Therefore the Proxy Factory creates a proxy to the SmartWallet code, delegating the ownership to the Requester.
2. **Sponsored:** It needs to go through the RIF Relay process, which is described in detail below. The requester asks a third party to pay for the Smart Wallet deployment, and the requester pays in tokens for that (or free if it is subsidized by the third-party, a.k.a, Sponsor).

## Send funds

In the [RIF Relay Contracts](https://github.com/rsksmart/rif-relay-contracts) there is a script that would help us to send funds using the `account[0]` from Regtest.

We need to execute the following script:

```
npx truffle exec --network regtest tasks/mint.js --amount 50000000000000000000 --tokenReceiver <ADDRESS>
```
> The token that wold be sent is the Test Token that was deployed. 


## Deploy a Smart Wallet

To deploy a smart wallet we need to follow some steps that will be described below:

1. We need to generate the smart wallet address. As we mention before the Smart Wallet is a contract-based account, therefore, we can generate as many as we want without spending gas by calling the `generateSmartWallet` from the SDK. 
> A Smart Wallet only needs to be deployed when we need to execute a transaction. The deployment process use gas so we need to pay or it can subsidized.


At this point we should have the SDK object created and being called from a dApp. 
   ```typescript
      const smartWallet = await relayingServices.generateSmartWallet(<SMART_WALLET_INDEX>);

      const options: SmartWalletDeploymentOptions = {
        tokenAddress: <TOKEN_ADDRESS>,
        tokenAmount: <AMOUNT_OF_TOKENS>
    }

    await relayingServices.deploySmartWallet(
        smartWallet,
        options
    );
   ```
   > Keep in mind that to pay any amount of token fees during the deployment, the smart wallet must receive funds first

   Where variables are:

  * **SMART_WALLET_INDEX**: the index that we would like to use to generate the smart wallet.
  * **TOKEN_ADDRESS**: the token contract address.
  * **AMOUNT_OF_TOKENS**: string containing the amount of tokens in decimal unit.


