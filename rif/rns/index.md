---
layout: rsk
title: RNS
---

RIF Name Service provides an architecture which enables the identification of blockchain addresses by human-readable names.

By adding a name resolution service, also known as “alias”, the probability of errors is significantly reduced. In addition, centralizing the access to multiple resources associated with a human-readable name improves the blockchain platform user experience. As resource names may change over time, the system needs to be flexible to support frequent changes.

Currently over the World Wide Web, the Domain Name System (DNS) is responsible for mapping human-readable names to IP addresses. RNS is a decentralized and secure service that works over RSK's blockchain.

<img src="/assets/img/rns/introduction.png" class="img-fluid" alt="introduction" />

## The basics

RIF Name Service's architecture is based on the Ethereum Name Service (ENS) described on [EIP-137](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md). It is primarily divided in 4 components:

### RNS Registry

The Registry contract provides a simple mapping between a domain and its Resolver. Everything related to a domain ownership is managed in this contract, including ownership transfer and sub-domain creation.

### Address Resolver

Resolver contracts are responsible for the resolution of a resource name. A Resolver has many user-defined functions and each function enables a different resource type to be fetched on the same Node.

### RSK Registrar

The Registrar is responsible of RNS governance. In addition, it is responsible for registering the name of a domain for a user.

### Reverse suite

Permits associating a human-readable name with any RSK blockchain address.

> While name services are mostly used for forward resolution - going from human-readable identifiers to machine-readable ones - there are many use-cases in which reverse resolution is useful as well.

<img src="/assets/img/rns/use-cases.png" class="img-fluid" alt="use-case" />

## How to start?

Get an RSK Domain:

Go to [RNS Manager](/rif/rns/tools/RNS-Manager) or [MyCrypto](/rif/rns/tools/MyCrypto) sections.

> Integrate RNS in my app (Wallet, Exchange, dApp, etc):

Go to [Resolve a name](/rif/rns/operation/Resolve-a-name) and [Libraries](/rif/rns/libs) sections.

> I'm a blockchain developer. I want to code!

Go to [Architecture](/rif/rns/architecture) and [Libraries](/rif/rns/libs) sections, contribute in the [RNS Github](https://github.com/rnsdomains/RNS), or read the [RNS specification doc](https://docs.rifos.org/rif-name-service-specification-en.pdf).
