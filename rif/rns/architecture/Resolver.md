---
layout: rsk
title: Resolver
tags: rif, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

The Resolver contract handles the resolution between the name domain and the resource. Each Registry entry references a Resolver. Use one of our resolvers, the [Multi-Crypto Resolver](/rif/rns/architecture/MultiCryptoResolver), or the [RSK Resolver](/rif/rns/architecture/RSKResolver).

## Index

- [Structure](#structure)
- [Methods](#methods)
    - [`supportsinterface`](#supportsinterface)
    - [`addr`](#addr)
    - [`setAddr`](#setaddr)

- [Events](#events)
    - [`AddrChanged`](#addrchanged)

## Structure

<img src="/assets/img/rns/public-resolver.png" class="img-fluid" alt="resolver" />

**Context**
```js
AbstractRNS rns;
```

- `rns`: the Registry contract

**Storage**
```js
mapping(bytes32=>address) addresses;
mapping(bytes32=>bytes32) hashes;
```

- `adresses`: for each `namehash` entry, stores an address
- `hashes`: for each `namehash` entry, stores a hash

## Methods

#### supportsInterface

Returns true if the resolver implements the interface specified by the provided hash.

This Resolver supports
- `0x3b3b57de = sha3(addr(bytes32))`
- `0xd8389dc5 = sha3(content(bytes32))`

**Signature**
```js
function supportsInterface(bytes4 interfaceID) public pure returns (bool)
```

**Parameters**
- `interfaceID`: the ID of the interface to check for.

**Returns**
- `bool`: true if the contract implements the requested interface.

#### addr

Returns the address associated with an RNS node.

**Signature**
```js
function addr(bytes32 node) public view returns (address)
```

**Parameters**
- `node`: the RNS node to query.

**Returns**
- `bool`: the associated address.

#### setAddr
Sets the address associated with an RNS node. May only be called by the owner of that node in the RNS registry.

**Signature**
```js
function setAddr(bytes32 node, address addrValue) public only_owner(node)
```

**Parameters**
- `node`: the node to update.
- `addrValue`: the address to set.

## Events

#### AddrChanged

This events should be fired when the method `setAddr` is sucessfully called and has to propagate the information:

- `node`: the node to update.
- `addrValue`: the address to set.
