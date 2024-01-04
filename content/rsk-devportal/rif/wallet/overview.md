---
menu_order: 200
menu_title: Overview
title: Overview of the RIF Wallet
description: 'RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets'
tags: rif-wallet, rif, rootstock, wallet, smart contracts
layout: rsk
---

[RIF Wallet](https://rif.technology/rif-wallet/) is an open source wallet with account abstraction functionality enabling businesses to create and deploy fully customizable on-chain wallets. 

Easily build and deploy an on-chain wallet, using a set of wallet infrastructure APIs and libraries, the wallet uses the [RIF Relay](https://github.com/rsksmart/rif-relay) for payment of gas fees using ERC20 tokens, and the [RIF Name Service (RNS)](https://github.com/rsksmart/rns-manager-react) for sending and receiving crypto using a easy-to-remember nicknames.

Businesses can take advantage of the smart contract capabilities of the wallet, to build and customize their own custom wallet in a few minutes using the open source libraries. See some of the use cases when building on top of the [RIF Wallet](https://rif.technology/use-cases/).

> See the different ways you can take advantage of the wallet capabilities in your dApp using the [developer reference guide](/rif/wallet/dev-reference/) or the [user guide](/rif/wallet/user-guide/) for informaton on how to download and use the application.

## Features of the wallet

Here are some notable features: 

* Fully customizable and extensible smart wallet: 
The RIF Wallet is a crypto wallet with smart contract functionalities. It is modular in nature and its functionalities can be extended.  Businesses can build and adapt it to suit their use cases. 
* Pay gas fees using multiple ERC20 tokens:
RIF Relay is a secure sponsored transaction system that enables users to pay the transaction fees using ERC-20 tokens. This enables end users to transact entirely using one asset instead of having to manage a separate asset for gas payments.
* Personalized domain usernames:
RNS (RIF Name Service) enables users to transfer and receive digital assets with the use of Aliases / usernames, to create a simple and seamless onboarding experience. Additionally, RNS domains are transferable and tradable as NFTs, allowing speculative use cases, collection, and easy change of ownership. 

## Benefits of using the RIF Wallet
* Bitcoin and Rootstock Compatibility: No need for additional integration, take advantage of bitcoin security while utilizing the smart contract capabilties on Rootstock.
* Easily create and deploy a customizable wallet for your end-users, with capabilities such as on-ramp, personalized domain usernames, cheap gas fee transaction and access to ERC-20 tokens in the Rootstock ecosystem.
* Implementation support and collaboration:
    * Technical support and resources throughout the process to ensure all capabilities of the wallet are fully utilized.
* Easily build a native wallet application from scratch on top of a secure set of pre-packaged libraries and APIs.


## Fees

The RIF Wallet uses RIF Relay to invoke any smart contract method paying the fees with ERC20 token, such as RIF, USDRIF. 

When we make a transaction using RIF Wallet, we use RIF Relay to pay the fees with ERC20 tokens, hence, we do not need the native cryptocurrency (RBTC) to pay the transaction fee.