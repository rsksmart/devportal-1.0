---
layout: rsk
title: RIF Multisig SDK
description: Overview of the operations allowed through a Multisig account
tags: rif, gnosis, multisig
render_features: 'switch-container'
---
**Important**: all the SDKs and the sample apps described below support Safe contracts **v1.2.0** and ethers.js **v5** so far.

## Requirements

[](#top "switch-container")
- Basic
    * `Nodesj` and `npm` are pre-requirements
    * Dependency installation
- Advanced
    * `Nodesj` and `npm` are pre-requirements
    * Dependency installation
    * Deployment of the Gnosis Safe contracts (required `GnosisSafe` and `GnosisSafeProxyFactory` only); for further info, please visit [https://gnosis-safe.io/](https://gnosis-safe.io/) and the [official deployment portal](https://docs.gnosis.io/safe/docs/contracts_deployment/).

The suite of SDKs is composed by:
- [`@gnosis.pm/safe-core-sdk`](https://github.com/gnosis/safe-core-sdk): it provides the core functionalities required to interact with a Safe
- [`@rsksmart/safe-factory-sdk`](https://github.com/rsksmart/safe-factory-sdk): it allows the creation of a Safe account without UI interaction
- [`@rsksmart/safe-transactions-sdk`](https://github.com/rsksmart/safe-transactions-sdk): it facilitates the transaction creation (raw transactions, ERC20 transactions and rejections) 
- [`@gnosis.pm/safe-service-client`](https://www.npmjs.com/package/@gnosis.pm/safe-service-client) (still in alpha version as June 2021): it facilitates the interaction with [Safe Transaction Service API](https://github.com/gnosis/safe-transaction-service).

Use the suite of SDKs to:
- [Create multisig wallets choosing owners and threshold](creation)
- [CRUD owners and threshold](policies/)
- [Receive RBTC (gas)](rbtc/receive_rbtc)
- [Request transactions to other owners for sending RBTC, or any other raw transaction](rbtc/rbtc_transactions)
- [Receive ERC-20 tokens (including RIF tokens)](erc20/receive_erc20)
- [Request transactions to other owners for sending ERC-20 tokens](erc20/erc20_transactions)
- [Receive ERC721 tokens (collectibles)](erc721/receive_erc721)
- [Request transactions to other owners for sending ERC-721 tokens](erc721/erc721_transactions)
- [Get the list of pending and past transactions on a multi-sig](listing)
- [Confirm pending transactions on-chain and off-chain](transaction_confirmation).

## Contract addresses

RSK Testnet:
- `GnosisSafe`: [`0xffd41b816f2821e579b4da85c7352bf4f17e4fa5`](https://explorer.testnet.rsk.co/address/0xffd41b816f2821e579b4da85c7352bf4f17e4fa5)
- `GnosisSafeProxyFactory`: [`0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a`](https://explorer.testnet.rsk.co/address/0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a)

RSK Mainnet:
- `GnosisSafe`: [`0xC6cFa90Ff601D6AAC45D8dcF194cf38B91aCa368`](https://explorer.rsk.co/address/0xC6cFa90Ff601D6AAC45D8dcF194cf38B91aCa368)
- `GnosisSafeProxyFactory`: [`0x4b1Af52EA200BAEbF79450DBC996573A7b75f65A`](https://explorer.rsk.co/address/0x4b1Af52EA200BAEbF79450DBC996573A7b75f65A)
