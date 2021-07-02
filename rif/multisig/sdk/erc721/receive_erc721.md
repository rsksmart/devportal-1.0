---
layout: rsk
title: RIF Multisig SDK - Receive ERC721 token
---

It is important to understand that in order to receive funds, the Multisig account address (instead of the owner's address) must be used as the receiver.

Assuming the Multisig account was created by means of [EthersSafeFactory](/rif/multisig/sdk/creation):

```ts
const safeSdk = await safeFactory.createSafe({
  owners: ['0x1234...', '0xabcd...', '0x0987...'],
  threshold: 2
})

// address to use as token receiver
const multisigAccountAddress = safeSdk.getAddress()
```

## ERC721

Assuming we have an ERC721-compliant contract and that the token has been created and assigned to another account:

```ts
const erc721Token: Contract;
```

```ts
// address to use as token receiver
const multisigAccountAddress = safeSdk.getAddress()

await erc721Token.transferFrom(
  from,
  multisigAccountAddress,
  tokenId
);
```

Parameters:

- `from: string` - the address from which transfer the token identified by `tokenId`
- `to: string` - the safe address that will receive the token identified by `tokenId`
- `tokenId: BigNumber` - the id of the token will be transferred to address `to`

> **IMPORTANT**: Only the current owner, an authorized operator, or the approved address can call this method, see [ERC721](https://eips.ethereum.org/EIPS/eip-721)