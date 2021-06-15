---
layout: rsk
title: RIF Multisig SDK
---
**Important**: all the SDKs and the sample apps described below support Safe contracts **v1.2.0** and ethers.js **v5** so far.

The suite of SDKs is composed by:
- [`@gnosis.pm/safe-core-sdk`](https://github.com/gnosis/safe-core-sdk): it provides the core functionalities required to interact with a Safe
- [`@rsksmart/safe-factory-sdk`](https://github.com/rsksmart/safe-factory-sdk): it allows the creation of a Safe account without UI interaction
- [`@rsksmart/safe-transactions-sdk`](https://github.com/rsksmart/safe-transactions-sdk): it facilitates the transaction creation (raw transactions, ERC20 transactions and rejections) 
- [`@gnosis.pm/safe-service-client`](https://www.npmjs.com/package/@gnosis.pm/safe-service-client) (still in alpha version as June 2021): it facilitates the interaction with [Safe Transaction Service API](https://github.com/gnosis/safe-transaction-service).

![Multisig - involved SDKs](/assets/img/rif-multisig/packages.png)

Use the suite of SDKs to:
- [Create multisig wallets choosing owners and threshold](creation)
- [CRUD owners](policies/#owners)
- [CRUD threshold](policies/#threshold)
- [Receive RBTC (gas)](receiving/#rbtc)
- [Receive ERC-20 tokens (including RIF tokens)](receiving/#erc20)
- [Request transactions to other owners for sending RBTC, ERC-20 tokens, or any other raw transactions](transactions)
- [Get the list of pending transactions on a multi-sig](listing/#get-the-list-of-pending-transactions)
- [Get the list of past transactions on a multi-sig](listing/#get-the-list-of-past-transactions)
- [Confirm pending transactions on-chain and off-chain](transaction_confirmation)
- [Reject pending transactions](rejecting)
- [Delete a multi-sig withdrawing its funds](deleting).
