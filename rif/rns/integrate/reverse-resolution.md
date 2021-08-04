---
layout: rsk
title: Reverse address resolution
tags: rif, rns, rif-name-service, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

Finding the domain associated with an address consists of X steps:

1. Obtain the identifier of the address reverse records.

    Generate the RNS domain for a given account's reverse records. Convert the address to hexadecimal representation in lower-case, and append `addr.reverse`. For instance, the address `0x112234455c3a32fd11230c42e7bccd4a84e02010` might have its reverse records associated at `112234455c3a32fd11230c42e7bccd4a84e02010.addr.reverse`.

    Use [`namehash` algorithm](https://eips.ethereum.org/EIPS/eip-137#namehash-algorithm) with the reverse record domain to get the identifier of the address.

2. Get its resolver contract.

    Use [`resolver(bytes32)`](https://github.com/rnsdomains/rns-registry/blob/master/contracts/RNS.sol#L34)

3. Detect if contract supports `name(bytes32)` interface via ERC-165 interface detection.

    Use `supportsInterface(bytes4)` with interface ID: `0x691f3431`

    > [ERC-165 spec](https://eips.ethereum.org/EIPS/eip-165)

4. Query for name resolution.

    Use [`name(bytes32)`](https://github.com/rnsdomains/rns-reverse/blob/master/contracts/NameResolver.sol#L37) with the domain identifier.

    > [`name(bytes32)` spec](https://eips.ethereum.org/EIPS/eip-181#resolver-interface)

```js

function reverseResolve (address) {
  const reverseName = `${address.slice(2).toLowerCase()}.addr.reverse`;
  const node = namehash(reverseName);
  const resolver = rns.resolver(node);
  const name = resolver.name(node);
  return name;
}

function getName(address) {
  const reverseDomain = `${address.slice(2).toLowerCase()}.addr.reverse`;
  const node = namehash(reverseDomain)
  const resolver = rns.resolver(node)
  if (!resolver.supportsInterface('0x691f3431'))
    throw;
  return resolver.name(node);
}
```
