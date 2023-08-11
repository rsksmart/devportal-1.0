---
layout: rsk
menu_order: 300
menu_title: Name Resolver
title: Name Resolver
tags: rif, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

Return a valid RNS name for the requested node, or the empty string if no name is defined for the requested node.

## Mainnet

- **Address**: [0x4b1a11bf6723e60b9d2e02aa3ece34e24bde77d9](https://explorer.rsk.co/address/0x4b1a11bf6723e60b9d2e02aa3ece34e24bde77d9)
- **ABI**: [NameResolverABI.json](/rif/rns/architecture/NameResolverABI.json)

See [RNS Testnet section](/rif/rns/testnet) for testing environment information.

## Index

- [Methods](#methods)
  - [`setName`](#setname)
  - [`name`](#name)

## Methods

#### setName

Sets the name associated with an RNS node, for reverse records.

May only be called by the owner of that node in the RNS registry.

**Signature**

```
function setName(bytes32 node, string calldata name) external
```

**Parameters**

- `node`: the node to update.
- `name`: the name to set.

**Events**

```
event NameChanged(bytes32 node, string name);
```

### name

Returns the name associated with an RNS node, for reverse records.

**Signature**

```
function name(bytes32 node) external view returns (string memory)
```

**Parameters**

- `node`: the node to query.

**Events**

```
event NameChanged(bytes32 node, string name);
```

**Returns** the associated name.
