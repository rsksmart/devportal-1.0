---
layout: rsk
title: RNS Specs - Chain address resolver
---

<div class="alert alert-warning">
  This specification will change in the near future, due to incompatibilities with ENS specs.
</div>

Resolvers wishing to support multi-chain address resources must provide the following function:

```
function chainAddr(bytes32 node, bytes4 chain) constant returns (string);
```

- `node`: RNS node to get the chain address from.
- `chain`: Chain hexa identifier defined in [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).
- Returns an address of the node and chain specified.

If the Resolver supports `chainAddr` lookups but the requested node does not have a record, the Resolver must return an empty string.

Clients resolving the `chainAddr` record must check for a `length < 1` value, and treat this in the same manner as a name that does not have a specified chain address resolution - that is, refuse to send funds to or interact with the address. Failure to do this can result in users accidentally sending funds to the 0 address of any chain allowing this behavior.

The function signature is `0x8be4b5f6`. This must return true on `supportsInterface` method.

Changes to a chain address must trigger the following event:

```
event ChainAddrChanged(bytes32 indexed node, bytes4 chain, string addr);
```
