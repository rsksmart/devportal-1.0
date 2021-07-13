---
layout: rsk
title:  The Product
description: Overview of the RIF Savings and Vault Solution
tags: rif gnosis multisig
---

The product for RIF Savings and Vault consists of porting and increasing the existing Gnosis SDK to allow RSK developers to operate multisig accounts in a safe and intuitive way, following the documentation and a sample application that will help with the correct implementation of the Gnosis solution.

In short, it implies:

* Deploying Gnosis smart contracts in RSK
* Test (and correct if necessary) the existing functionality in the SDK
* Adding the required functionalities that are not supported yet, either collaborating or creating our own libraries
* Documenting the correct processes for creating and operating multisig accounts
* Creating a sample application that allows the correct understanding of the user experience

## Features

The RIF Savings and Vault solution will allow RSK developers to use our SDKs, and with the help of the documentation to:

* Create multisig account choosing its owners and threshold
* CRUD multisig owners and threshold
* Receive RBTC (gas)
* Receive ERC-721 tokens (including RIF token)
* Request transactions to other owners for:
    * sending RBTC
    * sending ERC-20 tokens
    * sending ERC-721 tokens
    * sending raw transactions

* Get the list of pending transactions on a multisig wallet
* Confirm pending transactions on-chain and off-chain
* Reject pending transactions

![Multisig Product - User Story](/assets/img/rif-multisig/product-user-story.png)

## The User Story

The main user story across this project is:

1. As an individual, I want to level up my security by requiring multiple private keys to sign transactions.
    * For multisig addresses, I want to execute transactions by signing with some or all of the private keys corresponding to multiple public keys registered.
    * I want to manage and set the numbers of signatures required to sign a transaction.
2. As an individual, I want to improve security and respond to lost private keys:
    * I have no worry of losing my assets because it is impossible to access the asset with only one of its private keys if secured with multisig.
    * My account will not just be controlled by a seed phrase but can be controlled by multiple seed phrases.