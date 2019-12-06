---
layout: rsk
title: RNS Specs - Resolvers
---

Resolvers may implement any subset of the record types specified here. Where a record types specification requires a resolver to provide multiple functions, the resolver MUST implement either all or none of them.

Resolvers MUST specify a fallback function that throws.

Resolvers must implement [ERC-165](https://eips.ethereum.org/EIPS/eip-165) interface detection standard. `supportsInterface` method must return if the `interfaceID` queried is simply equal to the signature hash of the function that resolves the desired resource record.

Currently standardized resolver interfaces are specified in the table below.

| Interface name | Description | Query via | Interface id | Specs |
| addr | RSK Address | `addr(bytes32 node)` | `0x3b3b57de` | [Address resolver](addr-resolver) |
| hash | 32 bytes | `hash(bytes32 node)` | `0xd8389dc5` | - |
