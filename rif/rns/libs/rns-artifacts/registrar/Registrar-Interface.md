---
layout: rsk
title: rns-artifacts - Registrar Interface
---

## Simple Summary
A standard interface for Registrars.

## Abstract
The owner of an RNS node can issue new sub-nodes under its domain. These new sub-nodes inherit the Resolver contract of the issuer node. The issuer node may be a smart contract, called Registrar.
The following implementation allows implementing Registrar contracts providing them with their basic functionality.

## Motivation
The only one who can change the Resolver and TTL values of a node is its owner. In this case it is a contract, that should have this functionality implemented.
The motivation of this standard arises from the fact that the implementation of the [TokenRegistrar](https://github.com/rnsdomains/RNS/blob/master/contracts/registrars/tokens/TokenRegistrar.sol) did not allow updating the Resolver of it's root node.

## Rationale
The Registrar contract may allow changing these values only for certain addresses. This implementation assumes that the previous owner is the one who creates the contract to register, and is the only one who can modify these values.

### Usage

This is how a Registrar contract should implement this interface.
```solidity
contract Registrar is RegistrarInterface {
    constructor (bytes32 _rootNode) public RegistrarInterface(_rootNode) {}

    function register (bytes32 label) public {
        //...
        rns.setSubnodeOwner(rootNode, label, msg.sender);
    }
}
```

Another example can be found in [`BaseRegistrar`](https://github.com/rnsdomains/rns-artifacts/blob/master/contracts/registrar/SubdomainRegistrar.sol).
