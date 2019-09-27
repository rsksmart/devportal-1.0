---
layout: rsk
title: Name Service
---

<div align="center"><img width="40%" src="https://www.rifos.org/wp-content/uploads/2019/04/yr0BKOXI.png" alt="overview of name service"/></div>

## RIF Name Service

#### Intro

RIF Name Service provides an architecture which enables the identification of blockchain addresses by human-readable names.

By adding a name resolution service, also known as “alias”, the probability of errors is significantly reduced. In addition, centralizing the access to multiple resources associated with a human-readable name improves the blockchain platform user experience. As resource names may change over time, the system needs to be flexible to support frequent changes.

Currently over the World Wide Web, the Domain Name System (DNS) is responsible for mapping human-readable names to IP addresses. RNS is a decentralized and secure service that works over RSK’s blockchain.

<div align="center"><img width="100%" src="https://files.readme.io/a7587c2-introduction.png" alt="overview of architecture"/></div>

#### The Basicis

RIF Name Service’s architecture is based on the Ethereum Name Service (ENS) described on [EIP-137](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md). It is primarily divided in 4 components:

**REGISTRY**

The Registry contract provides a simple mapping between a domain and its Resolver. Everything related to a domain ownership is managed in this contract, including ownership transfer and sub-domain creation.

**RESOLVER**

Resolver contracts are responsible for the resolution of a resource name. A Resolver has many user-defined functions and each function enables a different resource type to be fetched on the same Node.

**REGISTRAR**

The Registrar is responsible of RNS governance. In addition, it is responsible for registering the name of a domain for a user, and the only entity capable of updating the RNS Registry.

**DEED**

In order to prevent unnecessary used storage due to unused domains or prevent name squatting, the domain owner should have incentives to forfeit their ownership of them. To achieve this, the domain owner locks tokens which will be refunded when the domain is released.

<div align="center"><img width="100%" src="https://files.readme.io/2ff7771-use-cases.png" alt="overview of 4 components"/></div>

#### Register a Domain

There are two ways users can get a domain.

The first is to opening an auction through the Registrar contract for the desired domain. For example, if “.rsk is the TLD and Alice wants to get the domain *“alice.rsk”*, she can open an auction to this domain, make a bid, and if it is the highest, she will become the new owner of *“alice.rsk”* domain.

The second way is, if Bob is the owner of *“bob.rsk”* and Alice wants the subdomain *“subdomain.bob.rsk”*, Bob can delegate the subdomain ownership to Alice without an auction process.

Once Alice gets a domain, she should set on the domain’s entry in the Registry contract the Resolver that will perform the resolution between the new domain and the desired resource. If a user doesn’t set a Resolver, a default one is set. This Public Resolver is the new owned domain’s parent’s Resolver.

Learn more how to [register a domain](https://docs.rns.rifos.org/Operation/Register-a-name/).

#### RIF Name Service – Specification

Download the full specifiction of RIF Name Service here.
https://docs.rifos.org/rif-name-service-specification-en.pdf

#### RIF Name Service – Manager

Learn how to register your domain through RNS Manager here
https://manager.rns.rifos.org/

#### RIF Name Service – Documentation

Get the full document about RIF Name Service here.
https://docs.rns.rifos.org/