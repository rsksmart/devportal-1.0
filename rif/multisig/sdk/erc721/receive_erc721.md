---
layout: rsk
title: RIF Multisig SDK - Receive ERC721 token
description: follow these steps to receive erc721 tokens through multisig transactions
tags: rif, gnosis, multisig, erc721
render_features: 'collapsible'
prevUrl: '/rif/multisig/sdk/erc20/erc20_transactions/'
nextUrl: '/rif/multisig/sdk/erc721/erc721_transactions/'

---

It is important to understand that in order to receive funds, the Multisig account address (instead of the owner's address) must be used as the receiver.

[](#top "collapsible")
- A) Get the Multisig account address
  * Assuming the Multisig account was created by means of [EthersSafeFactory](/rif/multisig/sdk/creation):

  ```ts
  const safeSdk = await safeFactory.createSafe({
    owners: ['0x1234...', '0xabcd...', '0x0987...'],
    threshold: 2
  })

  // address to use as token receiver
  const multisigAccountAddress = safeSdk.getAddress()
  ```
  {:.snippet__code.snippet__code--lightgreen}

- B) Transfer ERC721 tokens
  * Assuming we have an ERC721-compliant contract and that the token has been created and assigned to another account:
  
  * **Parameters**
    - `from: string` - the address `from` which transfers the token identified by `tokenId`
    - `to: string` - the safe address that will receive the token identified by `tokenId`
    - `tokenId: BigNumber` - the id of the token will be transferred to address `to`
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  const erc721Token: Contract;
  // address to use as token receiver
  const multisigAccountAddress = safeSdk.getAddress()

  await erc721Token.transferFrom(
    from,
    multisigAccountAddress,
    tokenId
  );
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

> **IMPORTANT**: Only the current owner, an authorized operator, or the approved address can call this method, see [ERC721](https://eips.ethereum.org/EIPS/eip-721)
