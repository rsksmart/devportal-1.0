---
menu_order: 200
menu_title: Overview
title: RIF Wallet App - Overview
description: 'RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets'
tags: rif-wallet, rif, rootstock, wallet, smart contracts
layout: rsk
---

Built with react native, and account abstraction at its core, the [RIF wallet](https://github.com/rsksmart/rif-wallet) is a programmable wallet that enables developers and businesses to build and deploy a DeFi wallet for their end-users. With features like sending and receiving crypto using human readable names, paying for gas fees using ERC20 tokens, safely transition your users into Web3 without hassle. See some of the [use cases](https://rif.technology/use-cases/) of the RIF Wallet.

The wallet stack comprises of [RIF Relay](https://github.com/rsksmart/rif-relay) for payment of gas fees using ERC20 tokens, [RIF Name Service (RNS)](https://github.com/rsksmart/rns-manager-react) for sending and receiving crypto via usernames, and a set of wallet APIs and libraries for easy setup and development.

> Get started with development using the [developer reference guide](/rif/wallet/dev-reference/) or visit the [user guide](/rif/wallet/user-guide/) section for informaton on how to download and start receiving crypto.

## Features of the wallet

Here are some notable features of the RIF Wallet: 

* Fully programmable and extensible smart wallet: 
The RIF Wallet is a crypto wallet with smart contract functionalities. It is modular in nature and its functionalities can be extended.  Businesses can build and adapt it to suit their use cases. 
* Pay gas fees using multiple ERC20 tokens:
RIF Relay is a secure sponsored transaction system that enables users to pay the transaction fees using ERC-20 tokens. This enables end users to transact entirely using one asset instead of having to manage a separate asset for gas payments.
* Personalized domain usernames:
RNS (RIF Name Service) enables users to transfer and receive digital assets with the use of Aliases / usernames, to create a simple and seamless onboarding experience. Additionally, RNS domains are transferable and tradable as NFTs, allowing speculative use cases, collection, and easy change of ownership. 
* Connect to other dApps using WalletConnect
Establish seamless connections with various decentralized applications (dApps) by utilizing the WalletConnect feature, facilitating a user-friendly and integrated experience across the blockchain ecosystem.
* Add a Contact 
Effortlessly include a contact's details (Username and/or address, Name) in your Contact list, sparing you from the hassle of memorizing blockchain addresses.

## Benefits of using the RIF Wallet
* Bitcoin and Rootstock Compatibility: No need for additional integration, take advantage of bitcoin security while utilizing the smart contract capabilties and also access native tokens (USDRIF, RIF and BTC and RBTC) on Rootstock
* Easily create and deploy a full programmable DeFi on Bitcoin wallet for your end-users, with capabilities such as personalized domain usernames, cheap gas fee transaction fees using ERC-20 tokens.
* Implementation support and collaboration:
    * Technical support and resources throughout the process to ensure all capabilities of the wallet are fully utilized.
* Easily build a native wallet application from scratch on top of a secure set of pre-packaged libraries and APIs.


## Fees

The RIF Wallet uses RIF Relay to invoke any smart contract method paying the fees with ERC20 token, such as RIF, USDRIF. When performing a transaction using the RIF Wallet, we use RIF Relay to pay the fees with ERC20 tokens, hence, we do not need the native cryptocurrency (RBTC) to pay the transaction fee. 

> No direct fees are incurred when performing transactions using the RIF Wallet App. See [FAQs](../faqs#general).