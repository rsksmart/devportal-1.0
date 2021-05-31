---
layout: rsk
title: RIF Multisig SDK
---

The suite of SDKs is composed by:
- [safe-core-sdk](https://github.com/gnosis/safe-core-sdk)
- [safe-factory-sdk](https://github.com/rsksmart/safe-factory-sdk)
- [safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk)
- ??? safe-transactions-service-sdk (TBD)


Use the suite of SDKs to:
- [Create multisig wallets choosing its owners and threshold](creation)
- [CRUD owners](policies/#owners)
- [CRUD threshold](policies/#threshold)
- [Receive RBTC (gas)](receiving/#rbtc)
- [Receive ERC-20 tokens (including RIF tokens)](receiving/#erc20)
- [Request transactions to other owners for sending RBTC, ERC-20 tokens, or any other raw transactions](transactions)
- [Get the list of pending transactions on a multi-sig](listing)
- [Confirm pending transactions on-chain and off-chain](transaction_confirmation)
- [Reject pending transactions](rejecting)
- [Delete a multi-sig withdrawing its funds](deleting)
