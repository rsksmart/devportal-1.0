---
layout: rsk
title: Rootstock (RSK) Address Resolution guidelines
---

Resolving an Rootstock (RSK) address associated to a domain consist of 4 steps:

1. Obtain the identifier of the domain.

    Use [`namehash` algorithm](https://eips.ethereum.org/EIPS/eip-137#namehash-algorithm)

2. Get the domain's resolver contract.

    Use [`resolver(bytes32)`](https://github.com/rnsdomains/rns-registry/blob/master/contracts/RNS.sol#L34)

3. Detect if contract supports `addr(bytes32)` interface via ERC-165 interface detection.

    Use `supportsInterface(bytes4)` with interface ID: `0x3b3b57de`

    > [ERC-165 spec](https://eips.ethereum.org/EIPS/eip-165)

4. Query for address resolution.

    Use `addr(bytes32)` with the domain identifier.

    > [`addr(bytes32)` spec](/rif/rns/specs/resolvers#contract-address)

```js
function getAddr(domain) {
  const node = namehash(domain)
  const resolver = rns.resolver(node)
  if (!resolver.supportsInterface('0x3b3b57de'))
    throw;
  return resolver.addr(node);
}
```
