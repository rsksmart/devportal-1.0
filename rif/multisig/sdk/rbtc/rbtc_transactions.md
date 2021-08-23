---
layout: rsk
title: RIF Multisig SDK - Send RBTC
description: follow these steps to send gas on the multisig account and to create raw transactions
tags: rif, gnosis, multisig, rbtc
render_features: 'collapsible'
prevUrl: '/rif/multisig/sdk/rbtc/receive_rbtc/'
nextUrl: '/rif/multisig/sdk/erc20/receive_erc20/'
---

**Required packages**:
- [@rsksmart/safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk)
- [@gnosis.pm/safe-core-sdk](https://github.com/gnosis/safe-core-sdk)

## Raw Transactions with `safe-core-sdk`

Raw transactions can be created by using directly the [safe-core-sdk](https://github.com/gnosis/safe-core-sdk) package or the [safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk).

```ts
const tx = await safe.createTransaction({
      to,
      data,
      value
    })
```
{:.snippet__code.snippet__code--lightgreen}

___
### safe-transactions-sdk

The `RawTransactionBuilder` provides the possibility to create raw transactions.

[](#top "collapsible")
- A) Initialize the RawTransactionBuilder
  * **Parameters**:
    - `safe: Safe` - the safe previously created
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}
  
  ```ts
  import { RawTransactionBuilder } from '@rsksmart/safe-transactions-sdk'

  const rawTransactionBuilder = new RawTransactionBuilder(safe)
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

- B) Create the transaction.
  * **Parameters**:
    - `to: string` - the transaction receiver address
    - `value: string` - the amount we want to transfer
    - `data: string` - the data we want to send with the transaction
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  const tx = await rawTransactionBuilder.rawTransaction(to, value, data)
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}
