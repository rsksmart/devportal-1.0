---
layout: rsk
title: Reverse Registrar
tags: rif, rns, rif-name-service, reverse-registrar, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

The owner of the `addr.reverse` domain is a registrar that permits the caller to take ownership of the reverse record for their own address.

## Mainnet

- **Address**: [0xd25c3f94a743b93ecffecbe691beea51c3c2d9d1](https://explorer.rsk.co/address/0xd25c3f94a743b93ecffecbe691beea51c3c2d9d1)
- **ABI**: [ReverseRegistrarABI.json](/rif/rns/architecture/ReverseRegistrarABI.json)

See [RNS Testnet section](/rif/rns/testnet) for testing environment information.

## Index

- [Methods](#methods)
  - [`setName`](#setname)
  - [`claim`](#claim)
  - [`claimWithResolver`](#claimwithresolver)
  - [`node`](#node)

## Methods

#### setName

Sets the name record on that name to the specified name.

Sets the resolver for the name `hex(msg.sender).addr.reverse` to a default resolver.

**Signature**

```
function setName(string memory name) public returns (bytes32 node)
```

**Parameters**

- `name`: the name to set for this address.

**Returns** the RNS node hash of the reverse record.

#### claim

Transfer ownership of the name `hex(msg.sender).addr.reverse`.

Allows the caller to specify an owner other than themselves. The resulting account has `name()` resolver.

**Signature**

```
function claim(address owner) public returns (bytes32 node)
```

**Parameters**

- `owner`: the address to set as the owner of the reverse record in RNS.

**Returns** the RNS node hash of the reverse record.

#### claimWithResolver

Sets the resolver of the name `hex(msg.sender).addr.reverse` to the specified resolver.

Transfer ownership of the name to the provided address.

**Signature**

```
function claimWithResolver(address owner, address resolver) public returns (bytes32 node)
```

**Parameters**

- `owner`: the address to set as the owner of the reverse record in RNS.
- `resolver`: the address of the resolver to set; 0 to leave default.

**Returns** the RNS node hash of the reverse record.

#### node

Returns the node hash for a given account's reverse records.

**Signature**

```
node(address addr) public pure returns (bytes32)
```

**Parameters**

- `addr`: the address to hash

**Returns** The RNS node hash.
