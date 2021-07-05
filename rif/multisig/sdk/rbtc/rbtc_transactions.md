---
layout: rsk
title: RIF Multisig SDK - Send RBTC
description: follow these steps to send gas on the multisig account and to create raw transactions
tags: rif gnosis multisig rbtc
---

**Required packages**:
- [@rsksmart/safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk)
- [@gnosis.pm/safe-core-sdk](https://github.com/gnosis/safe-core-sdk)

## Raw Transactions

Raw transactions can be created by using directly the [safe-core-sdk](https://github.com/gnosis/safe-core-sdk) package or the [safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk).

```ts
const tx = await safe.createTransaction({
      to,
      data,
      value
    })
```

### safe-transactions-sdk

The `RawTransactionBuilder` provides the possibility to create raw transactions.

Initialize the `RawTransactionBuilder`.

```ts
import { RawTransactionBuilder } from '@rsksmart/safe-transactions-sdk'

const rawTransactionBuilder = new RawTransactionBuilder(safe)
```

Create the transaction.

```ts
const tx = await rawTransactionBuilder.rawTransaction(to, value, data)
```
