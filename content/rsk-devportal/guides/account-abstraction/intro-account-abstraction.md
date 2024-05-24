---
menu_title: Introduction to Account Abstraction
layout: rsk
title: "Introduction to Account Abstraction"
tags: rootstock, workshop, account-abstraction, wallets, addresses
description: "Learn what account abstraction is, benefits, dApps, on Rootstock, and how to setup an account abstraction dApp on Rootstock"
render_features: 'collapsible'
---

## What is Account Abstraction?

Account abstraction enables the creation of new types of accounts called “contract-type accounts” or simply “accounts”. These accounts can hold both code and ether, and they can execute transactions and smart contract functions. This means that contracts can directly control and manipulate funds, eliminating the need for a separate EOA to initiate transactions.

Simply put;
Regular accounts hold your crypto and need your private key for transactions. Account abstraction lets you create smarter accounts like mini-apps that hold your crypto and can send transactions without needing your key every time.

## Benefits

Account abstraction brings several benefits to the Rootstock ecosystem:

- Enhanced efficiency: By allowing contracts to directly control funds, account abstraction reduces the number of transactions and storage operations required. This leads to improved efficiency and reduces gas costs.
- Improved privacy: Account abstraction enables the creation of more sophisticated smart contracts that can handle transactions privately within the contract itself. It eliminates the need for external transactions, enhancing privacy for users.
- Flexible fee payment models: With account abstraction, contracts can pay transaction fees on behalf of users. This allows for more flexible fee payment models, such as subscriptions or microtransactions, where users don’t need to have ether to execute transactions.
- Customized transaction semantics: Account abstraction opens up possibilities for customizing transaction semantics. Contracts can define their own rules and conditions for executing transactions, enabling more complex and dynamic interactions.

## dApps on Rootstock

Here are some dApps on Rootstock with account abstraction functionalities.

[](#top "collapsible")
- RIF Wallet
    - Built with react native, and account abstraction at its core, the [RIF wallet](https://github.com/rsksmart/rif-wallet) is a programmable wallet that enables developers and businesses to build and deploy a DeFi wallet for their end-users. With features like sending and receiving crypto using human readable names, paying for gas fees using ERC20 tokens, safely transition your users into Web3 without hassle. See some of the [use cases](https://rif.technology/use-cases/) of the RIF Wallet.