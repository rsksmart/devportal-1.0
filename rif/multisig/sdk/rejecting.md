---
layout: rsk
title: RIF Multisig SDK - rejecting
description: Steps required to reject a transaction
tags: rif, gnosis, multisig
prevUrl: '/rif/multisig/sdk/transaction_confirmation/'
nextUrl: '/rif/multisig/sample-application/'
---

**Required packages**:
- [@rsksmart/safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk)

Transaction rejection implies the creation and execution of a new transaction with the same `nonce` of the one we want to reject.
Once the rejection transaction is created, it must be approved and executed according to the threshold currently set to the safe.
For instance, if the current threshold is set to 2, rejecting a transaction will require:
1. The creation of a rejection transaction
2. The approval of the rejection transaction by at least 2 owners
3. The execution of the rejection transaction.

> As long as the rejection transaction isn't executed, the initial transaction could still be approved and executed by other owners.

## Rejection transaction creation

It creates a new transaction, `rejectionTx`,  that must be approved and executed in order to invalidate the original one.

**Parameters**:
- `safe: Safe` - the safe previously created
- `transaction: SafeTransaction` - the transaction to be rejected.
{:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

```ts
import { rejectTx } from '@rsksmart/safe-transactions-sdk'

const rejectionTx = await rejectTx(safe, transaction)
```
{:.snippet__code.snippet__code--lightgreen.border-top-0}


> **IMPORTANT**: With the previously mentioned method, we are creating the rejection transaction, but we are not executing it. The rejection is successful only once it's signed (according to the safe threshold) and executed. Please refer to [transaction execution](/rif/multisig/sdk/transaction_confirmation) for further instructions.
{:.mt-3}
