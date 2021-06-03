---
layout: rsk
title: RNS Specs - Registry
tags: rif, rns, rif-name-service, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

The registry contract provides a simple mapping between a domain and its resolver. Everything related to domain ownership is managed in this contract, including ownership transfer and sub-domain creation. Each registry entry refers to a resolver which handles the [resolution](/rif/rns/specs/resolvers) between the name domain and the desired resource.

The RNS Registry contract exposes functions for accessing data and functions to modify data:

### Access

- Ownership
  ```
  function owner(bytes32 node) constant returns (address);
  ```

  Returns the owner (registrar) of the specified node.

- Resolution
  ```
  function resolver(bytes32 node) constant returns (address);
  ```

  Returns the resolver for the specified node.

- Caching
  ```
  function ttl(bytes32 node) constant returns (uint64);
  ```

  Returns the time-to-live (TTL) of the node; that is, the maximum duration for which a node's information may be cached.

### Modify

- Ownership
  ```
  function setOwner(bytes32 node, address owner);
  ```

  Transfers ownership of a node to another registrar. This function may only be called by the current owner of node. A successful call to this function logs the event `Transfer(bytes32 indexed, address)`.

  ```
  function setSubnodeOwner(bytes32 node, bytes32 label, address owner);
  ```

  Creates a new node `label.node` and sets its owner to owner, or updates the node with a new owner if it already exists. This function may only be called by the current owner of node. A successful call to this function logs the event `NewOwner(bytes32 indexed, bytes32 indexed, address)`.

- Resolution
  ```
  function setResolver(bytes32 node, address resolver);
  ```

  Sets the Resolver address for node, the contract that handles the desired resolutions. This function may only be called by the owner of node. A successful call to this function logs the event `NewResolver(bytes32 indexed, address)`.

- Caching
  ```
  function setTTL(bytes32 node, uint64 ttl);
  ```

  Sets the TTL for a node. A node's TTL applies to the 'owner' and 'resolver' records in the Registry, as well as to any information returned by the associated resolver.
