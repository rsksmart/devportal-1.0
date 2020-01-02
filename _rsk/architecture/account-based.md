---
layout: rsk
title: Account Based RSK Addresses
collection_order: 4200
---

RSK Addresses incorporate an optional blockchain identifier (also known as `chainId`). If the `chainId` is not present, it is assumed the address refers to the RSK main network.

## How to get an address

Check out the already [integrated wallets](/develop/apps/wallets) or [integrate your wallet](/develop/apps/integrate).

## Checksum

RSK implements [EIP-1191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1191.md) to protect users from losing funds by mixing addresses of different Ethereum based networks.

[In this document](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1191.md), you can find out how to apply the checksum and validate an address. This EIP is also supported by Web3 and hardware wallets.

## `chainId`

To avoid a replay attack by using an already-signed transaction, originally broadcast in “network A”, and subsequently replayed it in “network B”, the EVM-based networks use `chainId` as part of the transaction properties.
All `chainId`s can be found at [chainid.network](https://chainid.network/).

```
RSK Mainnet: 30
RSK Testnet: 31
```

See [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#user-content-list-of-chain-ids) for more information.

We strongly recommend the following:

1. Add the `chainId` in the RSK integration (and every time you integrate EVM-based blockchains)
2. Use a different account to hold value for each blockchain (do not share the same account among RSK, ETH, and others)
