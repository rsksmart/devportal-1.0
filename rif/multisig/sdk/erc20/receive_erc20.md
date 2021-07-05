---
layout: rsk
title: RIF Multisig SDK - Receive ERC20 token
description: follow these steps to receive erc20 tokens through multisig transactions
tags: rif gnosis multisig erc20
---

It is important to understand that in order to receive funds, the Multisig account address (instead of the owner's address) must be used as the receiver.

Assuming the Multisig account was created by means of [EthersSafeFactory](/rif/multisig/sdk/creation):

```ts
const safeSdk = await safeFactory.createSafe({
  owners: ['0x1234...', '0xabcd...', '0x0987...'],
  threshold: 2
})

// address to use as fund receiver
const multisigAccountAddress = safeSdk.getAddress()
```

## ERC20

Assuming we have an ERC20-compliant contract:

```ts
const erc20Token: Contract;
```

```ts
// address to use as fund receiver
const multisigAccountAddress = safeSdk.getAddress()

const valueToSend = BigNumber.from("1000000000")
await erc20Token.transfer(multisigAccountAddress, valueToSend)
```