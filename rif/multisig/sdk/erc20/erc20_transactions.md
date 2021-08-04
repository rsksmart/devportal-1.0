---
layout: rsk
title: RIF Multisig SDK - ERC20 Transactions
description: follow these steps to send erc20 tokens through multisig transactions
tags: rif gnosis multisig erc20
---

## ERC20 Transactions

The [@rsksmart/safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk) package facilitates the creation of ERC20 transactions.

The `ERC20TransactionBuilder` provides a set of methods related to [ERC20](https://eips.ethereum.org/EIPS/eip-20) transactions, including [RIF token](https://developers.rsk.co/rif/token/).

### Initialization
Initialize the `ERC20TransactionBuilder`.

```ts
import { ERC20TransactionBuilder } from '@rsksmart/safe-transactions-sdk'

const erc20TransactionBuilder = ERC20TransactionBuilder.create(safe, ERC20Token)
```

Parameters:
- `safe: Safe` - a [Safe instance](https://github.com/gnosis/safe-core-sdk/blob/main/packages/safe-core-sdk/src/Safe.ts)
- `ERC20Token: Contract` - an [ethers.js Contract](https://docs.ethers.io/v5/api/contract/contract/) representing the ERC20 token

### Transfer transaction

```ts
const safeTransaction = await erc20TransactionBuilder.transfer(
  to,
  transfer
)
```

Parameters:
- `to: string` - the address will receive the amount of token specified with `transfer`
- `transfer: BigNumber` - the amount of token will be transferred to address `to`

### TransferFrom transaction

```ts
const safeTransaction = await erc20TransactionBuilder.transferFrom(
  from,
  to,
  value
)
```

Parameters:
- `from: string` - the address from which transfer the amount of token specified with `value`
- `to: string` - the address will receive the amount of token specified with `transfer`
- `value: BigNumber` - the amount of token will be transferred to address `to`


> To execute the `transferFrom` successfully, the `from` address should explicitly authorize the safe account to spend an amount equal to or greater than `value`. Such operation can be authorized through the `approve` method of the `ERC20Token` Contract.

```ts
const fromToken = await MockERC20Token.connect(userFrom)
await fromToken.approve(safe.getAddress(), value)
```

### Approve transaction

```ts
const safeTransaction = await erc20TransactionBuilder.approve(
  spender,
  amount,
)
```

Parameters:
- `spender: string` - the address allowed to withdraw up to the amount of token specified with `amount`
- `amount: BigNumber` - the maximum amount allowed to be withdrawn


As stated in the [EIP20](https://eips.ethereum.org/EIPS/eip-20#methods) approve description:

> clients SHOULD make sure to create user interfaces in such a way that they first set the allowance to 0, before setting it to another value for the same spender.

For further details, please read [*ERC20 API: An Attack Vector on Approve/TransferFrom Methods* by Mikhail Vladimirov and Dmitry Khovratovich](https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/).
