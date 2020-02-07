---
layout: rsk
title: RNS Solidity artifacts - String Resolver
---

String Resolver provides an RNS domain of a string resolution.

- RSK Mainnet: [0x2e4ae4ce78261f0efd8d859cf54966d7b2a7ae11](https://explorer.rsk.co/address/0x2e4ae4ce78261f0efd8d859cf54966d7b2a7ae11)
- RSK Testnet: [0xc980a15304b70a6a00ce8fd376e8ce78e15c5dd8](https://explorer.testnet.rsk.co/address/0xc980a15304b70a6a00ce8fd376e8ce78e15c5dd8)

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
