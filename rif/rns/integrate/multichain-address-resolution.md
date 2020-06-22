---
layout: rsk
title: Multi-chain address resolution guidelines
---

Resolving a chain address (for example, a Bitcoin address) associated to a domain consist of 4 steps:

1. Obtain the identifier of the domain.

    Use [`namehash` algorithm](https://eips.ethereum.org/EIPS/eip-137#namehash-algorithm)

2. Get the domain's resolver contract.

    Use [`resolver(bytes32)`](https://github.com/rnsdomains/rns-registry/blob/master/contracts/RNS.sol#L34)

3. Detect if contract supports `chainAddr(bytes32,bytes4)` interface via ERC-165 interface detection.

    Use `supportsInterface(bytes4)` with interface ID: `0x8be4b5f6`

    > [ERC-165 spec](https://eips.ethereum.org/EIPS/eip-165)

4. Query for address resolution.

    Use `chainAddr(bytes32,bytes4)` with the domain identifier and the [chain hexa identifier](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)

    > [`chainAddr(bytes32,bytes4)` spec](/rif/rns/specs/resolvers#multicoin-address)

```js
function getAddr(domain, chain) {
  const node = namehash(domain)
  const resolver = rns.resolver(node)
  if (!resolver.supportsInterface('0x8be4b5f6'))
    throw;
  return resolver.chainAddr(node, chain);
}
```
