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

The Registrar is responsible of RNS governance. In addition, it is responsible for registering the name of a domain for a user, and the only entity capable of updating the RNS Registry.

### Deed

In order to prevent unnecessary used storage due to unused domains or prevent name squatting, the domain owner should have incentives to forfeit their ownership of them. To achieve this, the domain owner locks tokens which will be refunded when the domain is released.

### Reverse suite

Permits associating a human-readable name with any RSK blockchain address.

> While name services are mostly used for forward resolution - going from human-readable identifiers to machine-readable ones - there are many use-cases in which reverse resolution is useful as well.


<img src="/assets/img/rns/use-cases.png" class="img-fluid" alt="use-case" />

## Register a domain

There are two ways users can get a domain.

The first is to opening an auction through the Registrar contract for the desired domain. For example, if “.rsk is the TLD and Alice wants to get the domain _“alice.rsk”_, she can open an auction to this domain, make a bid, and if it is the highest, she will become the new owner of _“alice.rsk”_ domain.

The second way is, if Bob is the owner of _“bob.rsk”_ and Alice wants the subdomain _“subdomain.bob.rsk”_, Bob can delegate the subdomain ownership to Alice without an auction process.

Once Alice gets a domain, she should set on the domain's entry in the Registry contract the Resolver that will perform the resolution between the new domain and the desired resource. If a user doesn't set a Resolver, a default one is set. This Public Resolver is the new owned domain's parent's Resolver.

Learn more how to [register a domain](/rif/rns/operation/Register-a-name/)

## How to start?

Get an RSK Domain:

Go to [RNS Manager](/rif/rns/tools/RNS-Manager) or [MyCrypto](/rif/rns/tools/MyCrypto) sections.

> Integrate RNS in my app (Wallet, Exchange, dApp, etc):

Go to [Resolve a name](/rif/rns/operation/Resolve-a-name) and [Libraries](/rif/rns/libs) sections.

> I'm a blockchain developer. I want to code!

Go to [Architecture](/rif/rns/architecture) and [Libraries](/rif/rns/libs) sections, contribute in the [RNS Github](https://github.com/rnsdomains/RNS), or read the [RNS specification doc](https://docs.rifos.org/rif-name-service-specification-en.pdf).
