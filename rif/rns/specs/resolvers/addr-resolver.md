---
layout: rsk
title: RNS Specs - Address resolver
---

Resolvers wishing to support contract address resources must provide the following function:

```
function addr(bytes32 node) constant returns (address);
```

If the Resolver supports addr lookups but the requested node does not have a record, the Resolver MUST return the zero address.

Clients resolving the addr record MUST check for a zero-return value, and treat this in the same manner as a name that does not have a Resolver specified - that is, refuse to send funds to or interact with the address. Failure to do this can result in users accidentally sending funds to the 0 address.

Changes to an address MUST trigger the following event:

```
event AddrChanged(bytes32 indexed node, address addr);
```
