---
layout: rsk
title: RNS Solidity artifacts - String Resolver
---

String Resolver provides an RNS domain of a string resolution.

It provides two methods:

```solidity
function str(bytes32 node) external view returns (string memory)
```

Returns the current str record for a domain.

Params:
- `node` domain

Returns:
- str record

```solidity
function setStr(bytes32 node, string calldata newStr) external onlyNodeOwner(node)
```

Sets the str record for a domain.

Params:
- `node` domain
- `newStr` record value

Emits:
```solidity
event NewStr(bytes32 indexed node, string str)
```
