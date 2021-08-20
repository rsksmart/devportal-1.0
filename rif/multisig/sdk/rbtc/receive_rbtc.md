---
layout: rsk
title: RIF Multisig SDK - Receive RBTC
description: follow these steps to receive gas on the multisig account
tags: rif, gnosis, multisig, rbtc
render_features: 'collapsible'
prevUrl: '/rif/multisig/sdk/policies/'
nextUrl: '/rif/multisig/sdk/rbtc/rbtc_transactions/'
---

It is important to understand that in order to properly receive funds, the Multisig account address (instead of the owner address) must be used as the receiver.

[](#top "collapsible")
- A) Get the Multisig account address
  * Assuming the Multisig account was created by means of [EthersSafeFactory](/rif/multisig/sdk/creation):

  ```ts
  const safeSdk = await safeFactory.createSafe({
    owners: ['0x1234...', '0xabcd...', '0x0987...'],
    threshold: 2
  })

  // address to use as fund receiver
  const multisigAccountAddress = safeSdk.getAddress()
  ```
  {:.snippet__code.snippet__code--lightgreen}

- B) Send the transaction
  * Here below is an example of a transaction executed for funding the Multisig account using [ethers](https://docs.ethers.io/v5/)
  
  ```ts
  // address to use as fund receiver
  const multisigAccountAddress = safeSdk.getAddress()

  const valueToSend = BigNumber.from("1000000000")
  await signer.sendTransaction({
      to: multisigAccountAddress,
      value: valueToSend
  })
  ```
  {:.snippet__code.snippet__code--lightgreen}

___
For further details, please have a look at:
- [signer.sendTransaction](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)
- [provider.sendTransaction](https://docs.ethers.io/v5/api/providers/provider/#Provider-sendTransaction)
